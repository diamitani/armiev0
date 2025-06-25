"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, FileText, Upload, CheckCircle, Clock, Sparkles } from "lucide-react"
import Link from "next/link"

export default function EPKAssistant() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const totalSteps = 5

  const steps = [
    { id: 1, title: "Basic Information", description: "Artist details and contact" },
    { id: 2, title: "Music & Media", description: "Songs, photos, and videos" },
    { id: 3, title: "Biography", description: "Artist story and background" },
    { id: 4, title: "Press & Achievements", description: "Reviews, awards, and coverage" },
    { id: 5, title: "Review & Generate", description: "Finalize your EPK" },
  ]

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      // Would generate and download EPK
    }, 3000)
  }

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
          <div className="p-3 rounded-lg bg-teal-100 text-teal-800 dark:bg-teal-950/30 dark:text-teal-400">
            <FileText className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight armie-primary">EPK Assistant</h1>
            <p className="text-muted-foreground">
              Create professional Electronic Press Kits for media and industry contacts
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-950/30 dark:text-teal-400">
                Media & Promotion
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-400">
                Medium Usage
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Progress Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="armie-primary text-sm">EPK Progress</CardTitle>
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
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium armie-primary">Artist/Band Name</label>
                      <Input placeholder="Your stage name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium armie-primary">Genre</label>
                      <Input placeholder="e.g., Indie Pop, Electronic" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium armie-primary">Location</label>
                      <Input placeholder="City, State/Country" />
                    </div>
                    <div>
                      <label className="text-sm font-medium armie-primary">Contact Email</label>
                      <Input placeholder="booking@yourname.com" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium armie-primary">Website/Social Links</label>
                    <Textarea placeholder="List your website, Spotify, Instagram, etc." rows={3} />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium armie-primary">Featured Tracks</label>
                    <div className="mt-2 space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Audio Files (MP3, WAV)
                      </Button>
                      <p className="text-xs text-muted-foreground">Upload 3-5 of your best tracks</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium armie-primary">Press Photos</label>
                    <div className="mt-2 space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload High-Resolution Photos
                      </Button>
                      <p className="text-xs text-muted-foreground">Professional photos in high resolution</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium armie-primary">Music Videos/Live Performance</label>
                    <Textarea placeholder="YouTube/Vimeo links to your videos" rows={3} />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium armie-primary">Artist Biography</label>
                    <Textarea
                      placeholder="Tell your story - background, musical journey, influences, and what makes you unique"
                      rows={6}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium armie-primary">Musical Style & Influences</label>
                    <Textarea placeholder="Describe your sound and key influences" rows={3} />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium armie-primary">Press Coverage</label>
                    <Textarea placeholder="List any press coverage, reviews, interviews, or features" rows={4} />
                  </div>
                  <div>
                    <label className="text-sm font-medium armie-primary">Awards & Recognition</label>
                    <Textarea placeholder="Any awards, contest wins, or notable recognition" rows={3} />
                  </div>
                  <div>
                    <label className="text-sm font-medium armie-primary">Notable Performances</label>
                    <Textarea placeholder="Venues played, festivals, opening acts, etc." rows={3} />
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="p-4 bg-armie-secondary/10 rounded-lg">
                    <h3 className="font-medium armie-primary mb-2">EPK Preview</h3>
                    <p className="text-sm text-muted-foreground">
                      Your Electronic Press Kit will include all the information and media you've provided, formatted
                      professionally for industry contacts, media, and venues.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white rounded-lg border">
                      <h4 className="font-medium text-sm armie-primary">Included Sections</h4>
                      <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                        <li>• Artist Information & Contact</li>
                        <li>• Professional Biography</li>
                        <li>• Featured Music Tracks</li>
                        <li>• High-Resolution Photos</li>
                        <li>• Press Coverage & Reviews</li>
                        <li>• Performance History</li>
                        <li>• Social Media Links</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white rounded-lg border">
                      <h4 className="font-medium text-sm armie-primary">Export Formats</h4>
                      <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                        <li>• PDF Document</li>
                        <li>• Web Page (HTML)</li>
                        <li>• Email Template</li>
                        <li>• Social Media Kit</li>
                      </ul>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-armie-secondary hover:bg-armie-secondary/80 text-armie-primary"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Generating EPK...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Complete EPK
                      </>
                    )}
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
