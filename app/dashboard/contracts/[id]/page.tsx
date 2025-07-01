"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Download,
  Share2,
  Edit,
  FileText,
  Calendar,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Star,
  Copy,
  Archive,
  Trash2,
  Eye,
  Clock,
  Building,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock contract data - in real app this would come from API/database
const contractsData: Record<string, any> = {
  "1": {
    id: "1",
    title: "Digital Distribution Agreement",
    description: "Comprehensive digital distribution contract for streaming platforms",
    category: "Distribution",
    complexity: "High",
    pages: 8,
    lastUpdated: "2024-01-15",
    status: "signed",
    counterparty: "TuneCore",
    value: 15000,
    startDate: "2024-01-01",
    endDate: "2025-01-01",
    tags: ["distribution", "digital", "streaming"],
    favorite: true,
    keyTerms: [
      "Exclusive distribution rights for digital platforms",
      "Revenue sharing: 85% artist, 15% distributor",
      "Monthly payment schedule",
      "Worldwide distribution territory",
      "Automatic renewal clause",
      "Termination with 90-day notice",
    ],
    prosAndCons: {
      pros: [
        "High revenue share percentage for artist",
        "Comprehensive global distribution network",
        "Monthly payment schedule ensures regular income",
        "Includes playlist pitching services",
        "Detailed analytics and reporting provided",
      ],
      cons: [
        "Exclusive arrangement limits other distribution options",
        "Long-term commitment with automatic renewal",
        "Distributor retains some promotional control",
        "Complex termination process",
      ],
    },
    content: `DIGITAL DISTRIBUTION AGREEMENT

This Digital Distribution Agreement ("Agreement") is entered into on January 1, 2024, between:

ARTIST:
Name: Alex Rivera
Address: 123 Music Lane, Los Angeles, CA 90210
Email: alex@alexrivera.com

DISTRIBUTOR:
Name: TuneCore Distribution Services
Address: 456 Industry Blvd, Nashville, TN 37203
Email: contracts@tunecore.com

RECITALS:
WHEREAS, Artist has created and owns certain musical recordings;
WHEREAS, Distributor operates a digital distribution platform;
WHEREAS, Artist desires to distribute recordings through Distributor's platform;

NOW, THEREFORE, the parties agree as follows:

1. GRANT OF RIGHTS
Artist grants Distributor the exclusive right to distribute, market, and promote the Recordings through digital platforms worldwide.

2. TERRITORY
The territory covered by this Agreement includes all countries and territories worldwide.

3. TERM
This Agreement shall commence on January 1, 2024, and continue for one (1) year, with automatic renewal unless terminated.

4. REVENUE SHARING
Net revenues shall be split as follows:
- Artist: 85%
- Distributor: 15%

5. PAYMENT TERMS
Payments shall be made monthly, within 30 days of the end of each calendar month.

[Contract continues with full legal text...]`,
  },
  "dj-wedding": {
    id: "dj-wedding",
    title: "DJ Services - Wedding Event",
    description: "Professional DJ services contract for wedding celebration",
    category: "Performance",
    complexity: "Medium",
    pages: 4,
    lastUpdated: "2024-01-28",
    status: "signed",
    counterparty: "Johnson Wedding",
    value: 1200,
    startDate: "2024-02-14",
    endDate: "2024-02-14",
    tags: ["dj", "wedding", "event"],
    favorite: false,
    keyTerms: [
      "4-hour DJ performance including ceremony and reception",
      "Professional sound system and microphone setup",
      "Music selection coordination with couple",
      "MC services for announcements",
      "Setup 2 hours before event start",
      "Backup equipment included",
    ],
    prosAndCons: {
      pros: [
        "Comprehensive DJ and MC services included",
        "Professional equipment with backup systems",
        "Flexible music selection process",
        "Experienced wedding entertainment provider",
      ],
      cons: [
        "Limited to 4-hour performance window",
        "Additional overtime charges apply",
        "Weather contingency for outdoor portions",
      ],
    },
    content: `DJ SERVICES AGREEMENT

State of California

BACKGROUND:
This DJ Services Agreement (the "Agreement") is made by and between the following Client (the "Client"):
Johnson Wedding Party (Sarah & Michael Johnson)
of
789 Celebration Ave, San Diego, CA 92101

and the following DJ services provider (the "DJ"):
Alex Rivera Professional DJ Services
of
123 Music Lane, Los Angeles, CA 90210

THEREFORE, in consideration of the mutual promises set forth below, the Parties agree as follows:

I. DESCRIPTION OF SERVICES.
1. On February 14, 2024 at The Grand Ballroom, Alex Rivera will provide to Johnson Wedding the following DJ services:
- Wedding ceremony music and sound system
- Cocktail hour background music
- Reception DJ services including dancing and announcements
- Professional MC services for introductions and special moments

2. DJ will work a total of 4 hours on the day they provide DJ services.

[Contract continues with full legal text...]`,
  },
}

export default function ContractDetailPage() {
  const params = useParams()
  const contractId = params.id as string
  const [activeTab, setActiveTab] = useState("preview")
  const [isFavorite, setIsFavorite] = useState(false)

  const contract = contractsData[contractId]

  if (!contract) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Contract not found</h3>
        <p className="text-gray-600 mb-4">The contract you're looking for doesn't exist</p>
        <Link href="/dashboard/contracts">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Contracts
          </Button>
        </Link>
      </div>
    )
  }

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "signed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "draft":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
      case "expired":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6">
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
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{contract.title}</h1>
            <Button variant="ghost" size="sm" onClick={toggleFavorite} className="p-2">
              <Star
                className={`w-5 h-5 ${isFavorite || contract.favorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
              />
            </Button>
          </div>
          <p className="text-muted-foreground">{contract.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button variant="outline">
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      {/* Contract Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-5">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{contract.pages} Pages</p>
                <p className="text-xs text-muted-foreground">Document length</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getComplexityColor(contract.complexity)}>{contract.complexity}</Badge>
              <div>
                <p className="text-sm font-medium">Complexity</p>
                <p className="text-xs text-muted-foreground">Legal complexity</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{contract.category}</p>
                <p className="text-xs text-muted-foreground">Contract type</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(contract.status)}>
                {contract.status === "signed" && <CheckCircle className="w-3 h-3 mr-1" />}
                {contract.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                {contract.status}
              </Badge>
              <div>
                <p className="text-sm font-medium">Status</p>
                <p className="text-xs text-muted-foreground">Current state</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Updated {contract.lastUpdated}</p>
                <p className="text-xs text-muted-foreground">Last revision</p>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Counterparty</p>
                <p className="text-xs text-muted-foreground">{contract.counterparty}</p>
              </div>
            </div>
            {contract.value && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">${contract.value.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Contract value</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">
                  {contract.startDate}
                  {contract.endDate && contract.endDate !== contract.startDate && ` - ${contract.endDate}`}
                </p>
                <p className="text-xs text-muted-foreground">Contract period</p>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-wrap gap-2">
            {contract.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            Analysis
          </TabsTrigger>
          <TabsTrigger value="edit" className="flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Edit
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contract Preview</CardTitle>
              <CardDescription>Full contract text with fillable fields highlighted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">{contract.content}</pre>
              </div>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Contract Information</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      This contract has been reviewed and is ready for execution. All parties should review the terms
                      carefully before signing.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Advantages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {contract.prosAndCons.pros.map((pro: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{pro}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  Considerations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {contract.prosAndCons.cons.map((con: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{con}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Terms & Clauses</CardTitle>
              <CardDescription>Important elements covered in this contract</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {contract.keyTerms.map((term: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span className="text-sm">{term}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Edit Contract</CardTitle>
              <CardDescription>Make changes to this contract</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-8">
                <Edit className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Contract Editor</h3>
                <p className="text-muted-foreground mb-6">
                  Use our advanced contract editor to make changes to this document.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Edit className="mr-2 h-4 w-4" />
                    Open Editor
                  </Button>
                  <Button variant="outline">
                    <Copy className="mr-2 h-4 w-4" />
                    Create Copy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contract History</CardTitle>
              <CardDescription>Track changes and versions of this contract</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-2 h-2 bg-green-600 rounded-full" />
                  <div className="flex-1">
                    <p className="font-medium">Contract Signed</p>
                    <p className="text-sm text-muted-foreground">Final version executed by all parties</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{contract.startDate}</span>
                </div>
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  <div className="flex-1">
                    <p className="font-medium">Contract Updated</p>
                    <p className="text-sm text-muted-foreground">Payment terms revised</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{contract.lastUpdated}</span>
                </div>
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full" />
                  <div className="flex-1">
                    <p className="font-medium">Contract Created</p>
                    <p className="text-sm text-muted-foreground">Initial draft generated</p>
                  </div>
                  <span className="text-sm text-muted-foreground">2024-01-10</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Contract Actions</h3>
              <p className="text-sm text-muted-foreground">Manage this contract</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Archive className="w-4 h-4 mr-2" />
                Archive
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legal Disclaimer */}
      <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">!</span>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">Legal Disclaimer</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                This contract template is provided for informational purposes only and does not constitute legal advice.
                Always consult with a qualified attorney before using any legal document. ARMIE is not responsible for
                any legal issues arising from the use of this template.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
