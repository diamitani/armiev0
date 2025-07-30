"use client"

import type React from "react"

import { useState, Suspense } from "react"
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
import { FileText, MessageSquare, Send, Loader2 } from "lucide-react"

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

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm here to help you create your contract. I can provide guidance on terms, legal requirements, and best practices. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: chatInput,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setChatInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: chatInput,
          context: `Contract type: ${contractData.type}, Current step: ${currentStep}`,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message || "I apologize, but I encountered an error. Please try again.",
        timestamp: new Date(),
      }

      setChatMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I encountered an error. Please try again.",
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="contract-type">Contract Type</Label>
              <Select
                value={contractData.type}
                onValueChange={(value) => setContractData((prev) => ({ ...prev, type: value }))}
              >
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
                onChange={(e) => setContractData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter a descriptive title for your contract"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="party1">First Party</Label>
              <Input
                id="party1"
                value={contractData.parties.party1}
                onChange={(e) =>
                  setContractData((prev) => ({
                    ...prev,
                    parties: { ...prev.parties, party1: e.target.value },
                  }))
                }
                placeholder="Enter the name of the first party"
              />
            </div>
            <div>
              <Label htmlFor="party2">Second Party</Label>
              <Input
                id="party2"
                value={contractData.parties.party2}
                onChange={(e) =>
                  setContractData((prev) => ({
                    ...prev,
                    parties: { ...prev.parties, party2: e.target.value },
                  }))
                }
                placeholder="Enter the name of the second party"
              />
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
                onChange={(e) =>
                  setContractData((prev) => ({
                    ...prev,
                    terms: { ...prev.terms, duration: e.target.value },
                  }))
                }
                placeholder="e.g., 12 months, 2 years, etc."
              />
            </div>
            <div>
              <Label htmlFor="compensation">Compensation</Label>
              <Input
                id="compensation"
                value={contractData.terms.compensation}
                onChange={(e) =>
                  setContractData((prev) => ({
                    ...prev,
                    terms: { ...prev.terms, compensation: e.target.value },
                  }))
                }
                placeholder="e.g., $5,000, 15% commission, etc."
              />
            </div>
            <div>
              <Label htmlFor="deliverables">Deliverables/Services</Label>
              <Textarea
                id="deliverables"
                value={contractData.terms.deliverables}
                onChange={(e) =>
                  setContractData((prev) => ({
                    ...prev,
                    terms: { ...prev.terms, deliverables: e.target.value },
                  }))
                }
                placeholder="Describe what will be delivered or the services to be provided"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="additional-terms">Additional Terms</Label>
              <Textarea
                id="additional-terms"
                value={contractData.terms.additionalTerms}
                onChange={(e) =>
                  setContractData((prev) => ({
                    ...prev,
                    terms: { ...prev.terms, additionalTerms: e.target.value },
                  }))
                }
                placeholder="Any additional terms, conditions, or clauses"
                rows={4}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contract Preview</h3>
              <Card>
                <CardHeader>
                  <CardTitle>{contractData.title || "Untitled Contract"}</CardTitle>
                  <CardDescription>
                    {contractTypes.find((t) => t.value === contractData.type)?.label || "Contract"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Parties:</h4>
                    <p>First Party: {contractData.parties.party1 || "Not specified"}</p>
                    <p>Second Party: {contractData.parties.party2 || "Not specified"}</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold">Terms:</h4>
                    <p>
                      <strong>Duration:</strong> {contractData.terms.duration || "Not specified"}
                    </p>
                    <p>
                      <strong>Compensation:</strong> {contractData.terms.compensation || "Not specified"}
                    </p>
                    <p>
                      <strong>Deliverables:</strong> {contractData.terms.deliverables || "Not specified"}
                    </p>
                    {contractData.terms.additionalTerms && (
                      <p>
                        <strong>Additional Terms:</strong> {contractData.terms.additionalTerms}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contract Wizard</h2>
          <p className="text-muted-foreground">Create professional contracts with AI assistance</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
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
              {renderStep()}

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                  Previous
                </Button>
                <Button onClick={handleNext} disabled={currentStep === totalSteps}>
                  {currentStep === totalSteps ? "Generate Contract" : "Next"}
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
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
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
                      <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <form onSubmit={handleChatSubmit} className="flex gap-2 mt-4">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
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
          <div className="flex items-center justify-center h-96">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </div>
      }
    >
      <ContractWizardContent />
    </Suspense>
  )
}
