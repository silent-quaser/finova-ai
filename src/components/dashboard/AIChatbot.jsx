"use client";

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  sendMessage,
} from "../../services/chatService";

export default function AIChatbot() {
  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState([]);

  useEffect(() => {
    const savedMessages =
      localStorage.getItem(
        "finova_chat_history"
      );

    if (savedMessages) {
      setMessages(
        JSON.parse(
          savedMessages
        )
      );
    } else {
      const initialMessages = [
        {
          sender: "ai",
          text: "Hello! I am your Finova AI financial assistant. Ask me anything about budgeting, expenses, saving, or investments.",
          time:
            new Date().toLocaleTimeString(),
        },
      ];

      setMessages(
        initialMessages
      );

      localStorage.setItem(
        "finova_chat_history",
        JSON.stringify(
          initialMessages
        )
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "finova_chat_history",
      JSON.stringify(messages)
    );
  }, [messages]);

  async function handleSend() {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
      time:
        new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const currentMessage =
      message;

    setMessage("");

    try {
      setLoading(true);

      const data =
        await sendMessage(
          currentMessage
        );

      const aiMessage = {
        sender: "ai",
        text: data.response,
        time:
          new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);
    } catch (error) {
      toast.error(
        "Failed to get AI response"
      );
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    localStorage.removeItem(
      "finova_chat_history"
    );

    window.location.reload();
  }

  return (
    <div className="glass rounded-3xl p-6 flex flex-col h-[700px]">
      
      <div className="flex items-center justify-between mb-6">
        
        <div>
          
          <h2 className="text-3xl font-bold mb-2">
            Finova AI Assistant
          </h2>

          <p className="text-zinc-400">
            Conversational financial intelligence
          </p>

        </div>

        <button
          onClick={clearChat}
          className="px-4 py-2 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all"
        >
          Clear Chat
        </button>

      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2">
        
        {messages.map(
          (
            message,
            index
          ) => (
            <div
              key={index}
              className={`max-w-[80%] p-4 rounded-2xl whitespace-pre-wrap formatCurrency(
                message.sender ===
                "user"
                  ? "ml-auto bg-cyan-500 text-white"
                  : "bg-white/5 border border-white/10"
              }`}
            >
              
              <div>
                {message.text}
              </div>

              <div className="text-xs opacity-70 mt-3">
                {message.time}
              </div>

            </div>
          )
        )}

        {loading && (
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl max-w-[80%]">
            Finova AI is thinking...
          </div>
        )}

      </div>

      <div className="flex gap-4">
        
        <input
          type="text"
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          placeholder="Ask Finova AI..."
          className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
        />

        <button
          onClick={handleSend}
          className="finova-button px-6 py-4 rounded-2xl font-semibold"
        >
          Send
        </button>

      </div>

    </div>
  );
}