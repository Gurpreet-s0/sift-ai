import express from "express"
import {loginController, registerController,verifyUser} from "../Controllers/auth.controller.js"
const authRouter = express.Router()

authRouter.post("/register", registerController )
authRouter.get("/verify-email", verifyUser)
authRouter.post("/login",loginController)
export default authRouter