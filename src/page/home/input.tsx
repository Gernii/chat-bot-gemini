import { FC, KeyboardEventHandler, useRef } from "react";
import { LINE_HEIGHT } from "./constants";

export interface InputProps {
    disabled: boolean;
}

export const Input: FC<InputProps> = ({ disabled }) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const onKeyUp: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (!textAreaRef.current) {
            return;
        }
        if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
            e.currentTarget.form?.requestSubmit();
        }

        textAreaRef.current.style.setProperty("height", "auto");
        if (textAreaRef.current.scrollHeight >= LINE_HEIGHT * 5) {
            textAreaRef.current.style.setProperty(
                "height",
                `${LINE_HEIGHT * 5}px`
            );
            return;
        }
        textAreaRef.current.style.setProperty(
            "height",
            `${textAreaRef.current.scrollHeight}px`
        );
    };

    return (
        <textarea
            ref={textAreaRef}
            rows={1}
            className="flex-grow px-4 py-2 rounded-lg bg-slate-600 disabled:bg-slate-900"
            disabled={disabled}
            name="message"
            onKeyUp={onKeyUp}
        />
    );
};
