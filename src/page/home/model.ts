import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_MODEL, SYSTEM_INSTRUCTION } from "./constants";

// ? init the gemini AI API
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY is required");
}

const genAI = new GoogleGenerativeAI(API_KEY);
export const chatModel = genAI.getGenerativeModel({
    model: API_MODEL,
    systemInstruction: SYSTEM_INSTRUCTION,
});
