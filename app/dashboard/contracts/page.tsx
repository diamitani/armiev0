"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Star,
  Download,
  Edit,
  Trash2,
  Eye,
  Calendar,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

export default function ContractsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  // Mock data for contracts
  const contracts = [
    {
      id: 1,
      title: "Record Deal - Sunset Records",
      type: "Record Deal",
      status: "active",
      parties: ["John Artist", "Sunset Records LLC"],
      value: "$50,000",
      startDate: "2024-01-15",
      endDate: "2026-01-15",
      lastModified: "2024-01-10",
      favorite: true,
    },
    {
      id: 2,
      title: "Collaboration Agreement - Sarah M.",
      type: "Collaboration",
      status: "pending",
      parties: ["John Artist", "Sarah Martinez"],
      value: "Revenue Split",
      startDate: "2024-02-01",
      endDate: "2024-12-31",
      lastModified: "2024-01-08",
      favorite: false,
    },
    {
      id: 3,
      title: "Venue Performance - Blue Moon",
      type: "Performance",
      status: "completed",
      parties: ["John Artist", "Blue Moon Venue"],
      value: "$2,500",
      startDate: "2023-12-15",
      endDate: "2023-12-15",
      lastModified: "2023-12-10",
      favorite: false,
    },
    {
      id: 4,
      title: "Producer Agreement - Beat Maker Pro",
      type: "Producer",
      status: "draft",
      parties: ["John Artist", "Beat Maker Pro"],
      value: "$5,000",
      startDate: "2024-02-15",
      endDate: "2024-08-15",
      lastModified: "2024-01-05",
      favorite: true,
    },
    {
      id: 5,
      title: "Distribution Deal - Digital Streams",
      type: "Distribution",
      status: "active",
      parties: ["John Artist", "Digital Streams Inc"],
      value: "15% Commission",
      startDate: "2023-06-01",
      endDate: "2025-06-01",
      lastModified: "2023-05-28",
      favorite: false,
    },
  ]

  const contractTemplates = [
    {
      id: 1,
      name: "Record Deal Agreement",
      description: "Comprehensive record label contract template",
      category: "Record Deals",
      complexity: "Advanced",
      estimatedTime: "45 min",
    },
    {
      id: 2,
      name: "Artist Collaboration",
      description: "Agreement for artist-to-artist collaborations",
      category: "Collaborations",
      complexity: "Intermediate",
      estimatedTime: "20 min",
    },
    {
      id: 3,
      name: "Performance Contract",
      description: "Live performance and venue agreement",
      category: "Performances",
      complexity: "Basic",
      estimatedTime: "15 min",
    },
    {
      id: 4,
      name: "Producer Agreement",
      description: "Music production and beat licensing contract",
      category: "Production",
      complexity: "Intermediate",
      estimatedTime: "30 min",
    },
    {
      id: 5,
      name: "Distribution Deal",
      description: "Music distribution and streaming agreement",
      category: "Distribution",
      complexity: "Advanced",
      estimatedTime: "40 min",
    },
    {
      id: 6,
      name: "Management Contract",
      description: "Artist management and representation agreement",
      category: "Management",
      complexity: "Advanced",
      estimatedTime: "50 min",
    },
    {
      id: 7,
      name: "Sync Licensing",
      description: "Music synchronization for media projects",
      category: "Licensing",
      complexity: "Intermediate",
      estimatedTime: "25 min",
    },
    {
      id: 8,
      name: "Band Partnership",
      description: "Band member partnership and revenue sharing",
      category: "Partnerships",
      complexity: "Intermediate",
      estimatedTime: "35 min",
    },
    {
      id: 9,
      name: "Booking Agent Agreement",
      description: "Live performance booking representation",
      category: "Representation",
      complexity: "Basic",
      estimatedTime: "20 min",
    },
    {
      id: 10,
      name: "Merchandise Deal",
      description: "Artist merchandise production and sales",
      category: "Merchandise",
      complexity: "Basic",
      estimatedTime: "15 min",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "draft":
        return <Edit className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Basic":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === "all" || contract.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Contracts Hub</h1>
          <p className="text-gray-600">Manage your music industry contracts and agreements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/contracts/templates">
              <FileText className="w-4 h-4 mr-2" />
              Browse Templates
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/contracts/wizard">
              <Plus className="w-4 h-4 mr-2" />
              Create Contract
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Contracts</p>
                <p className="text-2xl font-bold">{contracts.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Deals</p>
                <p className="text-2xl font-bold">{contracts.filter((c) => c.status === "active").length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold">{contracts.filter((c) => c.status === "pending").length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">$57.5K</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="contracts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="contracts">My Contracts</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search contracts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter: {selectedFilter === "all" ? "All" : selectedFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedFilter("all")}>All Contracts</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedFilter("active")}>Active</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter("pending")}>Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter("completed")}>Completed</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter("draft")}>Draft</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Contracts List */}
          <div className="space-y-4">
            {filteredContracts.map((contract) => (
              <Card key={contract.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{contract.title}</h3>
                        {contract.favorite && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
                        <Badge className={getStatusColor(contract.status)}>
                          {getStatusIcon(contract.status)}
                          <span className="ml-1 capitalize">{contract.status}</span>
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span>{contract.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{contract.parties.length} parties</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{contract.value}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(contract.startDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="text-sm text-gray-500">Parties: {contract.parties.join(", ")}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Last modified: {new Date(contract.lastModified).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/contracts/${contract.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Contract
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star className="w-4 h-4 mr-2" />
                          {contract.favorite ? "Remove from Favorites" : "Add to Favorites"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Contract
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredContracts.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No contracts found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery || selectedFilter !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "Get started by creating your first contract."}
                </p>
                <Button asChild>
                  <Link href="/dashboard/contracts/wizard">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Contract
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contractTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription className="mt-1">{template.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Category:</span>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Complexity:</span>
                      <Badge className={getComplexityColor(template.complexity)}>{template.complexity}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Est. Time:</span>
                      <span className="text-gray-900">{template.estimatedTime}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" asChild>
                    <Link href={`/dashboard/contracts/wizard?template=${template.id}`}>Use This Template</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
