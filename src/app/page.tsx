import { ChatBubble } from "@/components/chat-bubble";
import Image from "next/image";

export default function Home() {
    return (
        <div className="h-[100dvh] max-w-4xl mx-auto px-4 flex flex-col">
            <div className="flex-grow">
                <ChatBubble
                    message="Hello, how can i help you"
                    possition="left"
                />
                <ChatBubble message="I need your help" possition="right" />
            </div>
            <form className="w-full py-4 flex-shrink-0 flex gap-x-2 sticky bottom-0 inset-0 bg-slate-950">
                <input className="flex-grow px-4 py-2 rounded-lg bg-slate-600 disabled:bg-slate-900" />
                <button
                    type="submit"
                    className="flex-shrink-0 px-4 py-2 bg-slate-600 rounded-lg disabled:bg-slate-900"
                >
                    Send
                </button>
            </form>
        </div>
    );
}
