import type { FC } from "react";
import { cx } from "cva";

export interface ChatBubbleProps {
    message: string;
    possition: "left" | "right";
}

export const ChatBubble: FC<ChatBubbleProps> = ({ message, possition }) => {
    const containerClassName = cx("my-4 flex", {
        "justify-start": possition === "left",
        "justify-end": possition === "right",
    });

    const bubbleClassName = cx("p-4 rounded-xl prose text-slate-300", {
        "bg-slate-600": possition === "left",
        "bg-slate-700": possition === "right",
    });
    return (
        <div className={containerClassName}>
            <div className={bubbleClassName}>{message}</div>
        </div>
    );
};
