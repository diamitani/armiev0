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
import { ArrowLeft, ArrowRight, MessageSquare, FileText, Download, Send } from "lucide-react"

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
  { id: "producer-agreement", name: "Producer Agreement", description: "Agreement with music producers" },
  { id: "licensing-deal", name: "Licensing Deal", description: "Music licensing and usage rights" },
  { id: "distribution-deal", name: "Distribution Deal", description: "Music distribution agreement" },
]

function ContractWizardContent() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [contractData, setContractData] = useState({
    type: "",
    artistName: "",
    otherPartyName: "",
    duration: "",
    compensation: "",
    specificTerms: "",
    additionalClauses: "",
  })
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm here to help you create your contract. What questions do you have about the terms or legal requirements?",
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const templateId = searchParams.get("template")
    if (templateId) {
      setContractData((prev) => ({ ...prev, type: templateId }))
    }
  }, [searchParams])

  const handleInputChange = (field: string, value: string) => {
    setContractData((prev) => ({ ...prev, [field]: value }))
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
          content:
            "I apologize, but I encountered an error. Please try again or contact support if the issue persists.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const generateContract = () => {
    const selectedType = contractTypes.find((type) => type.id === contractData.type)
    return `
${selectedType?.name.toUpperCase() || "CONTRACT"}

This agreement is made between ${contractData.artistName || "[Artist Name]"} (the "Artist") and ${contractData.otherPartyName || "[Other Party]"} (the "Other Party").

TERM: ${contractData.duration || "[Duration]"}

COMPENSATION: ${contractData.compensation || "[Compensation Details]"}

SPECIFIC TERMS:
${contractData.specificTerms || "[Specific Terms]"}

ADDITIONAL CLAUSES:
${contractData.additionalClauses || "[Additional Clauses]"}

This contract is governed by applicable laws and regulations.

Signatures:
Artist: ___________________________ Date: ___________
Other Party: _______________________ Date: ___________
    `.trim()
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="contract-type">Contract Type</Label>
              <Select value={contractData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a contract type" />
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
              <Label htmlFor="artist-name">Artist/Your Name</Label>
              <Input
                id="artist-name"
                value={contractData.artistName}
                onChange={(e) => handleInputChange("artistName", e.target.value)}
                placeholder="Enter your name or artist name"
              />
            </div>
            <div>
              <Label htmlFor="other-party">Other Party Name</Label>
              <Input
                id="other-party"
                value={contractData.otherPartyName}
                onChange={(e) => handleInputChange("otherPartyName", e.target.value)}
                placeholder="Enter the other party's name"
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="duration">Contract Duration</Label>
              <Input
                id="duration"
                value={contractData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                placeholder="e.g., 2 years, 6 months, etc."
              />
            </div>
            <div>
              <Label htmlFor="compensation">Compensation Details</Label>
              <Textarea
                id="compensation"
                value={contractData.compensation}
                onChange={(e) => handleInputChange("compensation", e.target.value)}
                placeholder="Describe the compensation structure, percentages, fees, etc."
                rows={4}
              />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="specific-terms">Specific Terms</Label>
              <Textarea
                id="specific-terms"
                value={contractData.specificTerms}
                onChange={(e) => handleInputChange("specificTerms", e.target.value)}
                placeholder="Enter any specific terms, conditions, or requirements"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="additional-clauses">Additional Clauses</Label>
              <Textarea
                id="additional-clauses"
                value={contractData.additionalClauses}
                onChange={(e) => handleInputChange("additionalClauses", e.target.value)}
                placeholder="Any additional clauses, termination conditions, etc."
                rows={4}
              />
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Contract Preview</h3>
              <pre className="whitespace-pre-wrap text-sm">{generateContract()}</pre>
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
        )
      default:
        return null
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
                  <CardTitle>Step {currentStep} of 4</CardTitle>
                  <CardDescription>
                    {currentStep === 1 && "Basic Information"}
                    {currentStep === 2 && "Terms & Compensation"}
                    {currentStep === 3 && "Additional Details"}
                    {currentStep === 4 && "Review & Generate"}
                  </CardDescription>
                </div>
                <Badge variant="outline">{Math.round((currentStep / 4) * 100)}% Complete</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {renderStep()}
              <Separator className="my-6" />
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button onClick={nextStep} disabled={currentStep === 4}>
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
              <CardDescription>Ask questions about contract terms and legal requirements</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
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
              <form onSubmit={handleChatSubmit} className="flex space-x-2 mt-4">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about contract terms..."
                  disabled={isLoading}
                />
                <Button type="submit" size="sm" disabled={isLoading}>
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
