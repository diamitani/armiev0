"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ArrowLeft, ArrowRight, MessageSquare, Download, Copy, CheckCircle, Wand2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { generateText } from "ai" // Import generateText from AI SDK
import { openai } from "@ai-sdk/openai" // Import openai model

interface ContractData {
  title: string
  type: string
  counterparty_name: string
  counterparty_email: string
  start_date: Date | undefined
  end_date: Date | undefined
  value: string
  currency: string
  terms: string
  additional_terms: string
}

const contractTypes = [
  {
    value: "artist-management",
    label: "Artist Management Agreement",
    description: "Comprehensive management services contract",
    icon: "👤",
  },
  {
    value: "recording-contract",
    label: "Recording Contract",
    description: "Music recording and production agreement",
    icon: "🎵",
  },
  {
    value: "publishing-deal",
    label: "Music Publishing Agreement",
    description: "Rights management and royalty distribution",
    icon: "📝",
  },
  {
    value: "producer-agreement",
    label: "Producer Agreement",
    description: "Music production services contract",
    icon: "🎛️",
  },
  {
    value: "performance-agreement",
    label: "Performance Agreement",
    description: "Live performance booking contract",
    icon: "🎤",
  },
  {
    value: "collaboration-agreement",
    label: "Artist Collaboration Agreement",
    description: "Joint creative project contract",
    icon: "🤝",
  },
]

const currencies = ["USD", "EUR", "GBP", "CAD", "AUD"]

export default function ContractWizard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedTemplate = searchParams.get("template")

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [contractData, setContractData] = useState<ContractData>({
    title: "",
    type: preselectedTemplate || "",
    counterparty_name: "",
    counterparty_email: "",
    start_date: undefined,
    end_date: undefined,
    value: "",
    currency: "USD",
    terms: "",
    additional_terms: "",
  })

  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content: preselectedTemplate
        ? `Hi! I see you're creating a ${contractTypes.find((t) => t.value === preselectedTemplate)?.label}. I'm here to help you customize this contract with your specific details. What questions do you have about this type of agreement?`
        : "Hi! I'm here to help you create a professional contract. What type of agreement are you looking to create today?",
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [isChatLoading, setIsChatLoading] = useState(false)

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  // Set default title when contract type changes
  useEffect(() => {
    if (contractData.type && !contractData.title) {
      const selectedType = contractTypes.find((t) => t.value === contractData.type)
      if (selectedType) {
        setContractData((prev) => ({
          ...prev,
          title: selectedType.label,
        }))
      }
    }
  }, [contractData.type])

  const updateContractData = (field: keyof ContractData, value: any) => {
    setContractData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return contractData.type && contractData.title
      case 2:
        return contractData.counterparty_name && contractData.counterparty_email
      case 3:
        return contractData.start_date && contractData.terms
      case 4:
        return true
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const contractId = `contract-${Date.now()}`

      // Store contract data in localStorage for demo purposes
      const newContract = {
        id: contractId,
        ...contractData,
        status: "draft",
        created_at: new Date().toISOString(),
        start_date: contractData.start_date?.toISOString(),
        end_date: contractData.end_date?.toISOString(),
        value: contractData.value ? Number.parseFloat(contractData.value) : undefined,
        terms: `${contractData.terms}\n\nAdditional Terms:\n${contractData.additional_terms}`,
      }

      // Store in localStorage
      const existingContracts = JSON.parse(localStorage.getItem("user_contracts") || "[]")
      existingContracts.push(newContract)
      localStorage.setItem("user_contracts", JSON.stringify(existingContracts))

      toast.success("Contract created successfully!")
      router.push(`/dashboard/contracts/${contractId}`)
    } catch (error) {
      console.error("Error creating contract:", error)
      toast.error("Failed to create contract. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return

    const userMessage = chatInput
    setChatInput("")
    setChatMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsChatLoading(true)

    try {
      const contractTypeInfo = contractTypes.find((t) => t.value === contractData.type)
      const prompt = `You are an AI assistant specializing in music industry contracts. The user is currently working on a "${contractTypeInfo?.label || "general music contract"}". The user asked: "${userMessage}". Provide helpful, concise advice or information related to this contract type. If the question is general, provide general contract advice. Keep your response under 200 words.`

      const { text } = await generateText({
        model: openai("gpt-4o"), // Using OpenAI's gpt-4o model
        prompt: prompt,
      })

      setChatMessages((prev) => [...prev, { role: "assistant", content: text }])
      setIsChatLoading(false)
    } catch (error) {
      console.error("Chat error:", error)
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I apologize, but I'm having trouble responding right now. Please try again." },
      ])
      setIsChatLoading(false)
    }
  }

  const generateContractPreview = () => {
    const contractTypeInfo = contractTypes.find((t) => t.value === contractData.type)
    return `
${contractData.title || "Contract Title"}

This ${contractTypeInfo?.label || "Agreement"} is entered into between:

Party A: [Your Name/Company]
Party B: ${contractData.counterparty_name || "[Counterparty Name]"}
Email: ${contractData.counterparty_email || "[Email Address]"}

Effective Date: ${contractData.start_date ? format(contractData.start_date, "MMMM d, yyyy") : "[Start Date]"}
${contractData.end_date ? `End Date: ${format(contractData.end_date, "MMMM d, yyyy")}` : ""}

${contractData.value ? `Contract Value: ${contractData.currency} ${contractData.value}` : ""}

TERMS AND CONDITIONS:
${contractData.terms || "[Contract terms will be specified here]"}

${contractData.additional_terms ? `ADDITIONAL TERMS:\n${contractData.additional_terms}` : ""}

This agreement shall be governed by applicable laws and regulations.

Signatures:
_________________    _________________
Party A              Party B

Date: ___________    Date: ___________
    `.trim()
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }

  const downloadContract = () => {
    const content = generateContractPreview()
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${contractData.title || "contract"}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Contract downloaded!")
  }

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Contracts
        </Button>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Wand2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Contract Wizard</h1>
            <p className="text-muted-foreground">Create professional contracts with guided assistance</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="wizard" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="wizard">Step-by-Step Wizard</TabsTrigger>
          <TabsTrigger value="chat">AI Chat Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="wizard" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    Step {currentStep} of {totalSteps}
                  </CardTitle>
                  <CardDescription>
                    {currentStep === 1 && "Choose your contract type and basic information"}
                    {currentStep === 2 && "Enter counterparty details"}
                    {currentStep === 3 && "Define contract terms and duration"}
                    {currentStep === 4 && "Review and finalize your contract"}
                  </CardDescription>
                </div>
                <Badge variant="outline">{Math.round(progress)}% Complete</Badge>
              </div>
              <Progress value={progress} className="w-full" />
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="type">Contract Type</Label>
                    <Select value={contractData.type} onValueChange={(value) => updateContractData("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select contract type" />
                      </SelectTrigger>
                      <SelectContent>
                        {contractTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <span>{type.icon}</span>
                              <div>
                                <div className="font-medium">{type.label}</div>
                                <div className="text-sm text-muted-foreground">{type.description}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="title">Contract Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Artist Management Agreement - John Doe"
                      value={contractData.title}
                      onChange={(e) => updateContractData("title", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="counterparty_name">Counterparty Name</Label>
                    <Input
                      id="counterparty_name"
                      placeholder="Full name or company name"
                      value={contractData.counterparty_name}
                      onChange={(e) => updateContractData("counterparty_name", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="counterparty_email">Counterparty Email</Label>
                    <Input
                      id="counterparty_email"
                      type="email"
                      placeholder="email@example.com"
                      value={contractData.counterparty_email}
                      onChange={(e) => updateContractData("counterparty_email", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !contractData.start_date && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {contractData.start_date ? format(contractData.start_date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={contractData.start_date}
                            onSelect={(date) => updateContractData("start_date", date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label>End Date (Optional)</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !contractData.end_date && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {contractData.end_date ? format(contractData.end_date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={contractData.end_date}
                            onSelect={(date) => updateContractData("end_date", date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="value">Contract Value (Optional)</Label>
                      <Input
                        id="value"
                        type="number"
                        placeholder="0.00"
                        value={contractData.value}
                        onChange={(e) => updateContractData("value", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select
                        value={contractData.currency}
                        onValueChange={(value) => updateContractData("currency", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency} value={currency}>
                              {currency}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="terms">Contract Terms</Label>
                    <Textarea
                      id="terms"
                      placeholder="Describe the main terms, responsibilities, and conditions of this contract..."
                      className="min-h-[120px]"
                      value={contractData.terms}
                      onChange={(e) => updateContractData("terms", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="additional_terms">Additional Terms (Optional)</Label>
                    <Textarea
                      id="additional_terms"
                      placeholder="Add any additional clauses, special conditions, or notes..."
                      className="min-h-[100px]"
                      value={contractData.additional_terms}
                      onChange={(e) => updateContractData("additional_terms", e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>Contract Preview</Label>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(generateContractPreview())}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm" onClick={downloadContract}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm font-mono">{generateContractPreview()}</pre>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button onClick={nextStep} disabled={!validateCurrentStep()}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isSubmitting || !validateCurrentStep()}>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        Create Contract
                        <CheckCircle className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                AI Contract Assistant
              </CardTitle>
              <CardDescription>Chat with our AI to get personalized contract advice and assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted rounded-lg p-4 max-h-96 overflow-y-auto space-y-4">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg px-4 py-2",
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-background border",
                        )}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isChatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-background border rounded-lg px-4 py-2">
                        <p className="text-sm text-muted-foreground">AI is typing...</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about contract terms, legal requirements, or get suggestions..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleChatSubmit()}
                  />
                  <Button onClick={handleChatSubmit} disabled={isChatLoading || !chatInput.trim()}>
                    Send
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setChatInput("What should I include in a management contract?")}
                  >
                    Management Contract Tips
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setChatInput("How do I set fair royalty rates?")}>
                    Royalty Rate Guidance
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setChatInput("What are standard contract durations?")}
                  >
                    Contract Duration
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setChatInput("Help me with termination clauses")}>
                    Termination Clauses
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
