"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import {
  Building,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  MoreVertical,
  Calendar,
  DollarSign,
  Music,
  Crown,
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  PlayCircle,
  Radio,
  Headphones,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RoyaltyPayment {
  id: string
  source: string
  amount: number
  period: string
  status: "pending" | "paid" | "processing"
  dueDate: Date
  tracks: string[]
  platform: "spotify" | "apple" | "youtube" | "radio" | "sync" | "mechanical"
}

interface PublishingAsset {
  id: string
  title: string
  type: "song" | "album" | "ep"
  registrationStatus: "registered" | "pending" | "unregistered"
  copyrightOwnership: number
  publishingShare: number
  totalEarnings: number
  monthlyEarnings: number
  registrationDate?: Date
}

export default function PublishingHubPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPlatform, setFilterPlatform] = useState("all")

  const isPremiumUser = user?.plan === "pro" || user?.plan === "enterprise"

  const royaltyPayments: RoyaltyPayment[] = [
    {
      id: "1",
      source: "Spotify Streaming",
      amount: 847.32,
      period: "December 2024",
      status: "paid",
      dueDate: new Date("2024-01-15"),
      tracks: ["Midnight Dreams", "City Lights", "Ocean Waves"],
      platform: "spotify",
    },
    {
      id: "2",
      source: "Apple Music",
      amount: 623.18,
      period: "December 2024",
      status: "processing",
      dueDate: new Date("2024-01-20"),
      tracks: ["Midnight Dreams", "City Lights"],
      platform: "apple",
    },
    {
      id: "3",
      source: "YouTube Content ID",
      amount: 234.56,
      period: "December 2024",
      status: "pending",
      dueDate: new Date("2024-01-25"),
      tracks: ["Ocean Waves", "Summer Nights"],
      platform: "youtube",
    },
    {
      id: "4",
      source: "Radio Airplay",
      amount: 1250.0,
      period: "Q4 2024",
      status: "paid",
      dueDate: new Date("2024-01-10"),
      tracks: ["City Lights"],
      platform: "radio",
    },
    {
      id: "5",
      source: "Sync License - TV Commercial",
      amount: 5000.0,
      period: "December 2024",
      status: "paid",
      dueDate: new Date("2024-01-05"),
      tracks: ["Midnight Dreams"],
      platform: "sync",
    },
  ]

  const publishingAssets: PublishingAsset[] = [
    {
      id: "1",
      title: "Midnight Dreams",
      type: "song",
      registrationStatus: "registered",
      copyrightOwnership: 100,
      publishingShare: 100,
      totalEarnings: 12847.32,
      monthlyEarnings: 2341.18,
      registrationDate: new Date("2023-06-15"),
    },
    {
      id: "2",
      title: "City Lights",
      type: "song",
      registrationStatus: "registered",
      copyrightOwnership: 100,
      publishingShare: 100,
      totalEarnings: 8923.45,
      monthlyEarnings: 1876.23,
      registrationDate: new Date("2023-08-20"),
    },
    {
      id: "3",
      title: "Ocean Waves",
      type: "song",
      registrationStatus: "pending",
      copyrightOwnership: 100,
      publishingShare: 100,
      totalEarnings: 3456.78,
      monthlyEarnings: 892.34,
    },
    {
      id: "4",
      title: "Summer Nights EP",
      type: "ep",
      registrationStatus: "registered",
      copyrightOwnership: 100,
      publishingShare: 100,
      totalEarnings: 15234.67,
      monthlyEarnings: 3124.89,
      registrationDate: new Date("2023-05-10"),
    },
  ]

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "spotify":
        return PlayCircle
      case "apple":
        return Music
      case "youtube":
        return PlayCircle
      case "radio":
        return Radio
      case "sync":
        return Headphones
      case "mechanical":
        return Music
      default:
        return Music
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "spotify":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      case "apple":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
      case "youtube":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
      case "radio":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
      case "sync":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
      case "mechanical":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return CheckCircle
      case "processing":
        return Clock
      case "pending":
        return AlertCircle
      default:
        return Clock
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      case "processing":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "pending":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const totalEarnings = royaltyPayments.reduce((sum, payment) => sum + payment.amount, 0)
  const pendingPayments = royaltyPayments.filter((p) => p.status === "pending").length
  const registeredAssets = publishingAssets.filter((a) => a.registrationStatus === "registered").length
  const monthlyGrowth = 12.5 // Mock growth percentage

  const filteredPayments = royaltyPayments.filter((payment) => {
    const matchesSearch = payment.source.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlatform = filterPlatform === "all" || payment.platform === filterPlatform
    return matchesSearch && matchesPlatform
  })

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Building className="h-8 w-8 text-green-600" />
            Publishing Hub
          </h1>
          <p className="text-muted-foreground">Manage your music rights, royalties, and publishing income</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge
            className={`${isPremiumUser ? "bg-gradient-to-r from-yellow-400 to-orange-500" : "bg-gray-500"} text-white`}
          >
            {isPremiumUser && <Crown className="w-3 h-3 mr-1" />}
            {user?.plan?.toUpperCase() || "FREE"}
          </Badge>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Register New Work
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />+{monthlyGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Pending Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingPayments}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Registered Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{registeredAssets}</div>
            <p className="text-xs text-muted-foreground">Copyright protected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Music className="w-4 h-4 mr-2" />
              Active Catalogs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{publishingAssets.length}</div>
            <p className="text-xs text-muted-foreground">Earning royalties</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="royalties">Royalty Payments</TabsTrigger>
          <TabsTrigger value="catalog">Publishing Catalog</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Revenue Breakdown */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Platform</CardTitle>
                <CardDescription>Your earnings breakdown across different platforms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { platform: "Spotify", amount: 847.32, percentage: 35, icon: PlayCircle, color: "bg-green-500" },
                  { platform: "Apple Music", amount: 623.18, percentage: 26, icon: Music, color: "bg-gray-500" },
                  {
                    platform: "Sync Licensing",
                    amount: 5000.0,
                    percentage: 25,
                    icon: Headphones,
                    color: "bg-purple-500",
                  },
                  { platform: "Radio Airplay", amount: 1250.0, percentage: 14, icon: Radio, color: "bg-blue-500" },
                ].map((item) => (
                  <div key={item.platform} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center`}>
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{item.platform}</span>
                        <span className="text-sm font-bold">${item.amount.toLocaleString()}</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Tracks</CardTitle>
                <CardDescription>Your highest earning songs this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {publishingAssets
                  .sort((a, b) => b.monthlyEarnings - a.monthlyEarnings)
                  .slice(0, 4)
                  .map((asset, index) => (
                    <div key={asset.id} className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{asset.title}</span>
                          <span className="text-sm font-bold text-green-600">
                            ${asset.monthlyEarnings.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {asset.copyrightOwnership}% ownership • {asset.type}
                        </p>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Publishing Activity</CardTitle>
              <CardDescription>Latest updates on your publishing portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "Royalty payment received",
                    description: "$847.32 from Spotify streaming",
                    time: "2 hours ago",
                    icon: DollarSign,
                    color: "text-green-600",
                  },
                  {
                    action: "Copyright registration completed",
                    description: "Ocean Waves - Registration #TX123456",
                    time: "1 day ago",
                    icon: CheckCircle,
                    color: "text-blue-600",
                  },
                  {
                    action: "Sync license opportunity",
                    description: "New placement request for Midnight Dreams",
                    time: "3 days ago",
                    icon: Headphones,
                    color: "text-purple-600",
                  },
                  {
                    action: "Performance royalty statement",
                    description: "Q4 2024 radio airplay report available",
                    time: "1 week ago",
                    icon: Radio,
                    color: "text-orange-600",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center`}>
                      <activity.icon className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="royalties" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={filterPlatform} onValueChange={setFilterPlatform}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="spotify">Spotify</SelectItem>
                <SelectItem value="apple">Apple Music</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="radio">Radio</SelectItem>
                <SelectItem value="sync">Sync Licensing</SelectItem>
                <SelectItem value="mechanical">Mechanical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Royalty Payments List */}
          <div className="space-y-4">
            {filteredPayments.map((payment) => {
              const PlatformIcon = getPlatformIcon(payment.platform)
              const StatusIcon = getStatusIcon(payment.status)

              return (
                <Card key={payment.id} className="transition-all duration-200 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div
                          className={`w-12 h-12 rounded-lg ${getPlatformColor(payment.platform)} flex items-center justify-center`}
                        >
                          <PlatformIcon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg">{payment.source}</h3>
                            <Badge className={`text-xs ${getStatusColor(payment.status)}`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {payment.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">
                            <strong>Period:</strong> {payment.period} • <strong>Due:</strong>{" "}
                            {payment.dueDate.toLocaleDateString()}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                              <span className="font-bold text-green-600">${payment.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center">
                              <Music className="w-4 h-4 mr-1" />
                              {payment.tracks.length} tracks
                            </div>
                            <Badge className={`text-xs ${getPlatformColor(payment.platform)}`}>
                              {payment.platform}
                            </Badge>
                          </div>
                          <div className="mt-2">
                            <p className="text-xs text-muted-foreground">
                              <strong>Tracks:</strong> {payment.tracks.join(", ")}
                            </p>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Statement
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download Report
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="catalog" className="space-y-6">
          {/* Publishing Catalog */}
          <div className="space-y-4">
            {publishingAssets.map((asset) => (
              <Card key={asset.id} className="transition-all duration-200 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">{asset.title}</h3>
                          <Badge
                            className={`text-xs ${
                              asset.registrationStatus === "registered"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                : asset.registrationStatus === "pending"
                                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                            }`}
                          >
                            {asset.registrationStatus}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {asset.type}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Copyright Ownership</p>
                            <p className="font-semibold">{asset.copyrightOwnership}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Publishing Share</p>
                            <p className="font-semibold">{asset.publishingShare}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Total Earnings</p>
                            <p className="font-semibold text-green-600">${asset.totalEarnings.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Monthly Earnings</p>
                            <p className="font-semibold text-blue-600">${asset.monthlyEarnings.toLocaleString()}</p>
                          </div>
                        </div>
                        {asset.registrationDate && (
                          <p className="text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            Registered: {asset.registrationDate.toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Export Data
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Registration
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Premium CTA for Free Users */}
      {!isPremiumUser && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 dark:from-green-950/20 dark:to-blue-950/20 dark:border-green-800">
          <CardContent className="p-8 text-center">
            <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Unlock Advanced Publishing Features</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get access to automated royalty collection, advanced analytics, copyright registration assistance, sync
              licensing opportunities, and direct publisher relationships with Pro.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Automated Collection</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Advanced Analytics</p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Copyright Protection</p>
              </div>
              <div className="text-center">
                <Headphones className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Sync Opportunities</p>
              </div>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600">
              <Sparkles className="w-5 h-5 mr-2" />
              Upgrade to Pro
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
