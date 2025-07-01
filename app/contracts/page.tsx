"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import {
  FileText,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Calendar,
  DollarSign,
  Users,
  Building,
  Crown,
  Sparkles,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface Contract {
  id: string
  title: string
  type: "distribution" | "publishing" | "performance" | "collaboration" | "licensing" | "management"
  status: "draft" | "pending" | "signed" | "expired"
  counterparty: string
  value?: number
  startDate: Date
  endDate?: Date
  createdDate: Date
  aiGenerated: boolean
}

export default function ContractsPage() {
  const { user } = useAuth()
  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: "1",
      title: "Digital Distribution Agreement",
      type: "distribution",
      status: "signed",
      counterparty: "TuneCore",
      value: 15000,
      startDate: new Date("2024-01-01"),
      endDate: new Date("2025-01-01"),
      createdDate: new Date("2023-12-15"),
      aiGenerated: true,
    },
    {
      id: "2",
      title: "Collaboration Agreement - Summer Dreams",
      type: "collaboration",
      status: "pending",
      counterparty: "Maya Rodriguez",
      startDate: new Date("2024-02-01"),
      createdDate: new Date("2024-01-20"),
      aiGenerated: true,
    },
    {
      id: "3",
      title: "Venue Performance Contract",
      type: "performance",
      status: "draft",
      counterparty: "The Blue Note",
      value: 2500,
      startDate: new Date("2024-03-15"),
      createdDate: new Date("2024-01-25"),
      aiGenerated: false,
    },
    {
      id: "4",
      title: "Publishing Deal - Catalog Rights",
      type: "publishing",
      status: "signed",
      counterparty: "Indie Music Publishing",
      value: 50000,
      startDate: new Date("2023-06-01"),
      endDate: new Date("2026-06-01"),
      createdDate: new Date("2023-05-10"),
      aiGenerated: true,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const isPremiumUser = user?.plan === "pro" || user?.plan === "enterprise"

  const getContractTypeIcon = (type: string) => {
    switch (type) {
      case "distribution":
        return Building
      case "publishing":
        return FileText
      case "performance":
        return Users
      case "collaboration":
        return Users
      case "licensing":
        return DollarSign
      case "management":
        return Building
      default:
        return FileText
    }
  }

  const getContractTypeColor = (type: string) => {
    switch (type) {
      case "distribution":
        return "bg-blue-100 text-blue-700"
      case "publishing":
        return "bg-purple-100 text-purple-700"
      case "performance":
        return "bg-green-100 text-green-700"
      case "collaboration":
        return "bg-orange-100 text-orange-700"
      case "licensing":
        return "bg-yellow-100 text-yellow-700"
      case "management":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "signed":
        return CheckCircle
      case "pending":
        return Clock
      case "draft":
        return Edit
      case "expired":
        return AlertCircle
      default:
        return FileText
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "signed":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "draft":
        return "bg-gray-100 text-gray-700"
      case "expired":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.counterparty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || contract.type === filterType
    const matchesStatus = filterStatus === "all" || contract.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const totalValue = contracts
    .filter((c) => c.status === "signed" && c.value)
    .reduce((sum, c) => sum + (c.value || 0), 0)

  const activeContracts = contracts.filter((c) => c.status === "signed").length
  const pendingContracts = contracts.filter((c) => c.status === "pending").length

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contracts</h1>
          <p className="text-muted-foreground">Manage your music industry agreements and legal documents</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge
            className={`${isPremiumUser ? "bg-gradient-to-r from-yellow-400 to-orange-500" : "bg-gray-500"} text-white`}
          >
            {isPremiumUser && <Crown className="w-3 h-3 mr-1" />}
            {user?.plan?.toUpperCase() || "FREE"}
          </Badge>
          <Link href="/contracts/wizard">
            <Button className="bg-armie-secondary text-armie-primary hover:bg-armie-secondary/80">
              <Plus className="w-4 h-4 mr-2" />
              Create Contract
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Contract Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-2xl font-bold">${totalValue.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-2xl font-bold">{activeContracts}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="text-2xl font-bold">{pendingContracts}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search contracts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="distribution">Distribution</SelectItem>
            <SelectItem value="publishing">Publishing</SelectItem>
            <SelectItem value="performance">Performance</SelectItem>
            <SelectItem value="collaboration">Collaboration</SelectItem>
            <SelectItem value="licensing">Licensing</SelectItem>
            <SelectItem value="management">Management</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="signed">Signed</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Contracts List */}
      <div className="space-y-4">
        {filteredContracts.map((contract) => {
          const TypeIcon = getContractTypeIcon(contract.type)
          const StatusIcon = getStatusIcon(contract.status)
          const isExpiringSoon =
            contract.endDate &&
            contract.endDate > new Date() &&
            contract.endDate < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

          return (
            <Card
              key={contract.id}
              className={`transition-all duration-200 hover:shadow-lg ${isExpiringSoon ? "border-orange-200 bg-orange-50/50" : ""}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div
                      className={`w-12 h-12 rounded-lg ${getContractTypeColor(contract.type)} flex items-center justify-center`}
                    >
                      <TypeIcon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">{contract.title}</h3>
                        {contract.aiGenerated && (
                          <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                            <Sparkles className="w-3 h-3 mr-1" />
                            AI Generated
                          </Badge>
                        )}
                        {isExpiringSoon && (
                          <Badge className="text-xs bg-orange-100 text-orange-700">Expires Soon</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-3">
                        <strong>Counterparty:</strong> {contract.counterparty}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {contract.startDate.toLocaleDateString()}
                          {contract.endDate && ` - ${contract.endDate.toLocaleDateString()}`}
                        </div>
                        {contract.value && (
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />${contract.value.toLocaleString()}
                          </div>
                        )}
                        <Badge className={`text-xs ${getContractTypeColor(contract.type)}`}>{contract.type}</Badge>
                        <Badge className={`text-xs ${getStatusColor(contract.status)}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {contract.status}
                        </Badge>
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
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredContracts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No contracts found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || filterType !== "all" || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Create your first contract to get started with legal document management"}
            </p>
            <Link href="/contracts/wizard">
              <Button className="bg-armie-secondary text-armie-primary hover:bg-armie-secondary/80">
                <Plus className="w-4 h-4 mr-2" />
                Create Contract
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Premium CTA for Free Users */}
      {!isPremiumUser && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Unlock Advanced Contract Features</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get access to AI-powered contract generation, legal clause explanations, e-signature integration, and more
              with Pro.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Sparkles className="w-5 h-5 mr-2" />
              Upgrade to Pro
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
