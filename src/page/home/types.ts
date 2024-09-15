import type { Content } from "@google/generative-ai";

export type ChatMessage = Content;

export interface MessageResponse {
    message: string;
}
