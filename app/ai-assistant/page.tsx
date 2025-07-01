"use client"

import { useState, useEffect, useRef } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/auth-provider"
import {
  Bot,
  Send,
  Plus,
  MessageSquare,
  Clock,
  PenTool,
  Share2,
  FileText,
  Building,
  Trash2,
  MoreVertical,
  Loader2,
  Crown,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

interface ChatHistory {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
  messageCount: number
  assistantType: string
}

const ASSISTANT_TYPES = {
  armie: {
    name: "Armie (General)",
    description: "Your AI music career manager",
    icon: Bot,
    color: "from-purple-500 to-blue-500",
    premium: false,
  },
  "lyric-generator": {
    name: "Lyric Generator",
    description: "Professional songwriting assistant",
    icon: PenTool,
    color: "from-green-500 to-teal-500",
    premium: false,
  },
  "social-media-assistant": {
    name: "Social Media Assistant",
    description: "Content creation and marketing",
    icon: Share2,
    color: "from-blue-500 to-cyan-500",
    premium: true,
  },
  "artist-bio-generator": {
    name: "Artist Bio Generator",
    description: "Professional PR and media content",
    icon: FileText,
    color: "from-orange-500 to-red-500",
    premium: true,
  },
  marketing: {
    name: "Marketing Assistant",
    description: "Analytics and growth strategies",
    icon: Building,
    color: "from-pink-500 to-rose-500",
    premium: true,
  },
}

export default function AIAssistantPage() {
  const { user } = useAuth()
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [assistantType, setAssistantType] = useState<string>("armie")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const isPremiumUser = user?.plan === "pro" || user?.plan === "enterprise"

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, setMessages } = useChat({
    api: "/api/chat",
    body: {
      assistantType,
    },
    onFinish: (message) => {
      updateChatHistory(input, message.content)
    },
    onError: (error) => {
      console.error("Chat error:", error)
      toast.error("Failed to send message. Please try again.")
    },
  })

  useEffect(() => {
    // Load chat history from localStorage
    const savedHistory = localStorage.getItem("armie_chat_history")
    if (savedHistory) {
      try {
        const history = JSON.parse(savedHistory).map((chat: any) => ({
          ...chat,
          timestamp: new Date(chat.timestamp),
        }))
        setChatHistory(history)
      } catch (error) {
        console.error("Error loading chat history:", error)
      }
    }

    // Initialize with welcome message if no messages
    if (messages.length === 0) {
      const welcomeContent = `👋 Hi ${user?.name || "there"}! I'm ${
        ASSISTANT_TYPES[assistantType as keyof typeof ASSISTANT_TYPES]?.name || "Armie"
      }.

${getWelcomeMessage(assistantType)}

What would you like to work on today?`

      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: welcomeContent,
          createdAt: new Date(),
        },
      ])
    }
  }, [assistantType, user])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const getWelcomeMessage = (type: string) => {
    switch (type) {
      case "lyric-generator":
        return `I specialize in creating compelling, emotionally resonant lyrics for various music genres. I can help you with:
- Generate original lyrics for any genre or style
- Create hooks, verses, choruses, and bridges
- Provide rhyme suggestions and alternatives
- Explain songwriting techniques and structure`

      case "social-media-assistant":
        return `I'm your social media and marketing specialist. I can help you with:
- Create engaging social media content
- Develop marketing strategies and campaigns
- Write compelling captions and posts
- Plan content calendars and posting schedules`

      case "artist-bio-generator":
        return `I'm your PR and media specialist. I can help you with:
- Write professional press releases
- Create media kits and EPKs
- Develop PR strategies and campaigns
- Craft compelling artist bios and statements`

      case "marketing":
        return `I'm your marketing and analytics advisor. I can help you with:
- Analyze streaming data and metrics
- Develop growth strategies
- Plan release campaigns
- Optimize your marketing efforts`

      default:
        return `I'm your AI music career manager with access to specialized tools and assistants. I can help with:
- **Songwriting & Lyrics** - Generate lyrics, melodies, and song concepts
- **Marketing & Promotion** - Social media content, press releases, EPKs
- **Business & Contracts** - Legal documents, negotiations, career planning
- **Creative Direction** - Branding, visuals, artistic development`
    }
  }

  const updateChatHistory = (userMessage: string, assistantMessage: string) => {
    if (!currentChatId) {
      // Create new chat
      const newChat: ChatHistory = {
        id: Date.now().toString(),
        title: userMessage.slice(0, 50) + (userMessage.length > 50 ? "..." : ""),
        lastMessage: assistantMessage.slice(0, 100) + (assistantMessage.length > 100 ? "..." : ""),
        timestamp: new Date(),
        messageCount: 2,
        assistantType,
      }
      const updatedHistory = [newChat, ...chatHistory]
      setChatHistory(updatedHistory)
      setCurrentChatId(newChat.id)
      localStorage.setItem("armie_chat_history", JSON.stringify(updatedHistory))
    } else {
      // Update existing chat
      const updatedHistory = chatHistory.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              lastMessage: assistantMessage.slice(0, 100) + (assistantMessage.length > 100 ? "..." : ""),
              timestamp: new Date(),
              messageCount: chat.messageCount + 2,
            }
          : chat,
      )
      setChatHistory(updatedHistory)
      localStorage.setItem("armie_chat_history", JSON.stringify(updatedHistory))
    }
  }

  const startNewChat = () => {
    setMessages([])
    setCurrentChatId(null)
    const welcomeContent = `👋 Hi ${user?.name || "there"}! I'm ${
      ASSISTANT_TYPES[assistantType as keyof typeof ASSISTANT_TYPES]?.name || "Armie"
    }.

${getWelcomeMessage(assistantType)}

What would you like to work on today?`

    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: welcomeContent,
        createdAt: new Date(),
      },
    ])
  }

  const loadChat = (chatId: string) => {
    // In a real app, you'd load the full conversation from storage/database
    setCurrentChatId(chatId)
    // For now, just show a placeholder
    setMessages([
      {
        id: "loaded",
        role: "assistant",
        content: "Chat history loaded. Continue the conversation...",
        createdAt: new Date(),
      },
    ])
  }

  const deleteChat = (chatId: string) => {
    const updatedHistory = chatHistory.filter((chat) => chat.id !== chatId)
    setChatHistory(updatedHistory)
    localStorage.setItem("armie_chat_history", JSON.stringify(updatedHistory))
    if (currentChatId === chatId) {
      startNewChat()
    }
    toast.success("Chat deleted")
  }

  const handleAssistantChange = (newType: string) => {
    const assistantInfo = ASSISTANT_TYPES[newType as keyof typeof ASSISTANT_TYPES]

    if (assistantInfo?.premium && !isPremiumUser) {
      toast.error("This assistant requires a premium subscription")
      return
    }

    setAssistantType(newType)
    startNewChat()
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r bg-muted/30 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">AI Assistant</h2>
            <Button onClick={startNewChat} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>

          {/* Assistant Selector */}
          <Select value={assistantType} onValueChange={handleAssistantChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(ASSISTANT_TYPES).map(([key, assistant]) => (
                <SelectItem key={key} value={key} disabled={assistant.premium && !isPremiumUser}>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <assistant.icon className="w-4 h-4 mr-2" />
                      <span>{assistant.name}</span>
                    </div>
                    {assistant.premium && !isPremiumUser && <Crown className="w-3 h-3 text-yellow-500" />}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Chat History */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {chatHistory.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No chat history yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                      currentChatId === chat.id ? "bg-muted" : ""
                    }`}
                    onClick={() => loadChat(chat.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{chat.title}</h4>
                        <p className="text-xs text-muted-foreground truncate mt-1">{chat.lastMessage}</p>
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatTime(chat.timestamp)}
                          <span className="mx-2">•</span>
                          <span>{chat.messageCount} messages</span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreVertical className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => deleteChat(chat.id)}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-r ${
                  ASSISTANT_TYPES[assistantType as keyof typeof ASSISTANT_TYPES]?.color || "from-purple-500 to-blue-500"
                } flex items-center justify-center`}
              >
                {(() => {
                  const AssistantIcon = ASSISTANT_TYPES[assistantType as keyof typeof ASSISTANT_TYPES]?.icon || Bot
                  return <AssistantIcon className="w-5 h-5 text-white" />
                })()}
              </div>
              <div>
                <h3 className="font-semibold">
                  {ASSISTANT_TYPES[assistantType as keyof typeof ASSISTANT_TYPES]?.name || "Armie"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {ASSISTANT_TYPES[assistantType as keyof typeof ASSISTANT_TYPES]?.description ||
                    "AI Music Career Manager"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {ASSISTANT_TYPES[assistantType as keyof typeof ASSISTANT_TYPES]?.premium && (
                <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              )}
              <Badge variant="outline" className="text-green-600 border-green-600">
                Online
              </Badge>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <Avatar className="w-8 h-8">
                  {message.role === "user" ? (
                    <>
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                    </>
                  ) : (
                    <AvatarFallback
                      className={`bg-gradient-to-r ${
                        ASSISTANT_TYPES[assistantType as keyof typeof ASSISTANT_TYPES]?.color ||
                        "from-purple-500 to-blue-500"
                      } text-white`}
                    >
                      {(() => {
                        const AssistantIcon =
                          ASSISTANT_TYPES[assistantType as keyof typeof ASSISTANT_TYPES]?.icon || Bot
                        return <AssistantIcon className="w-4 h-4" />
                      })()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className={`flex-1 max-w-[80%] ${message.role === "user" ? "text-right" : ""}`}>
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{message.createdAt?.toLocaleTimeString()}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback
                    className={`bg-gradient-to-r ${
                      ASSISTANT_TYPES[assistantType as keyof typeof ASSISTANT_TYPES]?.color ||
                      "from-purple-500 to-blue-500"
                    } text-white`}
                  >
                    {(() => {
                      const AssistantIcon = ASSISTANT_TYPES[assistantType as keyof typeof ASSISTANT_TYPES]?.icon || Bot
                      return <AssistantIcon className="w-4 h-4" />
                    })()}
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t bg-background">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder={`Message ${ASSISTANT_TYPES[assistantType as keyof typeof ASSISTANT_TYPES]?.name || "Armie"}...`}
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            {error && <p className="text-sm text-red-500 mt-2">Error: {error.message}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}
