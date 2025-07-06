"use client"

import type * as React from "react"
import { MessageSquare, PenTool, ImageIcon, Mail, FileImage, Share2, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { useAuth } from "@/components/auth-provider"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()

  const data = {
    user: {
      name: user?.name || "User",
      email: user?.email || "user@armiemusic.com",
      avatar: "/placeholder-user.jpg",
    },
    navMain: [
      {
        title: "ARMIE Chat",
        url: "/dashboard/assistants/armie-chat",
        icon: MessageSquare,
        isActive: true,
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
  }

  return (
    <Sidebar collapsible="icon" className="border-r-0" {...props}>
      <SidebarHeader className="border-b border-sidebar-border bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-3 sm:py-4 hover:opacity-80 transition-opacity"
        >
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg">
            <Image
              src="/images/armie-logo-icon.png"
              alt="ARMIE"
              width={20}
              height={20}
              className="sm:w-6 sm:h-6 rounded-sm"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent truncate">
              ARMIE
            </span>
            <span className="text-xs text-muted-foreground truncate">AI Music Assistant</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-gradient-to-b from-sidebar-background to-sidebar-background/95">
        <div className="px-2 sm:px-3 py-3 sm:py-4">
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 sm:mb-3 px-1">
              AI Assistants
            </h3>
            <NavMain items={data.navMain} />
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-950/10 dark:to-blue-950/10">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
