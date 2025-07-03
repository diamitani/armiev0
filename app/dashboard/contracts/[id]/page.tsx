"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Download,
  Edit,
  Share,
  FileText,
  Calendar,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Copy,
  Mail,
  Phone,
} from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"

// Mock contract data - in real app this would come from API
const mockContractData = {
  "1": {
    id: "1",
    title: "Artist Management Agreement - Sarah Johnson",
    type: "Management",
    status: "active",
    parties: ["Sarah Johnson", "Elite Music Management"],
    counterparty_name: "Sarah Johnson",
    counterparty_email: "sarah.johnson@email.com",
    counterparty_phone: "+1 (555) 123-4567",
    start_date: "2024-01-15",
    end_date: "2026-01-15",
    value: 50000,
    currency: "USD",
    created_at: "2024-01-10",
    last_modified: "2024-01-20",
    terms: `This Artist Management Agreement establishes a professional relationship between the Artist and Manager for career development and business representation.

MANAGEMENT SERVICES:
• Career planning and development
• Booking and scheduling performances
• Marketing and promotional activities
• Business negotiations and contract review
• Financial planning and budgeting assistance

COMMISSION STRUCTURE:
• 15% commission on all gross earnings
• Commission applies to recording, touring, merchandising, and endorsement income
• Manager entitled to commission for 6 months post-termination on deals secured during term

RESPONSIBILITIES:
Artist agrees to:
• Consult with Manager on all career decisions
• Provide Manager with complete financial information
• Give Manager authority to negotiate on Artist's behalf

Manager agrees to:
• Devote time and effort to Artist's career
• Act in Artist's best interests at all times
• Maintain confidentiality of Artist's personal and business affairs`,
    additional_terms: `TERMINATION:
Either party may terminate this agreement with 30 days written notice.

EXPENSES:
Manager may incur reasonable expenses on Artist's behalf with prior approval.

GOVERNING LAW:
This agreement shall be governed by the laws of [State/Province].`,
  },
  "2": {
    id: "2",
    title: "Recording Contract - The Midnight Band",
    type: "Recording",
    status: "pending",
    parties: ["The Midnight Band", "Sunset Records"],
    counterparty_name: "Sunset Records",
    counterparty_email: "contracts@sunsetrecords.com",
    counterparty_phone: "+1 (555) 987-6543",
    start_date: "2024-02-01",
    end_date: "2027-02-01",
    value: 150000,
    currency: "USD",
    created_at: "2024-01-15",
    last_modified: "2024-01-18",
    terms: `Recording agreement for the production and distribution of musical recordings.

RECORDING COMMITMENT:
• Minimum of 2 full-length albums during the term
• Each album to contain minimum 10 tracks
• Studio time and production costs covered by Label

ADVANCE AND ROYALTIES:
• $75,000 advance upon signing (recoupable)
• $75,000 advance upon delivery of first album (recoupable)
• 12% royalty rate on net receipts after recoupment
• 50/50 split on synchronization and licensing fees

CREATIVE CONTROL:
• Artist maintains creative control over musical content
• Label has approval rights over album artwork and marketing materials
• Artist has right to approve producer selection`,
    additional_terms: `MARKETING AND PROMOTION:
Label commits to minimum $50,000 marketing budget per album release.

TOUR SUPPORT:
Label may provide tour support up to $25,000 per tour (recoupable).`,
  },
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
    case "draft":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
    case "expired":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return <CheckCircle className="w-4 h-4" />
    case "pending":
      return <Clock className="w-4 h-4" />
    case "draft":
      return <Edit className="w-4 h-4" />
    case "expired":
      return <AlertTriangle className="w-4 h-4" />
    default:
      return <FileText className="w-4 h-4" />
  }
}

export default function ContractDetailPage() {
  const params = useParams()
  const router = useRouter()
  const contractId = params.id as string

  const [contract, setContract] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check mock data first
    if (mockContractData[contractId as keyof typeof mockContractData]) {
      setContract(mockContractData[contractId as keyof typeof mockContractData])
      setLoading(false)
      return
    }

    // Check localStorage for user-created contracts
    const storedContracts = localStorage.getItem("user_contracts")
    if (storedContracts) {
      const parsedContracts = JSON.parse(storedContracts)
      const foundContract = parsedContracts.find((c: any) => c.id === contractId)
      if (foundContract) {
        setContract(foundContract)
        setLoading(false)
        return
      }
    }

    // Contract not found
    setLoading(false)
  }, [contractId])

  const handleDownload = () => {
    if (!contract) return

    const content = `${contract.title}

${contract.terms}

${contract.additional_terms || ""}

Contract Details:
- Type: ${contract.type}
- Status: ${contract.status}
- Start Date: ${contract.start_date}
- End Date: ${contract.end_date || "N/A"}
- Value: ${contract.currency} ${contract.value || "N/A"}
- Parties: ${contract.parties?.join(", ") || `${contract.counterparty_name}`}
`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${contract.title}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Contract downloaded successfully!")
  }

  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    toast.success("Contract link copied to clipboard!")
  }

  const handleCopyTerms = () => {
    if (!contract) return
    const terms = `${contract.terms}\n\n${contract.additional_terms || ""}`
    navigator.clipboard.writeText(terms)
    toast.success("Contract terms copied to clipboard!")
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6 max-w-4xl">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!contract) {
    return (
      <div className="container mx-auto py-6 max-w-4xl">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Contracts
        </Button>

        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Contract Not Found</h3>
            <p className="text-muted-foreground mb-4">
              The contract you're looking for doesn't exist or may have been deleted.
            </p>
            <Button onClick={() => router.push("/dashboard/contracts")}>View All Contracts</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Contracts
        </Button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{contract.title}</h1>
            <div className="flex items-center gap-3">
              <Badge className={getStatusColor(contract.status)}>
                {getStatusIcon(contract.status)}
                <span className="ml-1 capitalize">{contract.status}</span>
              </Badge>
              <Badge variant="outline">{contract.type}</Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleShare}>
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </div>

      {/* Contract Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="terms" className="space-y-6">
            <TabsList>
              <TabsTrigger value="terms">Contract Terms</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="terms" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Contract Terms</CardTitle>
                    <Button variant="outline" size="sm" onClick={handleCopyTerms}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Terms
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap text-sm font-mono bg-muted p-4 rounded-lg">
                      {contract.terms}
                      {contract.additional_terms && (
                        <>
                          {"\n\n"}
                          {contract.additional_terms}
                        </>
                      )}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contract Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Contract Created</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(contract.created_at), "MMMM d, yyyy")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Contract Start Date</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(contract.start_date), "MMMM d, yyyy")}
                        </p>
                      </div>
                    </div>

                    {contract.end_date && (
                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">Contract End Date</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(contract.end_date), "MMMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Related Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No additional documents attached</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contract Info */}
          <Card>
            <CardHeader>
              <CardTitle>Contract Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(contract.start_date), "MMM d, yyyy")} -{" "}
                    {contract.end_date ? format(new Date(contract.end_date), "MMM d, yyyy") : "Ongoing"}
                  </p>
                </div>
              </div>

              {contract.value && (
                <div className="flex items-center gap-3">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Contract Value</p>
                    <p className="text-sm text-muted-foreground">
                      {contract.currency} {contract.value.toLocaleString()}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Last Modified</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(contract.last_modified), "MMM d, yyyy")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Counterparty Info */}
          <Card>
            <CardHeader>
              <CardTitle>Counterparty</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{contract.counterparty_name}</p>
                  <p className="text-sm text-muted-foreground">Counterparty</p>
                </div>
              </div>

              {contract.counterparty_email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{contract.counterparty_email}</p>
                  </div>
                </div>
              )}

              {contract.counterparty_phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{contract.counterparty_phone}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Edit className="w-4 h-4 mr-2" />
                Edit Contract
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleShare}>
                <Share className="w-4 h-4 mr-2" />
                Share Contract
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
