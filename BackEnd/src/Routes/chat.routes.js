import express from 'express'
import identifyUser from "../Middleware/auth.middleware.js"
import { chatController, deleteChat, getChatsController, getMessagesController } from "../Controllers/chat.controller.js"

const chatRouter = express.Router()

chatRouter.post("/message", identifyUser, chatController)
chatRouter.get("/getChats", identifyUser, getChatsController)
chatRouter.get("/getMessages/:chatId", identifyUser, getMessagesController)
chatRouter.delete("/deleteChat/:chatId", identifyUser, deleteChat)

export default chatRouter
