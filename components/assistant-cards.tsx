"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, ImageIcon, Mic, Mail, User, Share2, Sparkles, FileText, PenTool } from "lucide-react"
import Link from "next/link"

interface Assistant {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  status: "active" | "beta" | "coming-soon"
  category: string
  href: string
  gradient: string
}

const assistants: Assistant[] = [
  {
    id: "armie-chat",
    name: "ARMIE Chat",
    description: "Your AI music career assistant for personalized guidance and support",
    icon: <MessageSquare className="w-6 h-6" />,
    status: "active",
    category: "General",
    href: "/dashboard/assistants/armie-chat",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "cover-art-generator",
    name: "Cover Art Generator",
    description: "Create stunning album covers and artwork with AI",
    icon: <ImageIcon className="w-6 h-6" />,
    status: "active",
    category: "Creative",
    href: "/dashboard/assistants/cover-art-generator",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "email-generator",
    name: "Email Generator",
    description: "Generate professional emails for industry outreach",
    icon: <Mail className="w-6 h-6" />,
    status: "active",
    category: "Communication",
    href: "/dashboard/assistants/email-generator",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "press-release-generator",
    name: "Press Release Generator",
    description: "Create compelling press releases for your music releases",
    icon: <FileText className="w-6 h-6" />,
    status: "active",
    category: "Marketing",
    href: "/dashboard/assistants/press-release-generator",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "artist-bio-generator",
    name: "Artist Bio Generator",
    description: "Craft compelling artist biographies and EPK content",
    icon: <User className="w-6 h-6" />,
    status: "beta",
    category: "Content",
    href: "/tools/artist-bio-generator",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: "lyric-generator",
    name: "Lyric Generator",
    description: "Generate creative lyrics and songwriting ideas",
    icon: <Mic className="w-6 h-6" />,
    status: "beta",
    category: "Creative",
    href: "/assistants/lyric-generator",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: "social-media-assistant",
    name: "Social Media Assistant",
    description: "Create engaging social media content and captions",
    icon: <Share2 className="w-6 h-6" />,
    status: "beta",
    category: "Marketing",
    href: "/tools/social-media-assistant",
    gradient: "from-teal-500 to-blue-500",
  },
  {
    id: "branding-assistant",
    name: "Branding Assistant",
    description: "Develop your artist brand and visual identity",
    icon: <PenTool className="w-6 h-6" />,
    status: "coming-soon",
    category: "Branding",
    href: "/tools/branding-assistant",
    gradient: "from-yellow-500 to-orange-500",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500"
    case "beta":
      return "bg-yellow-500"
    case "coming-soon":
      return "bg-gray-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "Active"
    case "beta":
      return "Beta"
    case "coming-soon":
      return "Coming Soon"
    default:
      return "Unknown"
  }
}

export function AssistantCards() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Assistants</h2>
        <p className="text-muted-foreground">Choose an AI assistant to help with your music career tasks</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {assistants.map((assistant) => (
          <Card key={assistant.id} className="group hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${assistant.gradient} text-white`}>
                  {assistant.icon}
                </div>
                <Badge variant="secondary" className="text-xs">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(assistant.status)} mr-1`} />
                  {getStatusText(assistant.status)}
                </Badge>
              </div>
              <div>
                <CardTitle className="text-lg">{assistant.name}</CardTitle>
                <CardDescription className="text-sm">{assistant.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {assistant.category}
                </Badge>
                {assistant.status === "coming-soon" ? (
                  <Button variant="ghost" size="sm" disabled>
                    Coming Soon
                  </Button>
                ) : (
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    <Link href={assistant.href}>
                      Launch
                      <Sparkles className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
