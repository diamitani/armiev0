"use client"
import { Download } from "lucide-react" // Import Download component

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { FileText, MessageSquare, Send, Loader2, ArrowLeft, ArrowRight } from "lucide-react"
import { useChat } from "ai/react"

interface ContractData {
  type: string
  title: string
  parties: {
    party1: string
    party2: string
  }
  terms: {
    duration: string
    compensation: string
    deliverables: string
    additionalTerms: string
  }
}

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const contractTypes = [
  { value: "artist-management", label: "Artist Management Agreement" },
  { value: "recording-contract", label: "Recording Contract" },
  { value: "performance-booking", label: "Performance Booking Agreement" },
  { value: "producer-agreement", label: "Producer Agreement" },
  { value: "licensing-deal", label: "Licensing Agreement" },
  { value: "distribution-deal", label: "Distribution Agreement" },
  { value: "sponsorship", label: "Sponsorship Agreement" },
  { value: "collaboration", label: "Collaboration Agreement" },
]

function ContractWizardContent() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template")

  const [currentStep, setCurrentStep] = useState(1)
  const [contractData, setContractData] = useState<ContractData>({
    type: templateId || "",
    title: "",
    parties: {
      party1: "",
      party2: "",
    },
    terms: {
      duration: "",
      compensation: "",
      deliverables: "",
      additionalTerms: "",
    },
  })

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content: `Hello! I'm here to help you create your ${contractData.type ? contractTypes.find((t) => t.value === contractData.type)?.label || "contract" : "contract"}. I can provide guidance on terms, legal requirements, and industry standards. What would you like to know?`,
      },
    ],
  })

  useEffect(() => {
    if (templateId) {
      const template = contractTypes.find((t) => t.value === templateId)
      if (template) {
        setContractData((prev) => ({
          ...prev,
          type: templateId,
          title: template.label,
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
        [party]: value, // Directly assign value since parties are strings
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

  const generateContractPreview = () => {
    const selectedType = contractTypes.find((t) => t.value === contractData.type)
    return `
# ${contractData.title || selectedType?.label || "Contract"}

This agreement is made between ${contractData.parties.party1 || "[Party 1 Name]"} and ${contractData.parties.party2 || "[Party 2 Name]"}.

## Terms and Conditions

### Duration
${contractData.terms.duration || "[Duration to be specified]"}

### Compensation
${contractData.terms.compensation || "[Compensation to be specified]"}

### Deliverables/Services
${contractData.terms.deliverables || "[Deliverables/Services to be specified]"}

### Additional Terms
${contractData.terms.additionalTerms || "None specified."}

---
*This contract was generated using ARMIE Contract Wizard. Please review with legal counsel before signing.*
    `.trim()
  }

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Contract Type & Title"
      case 2:
        return "Parties Information"
      case 3:
        return "Terms & Conditions"
      case 4:
        return "Review & Generate"
      default:
        return "Contract Wizard"
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contract Wizard</h2>
          <p className="text-muted-foreground">Create professional music industry contracts with AI assistance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{getStepTitle()}</CardTitle>
                  <CardDescription>
                    Step {currentStep} of {totalSteps}
                  </CardDescription>
                </div>
                <Badge variant="outline">
                  <FileText className="w-4 h-4 mr-1" />
                  {contractTypes.find((t) => t.value === contractData.type)?.label || "Select Type"}
                </Badge>
              </div>
              <Progress value={progress} className="w-full" />
            </CardHeader>
            <CardContent>
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="contract-type">Contract Type</Label>
                    <Select value={contractData.type} onValueChange={(value) => handleInputUpdate("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a contract type" />
                      </SelectTrigger>
                      <SelectContent>
                        {contractTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
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
                      placeholder="Enter a descriptive title for your contract"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="party1">First Party Name</Label>
                    <Input
                      id="party1"
                      value={contractData.parties.party1}
                      onChange={(e) => handlePartyUpdate("party1", "name", e.target.value)}
                      placeholder="e.g., Artist Name, Company Name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="party2">Second Party Name</Label>
                    <Input
                      id="party2"
                      value={contractData.parties.party2}
                      onChange={(e) => handlePartyUpdate("party2", "name", e.target.value)}
                      placeholder="e.g., Label, Manager, Producer"
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="duration">Contract Duration</Label>
                    <Input
                      id="duration"
                      value={contractData.terms.duration}
                      onChange={(e) => handleTermsUpdate("duration", e.target.value)}
                      placeholder="e.g., 12 months, 2 years, indefinite"
                    />
                  </div>
                  <div>
                    <Label htmlFor="compensation">Compensation Details</Label>
                    <Textarea
                      id="compensation"
                      value={contractData.terms.compensation}
                      onChange={(e) => handleTermsUpdate("compensation", e.target.value)}
                      placeholder="Describe payment terms, royalties, advances, etc."
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliverables">Deliverables/Services</Label>
                    <Textarea
                      id="deliverables"
                      value={contractData.terms.deliverables}
                      onChange={(e) => handleTermsUpdate("deliverables", e.target.value)}
                      placeholder="Outline what will be delivered or the services to be provided"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="additional-terms">Additional Terms</Label>
                    <Textarea
                      id="additional-terms"
                      value={contractData.terms.additionalTerms}
                      onChange={(e) => handleTermsUpdate("additionalTerms", e.target.value)}
                      placeholder="Any additional clauses, termination conditions, etc."
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Contract Preview</h3>
                    <pre className="whitespace-pre-wrap text-sm">{generateContractPreview()}</pre>
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <FileText className="w-4 h-4 mr-2" />
                      Save Draft
                    </Button>
                  </div>
                </div>
              )}

              <Separator className="my-6" />

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button onClick={handleNext} disabled={currentStep === totalSteps}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                AI Assistant
              </CardTitle>
              <CardDescription>Get help with your contract terms and legal questions</CardDescription>
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
                        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                          message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
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
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-muted rounded animate-pulse" />
            <div>
              <div className="h-8 w-48 bg-muted rounded animate-pulse" />
              <div className="h-4 w-96 bg-muted rounded animate-pulse mt-2" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="h-96 bg-muted rounded-lg animate-pulse" />
            </div>
            <div>
              <div className="h-96 bg-muted rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      }
    >
      <ContractWizardContent />
    </Suspense>
  )
}
