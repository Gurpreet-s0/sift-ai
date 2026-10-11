import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage , SystemMessage , AIMessage} from "langchain";

const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-3.6-flash",
    apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
    model: "codestral-2508",
    apiKey: process.env.MISTRAL_API_KEY
});

export async function generateResponse(messages) {
    try {
        const response = await geminiModel.invoke(
        messages.map((msg)=>{
            if(msg.role === "user"){
                return new HumanMessage(msg.content)
            }else if(msg.role === "ai"){
                return new AIMessage(msg.content)
            }
        })
        );
        return response.text;
    } catch (error) {
        console.error(error);
    }
}

export async function generateTitle(message){
    try {
        const response = await mistralModel.invoke([
            new SystemMessage("You are a helpful assistant that generates a title for a given message in 2-4 words only the title should match the context of message correctly ."),
            new HumanMessage(`Generate a title for the following message: ${message}`)
        ]);
        return response.text;
    } catch (error) {
        console.error(error);
    }
}