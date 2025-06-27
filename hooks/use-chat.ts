"use client"

import { useState, useCallback } from "react"

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  created_at: string
  token_count?: number
  processing_time_ms?: number
}

interface Chat {
  id: string
  title: string
  topic: string
  assistant_name: string
  assistant_purpose: string
  created_at: string
  last_message_at: string
  message_count: number
}

interface UseChatOptions {
  assistant_id: string
  chat_id?: string
  user_id?: string
}

export function useChat({ assistant_id, chat_id, user_id }: UseChatOptions) {
  const [messages, setMessages] = useState<Message[]>([])
  const [chat, setChat] = useState<Chat | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch("/api/chat/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            assistant_id,
            chat_id,
            message: content,
            user_id,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to send message")
        }

        const data = await response.json()

        // Add both user and assistant messages to the state
        setMessages((prev) => [...prev, data.user_message, data.message])

        return {
          chat_id: data.chat_id,
          message: data.message,
          usage: data.usage,
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to send message"
        setError(errorMessage)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [assistant_id, chat_id, user_id],
  )

  const loadMessages = useCallback(
    async (chatId: string, limit = 100, offset = 0) => {
      setIsLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams({
          limit: limit.toString(),
          offset: offset.toString(),
        })

        if (user_id) {
          params.append("user_id", user_id)
        }

        const response = await fetch(`/api/chat/${chatId}/messages?${params}`)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to load messages")
        }

        const data = await response.json()

        setChat(data.chat)
        setMessages(data.messages)

        return {
          messages: data.messages,
          chat: data.chat,
          pagination: data.pagination,
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load messages"
        setError(errorMessage)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [user_id],
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    messages,
    chat,
    isLoading,
    error,
    sendMessage,
    loadMessages,
    clearError,
  }
}
