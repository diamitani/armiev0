"use client"
import { useTheme } from "next-themes"
import Image from "next/image"
import {
  Home,
  Bot,
  Calendar,
  Settings,
  User,
  ChevronUp,
  FolderOpen,
  FileText,
  Zap,
  Moon,
  Sun,
  Monitor,
  Brain,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Meet Armie",
    url: "/ai-assistant",
    icon: Bot,
    badge: "AI",
    badgeColor: "badge-armie",
  },
  {
    title: "Assistants",
    url: "/assistants",
    icon: Zap,
    badge: "19 AI",
    badgeColor: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  },
  {
    title: "File Manager",
    url: "/files",
    icon: FolderOpen,
    badge: "New",
    badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  },
  {
    title: "Contracts",
    url: "/contracts",
    icon: FileText,
    badge: "Legal",
    badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  },
  {
    title: "Task Manager",
    url: "/tasks",
    icon: Calendar,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
    badge: "You",
    badgeColor: "bg-armie-secondary/20 text-armie-primary dark:bg-armie-secondary/30 dark:text-armie-secondary",
  },
  {
    title: "Knowledge Base",
    url: "/knowledge-base",
    icon: Brain,
    badge: "Memory",
    badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  },
]

export function AppSidebar() {
  const { theme, setTheme } = useTheme()
  const { user, signOut } = useAuth()

  return (
    <Sidebar className="border-r border-border/40 bg-armie-gradient-soft">
      <SidebarHeader className="border-b border-border/40 bg-gradient-to-r from-armie-secondary/10 to-armie-primary/10">
        <div className="flex items-center space-x-3 px-2 py-4">
          <div className="relative">
            <Image
              src="/images/armie-logo-icon.png"
              alt="Armie Logo"
              width={40}
              height={40}
              className="rounded-lg shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-armie-secondary rounded-full border-2 border-background animate-pulse" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold armie-primary">Armie</h2>
            <p className="text-xs text-muted-foreground font-medium">Artist Manager</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="group hover:bg-armie-secondary/10 dark:hover:bg-armie-primary/10 transition-all duration-200 sidebar-item"
                  >
                    <Link href={item.url} className="flex items-center">
                      <item.icon className="mr-3 h-4 w-4 text-muted-foreground group-hover:text-armie-primary dark:group-hover:text-armie-secondary transition-colors" />
                      <span className="font-medium">{item.title}</span>
                      {item.badge && (
                        <Badge className={`ml-auto text-xs ${item.badgeColor || "badge-armie"}`}>{item.badge}</Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Stats */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider">
            Quick Stats
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2 px-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-armie-secondary/10 border border-armie-secondary/20">
                <span className="text-xs font-medium armie-primary">Active Projects</span>
                <Badge className="bg-armie-primary text-armie-accent text-xs">3</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-armie-primary/5 border border-armie-primary/10">
                <span className="text-xs font-medium armie-primary">Tools Used</span>
                <Badge className="bg-armie-secondary text-armie-primary text-xs">12</Badge>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 bg-armie-gradient-soft">
        {/* Theme Switcher */}
        <div className="px-2 py-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full justify-start h-8 hover:bg-armie-secondary/10">
                {theme === "light" ? (
                  <Sun className="mr-2 h-3 w-3" />
                ) : theme === "dark" ? (
                  <Moon className="mr-2 h-3 w-3" />
                ) : (
                  <Monitor className="mr-2 h-3 w-3" />
                )}
                <span className="text-xs">Theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* User Menu */}
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="group hover:bg-armie-secondary/10 dark:hover:bg-armie-primary/10 transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-armie-gradient flex items-center justify-center">
                      <User className="h-4 w-4 text-armie-accent" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">{user?.name || "User"}</p>
                      <p className="text-xs text-muted-foreground">{user?.plan || "Free"}</p>
                    </div>
                  </div>
                  <ChevronUp className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-armie-primary dark:group-hover:text-armie-secondary transition-colors" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut} className="text-red-400 focus:text-red-400">
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
