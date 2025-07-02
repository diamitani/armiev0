"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Music,
  TrendingUp,
  DollarSign,
  Users,
  Play,
  Download,
  ExternalLink,
  BookOpen,
  CheckCircle,
  Clock,
  AlertCircle,
  Sparkles,
  Globe,
  BarChart3,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PublishingCenterPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const distributionPlatforms = [
    {
      name: "Spotify",
      status: "Connected",
      streams: "12.4K",
      revenue: "$89.32",
      color: "bg-green-500",
    },
    {
      name: "Apple Music",
      status: "Connected",
      streams: "8.7K",
      revenue: "$67.21",
      color: "bg-gray-800",
    },
    {
      name: "YouTube Music",
      status: "Connected",
      streams: "15.2K",
      revenue: "$45.67",
      color: "bg-red-500",
    },
    {
      name: "Amazon Music",
      status: "Pending",
      streams: "0",
      revenue: "$0.00",
      color: "bg-orange-500",
    },
  ]

  const recentReleases = [
    {
      title: "Summer Vibes",
      type: "Single",
      releaseDate: "2024-06-15",
      status: "Live",
      streams: "5.2K",
      revenue: "$23.45",
    },
    {
      title: "Midnight Dreams EP",
      type: "EP",
      releaseDate: "2024-05-20",
      status: "Live",
      streams: "12.8K",
      revenue: "$78.90",
    },
    {
      title: "Acoustic Sessions",
      type: "Album",
      releaseDate: "2024-07-01",
      status: "Scheduled",
      streams: "0",
      revenue: "$0.00",
    },
  ]

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Image src="/images/armie-logo.png" alt="ARMIE" width={40} height={40} className="rounded-lg" />
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Publishing Center</h1>
              <p className="text-slate-600">Manage your music distribution, royalties, and publishing</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <Music className="w-4 h-4 mr-2" />
            New Release
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Streams</p>
                <p className="text-2xl font-bold text-slate-800">47.3K</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-slate-800">$342.18</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Releases</p>
                <p className="text-2xl font-bold text-slate-800">12</p>
                <p className="text-xs text-slate-500 mt-1">Across all platforms</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Music className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Monthly Listeners</p>
                <p className="text-2xl font-bold text-slate-800">2.4K</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +15% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="royalties">Royalties</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="academy">Academy</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Releases */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Releases</CardTitle>
                <CardDescription>Your latest music releases and their performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentReleases.map((release, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center">
                        <Music className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-medium">{release.title}</p>
                        <p className="text-sm text-slate-500">
                          {release.type} • {release.releaseDate}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={release.status === "Live" ? "default" : "secondary"}>{release.status}</Badge>
                      <p className="text-sm text-slate-500 mt-1">{release.streams} streams</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Distribution Status */}
            <Card>
              <CardHeader>
                <CardTitle>Distribution Status</CardTitle>
                <CardDescription>Your music across streaming platforms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {distributionPlatforms.map((platform, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${platform.color}`}></div>
                      <div>
                        <p className="font-medium">{platform.name}</p>
                        <p className="text-sm text-slate-500">{platform.streams} streams</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={platform.status === "Connected" ? "default" : "secondary"}>
                        {platform.status}
                      </Badge>
                      <p className="text-sm text-slate-500 mt-1">{platform.revenue}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="academy" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Publishing Academy</h2>
              <p className="text-slate-600">
                Learn everything you need to know about music publishing and distribution
              </p>
            </div>
            <Button asChild>
              <Link href="/dashboard/publishing/academy">
                <BookOpen className="w-4 h-4 mr-2" />
                View All Courses
              </Link>
            </Button>
          </div>

          {/* Quick Setup Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Quick Setup Checklist
              </CardTitle>
              <CardDescription>Essential steps to get your music business set up properly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <p className="font-medium">Register with P.R.O.</p>
                      <p className="text-sm text-slate-500">ASCAP, BMI, or SESAC</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://www.ascap.com" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <div className="flex-1">
                      <p className="font-medium">Get Your E.I.N.</p>
                      <p className="text-sm text-slate-500">Business tax ID number</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href="https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <div className="flex-1">
                      <p className="font-medium">Copyright Your Music</p>
                      <p className="text-sm text-slate-500">Protect your creative works</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://www.copyright.gov" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <div className="flex-1">
                      <p className="font-medium">Choose Distribution</p>
                      <p className="text-sm text-slate-500">TuneCore, DistroKid, CD Baby</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://www.tunecore.com" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Courses */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-4 h-4 text-blue-600" />
                  </div>
                  <Badge variant="secondary">Beginner</Badge>
                </div>
                <CardTitle className="text-lg">How To: Distribute Your Music</CardTitle>
                <CardDescription>Learn to navigate DSPs and maximize your reach across all platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">7 Chapters</span>
                    <span className="text-slate-500">2-3 hours</span>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href="/dashboard/publishing/academy">Start Course</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-green-600" />
                  </div>
                  <Badge variant="secondary">Beginner</Badge>
                </div>
                <CardTitle className="text-lg">Register with P.R.O.</CardTitle>
                <CardDescription>Complete guide to registering with performing rights organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">5 Chapters</span>
                    <span className="text-slate-500">1-2 hours</span>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href="/dashboard/publishing/academy">Start Course</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                  </div>
                  <Badge variant="secondary">Intermediate</Badge>
                </div>
                <CardTitle className="text-lg">Music Licensing Mastery</CardTitle>
                <CardDescription>
                  Monetize your music through sync licensing and placement opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">8 Chapters</span>
                    <span className="text-slate-500">3-4 hours</span>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href="/dashboard/publishing/academy">Start Course</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>Distribution Platforms</CardTitle>
              <CardDescription>Manage your music distribution across streaming services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {distributionPlatforms.map((platform, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">{platform.name}</h3>
                        <Badge variant={platform.status === "Connected" ? "default" : "secondary"}>
                          {platform.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-500">Streams</span>
                          <span className="font-medium">{platform.streams}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-500">Revenue</span>
                          <span className="font-medium">{platform.revenue}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="royalties">
          <Card>
            <CardHeader>
              <CardTitle>Royalty Breakdown</CardTitle>
              <CardDescription>Track your earnings across different revenue streams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">$234.56</p>
                        <p className="text-sm text-slate-500">Streaming Royalties</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">$87.32</p>
                        <p className="text-sm text-slate-500">Performance Royalties</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">$20.30</p>
                        <p className="text-sm text-slate-500">Sync Licensing</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Detailed insights into your music performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 text-slate-500">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                  <p>Analytics dashboard coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
