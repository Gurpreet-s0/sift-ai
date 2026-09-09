import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        type: "OAuth2",

        user: process.env.GOOGLE_USER,

        clientId: process.env.GOOGLE_CLIENT_ID,

        clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        refreshToken: process.env.GOOGLE_REFRESH_TOKEN
    }
});


export default async function sendEmail({ to, subject, html, text }) {

    try {

        const details = await transporter.sendMail({

            from: process.env.GOOGLE_USER,

            to,

            subject,

            html,

            text

        });

        console.log("Email Sent:", details);

        return details;

    } catch (error) {

        console.error("Email sending failed:", error);

        throw error;

    }

}