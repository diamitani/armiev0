"use client"

import { useState, useEffect, useRef } from "react"
import { useChat } from "ai/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  Edit,
  MoreVertical,
  Loader2,
  Crown,
  Sparkles,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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
  "cover-art": {
    name: "Cover Art Assistant",
    description: "Visual design and branding specialist",
    icon: Building,
    color: "from-pink-500 to-rose-500",
    premium: true,
  },
  "social-media": {
    name: "Social Media Assistant",
    description: "Content creation and marketing",
    icon: Share2,
    color: "from-blue-500 to-cyan-500",
    premium: true,
  },
  "press-release": {
    name: "Press Release Generator",
    description: "Professional PR and media content",
    icon: FileText,
    color: "from-orange-500 to-red-500",
    premium: true,
  },
}

export default function AIAssistantPage() {
  const { user } = useAuth()
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [assistantType, setAssistantType] = useState<string>("armie")
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
    },
  })

  const isPremiumUser = user?.plan === "pro" || user?.plan === "enterprise"

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

      case "cover-art":
        return `I'm your visual branding specialist for musicians. I can help you with:
- Generate detailed cover art concepts and descriptions
- Provide color palette and typography recommendations
- Suggest visual themes that match musical genres
- Create mood boards and style guides`

      case "social-media":
        return `I'm your social media and marketing specialist. I can help you with:
- Create engaging social media content
- Develop marketing strategies and campaigns
- Write compelling captions and posts
- Plan content calendars and posting schedules`

      case "press-release":
        return `I'm your PR and media specialist. I can help you with:
- Write professional press releases
- Create media kits and EPKs
- Develop PR strategies and campaigns
- Craft compelling artist bios and statements`

      default:
        return `I'm your AI music career manager with access to specialized tools and assistants. I can help with:
- **Songwriting & Lyrics** - Generate lyrics, melodies, and song concepts
- **Marketing & Promotion** - Social media content, press releases, EPKs
- **Business & Contracts** - Legal documents, negotiations, career planning
- **Creative Direction** - Branding, visuals, artistic development`
    }
  }

  const updateChatHistory = (userMessage: string, assistantMessage: string) => {
    const chatId = currentChatId || Date.now().toString()
    const title = userMessage.length > 50 ? userMessage.substring(0, 50) + "..." : userMessage

    const newChat: ChatHistory = {
      id: chatId,
      title,
      lastMessage: assistantMessage.substring(0, 100) + (assistantMessage.length > 100 ? "..." : ""),
      timestamp: new Date(),
      messageCount: messages.length + 1,
      assistantType,
    }

    setChatHistory((prev) => {
      const updated = prev.filter((chat) => chat.id !== chatId)
      const newHistory = [newChat, ...updated].slice(0, 20)
      localStorage.setItem("armie_chat_history", JSON.stringify(newHistory))
      return newHistory
    })

    if (!currentChatId) {
      setCurrentChatId(chatId)
    }
  }

  const startNewChat = () => {
    setMessages([])
    setCurrentChatId(null)

    const welcomeContent = `Hi! I'm ${
      ASSISTANT_TYPES[assistantType as keyof typeof ASSISTANT_TYPES]?.name || "Armie"
    }. ${getWelcomeMessage(assistantType).split("\n")[0]} What would you like to work on?`

    setMessages([
      {
        id: "welcome-new",
        role: "assistant",
        content: welcomeContent,
        createdAt: new Date(),
      },
    ])
  }

  const loadChat = (chatId: string) => {
    setCurrentChatId(chatId)
    const demoMessages = [
      {
        id: "demo-1",
        role: "assistant" as const,
        content: "Welcome back! Let's continue where we left off.",
        createdAt: new Date(),
      },
    ]
    setMessages(demoMessages)
  }

  const deleteChat = (chatId: string) => {
    setChatHistory((prev) => {
      const updated = prev.filter((chat) => chat.id !== chatId)
      localStorage.setItem("armie_chat_history", JSON.stringify(updated))
      return updated
    })
  }

  const handleAssistantChange = (newType: string) => {
    const assistant = ASSISTANT_TYPES[newType as keyof typeof ASSISTANT_TYPES]
    if (assistant?.premium && !isPremiumUser) {
      return // Prevent switching to premium assistants for free users
    }
    setAssistantType(newType)
    startNewChat()
  }

  const currentAssistant = ASSISTANT_TYPES[assistantType as keyof typeof ASSISTANT_TYPES] || ASSISTANT_TYPES.armie
  const IconComponent = currentAssistant.icon

  return (
    <div className="flex h-[calc(100vh-2rem)] gap-6 p-6">
      {/* Chat History Sidebar */}
      <Card className="w-80 border-0 shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-lg">
              <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
              Chat History
            </CardTitle>
            <Button size="sm" onClick={startNewChat} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-2 p-4">
              {chatHistory.map((chat) => {
                const chatAssistant =
                  ASSISTANT_TYPES[chat.assistantType as keyof typeof ASSISTANT_TYPES] || ASSISTANT_TYPES.armie
                const ChatIcon = chatAssistant.icon

                return (
                  <div
                    key={chat.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors group hover:bg-gray-50 ${
                      currentChatId === chat.id ? "bg-purple-50 border border-purple-200" : "border border-transparent"
                    }`}
                    onClick={() => loadChat(chat.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <ChatIcon className="w-4 h-4 text-gray-500" />
                          <p className="text-sm font-medium text-gray-900 truncate">{chat.title}</p>
                          {chatAssistant.premium && <Crown className="w-3 h-3 text-yellow-500" />}
                        </div>
                        <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {chat.messageCount} messages
                          </Badge>
                          <span className="text-xs text-gray-400">{chat.timestamp.toLocaleDateString()}</span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteChat(chat.id)
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                )
              })}
              {chatHistory.length === 0 && (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-500">No chat history yet</p>
                  <p className="text-xs text-gray-400 mt-1">Start a conversation to see it here</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Main Chat Interface */}
      <Card className="flex-1 border-0 shadow-xl flex flex-col">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 bg-gradient-to-r ${currentAssistant.color} rounded-full flex items-center justify-center`}
              >
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  {currentAssistant.name}
                  {currentAssistant.premium && <Crown className="w-4 h-4 text-yellow-500" />}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{currentAssistant.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select value={assistantType} onValueChange={handleAssistantChange}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ASSISTANT_TYPES).map(([key, assistant]) => (
                    <SelectItem key={key} value={key} disabled={assistant.premium && !isPremiumUser}>
                      <div className="flex items-center gap-2">
                        <assistant.icon className="w-4 h-4" />
                        {assistant.name}
                        {assistant.premium && !isPremiumUser && <Crown className="w-3 h-3 text-yellow-500" />}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Badge className="bg-green-100 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Online
              </Badge>
            </div>
          </div>
        </CardHeader>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">Error: {error.message}</p>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={`bg-gradient-to-r ${currentAssistant.color} text-white text-sm`}>
                      <IconComponent className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === "user"
                      ? `bg-gradient-to-r ${currentAssistant.color} text-white`
                      : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                  <div className="flex items-center gap-2 mt-2 text-xs opacity-70">
                    <Clock className="w-3 h-3" />
                    {message.createdAt?.toLocaleTimeString() || new Date().toLocaleTimeString()}
                  </div>
                </div>
                {message.role === "user" && (
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-gradient-to-r from-gray-500 to-gray-600 text-white text-sm">
                      {user?.name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className={`bg-gradient-to-r ${currentAssistant.color} text-white text-sm`}>
                    <IconComponent className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-gray-500">{currentAssistant.name} is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t">
          {currentAssistant.premium && !isPremiumUser ? (
            <div className="text-center py-4">
              <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-3">This assistant requires a Pro subscription</p>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                <Sparkles className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </Button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder={`Ask ${currentAssistant.name} anything...`}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className={`bg-gradient-to-r ${currentAssistant.color} hover:opacity-90`}
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-2">
                {currentAssistant.name} is powered by AI and has access to specialized knowledge for your music career.
              </p>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}
