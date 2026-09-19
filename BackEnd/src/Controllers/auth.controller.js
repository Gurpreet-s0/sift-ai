import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import sendEmail from "../Services/mail.service.js";
import bcrypt from 'bcrypt'

export async function registerController(req, res) {
    try {
        const { username, email, password } = req.body;
        const isUserAlreadyExists = await userModel.findOne({
            $or: [{ email }, { username }]
        })
        if (isUserAlreadyExists) {
            return res.status(400).json({
                message: "User with this email or username already exists",
                success: false,
                err: "User already exists"
            })
        }

        const user = await userModel.create({ username, email, password })

        const emailVerificationToken = jwt.sign({
            email: user.email,
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        res.cookie("Jwt_token", emailVerificationToken)

        await sendEmail({
            to: email,
            subject: "Welcome to Sift AI!",
            html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Sift Ai</strong>. We're excited to have you on board!</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a href="${process.env.URL}/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Sift Ai Team</p>
        `
        })

        res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }

}

export async function verifyUser(req, res) {
    try {
        const token = req.query.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findOne({
            email: decoded.email,
            isVerified: false
        })
        if (!user) {
            return res.status(404).json({
                message: "User does not found or already verified"
            })
        }
        user.isVerified = true
        await user.save()
        res.send('<h1>Hello World</h1>')
    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export async function loginController(req, res) {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                message: "Email and password are required",
                success: false
            });

        }
        const user = await userModel.findOne({
            email
        }).select("+password");


        if (!user) {

            return res.status(404).json({
                message: "User not found",
                success: false
            });

        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );


        if (!isPasswordCorrect) {

            return res.status(401).json({
                message: "Invalid credentials",
                success: false
            });

        }

        if (!user.isVerified) {

            return res.status(403).json({
                message: "Please verify your email before logging in",
                success: false
            });

        }

        const token = jwt.sign(

            {
                id: user._id,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

        res.cookie(

            "token",

            token

        );

        return res.status(200).json({

            message: "Login successful",

            success: true,

            user: {

                id: user._id,

                username: user.username,

                email: user.email

            }

        });

    }

    catch (error) {

        console.error("Login Error:", error);

        return res.status(500).json({

            message: "Internal Server Error",

            success: false

        });

    }

}

export async function getMeController(req, res) {
    try {
        const userId = req.user
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.status(200).json({
            message: "User fetched successfully",
            user
        })
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}