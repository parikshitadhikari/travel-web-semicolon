// /components/Chat.tsx

import { FiUser } from "react-icons/fi";
import { FaRobot } from "react-icons/fa";
import { Message } from "../../(frontend)/travelAI/page"; 

interface Props {
  messages: Message[];
}

/**
 * @function Chat
 * @description A component for displaying chat messages, distinguishing between user and bot messages.
 * @param {Props} { messages } - Props containing an array of message objects.
 * @returns {JSX.Element} - A chat interface that displays a list of messages.
 */
const Chat = ({ messages }: Props) => {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg text-gray-500">No new messages</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full px-3 py-5 overflow-y-auto space-y-4 ">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.username === "User" ? "justify-end" : "justify-start"
          } items-end gap-2`}
        >
          {message.username !== "User" && (
            <div className="flex items-end">
              <FaRobot className="text-2xl text-green-500 mr-2" />
              <div className="max-w-lg break-words p-3 rounded-lg shadow-lg bg-white text-gray-800">
                <p>{message.message}</p>
              </div>
            </div>
          )}
          {message.username === "User" && (
            <div className="flex items-end">
              <div className="max-w-lg break-words p-3 rounded-lg shadow-md bg-blue-500 text-white">
                <p>{message.message}</p>
              </div>
              <FiUser className="text-2xl text-blue-500 ml-2" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Chat;
