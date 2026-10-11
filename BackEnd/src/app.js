import express from "express";
import authRouter from "./Routes/auth.routes.js";
import chatRouter from "./Routes/chat.routes.js";
import cookie from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(morgan('dev'))
app.use(express.json());
app.use(cookie())
app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);
export default app;