import type { ChatMessage, MessageResponse } from "./types";
import { chatModel } from "./model";
import { END_MESSAGE, MAX_TOKEN_SIZE } from "./constants";

// const messageMockup = [
//     "Hello, how are you?",
//     "I am fine, thank you. How are you?",
// ];

export const chatMessageHandler = async (messages: ChatMessage[]) => {
    // ? START: count history tokens before sending new message
    const countTokenChat = chatModel.startChat({
        history: messages,
    });

    const countTokenRes = await chatModel.countTokens({
        generateContentRequest: { contents: await countTokenChat.getHistory() },
    });

    if (countTokenRes.totalTokens > MAX_TOKEN_SIZE) {
        throw new Error("Message is too long");
    }
    // ? END: count history tokens before sending new message

    // ? we need to get the latest message and put the rest to history
    const latestMessage = messages.pop();

    if (!latestMessage) {
        throw new Error("No message found");
    }

    // ? rest the messages without the latest message
    const chat = chatModel.startChat({
        history: messages,
    });

    const result = await chat.sendMessageStream(latestMessage.parts);

    // ? Create stream to stream text to the client
    const stream = new ReadableStream({
        async start(controller) {
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();

                const messageObj: MessageResponse = {
                    message: chunkText,
                };
                controller.enqueue(`data: ${JSON.stringify(messageObj)}\n\n`);
            }

            // for(const mockMessage of messageMockup) {
            //     const messageObj: MessageResponse = {
            //         message: mockMessage,
            //     };
            //     controller.enqueue(`data: ${JSON.stringify(messageObj)}\n\n`);
            // }

            controller.enqueue(`data: ${END_MESSAGE}\n\n`);
        },
    });

    return new Response(stream, {
        headers: {
            // ! This is required to make the response as event stream
            "Content-Type": "text/event-stream",
        },
    });
};
