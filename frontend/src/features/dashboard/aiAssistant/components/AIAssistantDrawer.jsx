import { useEffect, useRef, useState } from "react";
import { X, Trash2, Bot, Minus, ChevronUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  closeAI,
  addMessage,
  setTyping,
  clearChat,
} from "../redux/aiChatSlice";

import { generateAIResponse } from "../aiEngine";
import { saveConversation } from "../aiMemory";

import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

export default function AIAssistantDrawer() {
  const dispatch = useDispatch();
  const [isMinimized, setIsMinimized] = useState(false);

  const { messages, typing, open } = useSelector(
    (state) => state.aiChat
  );

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!isMinimized) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, typing, isMinimized]);

  if (!open) return null;

  const sendMessage = (text) => {
    const userMessage = {
      role: "user",
      content: text,
    };

    dispatch(addMessage(userMessage));

    saveConversation([
      ...messages,
      userMessage,
    ]);

    dispatch(setTyping(true));

    setTimeout(() => {
      const answer = generateAIResponse(text);

      const aiMessage = {
        role: "assistant",
        content: answer,
      };

      dispatch(addMessage(aiMessage));

      saveConversation([
        ...messages,
        userMessage,
        aiMessage,
      ]);

      dispatch(setTyping(false));
    }, 800);
  };

  return (
    <div
      className={`
        fixed
        bottom-20
        right-6
        z-[999]
        flex
        w-[320px]
        max-w-[calc(100vw-24px)]
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-2xl
        transition-all
        duration-300
        ${isMinimized ? "h-[56px]" : "h-[450px]"}
      `}
    >
      {/* Header */}
      <div
        className="
          flex
          h-[56px]
          shrink-0
          items-center
          justify-between
          border-b
          border-slate-200
          bg-gradient-to-r
          from-slate-900
          to-slate-800
          px-4
          py-2.5
          text-white
        "
      >
        <div 
          className="flex items-center gap-2.5 cursor-pointer select-none"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-indigo-500
            "
          >
            <Bot size={18} />
          </div>

          <div>
            <h2 className="text-xs font-bold leading-tight">
              Xllent AI Copilot
            </h2>
            <p className="text-[10px] text-slate-300 leading-tight">
              ERP Intelligence Assistant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Minimize / Expand Toggle */}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="
              rounded-lg
              p-1.5
              hover:bg-white/10
              transition
            "
            title={isMinimized ? "Expand" : "Minimize"}
          >
            {isMinimized ? <ChevronUp size={16} /> : <Minus size={16} />}
          </button>

          {/* Clear Chat */}
          {!isMinimized && (
            <button
              onClick={() => dispatch(clearChat())}
              className="
                rounded-lg
                p-1.5
                hover:bg-white/10
                transition
              "
              title="Clear Chat"
            >
              <Trash2 size={16} />
            </button>
          )}

          {/* Close Assistant */}
          <button
            onClick={() => dispatch(closeAI())}
            className="
              rounded-lg
              p-1.5
              hover:bg-white/10
              transition
            "
            title="Close"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Drawer Body (Hidden when minimized) */}
      {!isMinimized && (
        <>
          {/* Messages Container */}
          <div
            className="
              flex-1
              overflow-y-auto
              bg-slate-50
              px-3
              py-3
            "
          >
            {messages.length === 0 && (
              <div
                className="
                  mt-10
                  text-center
                  text-slate-500
                "
              >
                <Bot
                  size={40}
                  className="mx-auto mb-3 text-indigo-500"
                />

                <h3 className="mb-1 text-xs font-semibold">
                  Welcome to Xllent AI
                </h3>

                <p className="text-xs text-slate-400">
                  Ask me about sales, revenue, inventory, or orders.
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
              />
            ))}

            {typing && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            className="
              border-t
              border-slate-200
              bg-white
            "
          >
            <ChatInput onSend={sendMessage} />
          </div>
        </>
      )}
    </div>
  );
}