"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Download, Send, Bot, User } from "lucide-react"
import { useChat } from "ai/react"

const contractTypes = [
  {
    id: "artist-management",
    name: "Artist Management Agreement",
    description: "Comprehensive management contract for artists",
  },
  {
    id: "recording-contract",
    name: "Recording Contract",
    description: "Agreement for recording and distribution rights",
  },
  {
    id: "performance-booking",
    name: "Performance Booking Agreement",
    description: "Contract for live performance bookings",
  },
  { id: "producer-agreement", name: "Producer Agreement", description: "Agreement between artist and producer" },
  { id: "licensing-deal", name: "Licensing Deal", description: "Music licensing and usage rights agreement" },
  { id: "distribution-deal", name: "Distribution Deal", description: "Music distribution and sales agreement" },
]

function ContractWizardContent() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template")

  const [currentStep, setCurrentStep] = useState(1)
  const [contractData, setContractData] = useState({
    type: templateId || "",
    title: "",
    parties: {
      party1: { name: "", role: "", address: "" },
      party2: { name: "", role: "", address: "" },
    },
    terms: {
      duration: "",
      compensation: "",
      responsibilities: "",
      termination: "",
    },
    additionalClauses: "",
  })

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content: `Hello! I'm here to help you create your ${contractData.type ? contractTypes.find((t) => t.id === contractData.type)?.name || "contract" : "contract"}. I can provide guidance on terms, legal requirements, and industry standards. What would you like to know?`,
      },
    ],
  })

  useEffect(() => {
    if (templateId) {
      const template = contractTypes.find((t) => t.id === templateId)
      if (template) {
        setContractData((prev) => ({
          ...prev,
          type: templateId,
          title: template.name,
        }))
      }
    }
  }, [templateId])

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleInputUpdate = (field: string, value: string) => {
    setContractData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePartyUpdate = (party: "party1" | "party2", field: string, value: string) => {
    setContractData((prev) => ({
      ...prev,
      parties: {
        ...prev.parties,
        [party]: {
          ...prev.parties[party],
          [field]: value,
        },
      },
    }))
  }

  const handleTermsUpdate = (field: string, value: string) => {
    setContractData((prev) => ({
      ...prev,
      terms: {
        ...prev.terms,
        [field]: value,
      },
    }))
  }

  const generateContract = () => {
    // This would typically call an API to generate the contract
    console.log("Generating contract with data:", contractData)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="contract-type">Contract Type</Label>
              <Select value={contractData.type} onValueChange={(value) => handleInputUpdate("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select contract type" />
                </SelectTrigger>
                <SelectContent>
                  {contractTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="contract-title">Contract Title</Label>
              <Input
                id="contract-title"
                value={contractData.title}
                onChange={(e) => handleInputUpdate("title", e.target.value)}
                placeholder="Enter contract title"
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">First Party</h3>
                <div>
                  <Label htmlFor="party1-name">Name</Label>
                  <Input
                    id="party1-name"
                    value={contractData.parties.party1.name}
                    onChange={(e) => handlePartyUpdate("party1", "name", e.target.value)}
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <Label htmlFor="party1-role">Role</Label>
                  <Input
                    id="party1-role"
                    value={contractData.parties.party1.role}
                    onChange={(e) => handlePartyUpdate("party1", "role", e.target.value)}
                    placeholder="e.g., Artist, Manager, Producer"
                  />
                </div>
                <div>
                  <Label htmlFor="party1-address">Address</Label>
                  <Textarea
                    id="party1-address"
                    value={contractData.parties.party1.address}
                    onChange={(e) => handlePartyUpdate("party1", "address", e.target.value)}
                    placeholder="Enter full address"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Second Party</h3>
                <div>
                  <Label htmlFor="party2-name">Name</Label>
                  <Input
                    id="party2-name"
                    value={contractData.parties.party2.name}
                    onChange={(e) => handlePartyUpdate("party2", "name", e.target.value)}
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <Label htmlFor="party2-role">Role</Label>
                  <Input
                    id="party2-role"
                    value={contractData.parties.party2.role}
                    onChange={(e) => handlePartyUpdate("party2", "role", e.target.value)}
                    placeholder="e.g., Artist, Manager, Producer"
                  />
                </div>
                <div>
                  <Label htmlFor="party2-address">Address</Label>
                  <Textarea
                    id="party2-address"
                    value={contractData.parties.party2.address}
                    onChange={(e) => handlePartyUpdate("party2", "address", e.target.value)}
                    placeholder="Enter full address"
                  />
                </div>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="duration">Contract Duration</Label>
              <Input
                id="duration"
                value={contractData.terms.duration}
                onChange={(e) => handleTermsUpdate("duration", e.target.value)}
                placeholder="e.g., 2 years, 6 months"
              />
            </div>
            <div>
              <Label htmlFor="compensation">Compensation</Label>
              <Textarea
                id="compensation"
                value={contractData.terms.compensation}
                onChange={(e) => handleTermsUpdate("compensation", e.target.value)}
                placeholder="Describe payment terms, percentages, etc."
              />
            </div>
            <div>
              <Label htmlFor="responsibilities">Responsibilities</Label>
              <Textarea
                id="responsibilities"
                value={contractData.terms.responsibilities}
                onChange={(e) => handleTermsUpdate("responsibilities", e.target.value)}
                placeholder="Outline each party's responsibilities"
              />
            </div>
            <div>
              <Label htmlFor="termination">Termination Clause</Label>
              <Textarea
                id="termination"
                value={contractData.terms.termination}
                onChange={(e) => handleTermsUpdate("termination", e.target.value)}
                placeholder="Conditions for contract termination"
              />
            </div>
            <div>
              <Label htmlFor="additional-clauses">Additional Clauses</Label>
              <Textarea
                id="additional-clauses"
                value={contractData.additionalClauses}
                onChange={(e) => handleInputUpdate("additionalClauses", e.target.value)}
                placeholder="Any additional terms or clauses"
              />
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Contract Preview</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <strong>Title:</strong> {contractData.title}
                </div>
                <div>
                  <strong>Type:</strong> {contractTypes.find((t) => t.id === contractData.type)?.name}
                </div>
                <div>
                  <strong>Parties:</strong>
                  <ul className="ml-4 mt-2">
                    <li>
                      {contractData.parties.party1.name} ({contractData.parties.party1.role})
                    </li>
                    <li>
                      {contractData.parties.party2.name} ({contractData.parties.party2.role})
                    </li>
                  </ul>
                </div>
                <div>
                  <strong>Duration:</strong> {contractData.terms.duration}
                </div>
                <div>
                  <strong>Compensation:</strong> {contractData.terms.compensation}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={generateContract} className="flex-1">
                <FileText className="w-4 h-4 mr-2" />
                Generate Contract
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contract Wizard - Step {currentStep} of 4</CardTitle>
              <CardDescription>
                {currentStep === 1 && "Choose your contract type and provide basic information"}
                {currentStep === 2 && "Enter details for all parties involved"}
                {currentStep === 3 && "Define contract terms and conditions"}
                {currentStep === 4 && "Review and generate your contract"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderStep()}

              <Separator className="my-6" />

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                  Previous
                </Button>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((step) => (
                    <Badge
                      key={step}
                      variant={step === currentStep ? "default" : step < currentStep ? "secondary" : "outline"}
                    >
                      {step}
                    </Badge>
                  ))}
                </div>
                <Button onClick={handleNext} disabled={currentStep === 4}>
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Assistant */}
        <div className="lg:col-span-1">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                AI Contract Assistant
              </CardTitle>
              <CardDescription>Get help with contract terms and legal guidance</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`flex gap-3 max-w-[80%] ${
                          message.role === "assistant" ? "flex-row" : "flex-row-reverse"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          {message.role === "assistant" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>
                        <div
                          className={`rounded-lg px-3 py-2 text-sm ${
                            message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-muted rounded-lg px-3 py-2 text-sm">Thinking...</div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask about contract terms..."
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function ContractWizard() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto p-6 max-w-7xl">
          <Card>
            <CardHeader>
              <div className="animate-pulse">
                <div className="h-6 bg-muted rounded w-48 mb-2"></div>
                <div className="h-4 bg-muted rounded w-96"></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      }
    >
      <ContractWizardContent />
    </Suspense>
  )
}
