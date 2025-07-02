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
  Music,
} from "lucide-react"
import Link from "next/link"

const contractData = {
  title: "Recording Contract",
  description: "Studio recording and production agreement with rights and royalty specifications",
  category: "Recording",
  complexity: "High",
  pages: 15,
  lastUpdated: "2024-01-20",
  tags: ["recording", "studio", "production", "royalties", "rights"],
  keyTerms: [
    "Recording budget and advance payments",
    "Master recording ownership rights",
    "Royalty rates and revenue sharing",
    "Creative control and approval rights",
    "Distribution and marketing obligations",
    "Recoupment and accounting procedures",
    "Territory and exclusivity terms",
    "Delivery requirements and deadlines",
  ],
  prosAndCons: {
    pros: [
      "Comprehensive coverage of recording process",
      "Clear ownership and rights allocation",
      "Industry-standard royalty structures",
      "Built-in creative protection clauses",
      "Detailed recoupment procedures",
    ],
    cons: [
      "Complex financial terms require careful review",
      "Long-term exclusivity may limit opportunities",
      "Recoupment terms can be artist-unfavorable",
      "Creative control limitations for artists",
    ],
  },
  content: `RECORDING CONTRACT

This Recording Agreement ("Agreement") is entered into on ________ ("Effective Date") between:

RECORD LABEL: ________ ("Label")
Address: ________
Email: ________

ARTIST: ________ ("Artist")
Professional Name: ________
Address: ________
Email: ________

RECITALS:
WHEREAS, Artist is a professional recording artist;
WHEREAS, Label is in the business of producing and distributing recorded music;
WHEREAS, Label desires to engage Artist's recording services;

NOW THEREFORE, the parties agree as follows:

1. RECORDING COMMITMENT
Artist agrees to record ______ album(s) during the Term of this Agreement.
Each album shall contain no fewer than ______ master recordings.

2. RECORDING BUDGET
Label shall provide a recording budget of $________ per album.
Budget includes all recording costs, producer fees, and studio expenses.

3. ADVANCES
Label shall pay Artist an advance of $________ upon execution of this Agreement.
Additional advances of $________ shall be paid upon commencement of each subsequent album.

4. ROYALTIES
Artist shall receive ______% of Net Sales Revenue from all recordings.
"Net Sales Revenue" means gross revenue less returns, discounts, and distribution costs.

5. OWNERSHIP OF MASTERS
Label shall own all master recordings created under this Agreement.
Artist retains ownership of underlying musical compositions (if applicable).

6. CREATIVE CONTROL
Artist shall have reasonable creative control over recording process.
Label approval required for producer selection and recording budget allocation.

7. DELIVERY REQUIREMENTS
Artist must deliver completed masters within ______ months of recording commencement.
All recordings must meet Label's technical and commercial standards.

[Contract continues with additional clauses...]

IN WITNESS WHEREOF, the parties have executed this Agreement.

ARTIST: _________________ Date: _______

LABEL: _________________ Date: _______`,
}

export default function RecordingContractPage() {
  const [activeTab, setActiveTab] = useState("preview")

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
          <h1 className="text-3xl font-bold tracking-tight">{contractData.title}</h1>
          <p className="text-muted-foreground">{contractData.description}</p>
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
                <p className="text-sm font-medium">{contractData.pages} Pages</p>
                <p className="text-xs text-muted-foreground">Document length</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getComplexityColor(contractData.complexity)}>{contractData.complexity}</Badge>
              <div>
                <p className="text-sm font-medium">Complexity</p>
                <p className="text-xs text-muted-foreground">Legal complexity</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{contractData.category}</p>
                <p className="text-xs text-muted-foreground">Contract type</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Updated {contractData.lastUpdated}</p>
                <p className="text-xs text-muted-foreground">Last revision</p>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-wrap gap-2">
            {contractData.tags.map((tag: string) => (
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
              <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">{contractData.content}</pre>
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
                {contractData.prosAndCons.pros.map((pro: string, index: number) => (
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
                {contractData.prosAndCons.cons.map((con: string, index: number) => (
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
                {contractData.keyTerms.map((term: string, index: number) => (
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
              <Link href="/dashboard/contracts/wizard">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Wand2 className="mr-2 h-4 w-4" />
                  Start Contract Wizard
                </Button>
              </Link>
            </div>
            <Separator />
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <Music className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Recording Details</h4>
                <p className="text-sm text-muted-foreground">Specify album count, budget, and timeline</p>
              </div>
              <div className="text-center">
                <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Financial Terms</h4>
                <p className="text-sm text-muted-foreground">Set advances, royalties, and recoupment</p>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Rights & Control</h4>
                <p className="text-sm text-muted-foreground">Define creative control and ownership</p>
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
