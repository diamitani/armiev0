"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Users,
  FileText,
  DollarSign,
  Calendar,
  Music,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("7d")

  const stats = [
    {
      title: "Total Revenue",
      value: "$12,450",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "From streaming and performances",
    },
    {
      title: "Active Contracts",
      value: "8",
      change: "+2",
      trend: "up",
      icon: FileText,
      description: "3 pending review",
    },
    {
      title: "Monthly Listeners",
      value: "24.8K",
      change: "+18.2%",
      trend: "up",
      icon: Users,
      description: "Across all platforms",
    },
    {
      title: "Upcoming Events",
      value: "5",
      change: "+1",
      trend: "up",
      icon: Calendar,
      description: "Next 30 days",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "contract",
      title: "Record Label Agreement",
      description: "Contract review completed",
      time: "2 hours ago",
      status: "completed",
      icon: FileText,
    },
    {
      id: 2,
      type: "revenue",
      title: "Streaming Payout",
      description: "$450 from Spotify",
      time: "1 day ago",
      status: "received",
      icon: DollarSign,
    },
    {
      id: 3,
      type: "event",
      title: "Live Performance",
      description: "The Blue Note - NYC",
      time: "3 days ago",
      status: "upcoming",
      icon: Calendar,
    },
    {
      id: 4,
      type: "collaboration",
      title: "Feature Request",
      description: "From @producer_mike",
      time: "5 days ago",
      status: "pending",
      icon: Users,
    },
  ]

  const quickActions = [
    {
      title: "Review Contract",
      description: "Get AI analysis of your latest agreement",
      href: "/dashboard/contracts",
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "Generate Content",
      description: "Create social media posts or press releases",
      href: "/dashboard/assistants",
      icon: Music,
      color: "bg-purple-500",
    },
    {
      title: "Track Analytics",
      description: "Monitor your streaming and social metrics",
      href: "/dashboard/analytics",
      icon: BarChart3,
      color: "bg-green-500",
    },
    {
      title: "Find Collaborators",
      description: "Connect with other artists and producers",
      href: "/dashboard/directory",
      icon: Users,
      color: "bg-orange-500",
    },
  ]

  const upcomingTasks = [
    {
      id: 1,
      title: "Submit master recordings",
      description: "Due for Atlantic Records deal",
      dueDate: "Tomorrow",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "Review publishing agreement",
      description: "Sony Music Publishing contract",
      dueDate: "Dec 15",
      priority: "medium",
      completed: false,
    },
    {
      id: 3,
      title: "Update EPK materials",
      description: "Add new press photos and bio",
      dueDate: "Dec 20",
      priority: "low",
      completed: true,
    },
    {
      id: 4,
      title: "Plan social media campaign",
      description: "For upcoming single release",
      dueDate: "Dec 22",
      priority: "medium",
      completed: false,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your music career.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimeRange("7d")}
            className={timeRange === "7d" ? "bg-primary text-primary-foreground" : ""}
          >
            7 days
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimeRange("30d")}
            className={timeRange === "30d" ? "bg-primary text-primary-foreground" : ""}
          >
            30 days
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimeRange("90d")}
            className={timeRange === "90d" ? "bg-primary text-primary-foreground" : ""}
          >
            90 days
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span className={`flex items-center ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change}
                </span>
                <span>from last period</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to help manage your music career</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="flex items-start space-x-3">
                      <div
                        className={`p-2 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform`}
                      >
                        <action.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium group-hover:text-primary transition-colors">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Important deadlines and reminders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-start space-x-3">
                <div className="mt-1">
                  {task.completed ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <div
                      className={`h-4 w-4 rounded-full border-2 ${
                        task.priority === "high"
                          ? "border-red-500"
                          : task.priority === "medium"
                            ? "border-yellow-500"
                            : "border-gray-300"
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                    {task.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">{task.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                    <Badge
                      variant={
                        task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest music business activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="p-2 bg-muted rounded-lg">
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium">{activity.title}</h4>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      activity.status === "completed"
                        ? "default"
                        : activity.status === "received"
                          ? "default"
                          : activity.status === "upcoming"
                            ? "secondary"
                            : "outline"
                    }
                  >
                    {activity.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Career Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Career Progress</CardTitle>
            <CardDescription>Track your growth as an independent artist</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Contract Management</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Marketing & Promotion</span>
                <span>72%</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Revenue Diversification</span>
                <span>58%</span>
              </div>
              <Progress value={58} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Industry Networking</span>
                <span>43%</span>
              </div>
              <Progress value={43} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Goals</CardTitle>
            <CardDescription>December 2024 objectives</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Release new single</p>
                <p className="text-xs text-muted-foreground">Completed Dec 1st</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Secure 3 new gigs</p>
                <p className="text-xs text-muted-foreground">Completed Dec 8th</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Reach 25K monthly listeners</p>
                <p className="text-xs text-muted-foreground">24.8K / 25K (99%)</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Complete publishing deal</p>
                <p className="text-xs text-muted-foreground">In negotiation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
