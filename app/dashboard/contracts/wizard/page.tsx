"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, FileText, Users, Eye, Download, Send, Sparkles, Edit } from "lucide-react"
import Link from "next/link"

export default function ContractWizardPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Contract Type
    contractType: "",
    templateId: "",

    // Step 2: Parties
    primaryParty: {
      name: "",
      email: "",
      address: "",
      role: "Artist",
    },
    secondaryParty: {
      name: "",
      email: "",
      address: "",
      role: "",
    },
    additionalParties: [],

    // Step 3: Project Details
    projectTitle: "",
    projectDescription: "",
    deliverables: [],
    timeline: {
      startDate: "",
      endDate: "",
      milestones: [],
    },

    // Step 4: Payment Terms
    paymentStructure: "",
    totalAmount: "",
    paymentSchedule: [],
    royaltyTerms: {
      percentage: "",
      type: "",
    },

    // Step 5: Legal Terms
    territory: "",
    exclusivity: "",
    terminationClause: "",
    disputeResolution: "",
    additionalTerms: "",

    // Step 6: Review
    aiGenerated: false,
    contractText: "",
  })

  const totalSteps = 6
  const progress = (currentStep / totalSteps) * 100

  const contractTypes = [
    {
      id: "record-deal",
      name: "Record Deal Agreement",
      description: "Comprehensive record label contract",
      icon: "🎵",
      complexity: "Advanced",
    },
    {
      id: "collaboration",
      name: "Artist Collaboration",
      description: "Agreement for artist-to-artist collaborations",
      icon: "🤝",
      complexity: "Intermediate",
    },
    {
      id: "performance",
      name: "Performance Contract",
      description: "Live performance and venue agreement",
      icon: "🎤",
      complexity: "Basic",
    },
    {
      id: "producer",
      name: "Producer Agreement",
      description: "Music production and beat licensing",
      icon: "🎛️",
      complexity: "Intermediate",
    },
    {
      id: "distribution",
      name: "Distribution Deal",
      description: "Music distribution and streaming",
      icon: "📱",
      complexity: "Advanced",
    },
    {
      id: "management",
      name: "Management Contract",
      description: "Artist management and representation",
      icon: "👔",
      complexity: "Advanced",
    },
  ]

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
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

  const generateContract = async () => {
    // Simulate AI contract generation
    setFormData((prev) => ({ ...prev, aiGenerated: true }))

    // Mock generated contract text
    const mockContract = `
MUSIC INDUSTRY CONTRACT

This ${formData.contractType} Agreement ("Agreement") is entered into on ${new Date().toLocaleDateString()} between:

PRIMARY PARTY: ${formData.primaryParty.name} ("${formData.primaryParty.role}")
Address: ${formData.primaryParty.address}
Email: ${formData.primaryParty.email}

SECONDARY PARTY: ${formData.secondaryParty.name} ("${formData.secondaryParty.role}")
Address: ${formData.secondaryParty.address}
Email: ${formData.secondaryParty.email}

PROJECT DETAILS:
Title: ${formData.projectTitle}
Description: ${formData.projectDescription}
Start Date: ${formData.timeline.startDate}
End Date: ${formData.timeline.endDate}

PAYMENT TERMS:
Structure: ${formData.paymentStructure}
Total Amount: ${formData.totalAmount}
${formData.royaltyTerms.percentage ? `Royalty: ${formData.royaltyTerms.percentage}% ${formData.royaltyTerms.type}` : ""}

LEGAL TERMS:
Territory: ${formData.territory}
Exclusivity: ${formData.exclusivity}
Termination: ${formData.terminationClause}
Dispute Resolution: ${formData.disputeResolution}

ADDITIONAL TERMS:
${formData.additionalTerms}

This Agreement shall be governed by the laws of the specified territory and any disputes shall be resolved through ${formData.disputeResolution}.

By signing below, both parties agree to the terms and conditions outlined in this Agreement.

_________________________                    _________________________
${formData.primaryParty.name}                ${formData.secondaryParty.name}
${formData.primaryParty.role}                ${formData.secondaryParty.role}

Date: _______________                         Date: _______________
    `

    setFormData((prev) => ({ ...prev, contractText: mockContract }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Choose Contract Type</h2>
              <p className="text-gray-600">Select the type of contract you want to create</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contractTypes.map((type) => (
                <Card
                  key={type.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    formData.contractType === type.id ? "ring-2 ring-purple-500 bg-purple-50" : ""
                  }`}
                  onClick={() => updateFormData("contractType", type.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{type.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{type.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{type.description}</p>
                        <Badge
                          className={`mt-2 ${
                            type.complexity === "Basic"
                              ? "bg-green-100 text-green-800"
                              : type.complexity === "Intermediate"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {type.complexity}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Party Information</h2>
              <p className="text-gray-600">Enter details for all parties involved in this contract</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Primary Party */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Primary Party (You)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="primary-name">Full Name</Label>
                    <Input
                      id="primary-name"
                      value={formData.primaryParty.name}
                      onChange={(e) =>
                        updateFormData("primaryParty", {
                          ...formData.primaryParty,
                          name: e.target.value,
                        })
                      }
                      placeholder="Your full legal name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="primary-email">Email Address</Label>
                    <Input
                      id="primary-email"
                      type="email"
                      value={formData.primaryParty.email}
                      onChange={(e) =>
                        updateFormData("primaryParty", {
                          ...formData.primaryParty,
                          email: e.target.value,
                        })
                      }
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="primary-address">Address</Label>
                    <Textarea
                      id="primary-address"
                      value={formData.primaryParty.address}
                      onChange={(e) =>
                        updateFormData("primaryParty", {
                          ...formData.primaryParty,
                          address: e.target.value,
                        })
                      }
                      placeholder="Your full address"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="primary-role">Role</Label>
                    <Select
                      value={formData.primaryParty.role}
                      onValueChange={(value) =>
                        updateFormData("primaryParty", {
                          ...formData.primaryParty,
                          role: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Artist">Artist</SelectItem>
                        <SelectItem value="Producer">Producer</SelectItem>
                        <SelectItem value="Songwriter">Songwriter</SelectItem>
                        <SelectItem value="Band">Band</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Secondary Party */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Secondary Party
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="secondary-name">Full Name</Label>
                    <Input
                      id="secondary-name"
                      value={formData.secondaryParty.name}
                      onChange={(e) =>
                        updateFormData("secondaryParty", {
                          ...formData.secondaryParty,
                          name: e.target.value,
                        })
                      }
                      placeholder="Other party's full legal name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="secondary-email">Email Address</Label>
                    <Input
                      id="secondary-email"
                      type="email"
                      value={formData.secondaryParty.email}
                      onChange={(e) =>
                        updateFormData("secondaryParty", {
                          ...formData.secondaryParty,
                          email: e.target.value,
                        })
                      }
                      placeholder="their@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="secondary-address">Address</Label>
                    <Textarea
                      id="secondary-address"
                      value={formData.secondaryParty.address}
                      onChange={(e) =>
                        updateFormData("secondaryParty", {
                          ...formData.secondaryParty,
                          address: e.target.value,
                        })
                      }
                      placeholder="Their full address"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="secondary-role">Role</Label>
                    <Select
                      value={formData.secondaryParty.role}
                      onValueChange={(value) =>
                        updateFormData("secondaryParty", {
                          ...formData.secondaryParty,
                          role: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select their role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Record Label">Record Label</SelectItem>
                        <SelectItem value="Producer">Producer</SelectItem>
                        <SelectItem value="Artist">Artist</SelectItem>
                        <SelectItem value="Venue">Venue</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Distributor">Distributor</SelectItem>
                        <SelectItem value="Publisher">Publisher</SelectItem>
                      </SelectContent>
                    </Select>
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
              <h2 className="text-2xl font-bold mb-2">Project Details</h2>
              <p className="text-gray-600">Specify the project or work covered by this contract</p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label htmlFor="project-title">Project Title</Label>
                  <Input
                    id="project-title"
                    value={formData.projectTitle}
                    onChange={(e) => updateFormData("projectTitle", e.target.value)}
                    placeholder="e.g., Album Recording, Single Release, Live Performance"
                  />
                </div>

                <div>
                  <Label htmlFor="project-description">Project Description</Label>
                  <Textarea
                    id="project-description"
                    value={formData.projectDescription}
                    onChange={(e) => updateFormData("projectDescription", e.target.value)}
                    placeholder="Detailed description of the project, including scope, expectations, and deliverables"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={formData.timeline.startDate}
                      onChange={(e) =>
                        updateFormData("timeline", {
                          ...formData.timeline,
                          startDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-date">End Date</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={formData.timeline.endDate}
                      onChange={(e) =>
                        updateFormData("timeline", {
                          ...formData.timeline,
                          endDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label>Key Deliverables</Label>
                  <div className="space-y-2 mt-2">
                    {["Master recordings", "Mixed tracks", "Promotional materials", "Performance rights"].map(
                      (deliverable) => (
                        <div key={deliverable} className="flex items-center space-x-2">
                          <Checkbox
                            id={deliverable}
                            checked={formData.deliverables.includes(deliverable)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateFormData("deliverables", [...formData.deliverables, deliverable])
                              } else {
                                updateFormData(
                                  "deliverables",
                                  formData.deliverables.filter((d) => d !== deliverable),
                                )
                              }
                            }}
                          />
                          <Label htmlFor={deliverable}>{deliverable}</Label>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Payment Terms</h2>
              <p className="text-gray-600">Define the financial structure of this agreement</p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label>Payment Structure</Label>
                  <RadioGroup
                    value={formData.paymentStructure}
                    onValueChange={(value) => updateFormData("paymentStructure", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fixed" id="fixed" />
                      <Label htmlFor="fixed">Fixed Amount</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="royalty" id="royalty" />
                      <Label htmlFor="royalty">Royalty-based</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hybrid" id="hybrid" />
                      <Label htmlFor="hybrid">Fixed + Royalty</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="revenue-share" id="revenue-share" />
                      <Label htmlFor="revenue-share">Revenue Share</Label>
                    </div>
                  </RadioGroup>
                </div>

                {(formData.paymentStructure === "fixed" || formData.paymentStructure === "hybrid") && (
                  <div>
                    <Label htmlFor="total-amount">Total Amount ($)</Label>
                    <Input
                      id="total-amount"
                      type="number"
                      value={formData.totalAmount}
                      onChange={(e) => updateFormData("totalAmount", e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                )}

                {(formData.paymentStructure === "royalty" ||
                  formData.paymentStructure === "hybrid" ||
                  formData.paymentStructure === "revenue-share") && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="royalty-percentage">Royalty Percentage (%)</Label>
                      <Input
                        id="royalty-percentage"
                        type="number"
                        value={formData.royaltyTerms.percentage}
                        onChange={(e) =>
                          updateFormData("royaltyTerms", {
                            ...formData.royaltyTerms,
                            percentage: e.target.value,
                          })
                        }
                        placeholder="0"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="royalty-type">Royalty Type</Label>
                      <Select
                        value={formData.royaltyTerms.type}
                        onValueChange={(value) =>
                          updateFormData("royaltyTerms", {
                            ...formData.royaltyTerms,
                            type: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select royalty type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="net-revenue">Net Revenue</SelectItem>
                          <SelectItem value="gross-revenue">Gross Revenue</SelectItem>
                          <SelectItem value="mechanical">Mechanical Royalties</SelectItem>
                          <SelectItem value="performance">Performance Royalties</SelectItem>
                          <SelectItem value="sync">Sync Royalties</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div>
                  <Label>Payment Schedule</Label>
                  <RadioGroup className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upfront" id="upfront" />
                      <Label htmlFor="upfront">100% Upfront</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="50-50" id="50-50" />
                      <Label htmlFor="50-50">50% Upfront, 50% on Completion</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="milestone" id="milestone" />
                      <Label htmlFor="milestone">Milestone-based Payments</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly">Monthly Payments</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Legal Terms</h2>
              <p className="text-gray-600">Define the legal framework and conditions</p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label htmlFor="territory">Territory</Label>
                  <Select value={formData.territory} onValueChange={(value) => updateFormData("territory", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select territory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="worldwide">Worldwide</SelectItem>
                      <SelectItem value="north-america">North America</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="asia">Asia</SelectItem>
                      <SelectItem value="other">Other (specify in additional terms)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Exclusivity</Label>
                  <RadioGroup
                    value={formData.exclusivity}
                    onValueChange={(value) => updateFormData("exclusivity", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="exclusive" id="exclusive" />
                      <Label htmlFor="exclusive">Exclusive Agreement</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="non-exclusive" id="non-exclusive" />
                      <Label htmlFor="non-exclusive">Non-Exclusive Agreement</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="semi-exclusive" id="semi-exclusive" />
                      <Label htmlFor="semi-exclusive">Semi-Exclusive (with restrictions)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="termination">Termination Clause</Label>
                  <Select
                    value={formData.terminationClause}
                    onValueChange={(value) => updateFormData("terminationClause", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select termination terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30-days">30 days written notice</SelectItem>
                      <SelectItem value="60-days">60 days written notice</SelectItem>
                      <SelectItem value="90-days">90 days written notice</SelectItem>
                      <SelectItem value="breach">For cause/breach only</SelectItem>
                      <SelectItem value="mutual">Mutual agreement only</SelectItem>
                      <SelectItem value="fixed-term">Fixed term, no early termination</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dispute-resolution">Dispute Resolution</Label>
                  <Select
                    value={formData.disputeResolution}
                    onValueChange={(value) => updateFormData("disputeResolution", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select dispute resolution method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mediation">Mediation</SelectItem>
                      <SelectItem value="arbitration">Binding Arbitration</SelectItem>
                      <SelectItem value="court">Court Litigation</SelectItem>
                      <SelectItem value="mediation-arbitration">Mediation, then Arbitration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="additional-terms">Additional Terms & Conditions</Label>
                  <Textarea
                    id="additional-terms"
                    value={formData.additionalTerms}
                    onChange={(e) => updateFormData("additionalTerms", e.target.value)}
                    placeholder="Any additional clauses, special conditions, or specific requirements..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Review & Generate</h2>
              <p className="text-gray-600">Review your contract details and generate the final document</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contract Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Contract Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-600">Contract Type</h4>
                    <p className="capitalize">{formData.contractType?.replace("-", " ")}</p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-sm text-gray-600">Parties</h4>
                    <p>
                      <strong>{formData.primaryParty.name}</strong> ({formData.primaryParty.role})
                    </p>
                    <p>
                      <strong>{formData.secondaryParty.name}</strong> ({formData.secondaryParty.role})
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-sm text-gray-600">Project</h4>
                    <p>
                      <strong>{formData.projectTitle}</strong>
                    </p>
                    <p className="text-sm text-gray-600">
                      {formData.timeline.startDate} - {formData.timeline.endDate}
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-sm text-gray-600">Payment</h4>
                    <p className="capitalize">{formData.paymentStructure?.replace("-", " ")}</p>
                    {formData.totalAmount && <p>${formData.totalAmount}</p>}
                    {formData.royaltyTerms.percentage && (
                      <p>
                        {formData.royaltyTerms.percentage}% {formData.royaltyTerms.type}
                      </p>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-sm text-gray-600">Legal Terms</h4>
                    <p>Territory: {formData.territory}</p>
                    <p>Exclusivity: {formData.exclusivity}</p>
                    <p>Termination: {formData.terminationClause}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Generated Contract */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Generated Contract
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!formData.aiGenerated ? (
                    <div className="text-center py-8">
                      <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Ready to Generate</h3>
                      <p className="text-gray-600 mb-4">Click the button below to generate your contract using AI</p>
                      <Button onClick={generateContract} className="w-full">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Contract with AI
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 text-green-800">
                          <Sparkles className="w-4 h-4" />
                          <span className="font-semibold">Contract Generated Successfully!</span>
                        </div>
                        <p className="text-green-700 text-sm mt-1">
                          Your contract has been generated and is ready for review.
                        </p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                        <pre className="text-xs whitespace-pre-wrap font-mono">{formData.contractText}</pre>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 bg-transparent">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Contract
                        </Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button className="flex-1">
                          <Send className="w-4 h-4 mr-2" />
                          Send for Signature
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/contracts">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Contracts
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Contract Wizard</h1>
            <p className="text-gray-600">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent className="p-8">{renderStep()}</CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {currentStep < totalSteps ? (
          <Button
            onClick={nextStep}
            disabled={
              (currentStep === 1 && !formData.contractType) ||
              (currentStep === 2 && (!formData.primaryParty.name || !formData.secondaryParty.name)) ||
              (currentStep === 3 && !formData.projectTitle) ||
              (currentStep === 4 && !formData.paymentStructure) ||
              (currentStep === 5 && (!formData.territory || !formData.exclusivity))
            }
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button asChild>
            <Link href="/dashboard/contracts">
              <FileText className="w-4 h-4 mr-2" />
              Save Contract
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
