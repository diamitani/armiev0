"use client"

import { Bell, ChevronsUpDown, CreditCard, LogOut, Settings, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const { user: authUser, signOut } = useAuth()

  const displayUser = authUser || user

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-slate-100 hover:bg-slate-100 transition-colors duration-200 h-12 px-3 rounded-lg"
            >
              <div className="flex items-center gap-3 w-full">
                <Avatar className="h-8 w-8 border-2 border-slate-200">
                  <AvatarImage src={displayUser.avatar || "/placeholder.svg"} alt={displayUser.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-medium">
                    {displayUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
                  <span className="truncate font-semibold text-slate-900">{displayUser.name}</span>
                  <span className="truncate text-xs text-slate-500">{displayUser.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChevronsUpDown className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg shadow-lg border border-slate-200"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 border border-slate-200">
                  <AvatarImage src={displayUser.avatar || "/placeholder.svg"} alt={displayUser.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-medium">
                    {displayUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{displayUser.name}</span>
                  <span className="truncate text-xs text-slate-500">{displayUser.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/dashboard/profile">
                <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-slate-50">
                  <User className="w-4 h-4 text-slate-500" />
                  Profile
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/billing">
                <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-slate-50">
                  <CreditCard className="w-4 h-4 text-slate-500" />
                  Billing
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/settings">
                <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-slate-50">
                  <Settings className="w-4 h-4 text-slate-500" />
                  Settings
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/notifications">
                <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-slate-50">
                  <Bell className="w-4 h-4 text-slate-500" />
                  Notifications
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut} className="gap-2 cursor-pointer hover:bg-red-50 text-red-600">
              <LogOut className="w-4 h-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
