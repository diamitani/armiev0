"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bot,
  FileText,
  ImageIcon,
  Mail,
  MessageSquare,
  Music,
  PenTool,
  Share2,
  Sparkles,
  Users,
  Zap,
  Building,
  DollarSign,
  Search,
} from "lucide-react"
import Link from "next/link"

const assistantConfigs = [
  {
    id: "armie-chat",
    name: "ARMIE",
    description: "Your main AI music career assistant for comprehensive guidance and support",
    icon: Bot,
    color: "from-purple-500 to-blue-500",
    status: "online",
    category: "Core",
    href: "/dashboard/assistants/armie-chat",
  },
  {
    id: "music-contract-assistant",
    name: "Music Contract Assistant",
    description: "Generate and review music industry contracts with AI-powered legal guidance",
    icon: FileText,
    color: "from-green-500 to-teal-500",
    status: "online",
    category: "Legal",
    href: "/dashboard/assistants/music-contract-assistant",
  },
  {
    id: "cover-art-generator",
    name: "Cover Art Generator",
    description: "Create stunning album covers and promotional artwork using AI",
    icon: ImageIcon,
    color: "from-pink-500 to-rose-500",
    status: "online",
    category: "Creative",
    href: "/dashboard/assistants/cover-art-generator",
  },
  {
    id: "artist-bio-generator",
    name: "Artist Bio Generator",
    description: "Craft compelling artist biographies and press materials",
    icon: PenTool,
    color: "from-orange-500 to-red-500",
    status: "online",
    category: "Marketing",
    href: "/dashboard/assistants/artist-bio-generator",
  },
  {
    id: "email-generator",
    name: "Email Generator",
    description: "Create professional emails for industry outreach and fan engagement",
    icon: Mail,
    color: "from-blue-500 to-cyan-500",
    status: "online",
    category: "Communication",
    href: "/dashboard/assistants/email-generator",
  },
  {
    id: "dm-generator",
    name: "DM Generator",
    description: "Generate engaging direct messages for social media outreach",
    icon: MessageSquare,
    color: "from-violet-500 to-purple-500",
    status: "online",
    category: "Social",
    href: "/dashboard/assistants/dm-generator",
  },
  {
    id: "lyric-transcriber",
    name: "Lyric Transcriber",
    description: "Convert audio recordings to accurate lyric transcriptions",
    icon: Music,
    color: "from-indigo-500 to-blue-500",
    status: "online",
    category: "Music",
    href: "/dashboard/assistants/lyric-transcriber",
  },
  {
    id: "lyric-generator",
    name: "Lyric Generator",
    description: "Create original lyrics and songwriting assistance",
    icon: Sparkles,
    color: "from-yellow-500 to-orange-500",
    status: "online",
    category: "Creative",
    href: "/dashboard/assistants/lyric-generator",
  },
  {
    id: "press-release-generator",
    name: "Press Release Generator",
    description: "Generate professional press releases for music releases and events",
    icon: Share2,
    color: "from-emerald-500 to-green-500",
    status: "online",
    category: "PR",
    href: "/dashboard/assistants/press-release-generator",
  },
  {
    id: "epk-assistant",
    name: "EPK Assistant",
    description: "Create comprehensive Electronic Press Kits for industry submissions",
    icon: Users,
    color: "from-teal-500 to-cyan-500",
    status: "online",
    category: "Marketing",
    href: "/dashboard/assistants/epk-assistant",
  },
  {
    id: "branding-assistant",
    name: "Branding Assistant",
    description: "Develop your artist brand identity and visual consistency",
    icon: Zap,
    color: "from-red-500 to-pink-500",
    status: "online",
    category: "Branding",
    href: "/dashboard/assistants/branding-assistant",
  },
  {
    id: "social-media-assistant",
    name: "Social Media Assistant",
    description: "Plan and create engaging social media content strategies",
    icon: Share2,
    color: "from-purple-500 to-indigo-500",
    status: "online",
    category: "Social",
    href: "/dashboard/assistants/social-media-assistant",
  },
  {
    id: "grant-finder",
    name: "Grant Finder",
    description: "Discover funding opportunities and grants for musicians",
    icon: Search,
    color: "from-green-500 to-emerald-500",
    status: "online",
    category: "Finance",
    href: "/dashboard/assistants/grant-finder",
  },
  {
    id: "ein-assistant",
    name: "EIN Assistant",
    description: "Help with business registration and tax identification setup",
    icon: Building,
    color: "from-gray-500 to-slate-500",
    status: "online",
    category: "Business",
    href: "/dashboard/assistants/ein-assistant",
  },
  {
    id: "pro-manager",
    name: "P.R.O. Manager",
    description: "Manage performance rights organization registrations and royalties",
    icon: DollarSign,
    color: "from-amber-500 to-yellow-500",
    status: "online",
    category: "Rights",
    href: "/dashboard/assistants/pro-manager",
  },
]

const categories = [
  "All",
  "Core",
  "Creative",
  "Legal",
  "Marketing",
  "Communication",
  "Social",
  "Music",
  "PR",
  "Branding",
  "Finance",
  "Business",
  "Rights",
]

export function AssistantCards() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Assistants</h1>
          <p className="text-muted-foreground">Choose an AI assistant to help with your music career tasks</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            {assistantConfigs.filter((a) => a.status === "online").length} Online
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {assistantConfigs.map((assistant) => {
          const IconComponent = assistant.icon
          return (
            <Card
              key={assistant.id}
              className="group relative overflow-hidden border-0 bg-gradient-to-br from-background to-muted/20 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${assistant.color} shadow-lg`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${assistant.status === "online" ? "bg-green-500" : "bg-gray-400"} animate-pulse`}
                    />
                    <Badge variant="outline" className="text-xs">
                      {assistant.category}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-lg font-semibold leading-tight">{assistant.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                    {assistant.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                  <Link href={assistant.href}>
                    Launch Assistant
                    <Zap className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
