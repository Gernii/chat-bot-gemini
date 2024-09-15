import type { FC } from "react";
import type { ChatMessage } from "./types";
import { ChatBubble } from "@/components/chat-bubble";
import type { ChatBubbleProps } from "@/components/chat-bubble/chat-bubble";

interface ChatMessagesProps {
    messages: ChatMessage[];
}

export const ChatMessages: FC<ChatMessagesProps> = ({ messages }) => {
    return (
        <>
            {messages.map((message, index) => (
                <ChatMessagesInner key={index} {...message} />
            ))}
        </>
    );
};

export const ChatMessagesInner: FC<ChatMessage> = ({ parts, role }) => {
    // ? User will be right and bot will be left
    const position: ChatBubbleProps["possition"] = role === "user" ? "right" : "left";

    const message = parts.map(({ text }) => text).join("");

    return <ChatBubble possition={position} message={message} />;
};
