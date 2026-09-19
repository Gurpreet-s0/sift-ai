import "dotenv/config";
import { ChatGoogleGenerativeAI} from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-3.6-flash",
    apiKey: process.env.GEMINI_API_KEY
});

export default async function test() {
    try {
        const response = await model.invoke(
            "What's the capital city of Delhi?"
        );
        console.log(response.content);
    } catch (error) {
        console.error(error);
    }
}