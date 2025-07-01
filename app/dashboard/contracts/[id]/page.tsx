"use client"

import { useState } from "react"
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
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Complete contract data with all template IDs matching the contracts page
const contractsData: Record<string, any> = {
  "artist-management": {
    title: "Artist Management Agreement",
    description: "Comprehensive management contract for artist-manager relationships",
    category: "Management",
    complexity: "High",
    pages: 8,
    lastUpdated: "2024-01-15",
    tags: ["management", "commission", "representation"],
    keyTerms: [
      "Management commission structure (15-20%)",
      "Term duration and renewal options",
      "Manager duties and responsibilities",
      "Artist obligations and commitments",
      "Expense handling and reimbursement",
      "Territory and exclusivity clauses",
      "Termination and post-term provisions",
      "Key person and leaving member clauses",
    ],
    prosAndCons: {
      pros: [
        "Comprehensive coverage of management relationship",
        "Clear commission structure and payment terms",
        "Detailed manager responsibilities and expectations",
        "Standard industry termination clauses",
        "Protection for both artist and manager interests",
      ],
      cons: [
        "High complexity may require legal review",
        "Commission rates may be negotiable based on services",
        "Long-term commitment may limit artist flexibility",
        "Territory restrictions may impact global opportunities",
      ],
    },
    content: `ARTIST MANAGEMENT AGREEMENT

This Artist Management Agreement ("Agreement") is entered into on ________ ("Effective Date") between:

ARTIST: ________ ("Artist")
Address: ________
Email: ________
Phone: ________

MANAGER: ________ ("Manager") 
Address: ________
Email: ________
Phone: ________

RECITALS:
WHEREAS, Artist is a professional recording and performing artist;
WHEREAS, Manager is experienced in artist management and music industry affairs;
WHEREAS, Artist desires to engage Manager's services for career guidance and development;

NOW THEREFORE, the parties agree as follows:

1. ENGAGEMENT
Artist hereby engages Manager as Artist's sole and exclusive personal manager throughout the Territory during the Term.

2. MANAGER'S DUTIES
Manager agrees to:
- Advise and counsel Artist in all matters concerning Artist's career
- Negotiate contracts on Artist's behalf (subject to Artist's approval)
- Coordinate with booking agents, record labels, and other industry professionals
- Develop and implement career strategy and marketing plans
- Oversee Artist's professional activities and commitments

3. COMMISSION
Manager shall receive ______% of Artist's Gross Income during the Term and Post-Term Period.

4. TERM
This Agreement shall commence on the Effective Date and continue for ______ years, with automatic renewal options.

5. EXPENSES
Manager may incur reasonable expenses on Artist's behalf with prior written approval exceeding $________.

6. TERRITORY
This Agreement applies to activities worldwide unless otherwise specified.

7. TERMINATION
Either party may terminate this Agreement with ______ days written notice.

[Contract continues with additional standard clauses...]

IN WITNESS WHEREOF, the parties have executed this Agreement on the date first written above.

ARTIST: ________________________     DATE: ________

MANAGER: ______________________     DATE: ________`,
  },
  "recording-contract": {
    title: "Recording Contract",
    description: "Studio recording and production agreement with rights and royalty specifications",
    category: "Recording",
    complexity: "High",
    pages: 12,
    lastUpdated: "2024-01-10",
    tags: ["recording", "royalties", "masters", "distribution"],
    keyTerms: [
      "Recording advance and budget allocation",
      "Royalty rates and recoupment terms",
      "Album delivery requirements and deadlines",
      "Master recording ownership and rights",
      "Distribution and marketing commitments",
      "Producer and musician credits",
      "Mechanical and performance royalties",
      "Territory and exclusivity provisions",
    ],
    prosAndCons: {
      pros: [
        "Professional recording budget provided",
        "Label marketing and distribution support",
        "Industry-standard royalty structure",
        "Clear ownership and rights allocation",
        "Built-in recoupment and accounting procedures",
      ],
      cons: [
        "Complex recoupment terms may delay profits",
        "Label may retain master recording ownership",
        "Restrictive creative control provisions",
        "Long-term exclusivity commitments",
      ],
    },
    content: `RECORDING AGREEMENT

This Recording Agreement ("Agreement") is made on ________ between:

RECORD LABEL: ________ ("Label")
Address: ________
Email: ________

ARTIST: ________ ("Artist")
Address: ________
Email: ________

RECITALS:
WHEREAS, Label is engaged in the business of manufacturing, marketing, and distributing sound recordings;
WHEREAS, Artist is a professional recording artist;
WHEREAS, Label desires to enter into an exclusive recording agreement with Artist;

NOW THEREFORE, the parties agree:

1. RECORDING COMMITMENT
Artist agrees to record and deliver ______ (___) full-length albums during the Term.

2. RECORDING FUND
Label shall provide a recording fund of $________ for each album, inclusive of:
- Recording costs
- Producer fees
- Musician payments
- Studio rental
- Mixing and mastering

3. ROYALTY RATES
Artist shall receive the following royalties:
- Physical sales: ______% of net receipts
- Digital downloads: ______% of net receipts  
- Streaming: ______% of net receipts
- Licensing: ______% of net receipts

4. ADVANCES
Label shall pay Artist a non-refundable advance of $________ upon execution, recoupable against future royalties.

5. OWNERSHIP
Label shall own all master recordings created under this Agreement in perpetuity throughout the Territory.

6. CREATIVE CONTROL
Artist shall have reasonable creative control over recording process, subject to Label's commercial approval.

7. MARKETING AND PROMOTION
Label agrees to spend minimum $________ on marketing and promotion for each album release.

[Contract continues with detailed terms...]

LABEL: ________________________     DATE: ________

ARTIST: _______________________     DATE: ________`,
  },
  "booking-agreement": {
    title: "Performance Booking Agreement",
    description: "Live performance contract for venues, festivals, and private events",
    category: "Performance",
    complexity: "Medium",
    pages: 6,
    lastUpdated: "2024-01-12",
    tags: ["performance", "venue", "booking", "live music"],
    keyTerms: [
      "Performance fee and payment schedule",
      "Technical requirements and rider specifications",
      "Venue capacity and audience expectations",
      "Sound and lighting equipment provisions",
      "Merchandise sales and revenue sharing",
      "Cancellation and force majeure clauses",
      "Load-in and sound check scheduling",
      "Hospitality and accommodation arrangements",
    ],
    prosAndCons: {
      pros: [
        "Clear performance fee and payment terms",
        "Detailed technical rider protects artist needs",
        "Standard industry cancellation protections",
        "Merchandise sales opportunities included",
        "Professional venue relationship establishment",
      ],
      cons: [
        "Weather and external factors may affect outdoor shows",
        "Technical requirements may exceed venue capabilities",
        "Limited flexibility for show modifications",
        "Potential conflicts with other venue bookings",
      ],
    },
    content: `PERFORMANCE BOOKING AGREEMENT

This Performance Agreement ("Agreement") is made on ________ between:

VENUE/PROMOTER: ________ ("Venue")
Address: ________
Contact: ________
Phone: ________
Email: ________

ARTIST: ________ ("Artist")
Address: ________
Contact: ________
Phone: ________
Email: ________

PERFORMANCE DETAILS:
Date: ________
Venue: ________
Address: ________
Load-in Time: ________
Sound Check: ________
Performance Time: ________
Duration: ________ minutes

FINANCIAL TERMS:
Performance Fee: $________
Payment Schedule: ________
Merchandise Split: ________% to Artist, ________% to Venue

TECHNICAL REQUIREMENTS:
- Sound system capable of ________ watts
- ________ vocal microphones
- ________ instrument inputs
- Monitor system with ________ mixes
- Lighting system with basic wash and specials
- Stage dimensions minimum ________ x ________

HOSPITALITY:
- ________ complimentary tickets
- Dressing room with ________
- Catering: ________
- Parking spaces: ________

CANCELLATION:
- Artist cancellation: ________ days notice required
- Venue cancellation: ________ days notice required
- Force majeure provisions apply

MERCHANDISE:
Artist may sell merchandise with ________% to Artist, ________% to Venue.

[Additional standard performance terms...]

VENUE: ________________________     DATE: ________

ARTIST: _______________________     DATE: ________`,
  },
  "producer-agreement": {
    title: "Producer Agreement",
    description: "Music production collaboration contract with credit and compensation terms",
    category: "Production",
    complexity: "Medium",
    pages: 5,
    lastUpdated: "2024-01-08",
    tags: ["producer", "royalties", "credits", "collaboration"],
    keyTerms: [
      "Producer fee structure and payment schedule",
      "Royalty points and backend participation",
      "Credit requirements and placement",
      "Delivery specifications and deadlines",
      "Master recording ownership rights",
      "Additional services and remix rights",
      "Equipment and studio rental responsibilities",
      "Creative control and approval processes",
    ],
    prosAndCons: {
      pros: [
        "Clear fee structure and royalty participation",
        "Professional credit and recognition guaranteed",
        "Defined creative roles and responsibilities",
        "Standard industry delivery requirements",
        "Flexible payment and royalty options",
      ],
      cons: [
        "Producer royalties reduce artist's share",
        "Creative differences may arise during production",
        "Additional costs for studio time and equipment",
        "Potential delays in delivery and completion",
      ],
    },
    content: `PRODUCER AGREEMENT

This Producer Agreement ("Agreement") is made on ________ between:

ARTIST: ________ ("Artist")
Address: ________
Email: ________
Phone: ________

PRODUCER: ________ ("Producer")
Address: ________
Email: ________
Phone: ________

PROJECT DETAILS:
Project: ________ (Album/EP/Single)
Number of Tracks: ________
Delivery Date: ________
Recording Location: ________

COMPENSATION:
Producer Fee: $________ per track
Royalty Points: ________% of net receipts
Payment Schedule: ________

SERVICES:
Producer agrees to provide:
- Pre-production and arrangement
- Recording supervision and direction
- Mixing and/or mixing supervision
- Creative input and artistic guidance
- Delivery of final masters

CREDITS:
Producer shall receive credit as "Produced by ________" on all releases, marketing materials, and promotional items.

OWNERSHIP:
Artist retains ownership of master recordings. Producer retains ownership of any original musical compositions created during production.

DELIVERY:
Producer shall deliver completed masters in the following formats:
- 24-bit/96kHz WAV files
- Stems and individual tracks
- Reference mixes and alternates

CREATIVE CONTROL:
Final creative decisions rest with Artist, with Producer providing professional input and recommendations.

ADDITIONAL SERVICES:
Remix rights: ________
Additional production: ________
Live performance consultation: ________

[Standard production agreement terms continue...]

ARTIST: ________________________     DATE: ________

PRODUCER: ______________________     DATE: ________`,
  },
  "licensing-deal": {
    title: "Music Licensing Agreement",
    description: "Sync licensing contract for film, TV, advertising, and digital media",
    category: "Licensing",
    complexity: "Medium",
    pages: 4,
    lastUpdated: "2024-01-05",
    tags: ["licensing", "sync", "media", "royalties"],
    keyTerms: [
      "Usage rights and media placement specifications",
      "Territory and duration of license",
      "Synchronization and master use fees",
      "Credit requirements and placement",
      "Exclusivity and non-exclusivity terms",
      "Approval rights and creative control",
      "Performance royalty collection",
      "Termination and renewal options",
    ],
    prosAndCons: {
      pros: [
        "Additional revenue stream from existing recordings",
        "Exposure through film, TV, and advertising placement",
        "Potential for viral marketing and discovery",
        "Professional industry relationship building",
        "Ongoing performance royalty collections",
      ],
      cons: [
        "Limited creative control over usage context",
        "Potential brand association risks",
        "Complex clearance and approval processes",
        "Revenue sharing with publishers and labels",
      ],
    },
    content: `MUSIC LICENSING AGREEMENT

This Music Licensing Agreement ("Agreement") is made on ________ between:

LICENSOR: ________ ("Licensor")
Address: ________
Email: ________
Phone: ________

LICENSEE: ________ ("Licensee")
Address: ________
Email: ________
Phone: ________

LICENSED COMPOSITION:
Title: ________
Writer(s): ________
Publisher(s): ________
Duration: ________

LICENSED RECORDING:
Artist: ________
Album: ________
Record Label: ________
Duration: ________

USAGE:
Project: ________
Media Type: ________ (Film/TV/Commercial/Digital)
Usage Description: ________
Territory: ________
Term: ________ years from first broadcast/release

FEES:
Synchronization Fee: $________
Master Use Fee: $________
Total License Fee: $________
Payment Terms: ________

CREDITS:
Music credit shall read: ________
Placement: ________ (End credits/On-screen/Audio only)

RESTRICTIONS:
- No alteration of composition or recording without consent
- No use in connection with ________
- Subject to broadcaster standards and practices

PERFORMANCE ROYALTIES:
Licensee responsible for reporting to performing rights organizations (ASCAP/BMI/SESAC).

DELIVERY:
Licensor shall provide high-quality audio files in requested format within ________ business days.

[Additional licensing terms...]

LICENSOR: ______________________     DATE: ________

LICENSEE: ______________________     DATE: ________`,
  },
  "distribution-deal": {
    title: "Distribution Agreement",
    description: "Digital and physical distribution contract with streaming platforms",
    category: "Distribution",
    complexity: "High",
    pages: 10,
    lastUpdated: "2024-01-03",
    tags: ["distribution", "streaming", "digital", "physical"],
    keyTerms: [
      "Distribution channels and platform coverage",
      "Revenue sharing and payment schedules",
      "Marketing and promotional support",
      "Territory and exclusivity provisions",
      "Delivery requirements and specifications",
      "Reporting and accounting procedures",
      "Minimum release commitments",
      "Termination and catalog retention",
    ],
    prosAndCons: {
      pros: [
        "Wide distribution across all major platforms",
        "Professional marketing and promotional support",
        "Detailed sales reporting and analytics",
        "Industry relationships and playlist placement",
        "Global reach and territory coverage",
      ],
      cons: [
        "Revenue sharing reduces artist's income",
        "Limited control over pricing and promotion",
        "Potential conflicts with direct-to-fan sales",
        "Long-term exclusivity commitments",
      ],
    },
    content: `DISTRIBUTION AGREEMENT

This Distribution Agreement ("Agreement") is made on ________ between:

DISTRIBUTOR: ________ ("Distributor")
Address: ________
Email: ________
Phone: ________

ARTIST/LABEL: ________ ("Artist")
Address: ________
Email: ________
Phone: ________

DISTRIBUTION SERVICES:
Distributor agrees to distribute Artist's recordings through:
- Digital streaming platforms (Spotify, Apple Music, etc.)
- Digital download stores (iTunes, Amazon, etc.)
- Physical distribution (CD, vinyl) - if applicable
- International territories as specified

REVENUE SHARING:
Digital Streaming: ________% to Artist, ________% to Distributor
Digital Downloads: ________% to Artist, ________% to Distributor
Physical Sales: ________% to Artist, ________% to Distributor
Sync Licensing: ________% to Artist, ________% to Distributor

MINIMUM COMMITMENTS:
Artist agrees to deliver minimum ________ releases per year.

MARKETING SUPPORT:
Distributor shall provide:
- Playlist pitching and placement efforts
- Social media promotion and support
- Press release distribution
- Radio promotion (where applicable)
- Marketing spend of minimum $________ per release

DELIVERY REQUIREMENTS:
- Audio files: 24-bit/96kHz WAV or FLAC
- Artwork: 3000x3000 pixels minimum
- Metadata: Complete track and album information
- Lead time: ________ weeks before release date

TERRITORY:
This Agreement covers distribution in: ________

TERM:
Initial term of ________ years, with automatic renewal options.

ACCOUNTING:
Monthly statements and payments within ________ days of month end.

[Additional distribution terms...]

DISTRIBUTOR: ____________________     DATE: ________

ARTIST: ________________________     DATE: ________`,
  },
}

export default function ContractDetailPage() {
  const params = useParams()
  const contractId = params.id as string
  const [activeTab, setActiveTab] = useState("preview")

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
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Download className="mr-2 h-4 w-4" />
            Download
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
          <Wand2 className="mr-2 h-4 w-4" />
          Customize
        </Button>
      </div>

      {/* Tab Content */}
      {activeTab === "preview" && (
        <Card>
          <CardHeader>
            <CardTitle>Contract Preview</CardTitle>
            <CardDescription>Full contract text with fillable fields highlighted</CardDescription>
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
              <CardDescription>Important elements covered in this contract</CardDescription>
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
            <CardDescription>Use our wizard to create a personalized version of this contract</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-8">
              <Wand2 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Ready to customize?</h3>
              <p className="text-muted-foreground mb-6">
                Our Contract Wizard will guide you through personalizing this template with your specific details.
              </p>
              <Link href={`/dashboard/contracts/wizard?template=${contractId}`}>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Wand2 className="mr-2 h-4 w-4" />
                  Start Contract Wizard
                </Button>
              </Link>
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
                <h4 className="font-semibold mb-1">Event Details</h4>
                <p className="text-sm text-muted-foreground">Specify dates, venues, and requirements</p>
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
