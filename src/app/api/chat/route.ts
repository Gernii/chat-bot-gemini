import { chatMessageHandler } from "@/page/home/chat-message-handler.server";
import type { ChatMessage } from "@/page/home/types";

export const POST = (_req: Request) => {
    const mockMessages: ChatMessage[] = [
        {
            parts: [{ text: "Hello, how are you?" }],
            role: "user",
        },
    ];
    return chatMessageHandler(mockMessages);
};
