/**
 * Custom hook for managing chat state
 */

import { useState, useCallback } from "react";
import * as api from "../lib/api";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: number;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (userMessage: string) => {
    // Validate input
    if (!userMessage.trim()) {
      setError("Message cannot be empty");
      return;
    }

    try {
      setError(null);
      setLoading(true);

      // Add user message
      const userMsg: Message = {
        id: Date.now().toString(),
        text: userMessage,
        sender: "user",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);

      // Get bot response
      const botReply = await api.sendMessage(userMessage);

      // Add bot message
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: botReply,
        sender: "bot",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearMessages,
  };
}
