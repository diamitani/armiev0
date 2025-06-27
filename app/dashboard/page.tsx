"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Bot,
  Sparkles,
  FileText,
  Palette,
  Share2,
  PenTool,
  Mail,
  Users,
  Radio,
  Award,
  Building,
  Calculator,
  Shield,
  Globe,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Target,
  Calendar,
  Plus,
  Search,
} from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

export default function Dashboard() {
  // All AI Assistants/Agents
  const aiAgents = [
    {
      name: "General Assistant",
      description: "Strategic planning & daily guidance",
      icon: Sparkles,
      color: "from-purple-500 to-purple-600",
      textColor: "text-purple-400",
      bgColor: "bg-purple-950/20",
      usage: "High",
      href: "/ai-assistant",
    },
    {
      name: "Contract Assistant",
      description: "Legal agreements & contracts",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-400",
      bgColor: "bg-blue-950/20",
      usage: "Medium",
      href: "/tools/contract-assistant",
    },
    {
      name: "Cover Art Generator",
      description: "Professional album artwork",
      icon: Palette,
      color: "from-pink-500 to-pink-600",
      textColor: "text-pink-400",
      bgColor: "bg-pink-950/20",
      usage: "High",
      href: "/tools/cover-art-generator",
    },
    {
      name: "Social Media Assistant",
      description: "Content creation & scheduling",
      icon: Share2,
      color: "from-green-500 to-green-600",
      textColor: "text-green-400",
      bgColor: "bg-green-950/20",
      usage: "Daily",
      href: "/tools/social-media-assistant",
    },
    {
      name: "Lyric Generator",
      description: "AI-powered songwriting",
      icon: PenTool,
      color: "from-yellow-500 to-yellow-600",
      textColor: "text-yellow-400",
      bgColor: "bg-yellow-950/20",
      usage: "Medium",
      href: "/tools/lyric-generator",
    },
    {
      name: "Email Generator",
      description: "Professional outreach",
      icon: Mail,
      color: "from-cyan-500 to-cyan-600",
      textColor: "text-cyan-400",
      bgColor: "bg-cyan-950/20",
      usage: "Weekly",
      href: "/tools/email-generator",
    },
    {
      name: "Bio Generator",
      description: "Professional artist bios",
      icon: Users,
      color: "from-indigo-500 to-indigo-600",
      textColor: "text-indigo-400",
      bgColor: "bg-indigo-950/20",
      usage: "Low",
      href: "/tools/artist-bio-generator",
    },
    {
      name: "EPK Assistant",
      description: "Electronic press kits",
      icon: FileText,
      color: "from-teal-500 to-teal-600",
      textColor: "text-teal-400",
      bgColor: "bg-teal-950/20",
      usage: "Medium",
      href: "/tools/epk-assistant",
    },
    {
      name: "Press Release",
      description: "Professional press releases",
      icon: Radio,
      color: "from-rose-500 to-rose-600",
      textColor: "text-rose-400",
      bgColor: "bg-rose-950/20",
      usage: "Low",
      href: "/tools/press-release-generator",
    },
    {
      name: "Branding Assistant",
      description: "Brand identity development",
      icon: Award,
      color: "from-amber-500 to-amber-600",
      textColor: "text-amber-400",
      bgColor: "bg-amber-950/20",
      usage: "Medium",
      href: "/tools/branding-assistant",
    },
    {
      name: "EIN Manager",
      description: "Business setup & taxes",
      icon: Building,
      color: "from-slate-500 to-slate-600",
      textColor: "text-slate-400",
      bgColor: "bg-slate-950/20",
      usage: "Low",
      href: "/tools/ein-manager",
    },
    {
      name: "Tax Manager",
      description: "Tax guidance & tracking",
      icon: Calculator,
      color: "from-emerald-500 to-emerald-600",
      textColor: "text-emerald-400",
      bgColor: "bg-emerald-950/20",
      usage: "Monthly",
      href: "/tools/tax-manager",
    },
    {
      name: "P.R.O. Manager",
      description: "Performance rights org",
      icon: Shield,
      color: "from-orange-500 to-orange-600",
      textColor: "text-orange-400",
      bgColor: "bg-orange-950/20",
      usage: "Medium",
      href: "/tools/pro-manager",
    },
    {
      name: "Licensing Assistant",
      description: "Music licensing & sync",
      icon: Globe,
      color: "from-violet-500 to-violet-600",
      textColor: "text-violet-400",
      bgColor: "bg-violet-950/20",
      usage: "Medium",
      href: "/tools/licensing-assistant",
    },
    {
      name: "DM Generator",
      description: "Direct message scripts",
      icon: MessageSquare,
      color: "from-lime-500 to-lime-600",
      textColor: "text-lime-400",
      bgColor: "bg-lime-950/20",
      usage: "Weekly",
      href: "/tools/dm-generator",
    },
    {
      name: "Grant Finder",
      description: "Funding opportunities",
      icon: DollarSign,
      color: "from-sky-500 to-sky-600",
      textColor: "text-sky-400",
      bgColor: "bg-sky-950/20",
      usage: "Monthly",
      href: "/tools/grant-finder",
    },
    {
      name: "Revenue Generator",
      description: "Monetization strategies",
      icon: TrendingUp,
      color: "from-fuchsia-500 to-fuchsia-600",
      textColor: "text-fuchsia-400",
      bgColor: "bg-fuchsia-950/20",
      usage: "Low",
      href: "/tools/revenue-stream-generator",
    },
    {
      name: "Task Generator",
      description: "Goal-to-task conversion",
      icon: Target,
      color: "from-red-500 to-red-600",
      textColor: "text-red-400",
      bgColor: "bg-red-950/20",
      usage: "High",
      href: "/tools/task-generator",
    },
    {
      name: "Calendar Assistant",
      description: "Smart scheduling",
      icon: Calendar,
      color: "from-neutral-500 to-neutral-600",
      textColor: "text-neutral-400",
      bgColor: "bg-neutral-950/20",
      usage: "Daily",
      href: "/tools/calendar-assistant",
    },
  ]

  const getUsageBadgeColor = (usage: string) => {
    switch (usage) {
      case "Daily":
        return "bg-armie-secondary text-armie-primary"
      case "High":
        return "bg-emerald-500 text-white"
      case "Medium":
        return "bg-yellow-500 text-white"
      case "Weekly":
        return "bg-blue-500 text-white"
      case "Monthly":
        return "bg-purple-500 text-white"
      case "Low":
        return "bg-gray-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2 flex-1">
          <Bot className="w-6 h-6 text-armie-secondary" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-armie-secondary to-purple-400 bg-clip-text text-transparent">
            AI Agent Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search assistants..." className="pl-8 w-64" />
          </div>
          <Button size="sm" className="bg-armie-primary hover:bg-armie-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gradient-to-br from-background via-background to-armie-primary/5">
        {/* Stats Overview */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gradient-to-r from-armie-secondary/10 to-armie-primary/10 border-armie-secondary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Assistants</p>
                    <p className="text-2xl font-bold text-armie-primary">{aiAgents.length}</p>
                  </div>
                  <Bot className="h-8 w-8 text-armie-secondary" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border-emerald-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Today</p>
                    <p className="text-2xl font-bold text-emerald-600">12</p>
                  </div>
                  <Sparkles className="h-8 w-8 text-emerald-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Messages Today</p>
                    <p className="text-2xl font-bold text-blue-600">247</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tasks Created</p>
                    <p className="text-2xl font-bold text-purple-600">34</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-lg text-muted-foreground">
                Your complete suite of specialized AI assistants for music career management
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-armie-secondary/20 text-armie-secondary border-armie-secondary/30 px-3 py-1">
                All Systems Online
              </Badge>
            </div>
          </div>
        </div>

        {/* AI Agents Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {aiAgents.map((agent, index) => (
            <Link key={index} href={agent.href} className="group">
              <Card className="relative aspect-square border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-card/80 backdrop-blur-sm overflow-hidden">
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${agent.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Usage Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <Badge className={`text-xs px-2 py-1 ${getUsageBadgeColor(agent.usage)} shadow-sm`}>
                    {agent.usage}
                  </Badge>
                </div>

                <CardContent className="p-4 h-full flex flex-col items-center justify-center text-center relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl ${agent.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                  >
                    <agent.icon className={`w-6 h-6 ${agent.textColor}`} />
                  </div>

                  {/* Content */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-xs text-foreground group-hover:text-armie-secondary transition-colors duration-300 leading-tight">
                      {agent.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{agent.description}</p>
                  </div>

                  {/* Hover Effect Indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-armie-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Powered by <span className="font-semibold text-armie-secondary">Armie AI</span> • Your intelligent music
            career companion
          </p>
        </div>
      </div>
    </div>
  )
}
