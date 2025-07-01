"use client"

import type * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  FileText,
  Home,
  Brain,
  Briefcase,
  Music,
  MessageSquare,
  Sparkles,
  Settings,
  HelpCircle,
  PenTool,
  Palette,
  Share2,
  Radio,
  Mail,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Alex Rivera",
    email: "alex@armiemusic.com",
    avatar: "/placeholder-user.jpg",
  },
  teams: [
    {
      name: "ARMIE Studio",
      logo: GalleryVerticalEnd,
      plan: "Personal",
    },
    {
      name: "Independent Artist",
      logo: AudioWaveform,
      plan: "Personal",
    },
    {
      name: "Music Collective",
      logo: Command,
      plan: "Personal",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
      description: "Your main workspace",
    },
    {
      title: "ARMIE",
      url: "/dashboard",
      icon: MessageSquare,
      description: "AI music career assistant",
    },
    {
      title: "AI Assistants",
      url: "/dashboard/assistants",
      icon: Sparkles,
      items: [
        {
          title: "ARMIE Chat",
          url: "/dashboard",
          icon: MessageSquare,
          description: "Your personal music career assistant",
        },
        {
          title: "Lyric Generator",
          url: "/dashboard/assistants/lyric-generator",
          icon: PenTool,
          description: "AI-powered songwriting tool",
        },
        {
          title: "Cover Art Generator",
          url: "/dashboard/assistants/cover-art-generator",
          icon: Palette,
          description: "Create stunning album artwork",
        },
        {
          title: "Social Media Assistant",
          url: "/dashboard/assistants/social-media-assistant",
          icon: Share2,
          description: "Optimize your social presence",
        },
        {
          title: "Artist Bio Generator",
          url: "/dashboard/assistants/artist-bio-generator",
          icon: FileText,
          description: "Professional artist biographies",
        },
        {
          title: "Press Release Generator",
          url: "/dashboard/assistants/press-release-generator",
          icon: Radio,
          description: "Create professional press releases",
        },
        {
          title: "Email Generator",
          url: "/dashboard/assistants/email-generator",
          icon: Mail,
          description: "Craft professional emails",
        },
      ],
    },
    {
      title: "Contracts",
      url: "/dashboard/contracts",
      icon: FileText,
      description: "Manage your agreements",
      items: [
        {
          title: "All Contracts",
          url: "/dashboard/contracts",
          icon: FileText,
          description: "View all your contracts",
        },
        {
          title: "Templates",
          url: "/dashboard/contracts/templates",
          icon: Briefcase,
          description: "Pre-built contract templates",
        },
        {
          title: "Contract Wizard",
          url: "/dashboard/contracts/wizard",
          icon: Sparkles,
          description: "AI-guided contract creation",
        },
      ],
    },
    {
      title: "Publishing Center",
      url: "/dashboard/publishing",
      icon: Music,
      description: "Distribution & royalties",
    },
  ],
  quickActions: [
    {
      title: "Knowledge Base",
      url: "/knowledge-base",
      icon: Brain,
      description: "Search resources",
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      description: "Account preferences",
    },
    {
      title: "Help & Support",
      url: "/dashboard/help",
      icon: HelpCircle,
      description: "Get assistance",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="border-r border-slate-200 bg-slate-50/50 backdrop-blur-sm" {...props}>
      <SidebarHeader className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="bg-slate-50/30">
        <NavMain items={data.navMain} />
        <div className="mt-auto">
          <NavMain items={data.quickActions} title="Quick Actions" />
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t border-slate-200/60 bg-white/80 backdrop-blur-sm">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
