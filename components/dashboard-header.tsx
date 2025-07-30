"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/components/auth-provider"
import {
  Bell,
  LogOut,
  Menu,
  MessageSquare,
  Music,
  Settings,
  User,
  X,
  TrendingUp,
  Zap,
  FileText,
  Target,
  Users,
  Award,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function DashboardHeader() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    toast.success("Signed out successfully")
    router.push("/auth/signin")
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-10 w-10 border-2 border-purple-200 shadow-lg">
              <AvatarImage src="/images/armie-logo-icon.png" alt="ARMIE" />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold">
                <Music className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white animate-pulse shadow-sm" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ARMIE
            </h1>
            <p className="text-sm text-muted-foreground">AI Music Career Assistant</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Messages</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.avatar || "/placeholder-user.jpg"} alt={user?.name || "User"} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none">{user?.artist_name || user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/images/armie-logo-icon.png" alt="ARMIE" />
                      <AvatarFallback>AR</AvatarFallback>
                    </Avatar>
                    <span className="text-lg font-bold">ARMIE</span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="p-4">
                  <Input placeholder="Search..." className="mb-4" />
                  <nav className="grid gap-2">
                    <Link href="/dashboard" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                      <TrendingUp className="h-5 w-5" />
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/assistants"
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
                    >
                      <Zap className="h-5 w-5" />
                      AI Assistants
                    </Link>
                    <Link href="/dashboard/contracts" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                      <FileText className="h-5 w-5" />
                      Contracts
                    </Link>
                    <Link href="/dashboard/analytics" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                      <Target className="h-5 w-5" />
                      Analytics
                    </Link>
                    <Link href="/dashboard/calendar" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                      <Users className="h-5 w-5" />
                      Calendar
                    </Link>
                    <Link href="/dashboard/contacts" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                      <Award className="h-5 w-5" />
                      Contacts
                    </Link>
                    <Link href="/dashboard/academy" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                      <HelpCircle className="h-5 w-5" />
                      Academy
                    </Link>
                    <Link href="/dashboard/settings" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                      <Settings className="h-5 w-5" />
                      Settings
                    </Link>
                    <Link href="/dashboard/help" className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                      <HelpCircle className="h-5 w-5" />
                      Help & Support
                    </Link>
                  </nav>
                </div>
                <div className="mt-auto p-4 border-t">
                  <Button onClick={handleSignOut} className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
