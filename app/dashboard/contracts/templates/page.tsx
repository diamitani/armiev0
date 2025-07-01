"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Search, Eye, Plus, Star, Filter, ArrowLeft } from "lucide-react"
import Link from "next/link"

const contractTemplates = [
  {
    id: "dj-services",
    title: "DJ Services Agreement",
    description:
      "Professional DJ services contract for events and performances with equipment, setup, and performance requirements",
    category: "Performance",
    complexity: "Medium",
    icon: "🎧",
    popular: true,
    downloads: 1247,
    rating: 4.8,
    lastUpdated: "2024-01-15",
    tags: ["dj", "events", "performance", "equipment"],
  },
  {
    id: "artist-influencer",
    title: "Artist Influencer Agreement",
    description: "Sponsorship agreement for brand partnerships and endorsements with FTC compliance guidelines",
    category: "Sponsorship",
    complexity: "Medium",
    icon: "📱",
    popular: true,
    downloads: 892,
    rating: 4.7,
    lastUpdated: "2024-01-12",
    tags: ["influencer", "sponsorship", "brand", "social media"],
  },
  {
    id: "music-production",
    title: "Music Production Agreement",
    description: "Comprehensive contract for music production services including studio work, mixing, and mastering",
    category: "Production",
    complexity: "High",
    icon: "🎵",
    popular: false,
    downloads: 634,
    rating: 4.9,
    lastUpdated: "2024-01-10",
    tags: ["production", "studio", "mixing", "mastering"],
  },
  {
    id: "venue-performance",
    title: "Venue Performance Contract",
    description: "Standard artist performance agreement for venues with technical requirements and hospitality",
    category: "Performance",
    complexity: "Medium",
    icon: "🎤",
    popular: true,
    downloads: 1156,
    rating: 4.6,
    lastUpdated: "2024-01-08",
    tags: ["venue", "performance", "live", "concert"],
  },
  {
    id: "sponsorship",
    title: "Sponsorship Agreement",
    description: "Comprehensive sponsorship deal template for events and artists with exclusivity options",
    category: "Sponsorship",
    complexity: "High",
    icon: "🤝",
    popular: false,
    downloads: 423,
    rating: 4.5,
    lastUpdated: "2024-01-05",
    tags: ["sponsorship", "events", "marketing", "brand"],
  },
  {
    id: "recording",
    title: "Artist Recording Contract",
    description: "Record label agreement for recording and distribution with royalty structures",
    category: "Recording",
    complexity: "High",
    icon: "💿",
    popular: true,
    downloads: 789,
    rating: 4.8,
    lastUpdated: "2024-01-03",
    tags: ["recording", "label", "royalties", "distribution"],
  },
  {
    id: "band-performance",
    title: "Band Performance Contract",
    description: "Contract template for band performances and live shows with member responsibilities",
    category: "Performance",
    complexity: "Medium",
    icon: "🎸",
    popular: false,
    downloads: 567,
    rating: 4.4,
    lastUpdated: "2023-12-28",
    tags: ["band", "performance", "live", "group"],
  },
  {
    id: "artist-agent",
    title: "Artist-Agent Agreement",
    description: "Representation agreement between artist and agent with commission structures",
    category: "Management",
    complexity: "High",
    icon: "👔",
    popular: false,
    downloads: 345,
    rating: 4.7,
    lastUpdated: "2023-12-25",
    tags: ["agent", "representation", "booking", "commission"],
  },
  {
    id: "artist-management",
    title: "Artist Management Agreement",
    description: "Comprehensive management contract for artist career development and representation",
    category: "Management",
    complexity: "High",
    icon: "📊",
    popular: true,
    downloads: 923,
    rating: 4.9,
    lastUpdated: "2023-12-20",
    tags: ["management", "career", "development", "representation"],
  },
  {
    id: "record-split",
    title: "Record Split Confirmation",
    description: "Simple agreement for splitting ownership and royalties on recordings between collaborators",
    category: "Rights",
    complexity: "Low",
    icon: "💰",
    popular: false,
    downloads: 1034,
    rating: 4.3,
    lastUpdated: "2023-12-15",
    tags: ["split", "royalties", "collaboration", "ownership"],
  },
]

export default function ContractTemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterComplexity, setFilterComplexity] = useState("all")
  const [sortBy, setSortBy] = useState("popular")

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const filteredTemplates = contractTemplates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = filterCategory === "all" || template.category === filterCategory
    const matchesComplexity = filterComplexity === "all" || template.complexity === filterComplexity
    return matchesSearch && matchesCategory && matchesComplexity
  })

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.downloads - a.downloads
      case "rating":
        return b.rating - a.rating
      case "recent":
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      case "title":
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  const categories = ["all", ...Array.from(new Set(contractTemplates.map((t) => t.category)))]
  const complexities = ["all", "Low", "Medium", "High"]

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/dashboard/contracts"
            className="flex items-center text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Contracts
          </Link>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <FileText className="h-8 w-8 text-blue-600" />
            Contract Templates
          </h1>
          <p className="text-muted-foreground">Professional contract templates for the music industry</p>
        </div>
        <Link href="/dashboard/contracts/wizard">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Custom Contract
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{contractTemplates.length}</div>
            <p className="text-sm text-muted-foreground">Total Templates</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{contractTemplates.filter((t) => t.popular).length}</div>
            <p className="text-sm text-muted-foreground">Popular Templates</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">{categories.length - 1}</div>
            <p className="text-sm text-muted-foreground">Categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">
              {contractTemplates.reduce((sum, t) => sum + t.downloads, 0).toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Total Downloads</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterComplexity} onValueChange={setFilterComplexity}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Complexity" />
          </SelectTrigger>
          <SelectContent>
            {complexities.map((complexity) => (
              <SelectItem key={complexity} value={complexity}>
                {complexity === "all" ? "All Levels" : complexity}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="title">Alphabetical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedTemplates.map((template) => (
          <Card key={template.id} className="transition-all duration-200 hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="text-3xl">{template.icon}</div>
                <div className="flex items-center gap-2">
                  {template.popular && (
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                  <Badge className={getComplexityColor(template.complexity)}>{template.complexity}</Badge>
                </div>
              </div>
              <CardTitle className="text-lg">{template.title}</CardTitle>
              <CardDescription className="text-sm">{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{template.downloads.toLocaleString()} downloads</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{template.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{template.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    Updated {new Date(template.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {template.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{template.tags.length - 3}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-1" />
                    Use Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sortedTemplates.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No templates found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter criteria to find the perfect contract template
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setFilterCategory("all")
                setFilterComplexity("all")
              }}
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
