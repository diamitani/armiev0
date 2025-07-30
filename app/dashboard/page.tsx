"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { DollarSign, Users, Heart, Target, Award, Clock, Headphones, Radio } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { AssistantCards } from "@/components/assistant-cards" // Import the new component

interface QuickStat {
  label: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ComponentType<{ className?: string }>
}

interface RecentActivity {
  id: string
  type: "release" | "contract" | "collaboration" | "milestone"
  title: string
  description: string
  timestamp: Date
  status: "completed" | "pending" | "in-progress"
}

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Mock data for demo
  const quickStats: QuickStat[] = [
    {
      label: "Monthly Streams",
      value: "127.5K",
      change: "+12.3%",
      trend: "up",
      icon: Headphones,
    },
    {
      label: "Revenue",
      value: "$3,247",
      change: "+8.7%",
      trend: "up",
      icon: DollarSign,
    },
    {
      label: "Followers",
      value: "8.2K",
      change: "+5.2%",
      trend: "up",
      icon: Users,
    },
    {
      label: "Engagement",
      value: "94.1%",
      change: "+2.1%",
      trend: "up",
      icon: Heart,
    },
  ]

  const recentActivity: RecentActivity[] = [
    {
      id: "1",
      type: "release",
      title: "New Single Released",
      description: '"Midnight Dreams" is now live on all platforms',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "completed",
    },
    {
      id: "2",
      type: "contract",
      title: "Management Agreement",
      description: "Contract review completed with RedLine Music",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: "completed",
    },
    {
      id: "3",
      type: "collaboration",
      title: "Studio Session",
      description: "Recording session with Producer Mike scheduled",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: "pending",
    },
  ]

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin")
      return
    }
  }, [user, router])

  const handleSignOut = async () => {
    await signOut()
    toast.success("Signed out successfully")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "release":
        return <Radio className="h-4 w-4" />
      case "contract":
        return <Award className="h-4 w-4" />
      case "collaboration":
        return <Users className="h-4 w-4" />
      case "milestone":
        return <Target className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <AssistantCards />
    </div>
  )
}
