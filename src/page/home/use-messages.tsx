import {
    type FormEventHandler,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import type { ChatMessage, MessageResponse } from "./types";
import { SSE } from "sse.js";
import { CHAT_API_LOCAL, END_MESSAGE } from "./constants";
export const useMessages = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [messageStream, setMessageStream] = useState<string>();
    const [isMessaging, setIsMessaging] = useState(false);

    const chatContainerRef = useRef<HTMLDivElement>(null);

    /**
     * This function help to scroll to the bottom of the chat container
     * @returns void
     */
    const handleMessageChangeScroll = () => {
        if (!chatContainerRef.current) {
            return;
        }
        setTimeout(() => {
            chatContainerRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
        }, 100);
    };

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = useCallback(
        (e) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const message = formData.get("message");

            e.currentTarget.reset();

            setIsMessaging(true);

            if (typeof message !== "string") {
                return;
            }

            // ? Need to init the array outside and use it in state and request
            const initMessages: ChatMessage[] = [
                ...messages,
                {
                    parts: [{ text: message }],
                    role: "user",
                },
            ];

            setMessages(() => {
                return [...initMessages];
            });

            // ? We needto scroll down after user message set
            handleMessageChangeScroll();

            const sse = new SSE(CHAT_API_LOCAL, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                payload: JSON.stringify(initMessages),
            });

            sse.onmessage = (event) => {
                // ? handle end request
                if (event.data === END_MESSAGE) {
                    sse.close();
                    setIsMessaging(false);

                    return;
                }
                // TODO: handle validation ?
                const data = JSON.parse(event.data) as MessageResponse;

                // ? Update message stream
                setMessageStream((prev) => {
                    if (!prev) {
                        return data.message;
                    }
                    return `${prev}${data.message}`;
                });

                // ? We need to scroll down after model message set
                handleMessageChangeScroll();
            };
        },
        [messages]
    );

    useEffect(() => {
        if (isMessaging) {
            return;
        }
        if (messageStream === undefined) {
            return;
        }
        // Update message tream and then reset it
        setMessages((prev) => {
            return [
                ...prev,
                {
                    parts: [{ text: messageStream }],
                    role: "model",
                },
            ];
        });
        setMessageStream(undefined);
    }, [messageStream, isMessaging]);

    return {
        messages,
        messageStream,
        isMessaging,

        chatContainerRef,

        handleFormSubmit,
    };
};
