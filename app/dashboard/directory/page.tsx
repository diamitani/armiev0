"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth-provider"
import {
  Users,
  Plus,
  Search,
  Mail,
  MapPin,
  Building,
  Crown,
  Sparkles,
  Star,
  MessageSquare,
  Calendar,
  MoreVertical,
  Heart,
  Share2,
  Eye,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Contact {
  id: string
  name: string
  title: string
  company: string
  role: "label" | "manager" | "agent" | "producer" | "venue" | "media" | "artist" | "other"
  location: string
  email?: string
  phone?: string
  website?: string
  socialMedia?: {
    instagram?: string
    twitter?: string
    linkedin?: string
  }
  rating: number
  tags: string[]
  lastContact?: Date
  notes?: string
  connectionStrength: "weak" | "medium" | "strong"
  verified: boolean
}

export default function DirectoryHubPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("contacts")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterLocation, setFilterLocation] = useState("all")

  const isPremiumUser = user?.plan === "pro" || user?.plan === "enterprise"

  const contacts: Contact[] = [
    {
      id: "1",
      name: "Sarah Chen",
      title: "A&R Representative",
      company: "Atlantic Records",
      role: "label",
      location: "Los Angeles, CA",
      email: "s.chen@atlantic.com",
      phone: "+1 (555) 123-4567",
      website: "atlanticrecords.com",
      socialMedia: {
        linkedin: "sarah-chen-ar",
        twitter: "sarahchen_ar",
      },
      rating: 5,
      tags: ["Pop", "R&B", "Major Label", "West Coast"],
      lastContact: new Date("2024-01-15"),
      notes: "Met at MIDEM 2024. Very interested in R&B artists. Follow up on new releases.",
      connectionStrength: "strong",
      verified: true,
    },
    {
      id: "2",
      name: "Marcus Rodriguez",
      title: "Music Producer",
      company: "Soundwave Studios",
      role: "producer",
      location: "Nashville, TN",
      email: "marcus@soundwavestudios.com",
      rating: 4,
      tags: ["Hip-Hop", "R&B", "Producer", "Studio Owner"],
      lastContact: new Date("2024-01-10"),
      connectionStrength: "medium",
      verified: true,
    },
    {
      id: "3",
      name: "Emma Thompson",
      title: "Talent Manager",
      company: "Stellar Management",
      role: "manager",
      location: "New York, NY",
      email: "emma@stellarmanagement.com",
      phone: "+1 (555) 987-6543",
      rating: 5,
      tags: ["Management", "Indie Artists", "East Coast"],
      connectionStrength: "strong",
      verified: true,
    },
    {
      id: "4",
      name: "David Kim",
      title: "Booking Agent",
      company: "Live Nation",
      role: "agent",
      location: "Chicago, IL",
      email: "d.kim@livenation.com",
      rating: 4,
      tags: ["Booking", "Tours", "Major Venues"],
      lastContact: new Date("2024-01-08"),
      connectionStrength: "medium",
      verified: true,
    },
    {
      id: "5",
      name: "Lisa Park",
      title: "Music Journalist",
      company: "Rolling Stone",
      role: "media",
      location: "Los Angeles, CA",
      email: "l.park@rollingstone.com",
      rating: 4,
      tags: ["Press", "Reviews", "Interviews"],
      connectionStrength: "weak",
      verified: true,
    },
    {
      id: "6",
      name: "Alex Rivera",
      title: "Independent Artist",
      company: "Self-Managed",
      role: "artist",
      location: "Miami, FL",
      rating: 3,
      tags: ["Collaboration", "Latin Pop", "Independent"],
      connectionStrength: "medium",
      verified: false,
    },
  ]

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "label":
        return Building
      case "manager":
        return Users
      case "agent":
        return Calendar
      case "producer":
        return Star
      case "venue":
        return MapPin
      case "media":
        return MessageSquare
      case "artist":
        return Users
      default:
        return Users
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "label":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
      case "manager":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      case "agent":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
      case "producer":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
      case "venue":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
      case "media":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "artist":
        return "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const getConnectionColor = (strength: string) => {
    switch (strength) {
      case "strong":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "weak":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || contact.role === filterRole
    const matchesLocation = filterLocation === "all" || contact.location.includes(filterLocation)
    return matchesSearch && matchesRole && matchesLocation
  })

  const totalContacts = contacts.length
  const verifiedContacts = contacts.filter((c) => c.verified).length
  const strongConnections = contacts.filter((c) => c.connectionStrength === "strong").length
  const recentContacts = contacts.filter(
    (c) => c.lastContact && c.lastContact > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  ).length

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Users className="h-8 w-8 text-purple-600" />
            Directory Hub
          </h1>
          <p className="text-muted-foreground">Build and manage your music industry network</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge
            className={`${isPremiumUser ? "bg-gradient-to-r from-yellow-400 to-orange-500" : "bg-gray-500"} text-white`}
          >
            {isPremiumUser && <Crown className="w-3 h-3 mr-1" />}
            {user?.plan?.toUpperCase() || "FREE"}
          </Badge>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Total Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{totalContacts}</div>
            <p className="text-xs text-muted-foreground">Industry professionals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Star className="w-4 h-4 mr-2" />
              Verified Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{verifiedContacts}</div>
            <p className="text-xs text-muted-foreground">Confirmed professionals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Heart className="w-4 h-4 mr-2" />
              Strong Connections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{strongConnections}</div>
            <p className="text-xs text-muted-foreground">Close relationships</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{recentContacts}</div>
            <p className="text-xs text-muted-foreground">Contacted this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contacts">My Network</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="label">Record Labels</SelectItem>
                <SelectItem value="manager">Managers</SelectItem>
                <SelectItem value="agent">Booking Agents</SelectItem>
                <SelectItem value="producer">Producers</SelectItem>
                <SelectItem value="venue">Venues</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="artist">Artists</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterLocation} onValueChange={setFilterLocation}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="Nashville">Nashville</SelectItem>
                <SelectItem value="Chicago">Chicago</SelectItem>
                <SelectItem value="Miami">Miami</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contacts Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredContacts.map((contact) => {
              const RoleIcon = getRoleIcon(contact.role)

              return (
                <Card key={contact.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={`/placeholder-user.jpg`} />
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            {contact.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-sm truncate">{contact.name}</h3>
                            {contact.verified && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{contact.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{contact.company}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="w-4 h-4 mr-2" />
                            Share Contact
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className={`text-xs ${getRoleColor(contact.role)}`}>
                          <RoleIcon className="w-3 h-3 mr-1" />
                          {contact.role}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${getConnectionColor(contact.connectionStrength)}`} />
                          <span className="text-xs text-muted-foreground capitalize">{contact.connectionStrength}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3 mr-1" />
                        {contact.location}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < contact.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        {contact.lastContact && (
                          <span className="text-xs text-muted-foreground">
                            {contact.lastContact.toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {contact.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {contact.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{contact.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        {contact.email && (
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Mail className="w-3 h-3 mr-1" />
                            Email
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="discover" className="space-y-6">
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Discover New Connections</h3>
              <p className="text-muted-foreground mb-6">
                Find and connect with music industry professionals based on your genre, location, and career goals.
              </p>
              {!isPremiumUser ? (
                <div className="space-y-4">
                  <Crown className="w-8 h-8 text-yellow-500 mx-auto" />
                  <p className="text-sm text-muted-foreground">
                    Upgrade to Pro to access our industry directory with over 10,000 verified professionals.
                  </p>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Upgrade to Pro
                  </Button>
                </div>
              ) : (
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Search className="w-4 h-4 mr-2" />
                  Browse Directory
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Premium CTA for Free Users */}
      {!isPremiumUser && (
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 dark:from-purple-950/20 dark:to-pink-950/20 dark:border-purple-800">
          <CardContent className="p-8 text-center">
            <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Unlock Advanced Networking Features</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get access to our verified industry directory, advanced search filters, contact management tools,
              automated follow-ups, and networking insights with Pro.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium">10K+ Professionals</p>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Verified Contacts</p>
              </div>
              <div className="text-center">
                <MessageSquare className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Direct Messaging</p>
              </div>
              <div className="text-center">
                <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Smart Reminders</p>
              </div>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600">
              <Sparkles className="w-5 h-5 mr-2" />
              Upgrade to Pro
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
