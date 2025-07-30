"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Sparkles, FileText, Music, Palette, Mail, TrendingUp } from "lucide-react"
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
    icon: Palette,
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
    description: "Generate creative lyrics and songwriting ideas",
    icon: Music,
    gradient: "from-indigo-500 to-purple-500",
    status: "coming-soon",
    href: "/assistants/lyric-generator",
  },
  {
    id: "social-media-assistant",
    name: "Social Media Assistant",
    description: "Create engaging social media content and captions",
    icon: TrendingUp,
    gradient: "from-pink-500 to-rose-500",
    status: "coming-soon",
    href: "/tools/social-media-assistant",
  },
]

export function AssistantCards() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Assistants</h2>
        <p className="text-muted-foreground">Choose an AI assistant to help with your music career tasks</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assistantConfigs.map((assistant) => {
          const IconComponent = assistant.icon

          return (
            <Card key={assistant.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${assistant.gradient}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant={assistant.status === "active" ? "default" : "secondary"} className="text-xs">
                    {assistant.status === "active" ? "Active" : "Coming Soon"}
                  </Badge>
                </div>
                <div>
                  <CardTitle className="text-lg">{assistant.name}</CardTitle>
                  <CardDescription className="text-sm">{assistant.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Link href={assistant.href}>
                  <Button className="w-full" disabled={assistant.status !== "active"}>
                    {assistant.status === "active" ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Launch Assistant
                      </>
                    ) : (
                      "Coming Soon"
                    )}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
