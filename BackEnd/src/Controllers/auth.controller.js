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
            subject: "Welcome to Perplexity!",
            html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a href="${process.env.URL}/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Perplexity Team</p>
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


        // 1️⃣ Check required fields

        if (!email || !password) {

            return res.status(400).json({
                message: "Email and password are required",
                success: false
            });

        }


        // 2️⃣ Find user

        const user = await userModel.findOne({
            email
        });


        if (!user) {

            return res.status(404).json({
                message: "User not found",
                success: false
            });

        }


        // 3️⃣ Check password

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        console.log(isPasswordCorrect);
        

        if (!isPasswordCorrect) {

            return res.status(401).json({
                message: "Invalid credentials",
                success: false
            });

        }


        // 4️⃣ Check if email is verified

        if (!user.isVerified) {

            return res.status(403).json({
                message: "Please verify your email before logging in",
                success: false
            });

        }


        // 5️⃣ Generate JWT

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


        // 6️⃣ Store token in cookie

        res.cookie(

            "token",

            token,

            {
                httpOnly: true,

                secure: process.env.NODE_ENV === "production",

                sameSite: "strict",

                maxAge: 7 * 24 * 60 * 60 * 1000
            }

        );


        // 7️⃣ Send response

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