"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  FileText,
  Download,
  Eye,
  Wand2,
  Music,
  Handshake,
  Mic,
  Users,
  Building,
  Star,
  Filter,
} from "lucide-react"
import Link from "next/link"

const contracts = [
  {
    id: "artist-influencer",
    title: "Artist Influencer Agreement",
    description: "Sponsorship agreement for brand partnerships and endorsements",
    category: "Sponsorship",
    complexity: "Medium",
    pages: 6,
    tags: ["sponsorship", "brand", "social media"],
    popular: true,
  },
  {
    id: "dj-services",
    title: "DJ Services Agreement",
    description: "Professional DJ contract for events and performances",
    category: "Performance",
    complexity: "Low",
    pages: 6,
    tags: ["dj", "event", "performance"],
    popular: true,
  },
  {
    id: "artist-performance",
    title: "Artist Performance Contract",
    description: "Comprehensive live performance agreement for venues",
    category: "Performance",
    complexity: "Medium",
    pages: 7,
    tags: ["live", "venue", "performance"],
    popular: false,
  },
  {
    id: "music-production",
    title: "Music Production Agreement",
    description: "Producer-artist contract for recording and production services",
    category: "Production",
    complexity: "High",
    pages: 7,
    tags: ["production", "recording", "studio"],
    popular: true,
  },
  {
    id: "sponsorship",
    title: "Sponsorship Agreement",
    description: "Event and brand sponsorship contract template",
    category: "Sponsorship",
    complexity: "High",
    pages: 9,
    tags: ["sponsorship", "event", "brand"],
    popular: false,
  },
  {
    id: "band-performance",
    title: "Band Performance Contract",
    description: "Simple band booking contract for gigs and shows",
    category: "Performance",
    complexity: "Low",
    pages: 2,
    tags: ["band", "booking", "gig"],
    popular: true,
  },
  {
    id: "record-split",
    title: "Record Split Confirmation",
    description: "Royalty and ownership split agreement for collaborations",
    category: "Recording",
    complexity: "Low",
    pages: 1,
    tags: ["royalties", "split", "collaboration"],
    popular: false,
  },
  {
    id: "artist-recording",
    title: "Artist Recording Contract",
    description: "Label recording agreement for artists and record companies",
    category: "Recording",
    complexity: "High",
    pages: 2,
    tags: ["label", "recording", "royalties"],
    popular: true,
  },
  {
    id: "artist-management",
    title: "Artist Management Agreement",
    description: "Comprehensive manager-artist relationship contract",
    category: "Management",
    complexity: "High",
    pages: 12,
    tags: ["management", "career", "representation"],
    popular: true,
  },
  {
    id: "artist-agent",
    title: "Artist-Agent Agreement",
    description: "Booking agent representation contract for artists",
    category: "Management",
    complexity: "Medium",
    pages: 6,
    tags: ["agent", "booking", "representation"],
    popular: false,
  },
]

const categories = ["All", "Performance", "Sponsorship", "Production", "Recording", "Management"]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Performance":
      return Mic
    case "Sponsorship":
      return Handshake
    case "Production":
      return Music
    case "Recording":
      return FileText
    case "Management":
      return Users
    default:
      return Building
  }
}

const getComplexityColor = (complexity: string) => {
  switch (complexity) {
    case "Low":
      return "bg-green-100 text-green-800"
    case "Medium":
      return "bg-yellow-100 text-yellow-800"
    case "High":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ContractsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || contract.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const popularContracts = contracts.filter((contract) => contract.popular)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <FileText className="h-8 w-8 text-purple-600" />
            Contracts
          </h1>
          <p className="text-muted-foreground">Professional legal templates for your music business</p>
        </div>
        <Link href="/contracts/wizard">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Wand2 className="mr-2 h-4 w-4" />
            Contract Wizard
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search contracts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              <Filter className="mr-1 h-3 w-3" />
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Popular Contracts */}
      {selectedCategory === "All" && searchTerm === "" && (
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Popular Contracts
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popularContracts.map((contract) => {
              const CategoryIcon = getCategoryIcon(contract.category)
              return (
                <Card key={contract.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CategoryIcon className="h-5 w-5 text-purple-600" />
                      <Badge className={getComplexityColor(contract.complexity)}>{contract.complexity}</Badge>
                    </div>
                    <CardTitle className="text-lg">{contract.title}</CardTitle>
                    <CardDescription>{contract.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span>{contract.pages} pages</span>
                      <span>{contract.category}</span>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/contracts/${contract.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="mr-1 h-3 w-3" />
                          Preview
                        </Button>
                      </Link>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        <Download className="mr-1 h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* All Contracts */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {selectedCategory === "All" ? "All Contracts" : `${selectedCategory} Contracts`}
          <span className="text-sm font-normal text-muted-foreground ml-2">({filteredContracts.length} contracts)</span>
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredContracts.map((contract) => {
            const CategoryIcon = getCategoryIcon(contract.category)
            return (
              <Card key={contract.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <CategoryIcon className="h-5 w-5 text-purple-600" />
                      {contract.popular && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                    </div>
                    <Badge className={getComplexityColor(contract.complexity)}>{contract.complexity}</Badge>
                  </div>
                  <CardTitle className="text-lg">{contract.title}</CardTitle>
                  <CardDescription>{contract.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <span>{contract.pages} pages</span>
                    <span>{contract.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {contract.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/contracts/${contract.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="mr-1 h-3 w-3" />
                        Preview
                      </Button>
                    </Link>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <Download className="mr-1 h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {filteredContracts.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No contracts found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search terms or filters</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("All")
            }}
          >
            Clear filters
          </Button>
        </div>
      )}

      {/* Legal Disclaimer */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">!</span>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-1">Legal Disclaimer</h4>
              <p className="text-sm text-yellow-700">
                These contract templates are provided for informational purposes only and do not constitute legal
                advice. Always consult with a qualified attorney before using any legal document. ARMIE is not
                responsible for any legal issues arising from the use of these templates.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
