import userModel from "../models/user.model.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { generateResponse, generateTitle } from "../Services/ai.service.js";


export async function chatController(req, res) {
    const { message, chatId } = req.body;

    let title = null
    let chat = null

    if (!chatId) {
        title = await generateTitle(message);
        chat = await chatModel.create({
            user: req.user,
            title: title
        })
    }
    else {
        chat = await chatModel.findById(chatId);
    }
    const userMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: message,
        role: "user"
    })
    const messages = await messageModel.find({
        chat: chatId || chat._id
    })
    const aiResponse = await generateResponse(messages)
    const response = await messageModel.create({
        chat: chat._id,
        content: aiResponse,
        role: "ai"
    })
    res.status(200).json({
        message: "Chat created successfully",
        chatId: chat._id,
        title: title,
        userMessage: userMessage,
        response: response,
    })
}

export async function getChatsController(req, res) {
    const userId = req.user
    const chat = await chatModel.find({
        user: userId
    })
    res.status(200).json({
        message: "Users Chats are fetched successfully",
        chat
    })
}

export async function getMessagesController(req, res) {
    const { chatId } = req.params
    const userId = req.user

    const chat = await chatModel.findOne({
        _id: chatId,
        user: userId
    })

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }
    const messages = await messageModel.find({
        chat: chat._id
    })

    res.status(200).json({
        message: "Messages are retrived successfully",
        messages
    })
}

export async function deleteChat(req, res) {
    const { chatId } = req.params
    const userId = req.user

    const chat = await chatModel.findOneAndDelete({
        _id: chatId,
        user: userId
    })

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    await messageModel.deleteMany({
        chat: chatId
    })

    res.status(200).json({
        message: "Chat is deleted"
    })
}