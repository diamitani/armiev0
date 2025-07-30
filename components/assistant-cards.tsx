"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, ImageIcon, FileText, Mail, Mic, Users, Calendar, TrendingUp, Sparkles } from "lucide-react"
import Link from "next/link"

const assistantConfigs = [
  {
    id: "armie-chat",
    name: "ARMIE Chat",
    description: "Your personal AI music career assistant for guidance and advice",
    icon: MessageSquare,
    gradient: "from-purple-500 to-pink-500",
    status: "active",
    href: "/dashboard/assistants/armie-chat",
  },
  {
    id: "cover-art-generator",
    name: "Cover Art Generator",
    description: "Create stunning album and single cover art with AI",
    icon: ImageIcon,
    gradient: "from-blue-500 to-cyan-500",
    status: "active",
    href: "/dashboard/assistants/cover-art-generator",
  },
  {
    id: "press-release-generator",
    name: "Press Release Generator",
    description: "Generate professional press releases for your music releases",
    icon: FileText,
    gradient: "from-green-500 to-emerald-500",
    status: "active",
    href: "/dashboard/assistants/press-release-generator",
  },
  {
    id: "email-generator",
    name: "Email Generator",
    description: "Craft professional emails for industry outreach and networking",
    icon: Mail,
    gradient: "from-orange-500 to-red-500",
    status: "active",
    href: "/dashboard/assistants/email-generator",
  },
  {
    id: "lyric-generator",
    name: "Lyric Generator",
    description: "Get creative inspiration and generate lyrics for your songs",
    icon: Mic,
    gradient: "from-indigo-500 to-purple-500",
    status: "coming-soon",
    href: "/assistants/lyric-generator",
  },
  {
    id: "social-media-assistant",
    name: "Social Media Assistant",
    description: "Create engaging social media content and captions",
    icon: Users,
    gradient: "from-pink-500 to-rose-500",
    status: "coming-soon",
    href: "/tools/social-media-assistant",
  },
  {
    id: "tour-planner",
    name: "Tour Planner",
    description: "Plan and organize your tours with AI assistance",
    icon: Calendar,
    gradient: "from-teal-500 to-green-500",
    status: "coming-soon",
    href: "#",
  },
  {
    id: "analytics-assistant",
    name: "Analytics Assistant",
    description: "Analyze your music performance and get insights",
    icon: TrendingUp,
    gradient: "from-yellow-500 to-orange-500",
    status: "coming-soon",
    href: "#",
  },
]

export function AssistantCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {assistantConfigs.map((assistant) => {
        const IconComponent = assistant.icon

        return (
          <Card
            key={assistant.id}
            className="group hover:shadow-lg transition-all duration-200 border-border/50 hover:border-border"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${assistant.gradient} text-white`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <Badge variant={assistant.status === "active" ? "default" : "secondary"} className="text-xs">
                  {assistant.status === "active" ? "Active" : "Coming Soon"}
                </Badge>
              </div>
              <div>
                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {assistant.name}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground mt-1">
                  {assistant.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {assistant.status === "active" ? (
                <Button asChild className="w-full">
                  <Link href={assistant.href}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Launch Assistant
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
  )
}
