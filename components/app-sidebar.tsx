"use client"

import type * as React from "react"
import {
  MessageSquare,
  PenTool,
  Mail,
  Share2,
  User,
  TrendingUp,
  Zap,
  Target,
  Calendar,
  FileText,
  Users,
  Award,
  Settings,
  HelpCircle,
  Palette,
  Radio,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation" // Import usePathname for active link highlighting

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { useAuth } from "@/components/auth-provider"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()
  const pathname = usePathname() // Get current path for active link

  const data = {
    user: {
      name: user?.artist_name || user?.name || "User",
      email: user?.email || "user@armiemusic.com",
      avatar: "/placeholder-user.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: TrendingUp,
        isActive: pathname === "/dashboard", // Set isActive based on current path
      },
      {
        title: "AI Assistants",
        url: "/dashboard/assistants",
        icon: Zap,
        isCollapsible: true,
        isActive: pathname.startsWith("/dashboard/assistants"), // Set isActive for parent
        items: [
          {
            title: "ARMIE Chat",
            url: "/dashboard/assistants/armie-chat",
            icon: MessageSquare,
            isActive: pathname === "/dashboard/assistants/armie-chat",
          },
          {
            title: "Lyric Generator",
            url: "/dashboard/assistants/lyric-generator",
            icon: PenTool,
            isActive: pathname === "/dashboard/assistants/lyric-generator",
          },
          {
            title: "Cover Art Generator",
            url: "/dashboard/assistants/cover-art-generator",
            icon: Palette,
            isActive: pathname === "/dashboard/assistants/cover-art-generator",
          },
          {
            title: "Email Generator",
            url: "/dashboard/assistants/email-generator",
            icon: Mail,
            isActive: pathname === "/dashboard/assistants/email-generator",
          },
          {
            title: "Press Release Generator",
            url: "/dashboard/assistants/press-release-generator",
            icon: Radio,
            isActive: pathname === "/dashboard/assistants/press-release-generator",
          },
          {
            title: "Artist Bio Generator",
            url: "/dashboard/assistants/artist-bio-generator",
            icon: User,
            isActive: pathname === "/dashboard/assistants/artist-bio-generator",
          },
          {
            title: "Social Media Assistant",
            url: "/dashboard/assistants/social-media-assistant",
            icon: Share2,
            isActive: pathname === "/dashboard/assistants/social-media-assistant",
          },
        ],
      },
      {
        title: "Contracts",
        url: "/dashboard/contracts",
        icon: FileText,
        isCollapsible: true,
        isActive: pathname.startsWith("/dashboard/contracts"),
        items: [
          {
            title: "All Contracts",
            url: "/dashboard/contracts",
            isActive: pathname === "/dashboard/contracts",
          },
          {
            title: "Contract Wizard",
            url: "/dashboard/contracts/wizard",
            isActive: pathname === "/dashboard/contracts/wizard",
          },
          {
            title: "Templates",
            url: "/dashboard/contracts/templates",
            isActive: pathname === "/dashboard/contracts/templates",
          },
        ],
      },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: Target,
        isActive: pathname === "/dashboard/analytics",
      },
      {
        title: "Calendar",
        url: "/dashboard/calendar",
        icon: Calendar,
        isActive: pathname === "/dashboard/calendar",
      },
      {
        title: "Contacts",
        url: "/dashboard/contacts",
        icon: Users,
        isActive: pathname === "/dashboard/contacts",
      },
      {
        title: "Academy",
        url: "/dashboard/academy",
        icon: Award,
        isActive: pathname === "/dashboard/academy",
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
        isActive: pathname === "/dashboard/settings",
      },
      {
        title: "Help & Support",
        url: "/dashboard/help",
        icon: HelpCircle,
        isActive: pathname === "/dashboard/help",
      },
    ],
  }

  return (
    <Sidebar collapsible="icon" className="border-r-0 bg-sidebar-background text-sidebar-foreground" {...props}>
      <SidebarHeader className="border-b border-sidebar-border bg-sidebar-background">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-3 sm:py-4 hover:opacity-80 transition-opacity"
        >
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg">
            <Image
              src="/images/armie-logo-icon.png"
              alt="ARMIE"
              width={20}
              height={20}
              className="sm:w-6 sm:h-6 rounded-sm"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent truncate">
              ARMIE
            </span>
            <span className="text-xs text-sidebar-foreground/70 truncate">AI Music Assistant</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-sidebar-background">
        <div className="px-2 sm:px-3 py-3 sm:py-4">
          <NavMain items={data.navMain} />
          <div className="mt-8">
            <NavMain items={data.navSecondary} />
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border bg-sidebar-background">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
