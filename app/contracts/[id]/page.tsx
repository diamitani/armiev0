"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Download,
  Share2,
  Wand2,
  FileText,
  Calendar,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Edit,
} from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"

// Mock contract data - in real app this would come from API/database
const contractsData: Record<string, any> = {
  "artist-management": {
    id: "artist-management",
    title: "Artist Management Agreement Template",
    description:
      "Comprehensive agreement between artist and manager covering representation, commission, and responsibilities",
    category: "Management",
    complexity: "Medium",
    pages: 8,
    lastUpdated: "2024-01-15",
    tags: ["management", "representation", "commission"],
    keyTerms: [
      "Management commission rate (typically 15-20%)",
      "Contract duration and renewal terms",
      "Scope of management services",
      "Artist and manager responsibilities",
      "Termination clauses and conditions",
      "Expense handling and reimbursement",
    ],
    prosAndCons: {
      pros: [
        "Clear commission structure and payment terms",
        "Comprehensive scope of management services",
        "Standard industry termination clauses",
        "Balanced rights and responsibilities for both parties",
      ],
      cons: [
        "May require customization for specific career stages",
        "Commission rates may vary based on artist level",
        "Complex termination procedures in some cases",
      ],
    },
    content: `ARTIST MANAGEMENT AGREEMENT

This Artist Management Agreement ("Agreement") is entered into on ________ ("Effective Date") between:

ARTIST: ________ ("Artist")
Address: ________
Email: ________

MANAGER: ________ ("Manager") 
Address: ________
Email: ________

RECITALS:
WHEREAS, Artist is a professional recording and performing artist;
WHEREAS, Manager desires to provide management services to Artist;
WHEREAS, Artist desires to engage Manager's services;

NOW, THEREFORE, the parties agree as follows:

1. ENGAGEMENT
Artist hereby engages Manager as Artist's sole and exclusive personal manager for the Term of this Agreement.

2. MANAGER'S SERVICES
Manager agrees to provide the following services:
- Career guidance and strategic planning
- Booking and scheduling performances
- Negotiating contracts and agreements
- Coordinating with record labels, publishers, and other industry professionals
- Marketing and promotional activities
- Financial oversight and budgeting assistance

3. COMMISSION
Manager shall receive ____% of Artist's Gross Income as commission for services rendered.

4. TERM
This Agreement shall commence on the Effective Date and continue for a period of ____ years.

5. EXPENSES
Manager may incur reasonable expenses on Artist's behalf, subject to prior approval for expenses exceeding $____.

6. TERMINATION
Either party may terminate this Agreement upon ____ days written notice.

[Additional terms and conditions would continue...]

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

ARTIST: ________________    MANAGER: ________________
Signature                   Signature

Print Name: ____________    Print Name: ____________
Date: _________________    Date: _________________`,
  },
  "recording-contract": {
    id: "recording-contract",
    title: "Recording Contract Template",
    description: "Professional recording agreement between artist and record label",
    category: "Recording",
    complexity: "High",
    pages: 12,
    lastUpdated: "2024-01-20",
    tags: ["recording", "label", "royalties", "advance"],
    keyTerms: [
      "Recording advance and recoupment terms",
      "Royalty rates and calculation methods",
      "Album delivery requirements",
      "Marketing and promotion commitments",
      "Rights ownership and licensing",
      "Territory and distribution scope",
    ],
    prosAndCons: {
      pros: [
        "Professional industry-standard terms",
        "Clear royalty calculation methods",
        "Comprehensive rights and obligations",
        "Built-in marketing and promotion clauses",
      ],
      cons: [
        "Complex recoupment structures",
        "May favor label over artist in some areas",
        "Requires careful negotiation of key terms",
      ],
    },
    content: `RECORDING AGREEMENT

This Recording Agreement ("Agreement") is made on ________ between:

ARTIST: ________ ("Artist")
LABEL: ________ ("Company")

1. RECORDING COMMITMENT
Artist agrees to record and deliver ____ (___) albums during the Term.

2. ADVANCES
Company will pay Artist a recording advance of $________ per album.

3. ROYALTIES
Artist will receive ____% of net receipts from sales of recordings.

4. TERM
Initial term of ____ years with options for additional periods.

[Contract continues with detailed terms...]`,
  },
  "publishing-deal": {
    id: "publishing-deal",
    title: "Music Publishing Agreement Template",
    description: "Contract for publishing rights and royalty collection",
    category: "Publishing",
    complexity: "Medium",
    pages: 10,
    lastUpdated: "2024-01-18",
    tags: ["publishing", "royalties", "rights"],
    keyTerms: [
      "Publishing rights assignment or administration",
      "Writer's share retention percentage",
      "Territory and term of agreement",
      "Advance payments and recoupment",
      "Reversion rights and conditions",
      "Administration fees and costs",
    ],
    prosAndCons: {
      pros: [
        "Professional royalty collection and administration",
        "Global reach through sub-publishing networks",
        "Advance payments for established writers",
        "Expert sync licensing opportunities",
      ],
      cons: [
        "May require assignment of copyright ownership",
        "Long-term commitment periods",
        "Administration fees reduce net income",
      ],
    },
    content: `MUSIC PUBLISHING AGREEMENT

Agreement between:
WRITER: ________ ("Writer")
PUBLISHER: ________ ("Publisher")

1. GRANT OF RIGHTS
Writer grants Publisher the right to administer musical compositions.

2. TERM
Agreement term of ____ years commencing ________.

3. TERRITORY
Worldwide rights unless otherwise specified.

[Contract continues...]`,
  },
  "producer-agreement": {
    id: "producer-agreement",
    title: "Producer Agreement Template",
    description: "Contract between artist and producer for recording services",
    category: "Production",
    complexity: "Medium",
    pages: 6,
    lastUpdated: "2024-01-22",
    tags: ["producer", "recording", "points", "credit"],
    keyTerms: [
      "Producer fee and payment schedule",
      "Producer points (royalty percentage)",
      "Credit requirements and placement",
      "Delivery specifications and timeline",
      "Ownership of master recordings",
      "Additional services and revisions",
    ],
    prosAndCons: {
      pros: [
        "Clear fee structure and payment terms",
        "Standard producer point allocations",
        "Defined creative and technical responsibilities",
        "Professional credit requirements",
      ],
      cons: [
        "Producer points reduce artist royalties",
        "May include expensive revision costs",
        "Complex ownership arrangements possible",
      ],
    },
    content: `PRODUCER AGREEMENT

Agreement between:
ARTIST: ________ ("Artist")
PRODUCER: ________ ("Producer")

1. SERVICES
Producer will produce ____ recordings for Artist.

2. COMPENSATION
Producer fee: $________
Producer points: ____% of net receipts

3. CREDITS
Producer credit: "Produced by ________"

[Contract continues...]`,
  },
  "performance-agreement": {
    id: "performance-agreement",
    title: "Performance Agreement Template",
    description: "Live performance booking contract for venues and events",
    category: "Performance",
    complexity: "Low",
    pages: 4,
    lastUpdated: "2024-01-25",
    tags: ["performance", "booking", "venue", "live"],
    keyTerms: [
      "Performance date, time, and duration",
      "Venue location and technical specifications",
      "Performance fee and payment terms",
      "Cancellation policies and force majeure",
      "Technical rider and hospitality requirements",
      "Merchandise and recording rights",
    ],
    prosAndCons: {
      pros: [
        "Straightforward terms and conditions",
        "Clear payment and cancellation policies",
        "Standard technical and hospitality riders",
        "Flexible for various venue types",
      ],
      cons: [
        "May not cover complex touring scenarios",
        "Limited protection for weather-related cancellations",
        "Basic merchandise and recording provisions",
      ],
    },
    content: `PERFORMANCE AGREEMENT

ARTIST: ________ ("Artist")
VENUE: ________ ("Venue")

PERFORMANCE DETAILS:
Date: ________
Time: ________
Duration: ________
Fee: $________

TERMS AND CONDITIONS:
[Performance terms continue...]`,
  },
  "collaboration-agreement": {
    id: "collaboration-agreement",
    title: "Artist Collaboration Agreement Template",
    description: "Agreement between collaborating artists for joint projects",
    category: "Collaboration",
    complexity: "Medium",
    pages: 7,
    lastUpdated: "2024-01-28",
    tags: ["collaboration", "split", "ownership", "credit"],
    keyTerms: [
      "Revenue and ownership splits",
      "Credit allocation and billing",
      "Creative control and decision making",
      "Distribution and licensing rights",
      "Dispute resolution procedures",
      "Future collaboration options",
    ],
    prosAndCons: {
      pros: [
        "Clear ownership and revenue splits",
        "Defined creative responsibilities",
        "Professional dispute resolution process",
        "Flexible collaboration structures",
      ],
      cons: [
        "Complex decision-making processes",
        "Potential for creative disagreements",
        "Revenue splits may not reflect actual contributions",
      ],
    },
    content: `ARTIST COLLABORATION AGREEMENT

COLLABORATING ARTISTS:
Artist 1: ________ (____% ownership)
Artist 2: ________ (____% ownership)

PROJECT: ________

TERMS:
Revenue Split: ____% / ____%
Credit: "Artist 1 feat. Artist 2" or "Artist 1 & Artist 2"

[Agreement continues...]`,
  },
}

export default function ContractDetailPage() {
  const params = useParams()
  const router = useRouter()
  const contractId = params.id as string
  const [activeTab, setActiveTab] = useState("preview")
  const [isLoading, setIsLoading] = useState(true)

  const contract = contractsData[contractId]

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [contractId])

  const handleCreateContract = () => {
    router.push(`/dashboard/contracts/wizard?template=${contractId}`)
  }

  const handleDownloadTemplate = () => {
    if (!contract) return

    const content = contract.content
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${contract.title.replace(/\s+/g, "-").toLowerCase()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Template downloaded successfully!")
  }

  const handleShareTemplate = async () => {
    if (!contract) return

    try {
      await navigator.share({
        title: contract.title,
        text: contract.description,
        url: window.location.href,
      })
    } catch (error) {
      // Fallback to copying URL
      await navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard!")
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-12 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!contract) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Contract Template Not Found</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The contract template you're looking for doesn't exist or may have been moved. Let's help you find the right
            contract for your needs.
          </p>

          <div className="space-y-4">
            <div className="flex justify-center space-x-4">
              <Link href="/dashboard/contracts">
                <Button variant="outline" size="lg">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Browse All Contracts
                </Button>
              </Link>
              <Link href="/dashboard/contracts/wizard">
                <Button size="lg">
                  <Wand2 className="mr-2 h-5 w-5" />
                  Start Contract Wizard
                </Button>
              </Link>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Popular Contract Templates:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {Object.entries(contractsData)
                  .slice(0, 3)
                  .map(([key, template]) => (
                    <Card
                      key={key}
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => router.push(`/contracts/${key}`)}
                    >
                      <CardContent className="p-4 text-center">
                        <h4 className="font-semibold mb-2">{template.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                        <Badge variant="outline">{template.category}</Badge>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
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

  return (
    <div className="max-w-6xl mx-auto space-y-6">
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
          <h1 className="text-3xl font-bold tracking-tight">{contract.title}</h1>
          <p className="text-muted-foreground">{contract.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleShareTemplate}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" onClick={handleDownloadTemplate}>
            <Download className="mr-2 h-4 w-4" />
            Download Template
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleCreateContract}>
            <Wand2 className="mr-2 h-4 w-4" />
            Create Contract
          </Button>
        </div>
      </div>

      {/* Contract Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{contract.pages} Pages</p>
                <p className="text-xs text-muted-foreground">Template length</p>
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
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{contract.category}</p>
                <p className="text-xs text-muted-foreground">Contract type</p>
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
          <div className="flex flex-wrap gap-2">
            {contract.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Ready to create your contract?</h3>
              <p className="text-muted-foreground">
                Use our guided wizard to customize this template with your specific details and requirements.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleDownloadTemplate}>
                <Download className="mr-2 h-4 w-4" />
                Download Template
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleCreateContract}>
                <Wand2 className="mr-2 h-4 w-4" />
                Start Contract Wizard
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <Button
          variant={activeTab === "preview" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("preview")}
          className="flex-1"
        >
          <FileText className="mr-2 h-4 w-4" />
          Preview
        </Button>
        <Button
          variant={activeTab === "analysis" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("analysis")}
          className="flex-1"
        >
          <Info className="mr-2 h-4 w-4" />
          Analysis
        </Button>
        <Button
          variant={activeTab === "customize" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("customize")}
          className="flex-1"
        >
          <Edit className="mr-2 h-4 w-4" />
          Customize
        </Button>
      </div>

      {/* Tab Content */}
      {activeTab === "preview" && (
        <Card>
          <CardHeader>
            <CardTitle>Contract Template Preview</CardTitle>
            <CardDescription>Full contract template with fillable fields highlighted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-6 rounded-lg max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">{contract.content}</pre>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">Fillable Fields</h4>
                  <p className="text-sm text-blue-700">
                    Fields marked with underscores (________) need to be filled in with your specific information. Use
                    the Contract Wizard for guided completion.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "analysis" && (
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

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Key Terms & Clauses</CardTitle>
              <CardDescription>Important elements covered in this contract template</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {contract.keyTerms.map((term: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full" />
                    <span className="text-sm">{term}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "customize" && (
        <Card>
          <CardHeader>
            <CardTitle>Customize This Contract</CardTitle>
            <CardDescription>Use our wizard to create a personalized version of this contract template</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-8">
              <Wand2 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Ready to customize?</h3>
              <p className="text-muted-foreground mb-6">
                Our Contract Wizard will guide you through personalizing this template with your specific details.
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleCreateContract}>
                <Wand2 className="mr-2 h-4 w-4" />
                Start Contract Wizard
              </Button>
            </div>
            <Separator />
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Party Details</h4>
                <p className="text-sm text-muted-foreground">Enter information for all parties involved</p>
              </div>
              <div className="text-center">
                <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Financial Terms</h4>
                <p className="text-sm text-muted-foreground">Set compensation and payment schedules</p>
              </div>
              <div className="text-center">
                <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Contract Details</h4>
                <p className="text-sm text-muted-foreground">Specify dates, terms, and requirements</p>
              </div>
            </div>
          </CardContent>
        </Card>
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
