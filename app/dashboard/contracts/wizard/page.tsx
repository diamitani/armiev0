"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User, Copy, Download, ArrowLeft, Loader2, FileText, Sparkles, MessageSquare } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const contractTemplates = {
  "artist-management": {
    name: "Artist Management Agreement",
    description: "Comprehensive agreement between artist and manager",
    prompt:
      "I need help creating an artist management agreement. Please guide me through the key terms including commission rates, responsibilities, and contract duration.",
  },
  "recording-contract": {
    name: "Recording Contract",
    description: "Agreement between artist and record label",
    prompt:
      "I want to create a recording contract. Help me understand and draft terms for advances, royalties, album delivery, and rights ownership.",
  },
  "publishing-deal": {
    name: "Music Publishing Agreement",
    description: "Contract for publishing rights and royalties",
    prompt:
      "I need a music publishing agreement. Please help me with publishing splits, administration rights, and royalty terms.",
  },
  "producer-agreement": {
    name: "Producer Agreement",
    description: "Contract between artist and producer",
    prompt:
      "I want to create a producer agreement. Help me with producer fees, royalty points, credits, and ownership terms.",
  },
  "distribution-agreement": {
    name: "Distribution Agreement",
    description: "Contract for music distribution services",
    prompt:
      "I need a distribution agreement. Please guide me through distribution channels, revenue splits, and territory rights.",
  },
  "collaboration-agreement": {
    name: "Artist Collaboration Agreement",
    description: "Agreement between collaborating artists",
    prompt:
      "I want to create a collaboration agreement between artists. Help me with revenue sharing, credits, and ownership rights.",
  },
}

const suggestedPrompts = [
  "Help me create a simple artist management contract",
  "What should I include in a recording agreement?",
  "Explain the key terms in a music publishing deal",
  "Draft a producer agreement with standard terms",
  "Create a collaboration agreement for two artists",
  "What are typical royalty rates in recording contracts?",
  "Help me understand music contract terminology",
  "Create a distribution agreement template",
]

export default function ContractWizardPage() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template")
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null)

  useEffect(() => {
    // Initialize with welcome message and template-specific prompt
    const template = templateId ? contractTemplates[templateId as keyof typeof contractTemplates] : null
    setSelectedTemplate(template)

    const welcomeMessage: Message = {
      id: "welcome",
      role: "assistant",
      content: template
        ? `Welcome to the Contract Wizard! I see you're interested in creating a **${template.name}**. ${template.description}.\n\nI'll help you create a comprehensive contract tailored to your needs. Let's start with some questions about your specific situation.`
        : "Welcome to the Contract Wizard! I'm here to help you create professional music industry contracts. Whether you need management agreements, recording contracts, publishing deals, or any other music business contract, I'll guide you through the process step by step.\n\nWhat type of contract would you like to create today?",
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])

    // Auto-send template prompt if coming from a template
    if (template) {
      setTimeout(() => {
        handleSendMessage(template.prompt, false)
      }, 1000)
    }
  }, [templateId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (message?: string, addToMessages = true) => {
    const messageToSend = message || inputMessage.trim()
    if (!messageToSend || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageToSend,
      timestamp: new Date(),
    }

    if (addToMessages) {
      setMessages((prev) => [...prev, userMessage])
    }
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: addToMessages ? [...messages, userMessage] : [...messages, userMessage],
          context: "contract_wizard",
          template: selectedTemplate?.name || null,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message || "I apologize, but I couldn't generate a response. Please try again.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error. Please try again or contact support if the problem persists.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
      toast.error("Failed to send message")
    } finally {
      setIsLoading(false)
    }
  }

  const copyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      toast.success("Message copied to clipboard!")
    } catch (error) {
      toast.error("Failed to copy message")
    }
  }

  const downloadContract = () => {
    const contractContent = messages
      .filter((m) => m.role === "assistant")
      .map((m) => m.content)
      .join("\n\n")

    const blob = new Blob([contractContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `contract-${selectedTemplate?.name.toLowerCase().replace(/\s+/g, "-") || "draft"}-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Contract downloaded!")
  }

  const useSuggestedPrompt = (prompt: string) => {
    setInputMessage(prompt)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/contracts">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Contracts
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Contract Wizard</h1>
              <p className="text-muted-foreground">
                {selectedTemplate ? `Creating: ${selectedTemplate.name}` : "AI-powered contract creation and guidance"}
              </p>
            </div>
          </div>

          {messages.length > 2 && (
            <Button onClick={downloadContract} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Contract
            </Button>
          )}
        </div>

        {selectedTemplate && (
          <Card className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900 dark:text-blue-100">{selectedTemplate.name}</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">{selectedTemplate.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Contract Assistant</span>
              </CardTitle>
              <CardDescription>Chat with our AI to create and customize your contract</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col space-y-4">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.role === "assistant" && <Bot className="w-5 h-5 mt-0.5 flex-shrink-0" />}
                        {message.role === "user" && <User className="w-5 h-5 mt-0.5 flex-shrink-0" />}
                        <div className="flex-1">
                          <div className="prose prose-sm max-w-none">
                            {message.content.split("\n").map((line, index) => (
                              <p key={index} className="mb-2 last:mb-0">
                                {line}
                              </p>
                            ))}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyMessage(message.content)}
                              className="h-6 w-6 p-0 opacity-70 hover:opacity-100"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-5 h-5" />
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about contract terms, request modifications, or get legal guidance..."
                  onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                  disabled={isLoading}
                />
                <Button onClick={() => handleSendMessage()} disabled={!inputMessage.trim() || isLoading}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Suggested Prompts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Quick Starts</span>
              </CardTitle>
              <CardDescription>Click any prompt to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left h-auto p-3 text-xs bg-transparent"
                  onClick={() => setInputMessage(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-green-900 dark:text-green-100 text-lg">💡 Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-green-800 dark:text-green-200">
              <p>• Be specific about your situation and needs</p>
              <p>• Ask for explanations of legal terms</p>
              <p>• Request modifications to standard clauses</p>
              <p>• Always have contracts reviewed by a lawyer</p>
              <p>• Save important conversations for reference</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
