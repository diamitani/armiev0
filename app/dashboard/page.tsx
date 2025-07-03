"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Send, Sparkles, Music, Mic, Users, TrendingUp, Menu } from "lucide-react"
import Image from "next/image"

interface Message {
  id: string
  content: string
  sender: "user" | "armie"
  timestamp: Date
}

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm ARMIE, your AI music assistant. I'm here to help you with everything from songwriting and production to marketing and career development. What would you like to work on today?",
      sender: "armie",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")

    // Simulate ARMIE response
    setTimeout(() => {
      const armieResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I understand you'd like help with that. Let me provide you with some personalized recommendations and guidance based on your needs.",
        sender: "armie",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, armieResponse])
    }, 1000)
  }

  const quickActions = [
    { icon: Music, label: "Generate Lyrics", description: "Create original song lyrics" },
    { icon: Mic, label: "Artist Bio", description: "Write your professional bio" },
    { icon: Users, label: "Social Media", description: "Plan your content strategy" },
    { icon: TrendingUp, label: "Press Release", description: "Announce your latest work" },
  ]

  const QuickActionsContent = () => (
    <>
      <Card className="shadow-lg border-0 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-950/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base sm:text-lg font-semibold">Quick Actions</CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground">Jump into your most-used tools</p>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start h-auto p-3 sm:p-4 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-950/20 dark:hover:to-blue-950/20"
            >
              <action.icon className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-purple-600 flex-shrink-0" />
              <div className="text-left min-w-0">
                <div className="font-medium text-sm sm:text-base truncate">{action.label}</div>
                <div className="text-xs text-muted-foreground truncate">{action.description}</div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card className="mt-4 sm:mt-6 shadow-lg border-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base sm:text-lg font-semibold">Your Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-muted-foreground">Songs Created</span>
            <Badge variant="secondary" className="text-xs">
              12
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-muted-foreground">AI Interactions</span>
            <Badge variant="secondary" className="text-xs">
              47
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-muted-foreground">This Month</span>
            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-xs">+23%</Badge>
          </div>
        </CardContent>
      </Card>
    </>
  )

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg">
            <Image
              src="/images/armie-logo-icon.png"
              alt="ARMIE"
              width={20}
              height={20}
              className="sm:w-6 sm:h-6 rounded-sm"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent truncate">
              ARMIE Chat
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">
              Your AI-powered music industry assistant
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden sm:flex">
              <Sparkles className="mr-1 h-3 w-3" />
              Online
            </Badge>
            {/* Mobile Quick Actions Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 sm:w-96">
                <SheetHeader>
                  <SheetTitle>Quick Actions</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <QuickActionsContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="flex flex-1 gap-3 sm:gap-6 p-3 sm:p-6 min-h-0">
        {/* Chat Area */}
        <div className="flex flex-1 flex-col min-w-0">
          <Card className="flex-1 shadow-lg border-0 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-950/50">
            <CardContent className="flex flex-col h-full p-0">
              <ScrollArea className="flex-1 p-3 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 sm:gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "armie" && (
                        <Avatar className="h-6 w-6 sm:h-8 sm:w-8 border-2 border-purple-200 flex-shrink-0">
                          <AvatarImage src="/images/armie-logo-icon.png" />
                          <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white text-xs">
                            AI
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-foreground"
                        }`}
                      >
                        <p className="text-xs sm:text-sm leading-relaxed">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "user" ? "text-purple-100" : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <Avatar className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback className="text-xs">AR</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t bg-white/50 dark:bg-gray-900/50 p-3 sm:p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask ARMIE anything..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 border-gray-200 focus:border-purple-300 focus:ring-purple-200 text-sm"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-3"
                  >
                    <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Desktop Quick Actions Sidebar */}
        <div className="hidden lg:block w-80 xl:w-96">
          <QuickActionsContent />
        </div>
      </div>
    </div>
  )
}
