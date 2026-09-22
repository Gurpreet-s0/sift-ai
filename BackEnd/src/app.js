import express from "express";
import authRouter from "./Routes/auth.routes.js";
import cookie from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(morgan('dev'))
app.use(express.json());
app.use(cookie())
app.use("/api/auth", authRouter);

export default app;