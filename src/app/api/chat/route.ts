import { chatMessageHandler } from "@/page/home/chat-message-handler.server";
import type { ChatMessage } from "@/page/home/types";

export const POST = async (req: Request) => {
    const body = (await req.json()) as ChatMessage[];
    return chatMessageHandler(body);
};
