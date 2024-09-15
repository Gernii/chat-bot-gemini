import type { Content } from "@google/generative-ai";

export interface ChatMessage extends Pick<Content, "parts"> {
    role: "user" | "model";
}

export interface MessageResponse {
    message: string;
}
