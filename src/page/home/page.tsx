"use client";

import { ChatBubble } from "@/components/chat-bubble";
import { ChatMessages } from "@/page/home/chat-messages";
import { useMessages } from "@/page/home/use-messages";

export const Page = () => {
    const { handleFormSubmit, isMessaging, messageStream, messages, chatContainerRef } =
        useMessages();

    return (
        <div className="h-[100dvh] max-w-4xl mx-auto px-4 flex flex-col">
            <div className="flex-grow pb-20" ref={chatContainerRef}>
                <ChatBubble message="Hello, how can i help you" possition="left" />
                <ChatBubble message="Hello, how can i help you" possition="left" />
                <ChatBubble message="Hello, how can i help you" possition="left" />
                <ChatBubble message="Hello, how can i help you" possition="left" />
                <ChatBubble message="Hello, how can i help you" possition="left" />
                <ChatBubble message="Hello, how can i help you" possition="left" />
                <ChatBubble message="Hello, how can i help you" possition="left" />
                <ChatBubble message="Hello, how can i help you" possition="left" />
                <ChatBubble message="Hello, how can i help you" possition="left" />
                <ChatBubble message="Hello, how can i help you" possition="left" />
                <ChatBubble message="Hello, how can i help you" possition="left" />
                <ChatBubble message="Hello, how can i help you" possition="left" />
                <ChatBubble message="Hello, how can i help you" possition="left" />
                <ChatBubble message="Hello, how can i help you" possition="left" />
                <ChatBubble message="Hello, how can i help you" possition="left" />
                <ChatBubble message="Hello, how can i help you" possition="left" />
                <ChatMessages messages={messages} />

                {messageStream && <ChatBubble message={messageStream} possition="left" />}
            </div>
            <form
                className="w-full py-4 flex-shrink-0 flex gap-x-2 sticky bottom-0 inset-0 bg-slate-950"
                onSubmit={handleFormSubmit}
            >
                <input
                    className="flex-grow px-4 py-2 rounded-lg bg-slate-600 disabled:bg-slate-900"
                    disabled={isMessaging}
                    name="message"
                />
                <button
                    type="submit"
                    className="flex-shrink-0 px-4 py-2 bg-slate-600 rounded-lg disabled:bg-slate-900"
                    disabled={isMessaging}
                >
                    Send
                </button>
            </form>
        </div>
    );
};
