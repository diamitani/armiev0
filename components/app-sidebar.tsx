"use client"

import type * as React from "react"
import { usePathname } from "next/navigation"
import {
  Bot,
  FileText,
  GalleryVerticalEnd,
  SquareTerminal,
  Users,
  Building,
  GraduationCap,
  FileCodeIcon as FileContract,
  Mic,
  Share2,
  BarChart3,
  Palette,
  UserPlus,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { useAuth } from "@/components/auth-provider"

// This is sample data.
const data = {
  user: {
    name: "Artist Name",
    email: "artist@example.com",
    avatar: "/placeholder-user.jpg",
  },
  teams: [
    {
      name: "Armie Artist Manager",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Contracts Hub",
      url: "/dashboard/contracts",
      icon: FileContract,
      badge: "3 pending",
    },
    {
      title: "Publishing Hub",
      url: "/dashboard/publishing",
      icon: Building,
      badge: "$2,450",
    },
    {
      title: "Directory Hub",
      url: "/dashboard/directory",
      icon: Users,
      badge: "127 contacts",
    },
    {
      title: "Academy Hub",
      url: "/dashboard/academy",
      icon: GraduationCap,
      badge: "2 in progress",
    },
    {
      title: "Assistants Hub",
      url: "/dashboard/assistants",
      icon: Bot,
      badge: "8 tools",
    },
  ],
  projects: [
    {
      name: "Lyric Generator",
      url: "/dashboard/assistants/lyric-generator",
      icon: Mic,
    },
    {
      name: "Social Media Assistant",
      url: "/dashboard/assistants/social-media-assistant",
      icon: Share2,
    },
    {
      name: "Artist Bio Generator",
      url: "/dashboard/assistants/artist-bio-generator",
      icon: FileText,
    },
    {
      name: "Analytics Advisor",
      url: "/dashboard/assistants/analytics-advisor",
      icon: BarChart3,
      isPremium: true,
    },
    {
      name: "Cover Art Creator",
      url: "/dashboard/assistants/cover-art-creator",
      icon: Palette,
      isPremium: true,
    },
    {
      name: "Collaboration Finder",
      url: "/dashboard/assistants/collaboration-finder",
      icon: UserPlus,
      isPremium: true,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user || data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
