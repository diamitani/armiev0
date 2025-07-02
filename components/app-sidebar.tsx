"use client"

import type * as React from "react"
import {
  BookOpen,
  Bot,
  GalleryVerticalEnd,
  FileText,
  Users,
  Music,
  Calendar,
  Briefcase,
  Shield,
  DollarSign,
  Wand2,
  MessageSquare,
  PenTool,
  ImageIcon,
  Mail,
  FileImage,
  Share2,
  User,
  Home,
  BookOpenCheck,
  GraduationCap,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Alex Rivera",
    email: "alex@armiemusic.com",
    avatar: "/placeholder-user.jpg",
  },
  teams: [
    {
      name: "ARMIE",
      logo: GalleryVerticalEnd,
      plan: "Pro",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "AI Assistants",
      url: "/dashboard/assistants",
      icon: Bot,
      isCollapsible: true,
      items: [
        {
          title: "ARMIE Chat",
          url: "/dashboard/assistants/armie-chat",
          icon: MessageSquare,
        },
        {
          title: "Lyric Generator",
          url: "/dashboard/assistants/lyric-generator",
          icon: PenTool,
        },
        {
          title: "Cover Art Generator",
          url: "/dashboard/assistants/cover-art-generator",
          icon: ImageIcon,
        },
        {
          title: "Email Generator",
          url: "/dashboard/assistants/email-generator",
          icon: Mail,
        },
        {
          title: "Press Release Generator",
          url: "/dashboard/assistants/press-release-generator",
          icon: FileImage,
        },
        {
          title: "Artist Bio Generator",
          url: "/dashboard/assistants/artist-bio-generator",
          icon: User,
        },
        {
          title: "Social Media Assistant",
          url: "/dashboard/assistants/social-media-assistant",
          icon: Share2,
        },
      ],
    },
    {
      title: "Contracts",
      url: "/dashboard/contracts",
      icon: FileText,
      isCollapsible: true,
      items: [
        {
          title: "Contract Wizard",
          url: "/dashboard/contracts/wizard",
          icon: Wand2,
        },
        {
          title: "Templates",
          url: "/dashboard/contracts/templates",
          icon: BookOpen,
        },
        {
          title: "Artist Management",
          url: "/contracts/artist-management",
          icon: Users,
        },
        {
          title: "Recording Contract",
          url: "/contracts/recording-contract",
          icon: Music,
        },
        {
          title: "Performance Booking",
          url: "/contracts/performance-booking",
          icon: Calendar,
        },
        {
          title: "Producer Agreement",
          url: "/contracts/producer-agreement",
          icon: Briefcase,
        },
        {
          title: "Licensing Deal",
          url: "/contracts/licensing-deal",
          icon: Shield,
        },
        {
          title: "Distribution Deal",
          url: "/contracts/distribution-deal",
          icon: DollarSign,
        },
      ],
    },
    {
      title: "Publishing",
      url: "/dashboard/publishing",
      icon: BookOpenCheck,
      isCollapsible: true,
      items: [
        {
          title: "Academy",
          url: "/dashboard/publishing/academy",
          icon: GraduationCap,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
