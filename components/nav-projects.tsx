"use client"

import { type LucideIcon, Crown, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
    status?: string
    progress?: number
    isPremium?: boolean
  }[]
}) {
  const pathname = usePathname()

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-3 h-3 text-green-500" />
      case "planning":
        return <Clock className="w-3 h-3 text-yellow-500" />
      case "upcoming":
        return <AlertCircle className="w-3 h-3 text-blue-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-700 border-green-200"
      case "planning":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "upcoming":
        return "bg-blue-50 text-blue-700 border-blue-200"
      default:
        return "bg-slate-50 text-slate-700 border-slate-200"
    }
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden px-2">
      <SidebarGroupLabel className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 px-2">
        Active Projects
      </SidebarGroupLabel>
      <SidebarMenu className="space-y-2">
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              tooltip={item.name}
              isActive={pathname === item.url}
              className={cn(
                "w-full h-auto p-3 rounded-lg transition-all duration-200",
                "hover:bg-slate-100 hover:shadow-sm",
                pathname === item.url && "bg-blue-50 border border-blue-200/50 shadow-sm",
              )}
            >
              <Link href={item.url} className="flex flex-col w-full">
                <div className="flex items-center w-full mb-2">
                  <div className="flex items-center flex-1 min-w-0">
                    <item.icon
                      className={cn(
                        "w-4 h-4 mr-3 flex-shrink-0",
                        pathname === item.url ? "text-blue-600" : "text-slate-500",
                      )}
                    />
                    <span className="text-sm font-medium truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    {getStatusIcon(item.status)}
                    {item.isPremium && <Crown className="w-3 h-3 text-yellow-500" />}
                  </div>
                </div>

                {item.status && (
                  <div className="flex items-center justify-between w-full">
                    <Badge
                      variant="secondary"
                      className={cn("text-xs px-2 py-0.5 capitalize", getStatusColor(item.status))}
                    >
                      {item.status}
                    </Badge>
                    {typeof item.progress === "number" && (
                      <span className="text-xs text-slate-500 ml-2">{item.progress}%</span>
                    )}
                  </div>
                )}

                {typeof item.progress === "number" && (
                  <Progress value={item.progress} className="w-full h-1.5 mt-2 bg-slate-200" />
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
