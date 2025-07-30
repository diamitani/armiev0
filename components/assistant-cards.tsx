"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bot, MessageSquare, Palette, FileText, Mail, Megaphone, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"

const assistantConfigs = [
  {
    id: "armie-chat",
    name: "ARMIE Chat",
    description: "Your personal AI music career assistant for guidance and advice",
    icon: Bot,
    gradient: "from-purple-500 to-pink-500",
    status: "active",
    href: "/dashboard/assistants/armie-chat",
  },
  {
    id: "cover-art-generator",
    name: "Cover Art Generator",
    description: "Create stunning album covers and artwork with AI",
    icon: Palette,
    gradient: "from-blue-500 to-cyan-500",
    status: "active",
    href: "/dashboard/assistants/cover-art-generator",
  },
  {
    id: "press-release-generator",
    name: "Press Release Generator",
    description: "Generate professional press releases for your music",
    icon: FileText,
    gradient: "from-green-500 to-emerald-500",
    status: "active",
    href: "/dashboard/assistants/press-release-generator",
  },
  {
    id: "email-generator",
    name: "Email Generator",
    description: "Craft professional emails for industry outreach",
    icon: Mail,
    gradient: "from-orange-500 to-red-500",
    status: "active",
    href: "/dashboard/assistants/email-generator",
  },
  {
    id: "social-media-assistant",
    name: "Social Media Assistant",
    description: "Create engaging social media content and captions",
    icon: Megaphone,
    gradient: "from-indigo-500 to-purple-500",
    status: "coming-soon",
    href: "/tools/social-media-assistant",
  },
  {
    id: "lyric-generator",
    name: "Lyric Generator",
    description: "Generate creative lyrics and songwriting ideas",
    icon: Zap,
    gradient: "from-yellow-500 to-orange-500",
    status: "coming-soon",
    href: "/assistants/lyric-generator",
  },
]

export function AssistantCards() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Assistants</h2>
        <p className="text-muted-foreground">Choose an AI assistant to help with your music career tasks</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assistantConfigs.map((assistant) => {
          const IconComponent = assistant.icon
          const isActive = assistant.status === "active"

          return (
            <Card
              key={assistant.id}
              className="group hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${assistant.gradient} text-white`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <Badge variant={isActive ? "default" : "secondary"}>{isActive ? "Active" : "Coming Soon"}</Badge>
                </div>
                <CardTitle className="text-xl">{assistant.name}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{assistant.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                {isActive ? (
                  <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                    <Link href={assistant.href} className="flex items-center justify-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Launch Assistant
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                ) : (
                  <Button disabled className="w-full">
                    Coming Soon
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
