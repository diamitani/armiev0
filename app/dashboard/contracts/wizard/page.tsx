"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, ArrowRight, MessageSquare, Send, FileText, Download } from "lucide-react"

const contractTypes = [
  {
    id: "artist-management",
    name: "Artist Management Agreement",
    description: "Comprehensive management contract for artists",
  },
  { id: "recording-contract", name: "Recording Contract", description: "Agreement for recording and releasing music" },
  {
    id: "performance-booking",
    name: "Performance Booking Agreement",
    description: "Contract for live performances and shows",
  },
  { id: "producer-agreement", name: "Producer Agreement", description: "Agreement with music producers" },
  { id: "licensing-deal", name: "Licensing Deal", description: "License music for various uses" },
  { id: "distribution-deal", name: "Distribution Deal", description: "Agreement for music distribution" },
]

function ContractWizardContent() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template")

  const [currentStep, setCurrentStep] = useState(1)
  const [contractData, setContractData] = useState({
    type: templateId || "",
    title: "",
    parties: {
      party1: { name: "", role: "", address: "", email: "" },
      party2: { name: "", role: "", address: "", email: "" },
    },
    terms: {
      duration: "",
      compensation: "",
      responsibilities: "",
      termination: "",
      additionalTerms: "",
    },
  })

  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm here to help you create your contract. What type of contract are you looking to create, and what specific questions do you have?",
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (templateId) {
      const template = contractTypes.find((t) => t.id === templateId)
      if (template) {
        setContractData((prev) => ({ ...prev, type: templateId, title: template.name }))
      }
    }
  }, [templateId])

  const handleInputChange = (field: string, value: string, nested?: string) => {
    setContractData((prev) => {
      if (nested) {
        return {
          ...prev,
          [nested]: {
            ...prev[nested as keyof typeof prev],
            [field]: value,
          },
        }
      }
      return { ...prev, [field]: value }
    })
  }

  const handlePartyChange = (party: "party1" | "party2", field: string, value: string) => {
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

  const handleTermsChange = (field: string, value: string) => {
    setContractData((prev) => ({
      ...prev,
      terms: {
        ...prev.terms,
        [field]: value,
      },
    }))
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMessage = { role: "user", content: chatInput }
    setChatMessages((prev) => [...prev, userMessage])
    setChatInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatInput }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()
      setChatMessages((prev) => [...prev, { role: "assistant", content: data.message }])
    } catch (error) {
      console.error("Chat error:", error)
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I encountered an error. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const generateContract = () => {
    const selectedType = contractTypes.find((t) => t.id === contractData.type)
    return `
# ${contractData.title || selectedType?.name || "Contract"}

## Parties
**${contractData.parties.party1.role || "Party 1"}:** ${contractData.parties.party1.name}
Address: ${contractData.parties.party1.address}
Email: ${contractData.parties.party1.email}

**${contractData.parties.party2.role || "Party 2"}:** ${contractData.parties.party2.name}
Address: ${contractData.parties.party2.address}
Email: ${contractData.parties.party2.email}

## Terms and Conditions

### Duration
${contractData.terms.duration || "To be specified"}

### Compensation
${contractData.terms.compensation || "To be specified"}

### Responsibilities
${contractData.terms.responsibilities || "To be specified"}

### Termination
${contractData.terms.termination || "To be specified"}

### Additional Terms
${contractData.terms.additionalTerms || "None specified"}

---
*This contract was generated using ARMIE Contract Wizard. Please review with legal counsel before signing.*
    `.trim()
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="contract-type">Contract Type</Label>
              <Select value={contractData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a contract type" />
                </SelectTrigger>
                <SelectContent>
                  {contractTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <div>
                        <div className="font-medium">{type.name}</div>
                        <div className="text-sm text-muted-foreground">{type.description}</div>
                      </div>
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
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter a custom title for your contract"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Party 1</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={contractData.parties.party1.name}
                      onChange={(e) => handlePartyChange("party1", "name", e.target.value)}
                      placeholder="Full name or company name"
                    />
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Input
                      value={contractData.parties.party1.role}
                      onChange={(e) => handlePartyChange("party1", "role", e.target.value)}
                      placeholder="e.g., Artist, Manager, Producer"
                    />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Textarea
                      value={contractData.parties.party1.address}
                      onChange={(e) => handlePartyChange("party1", "address", e.target.value)}
                      placeholder="Full address"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={contractData.parties.party1.email}
                      onChange={(e) => handlePartyChange("party1", "email", e.target.value)}
                      placeholder="email@example.com"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Party 2</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={contractData.parties.party2.name}
                      onChange={(e) => handlePartyChange("party2", "name", e.target.value)}
                      placeholder="Full name or company name"
                    />
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Input
                      value={contractData.parties.party2.role}
                      onChange={(e) => handlePartyChange("party2", "role", e.target.value)}
                      placeholder="e.g., Artist, Manager, Producer"
                    />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Textarea
                      value={contractData.parties.party2.address}
                      onChange={(e) => handlePartyChange("party2", "address", e.target.value)}
                      placeholder="Full address"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={contractData.parties.party2.email}
                      onChange={(e) => handlePartyChange("party2", "email", e.target.value)}
                      placeholder="email@example.com"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label>Contract Duration</Label>
              <Input
                value={contractData.terms.duration}
                onChange={(e) => handleTermsChange("duration", e.target.value)}
                placeholder="e.g., 2 years, 6 months, indefinite"
              />
            </div>

            <div>
              <Label>Compensation</Label>
              <Textarea
                value={contractData.terms.compensation}
                onChange={(e) => handleTermsChange("compensation", e.target.value)}
                placeholder="Describe payment terms, percentages, fees, etc."
                rows={3}
              />
            </div>

            <div>
              <Label>Responsibilities</Label>
              <Textarea
                value={contractData.terms.responsibilities}
                onChange={(e) => handleTermsChange("responsibilities", e.target.value)}
                placeholder="Outline the responsibilities of each party"
                rows={4}
              />
            </div>

            <div>
              <Label>Termination Conditions</Label>
              <Textarea
                value={contractData.terms.termination}
                onChange={(e) => handleTermsChange("termination", e.target.value)}
                placeholder="Conditions under which the contract can be terminated"
                rows={3}
              />
            </div>

            <div>
              <Label>Additional Terms</Label>
              <Textarea
                value={contractData.terms.additionalTerms}
                onChange={(e) => handleTermsChange("additionalTerms", e.target.value)}
                placeholder="Any additional clauses or special conditions"
                rows={4}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Contract Preview
                </CardTitle>
                <CardDescription>Review your contract before finalizing</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96 w-full border rounded-md p-4">
                  <pre className="whitespace-pre-wrap text-sm">{generateContract()}</pre>
                </ScrollArea>
                <div className="flex gap-2 mt-4">
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Contract
                  </Button>
                  <Button variant="outline">Save Draft</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  const stepTitles = ["Contract Type", "Parties Information", "Terms & Conditions", "Review & Finalize"]

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Contract Wizard</CardTitle>
                  <CardDescription>
                    Step {currentStep} of 4: {stepTitles[currentStep - 1]}
                  </CardDescription>
                </div>
                <Badge variant="outline">
                  {contractData.type ? contractTypes.find((t) => t.id === contractData.type)?.name : "No type selected"}
                </Badge>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
            </CardHeader>

            <CardContent>
              {renderStep()}

              <Separator className="my-6" />

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>

                <Button onClick={nextStep} disabled={currentStep === 4} className="flex items-center gap-2">
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Assistant Chat */}
        <div className="lg:col-span-1">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                AI Assistant
              </CardTitle>
              <CardDescription>Get help with your contract</CardDescription>
            </CardHeader>

            <CardContent>
              <ScrollArea className="h-64 w-full border rounded-md p-3 mb-4">
                <div className="space-y-3">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg px-3 py-2 text-sm">Thinking...</div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about contract terms..."
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading}>
                  <Send className="h-4 w-4" />
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="space-y-2">
                    <div className="h-6 bg-muted rounded w-48" />
                    <div className="h-4 bg-muted rounded w-64" />
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-1/4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-4 bg-muted rounded w-32" />
                    <div className="h-10 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-40" />
                    <div className="h-10 bg-muted rounded" />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-32" />
                  <div className="h-4 bg-muted rounded w-48" />
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted rounded mb-4" />
                  <div className="flex gap-2">
                    <div className="h-10 bg-muted rounded flex-1" />
                    <div className="h-10 w-10 bg-muted rounded" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      }
    >
      <ContractWizardContent />
    </Suspense>
  )
}
