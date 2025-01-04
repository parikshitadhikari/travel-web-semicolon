// /app/growai/page.tsx

/**
 * @file page.tsx
 * @description Component for integrating and displaying messages with the GrowAI chatbot.
 */

"use client"; // Next.js client component directive
import { useState } from "react";
import Chat from "../../components/travelAI/Chat";
import SendMessage from "../../components/travelAI/SendMessage"; // Correct import for SendMessage
import { askGrowAI } from "../../services/askGrowAI";
import SidebarDemo from "@/app/components/Sidebar";

/**
 * @interface Message
 * @description Represents a chat message with a username and content.
 */
export interface Message {
  username: string;
  message: string;
  isLoading?: boolean;
}

/**
 * @function GrowAI
 * @description Component for the GrowAI page, handling user messages and responses from the chatbot.
 *
 * @returns {JSX.Element} - The GrowAI component.
 */
const GrowAI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  /**
   * @function handleSendMessage
   * @description Handles sending a user message to the chatbot and updating the chat accordingly.
   */
  const handleSendMessage = async (msg: string) => {
    const userMessage = {
      username: "User",
      message: msg,
    };

    const loadingMessage = {
      username: "GrowAI",
      message: "",
      isLoading: true,
    };

    // Set user and loading messages
    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      loadingMessage,
    ]);

    // Fetch the AI's response
    const aiMessage = await askGrowAI(msg);
    // console.log(aiMessage.response)
    const growAIMessage = { username: "GrowAI", message: aiMessage.response };

    // Update the last loading message with the AI's response
    setMessages((currentMessages) => {
      return currentMessages.map((m, index) =>
        index === currentMessages.length - 1 ? growAIMessage : m
      );
    });
    setMessage(""); // Clear input field after sending
  };

  return (
    <div className="flex flex-col justify-end w-full h-screen bg-blue-200 shadow-md">
      <SidebarDemo/>
      <Chat messages={messages} />
      <SendMessage
        handleSendMessage={handleSendMessage}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
};

export default GrowAI;
