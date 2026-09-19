import express from "express"
import {getMeController, loginController, registerController,verifyUser} from "../Controllers/auth.controller.js"
import identifyUser from "../Middleware/auth.middleware.js"
const authRouter = express.Router()

authRouter.post("/register", registerController )
authRouter.get("/verify-email", verifyUser)
authRouter.post("/login",loginController)
authRouter.get("/getme",identifyUser,getMeController)
export default authRouter