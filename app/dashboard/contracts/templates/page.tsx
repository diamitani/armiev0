"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Users, Music, Building, Headphones, Camera, ArrowRight, Filter, Star } from "lucide-react"
import Link from "next/link"

const contractTemplates = [
  {
    id: "artist-management",
    title: "Artist Management Agreement",
    description: "Comprehensive agreement between artist and manager covering representation, duties, and compensation",
    category: "Management",
    complexity: "Advanced",
    icon: Users,
    popular: true,
    features: [
      "Commission structure",
      "Term and termination",
      "Manager duties and responsibilities",
      "Artist obligations",
      "Expense handling",
      "Territory and exclusivity",
    ],
    useCase: "When signing with a manager or management company",
  },
  {
    id: "recording-contract",
    title: "Recording Contract",
    description: "Agreement between artist and record label for recording and distribution of music",
    category: "Recording",
    complexity: "Advanced",
    icon: Music,
    popular: true,
    features: [
      "Advance payments",
      "Royalty rates",
      "Album delivery requirements",
      "Marketing commitments",
      "Rights and ownership",
      "Recoupment terms",
    ],
    useCase: "When signing with a record label",
  },
  {
    id: "publishing-deal",
    title: "Music Publishing Agreement",
    description: "Contract for publishing rights, royalties, and administration of musical compositions",
    category: "Publishing",
    complexity: "Advanced",
    icon: FileText,
    popular: false,
    features: [
      "Publishing splits",
      "Administration rights",
      "Sync licensing",
      "Performance royalties",
      "Mechanical rights",
      "Territory coverage",
    ],
    useCase: "When working with a music publisher",
  },
  {
    id: "distribution-agreement",
    title: "Distribution Agreement",
    description: "Contract for digital and physical distribution of recorded music",
    category: "Distribution",
    complexity: "Intermediate",
    icon: Building,
    popular: false,
    features: [
      "Distribution channels",
      "Revenue splits",
      "Marketing support",
      "Reporting requirements",
      "Territory rights",
      "Minimum guarantees",
    ],
    useCase: "When working with a distributor",
  },
  {
    id: "producer-agreement",
    title: "Producer Agreement",
    description: "Contract between artist and producer for recording services and royalty splits",
    category: "Production",
    complexity: "Intermediate",
    icon: Headphones,
    popular: true,
    features: [
      "Producer fees",
      "Royalty points",
      "Credit requirements",
      "Delivery specifications",
      "Ownership of masters",
      "Additional services",
    ],
    useCase: "When hiring a producer for recordings",
  },
  {
    id: "collaboration-agreement",
    title: "Artist Collaboration Agreement",
    description: "Agreement between multiple artists for joint creative projects and revenue sharing",
    category: "Collaboration",
    complexity: "Beginner",
    icon: Users,
    popular: false,
    features: [
      "Creative contributions",
      "Revenue sharing",
      "Credit allocation",
      "Decision making",
      "Ownership rights",
      "Future use rights",
    ],
    useCase: "When collaborating with other artists",
  },
  {
    id: "sync-license",
    title: "Sync Licensing Agreement",
    description: "License for use of music in film, TV, commercials, and other media",
    category: "Licensing",
    complexity: "Intermediate",
    icon: Camera,
    popular: false,
    features: [
      "Usage rights",
      "Territory and term",
      "Fee structure",
      "Credit requirements",
      "Exclusivity terms",
      "Approval rights",
    ],
    useCase: "When licensing music for media use",
  },
  {
    id: "band-partnership",
    title: "Band Partnership Agreement",
    description: "Agreement between band members covering responsibilities, revenue, and decision-making",
    category: "Partnership",
    complexity: "Intermediate",
    icon: Users,
    popular: false,
    features: [
      "Member roles",
      "Revenue splits",
      "Decision making process",
      "Leaving member provisions",
      "Band name ownership",
      "Equipment and assets",
    ],
    useCase: "When forming or formalizing a band",
  },
]

const categories = [
  "All",
  "Management",
  "Recording",
  "Publishing",
  "Distribution",
  "Production",
  "Collaboration",
  "Licensing",
  "Partnership",
]
const complexityLevels = ["All", "Beginner", "Intermediate", "Advanced"]

export default function ContractTemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedComplexity, setSelectedComplexity] = useState("All")

  const filteredTemplates = contractTemplates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory
    const matchesComplexity = selectedComplexity === "All" || template.complexity === selectedComplexity
    return matchesSearch && matchesCategory && matchesComplexity
  })

  const popularTemplates = filteredTemplates.filter((t) => t.popular)
  const otherTemplates = filteredTemplates.filter((t) => !t.popular)

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Contract Templates</h1>
            <p className="text-muted-foreground">Professional music industry contract templates</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search contract templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm bg-background"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Complexity:</span>
              <select
                value={selectedComplexity}
                onChange={(e) => setSelectedComplexity(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm bg-background"
              >
                {complexityLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Templates */}
      {popularTemplates.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <h2 className="text-2xl font-semibold">Popular Templates</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {popularTemplates.map((template) => {
              const IconComponent = template.icon
              return (
                <Card key={template.id} className="group hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{template.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {template.category}
                            </Badge>
                            <Badge className={`text-xs ${getComplexityColor(template.complexity)}`}>
                              {template.complexity}
                            </Badge>
                            {template.popular && (
                              <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                                <Star className="w-3 h-3 mr-1" />
                                Popular
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="mt-2">{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Key Features:</p>
                      <div className="grid grid-cols-2 gap-1">
                        {template.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="text-xs text-muted-foreground flex items-center">
                            <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      {template.features.length > 4 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          +{template.features.length - 4} more features
                        </p>
                      )}
                    </div>

                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Best for:</p>
                      <p className="text-sm">{template.useCase}</p>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/dashboard/contracts/${template.id}`} className="flex-1">
                        <Button variant="outline" className="w-full bg-transparent">
                          <FileText className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </Link>
                      <Link href={`/dashboard/contracts/wizard?template=${template.id}`} className="flex-1">
                        <Button className="w-full">
                          Use Template
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Other Templates */}
      {otherTemplates.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">All Templates</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {otherTemplates.map((template) => {
              const IconComponent = template.icon
              return (
                <Card key={template.id} className="group hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{template.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {template.category}
                            </Badge>
                            <Badge className={`text-xs ${getComplexityColor(template.complexity)}`}>
                              {template.complexity}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="mt-2">{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Key Features:</p>
                      <div className="grid grid-cols-2 gap-1">
                        {template.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="text-xs text-muted-foreground flex items-center">
                            <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Best for:</p>
                      <p className="text-sm">{template.useCase}</p>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/dashboard/contracts/${template.id}`} className="flex-1">
                        <Button variant="outline" className="w-full bg-transparent">
                          <FileText className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </Link>
                      <Link href={`/dashboard/contracts/wizard?template=${template.id}`} className="flex-1">
                        <Button className="w-full">
                          Use Template
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No templates found</h3>
            <p className="text-muted-foreground text-center">Try adjusting your search terms or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
