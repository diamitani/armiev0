"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, PenTool, Palette, Share2, FileText, Radio, Mail, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

const assistants = [
  {
    title: "ARMIE Chat",
    description: "Your personal music career assistant powered by AI",
    icon: MessageSquare,
    href: "/dashboard/assistants/armie-chat",
    status: "Active",
    category: "General",
  },
  {
    title: "Lyric Generator",
    description: "AI-powered songwriting tool to help create compelling lyrics",
    icon: PenTool,
    href: "/dashboard/assistants/lyric-generator",
    status: "Active",
    category: "Creative",
  },
  {
    title: "Cover Art Generator",
    description: "Create stunning album artwork with AI-generated designs",
    icon: Palette,
    href: "/dashboard/assistants/cover-art-generator",
    status: "Active",
    category: "Creative",
  },
  {
    title: "Social Media Assistant",
    description: "Optimize your social media presence and engagement",
    icon: Share2,
    href: "/dashboard/assistants/social-media-assistant",
    status: "Active",
    category: "Marketing",
  },
  {
    title: "Artist Bio Generator",
    description: "Generate professional artist biographies and press materials",
    icon: FileText,
    href: "/dashboard/assistants/artist-bio-generator",
    status: "Active",
    category: "Marketing",
  },
  {
    title: "Press Release Generator",
    description: "Create professional press releases for your music releases",
    icon: Radio,
    href: "/dashboard/assistants/press-release-generator",
    status: "Active",
    category: "Marketing",
  },
  {
    title: "Email Generator",
    description: "Craft professional emails for industry outreach and communication",
    icon: Mail,
    href: "/dashboard/assistants/email-generator",
    status: "Active",
    category: "Communication",
  },
]

const categories = ["All", "General", "Creative", "Marketing", "Communication"]

export default function AssistantsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Assistants</h2>
          <p className="text-muted-foreground">Powerful AI tools to accelerate your music career</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Sparkles className="w-3 h-3 mr-1" />7 Active
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assistants.map((assistant) => {
          const Icon = assistant.icon
          return (
            <Card key={assistant.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                  <Icon className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">{assistant.title}</CardTitle>
                </div>
                <Badge variant="outline" className="text-xs">
                  {assistant.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{assistant.description}</CardDescription>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                    {assistant.status}
                  </Badge>
                  <Button asChild size="sm" variant="ghost">
                    <Link href={assistant.href} className="flex items-center">
                      Open
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
