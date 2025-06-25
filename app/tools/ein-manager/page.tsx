"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Building, CheckCircle, Clock, AlertCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function EINManager() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const steps = [
    { id: 1, title: "Business Structure", description: "Choose your business type" },
    { id: 2, title: "Business Information", description: "Provide business details" },
    { id: 3, title: "EIN Application", description: "Apply for your EIN" },
    { id: 4, title: "Next Steps", description: "Complete your setup" },
  ]

  return (
    <div className="space-y-6 p-6 bg-armie-accent/30 min-h-screen">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-lg bg-slate-100 text-slate-800 dark:bg-slate-950/30 dark:text-slate-400">
            <Building className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight armie-primary">EIN Manager</h1>
            <p className="text-muted-foreground">Set up your music business legally with proper tax identification</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-950/30 dark:text-slate-400">
                Business & Admin
              </Badge>
              <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-950/30 dark:text-gray-400">Low Usage</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Progress Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="armie-primary text-sm">Setup Progress</CardTitle>
              <Progress value={(currentStep / totalSteps) * 100} className="mt-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      currentStep === step.id
                        ? "bg-armie-secondary/20 border border-armie-secondary/30"
                        : currentStep > step.id
                          ? "bg-green-50 dark:bg-green-950/20"
                          : "bg-gray-50 dark:bg-gray-950/20"
                    }`}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    <div className="flex items-center space-x-2">
                      {currentStep > step.id ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : currentStep === step.id ? (
                        <Clock className="w-4 h-4 text-armie-secondary" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                      )}
                      <div>
                        <h4 className="text-sm font-medium armie-primary">{step.title}</h4>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="armie-primary">
                Step {currentStep}: {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription>{steps[currentStep - 1].description}</CardDescription>
            </CardHeader>
            <CardContent>
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-blue-900 dark:text-blue-100">Why You Need an EIN</h3>
                        <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                          An Employer Identification Number (EIN) is required for tax purposes, opening business bank
                          accounts, and establishing your music career as a legitimate business entity.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium armie-primary mb-4">Choose Your Business Structure</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 border rounded-lg hover:border-armie-secondary/50 cursor-pointer">
                        <h4 className="font-medium armie-primary">Sole Proprietorship</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Simplest structure. You are the business. Personal liability for debts.
                        </p>
                        <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                          <li>• Easy to set up and maintain</li>
                          <li>• Direct tax implications</li>
                          <li>• Personal liability</li>
                        </ul>
                      </div>

                      <div className="p-4 border rounded-lg hover:border-armie-secondary/50 cursor-pointer">
                        <h4 className="font-medium armie-primary">Single-Member LLC</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Limited liability protection. Separate business entity. More professional.
                        </p>
                        <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                          <li>• Limited personal liability</li>
                          <li>• Professional credibility</li>
                          <li>• More paperwork required</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium armie-primary">Select Business Structure</label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Choose your business structure" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                        <SelectItem value="single-llc">Single-Member LLC</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="corporation">Corporation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium armie-primary">Legal Business Name</label>
                      <Input placeholder="Your official business name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium armie-primary">Trade Name (DBA)</label>
                      <Input placeholder="Doing business as (if different)" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium armie-primary">Business Address</label>
                    <Input placeholder="Street address" className="mt-2" />
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <Input placeholder="City" />
                      <Input placeholder="State" />
                      <Input placeholder="ZIP Code" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium armie-primary">Responsible Party Name</label>
                      <Input placeholder="Your full legal name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium armie-primary">SSN or ITIN</label>
                      <Input placeholder="Your tax identification number" type="password" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium armie-primary">Business Purpose</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="music-production">Music Production</SelectItem>
                        <SelectItem value="entertainment">Entertainment Services</SelectItem>
                        <SelectItem value="recording-artist">Recording Artist</SelectItem>
                        <SelectItem value="music-publishing">Music Publishing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="p-4 bg-armie-secondary/10 rounded-lg">
                    <h3 className="font-medium armie-primary mb-2">Ready to Apply for EIN</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll guide you through the IRS application process. You can apply online directly with the IRS or
                      use our assisted application service.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium armie-primary">Direct IRS Application</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Apply directly through the IRS website. Free but requires navigating government forms.
                      </p>
                      <Button variant="outline" className="w-full mt-3">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Go to IRS Website
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg bg-armie-secondary/5">
                      <h4 className="font-medium armie-primary">Assisted Application</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        We'll help you complete and submit your application with expert guidance.
                      </p>
                      <Button className="w-full mt-3 bg-armie-secondary hover:bg-armie-secondary/80 text-armie-primary">
                        Start Assisted Application
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <h4 className="font-medium text-yellow-900 dark:text-yellow-100">What You'll Need</h4>
                    <ul className="text-sm text-yellow-700 dark:text-yellow-300 mt-2 space-y-1">
                      <li>• Your Social Security Number or ITIN</li>
                      <li>• Business address and contact information</li>
                      <li>• Business structure details</li>
                      <li>• Reason for applying (new business)</li>
                    </ul>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <div>
                        <h3 className="font-medium text-green-900 dark:text-green-100">EIN Application Submitted!</h3>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          Your EIN application has been submitted. You should receive your number within 1-2 business
                          days.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium armie-primary mb-4">Next Steps for Your Music Business</h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium armie-primary text-sm">Open Business Bank Account</h4>
                        <p className="text-xs text-muted-foreground">Separate your business and personal finances</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium armie-primary text-sm">Set Up Accounting System</h4>
                        <p className="text-xs text-muted-foreground">Track income and expenses for tax purposes</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium armie-primary text-sm">Register with PROs</h4>
                        <p className="text-xs text-muted-foreground">ASCAP, BMI, or SESAC for royalty collection</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium armie-primary text-sm">Consider Business Insurance</h4>
                        <p className="text-xs text-muted-foreground">Protect your equipment and liability</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-armie-primary hover:bg-armie-primary/80 text-armie-accent">
                    Complete Setup Checklist
                  </Button>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                  disabled={currentStep === totalSteps}
                  className="bg-armie-primary hover:bg-armie-primary/80 text-armie-accent"
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
