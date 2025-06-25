"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Target,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Download,
  Sparkles,
  Brain,
  TrendingUp,
  Music,
  Users,
  DollarSign,
  Lightbulb,
  Star,
  Loader2,
} from "lucide-react"
import Link from "next/link"

const careerStages = [
  { id: "beginner", label: "Just Starting Out", description: "New to music, building foundation" },
  { id: "developing", label: "Developing Artist", description: "Some experience, growing fanbase" },
  { id: "independent", label: "Independent Artist", description: "Established, self-managed" },
  { id: "signed", label: "Signed Artist", description: "Working with label/management" },
  { id: "professional", label: "Professional Artist", description: "Full-time music career" },
]

const musicGenres = [
  "Pop",
  "Hip-Hop",
  "Rock",
  "Electronic",
  "R&B",
  "Country",
  "Jazz",
  "Classical",
  "Folk",
  "Reggae",
  "Blues",
  "Metal",
  "Indie",
  "Alternative",
  "Funk",
  "Other",
]

const goalCategories = [
  { id: "music", label: "Music Creation", icon: Music, color: "bg-blue-100 text-blue-800" },
  { id: "business", label: "Business Growth", icon: TrendingUp, color: "bg-green-100 text-green-800" },
  { id: "audience", label: "Audience Building", icon: Users, color: "bg-purple-100 text-purple-800" },
  { id: "revenue", label: "Revenue Generation", icon: DollarSign, color: "bg-yellow-100 text-yellow-800" },
  { id: "creative", label: "Creative Development", icon: Lightbulb, color: "bg-pink-100 text-pink-800" },
  { id: "performance", label: "Live Performance", icon: Star, color: "bg-indigo-100 text-indigo-800" },
]

const timeframes = [
  { id: "1month", label: "1 Month", description: "Quick wins and immediate actions" },
  { id: "3months", label: "3 Months", description: "Short-term projects and goals" },
  { id: "6months", label: "6 Months", description: "Medium-term strategic objectives" },
  { id: "1year", label: "1 Year", description: "Long-term career milestones" },
]

export default function TaskGeneratorPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPlan, setGeneratedPlan] = useState<any>(null)

  const [formData, setFormData] = useState({
    // Personal Info
    artistName: "",
    careerStage: "",
    genre: "",
    currentSituation: "",

    // Goals & Objectives
    primaryGoal: "",
    goalCategory: "",
    timeframe: "",
    specificObjectives: "",

    // Resources & Constraints
    budget: "",
    timeAvailable: "",
    currentSkills: "",
    resources: "",

    // Challenges & Priorities
    biggestChallenge: "",
    priorities: [] as string[],
    successMetrics: "",
  })

  const { messages, append, isLoading } = useChat({
    api: "/api/chat",
    onFinish: (message) => {
      if (message.role === "assistant") {
        try {
          // Try to parse the AI response as structured data
          const planData = JSON.parse(message.content)
          setGeneratedPlan(planData)
        } catch {
          // If not JSON, treat as regular text plan
          setGeneratedPlan({ textPlan: message.content })
        }
        setIsGenerating(false)
      }
    },
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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

  const generateAIPlan = async () => {
    setIsGenerating(true)

    const prompt = `
    Create a comprehensive music career action plan for the following artist:

    ARTIST PROFILE:
    - Name: ${formData.artistName}
    - Career Stage: ${formData.careerStage}
    - Genre: ${formData.genre}
    - Current Situation: ${formData.currentSituation}

    GOALS & OBJECTIVES:
    - Primary Goal: ${formData.primaryGoal}
    - Category: ${formData.goalCategory}
    - Timeframe: ${formData.timeframe}
    - Specific Objectives: ${formData.specificObjectives}

    RESOURCES & CONSTRAINTS:
    - Budget: ${formData.budget}
    - Time Available: ${formData.timeAvailable}
    - Current Skills: ${formData.currentSkills}
    - Available Resources: ${formData.resources}

    CHALLENGES & PRIORITIES:
    - Biggest Challenge: ${formData.biggestChallenge}
    - Priorities: ${formData.priorities.join(", ")}
    - Success Metrics: ${formData.successMetrics}

    Please create a detailed, actionable plan with:
    1. Weekly tasks for the first month
    2. Monthly milestones for the timeframe
    3. Specific action items with deadlines
    4. Resource recommendations
    5. Success metrics and tracking methods
    6. Potential obstacles and solutions

    Format the response as a structured plan with clear sections and actionable tasks.
    `

    await append({
      role: "user",
      content: prompt,
    })
  }

  const downloadPlan = () => {
    if (!generatedPlan) return

    const planText = generatedPlan.textPlan || JSON.stringify(generatedPlan, null, 2)
    const blob = new Blob([planText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${formData.artistName.replace(/\s+/g, "_")}_Career_Plan_${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Tell Us About Yourself</h2>
              <p className="text-muted-foreground">Help us understand your current situation and background</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="artistName">Artist/Band Name</Label>
                <Input
                  id="artistName"
                  value={formData.artistName}
                  onChange={(e) => handleInputChange("artistName", e.target.value)}
                  placeholder="Enter your artist or band name"
                />
              </div>
              <div>
                <Label htmlFor="careerStage">Career Stage</Label>
                <Select value={formData.careerStage} onValueChange={(value) => handleInputChange("careerStage", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your current career stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {careerStages.map((stage) => (
                      <SelectItem key={stage.id} value={stage.id}>
                        <div>
                          <div className="font-medium">{stage.label}</div>
                          <div className="text-sm text-muted-foreground">{stage.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="genre">Primary Genre</Label>
                <Select value={formData.genre} onValueChange={(value) => handleInputChange("genre", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary music genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {musicGenres.map((genre) => (
                      <SelectItem key={genre} value={genre.toLowerCase()}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="currentSituation">Current Situation</Label>
                <Textarea
                  id="currentSituation"
                  value={formData.currentSituation}
                  onChange={(e) => handleInputChange("currentSituation", e.target.value)}
                  placeholder="Describe your current music career situation, recent achievements, and where you are now..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Define Your Goals</h2>
              <p className="text-muted-foreground">What do you want to achieve in your music career?</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="goalCategory">Goal Category</Label>
                <div className="grid gap-3 md:grid-cols-2 mt-2">
                  {goalCategories.map((category) => (
                    <Card
                      key={category.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        formData.goalCategory === category.id ? "ring-2 ring-purple-600 bg-purple-50" : ""
                      }`}
                      onClick={() => handleInputChange("goalCategory", category.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <category.icon className="h-6 w-6 text-purple-600" />
                          <div>
                            <h3 className="font-medium">{category.label}</h3>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="primaryGoal">Primary Goal</Label>
                <Input
                  id="primaryGoal"
                  value={formData.primaryGoal}
                  onChange={(e) => handleInputChange("primaryGoal", e.target.value)}
                  placeholder="e.g., Release my first album, Build a fanbase of 10K followers, Book 20 live shows"
                />
              </div>
              <div>
                <Label htmlFor="timeframe">Timeframe</Label>
                <div className="grid gap-3 md:grid-cols-2 mt-2">
                  {timeframes.map((timeframe) => (
                    <Card
                      key={timeframe.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        formData.timeframe === timeframe.id ? "ring-2 ring-purple-600 bg-purple-50" : ""
                      }`}
                      onClick={() => handleInputChange("timeframe", timeframe.id)}
                    >
                      <CardContent className="p-4">
                        <div>
                          <h3 className="font-medium">{timeframe.label}</h3>
                          <p className="text-sm text-muted-foreground">{timeframe.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="specificObjectives">Specific Objectives</Label>
                <Textarea
                  id="specificObjectives"
                  value={formData.specificObjectives}
                  onChange={(e) => handleInputChange("specificObjectives", e.target.value)}
                  placeholder="List specific, measurable objectives you want to achieve..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Resources & Constraints</h2>
              <p className="text-muted-foreground">Help us understand what you have to work with</p>
            </div>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="budget">Available Budget</Label>
                  <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Minimal ($0-$500)</SelectItem>
                      <SelectItem value="small">Small ($500-$2,000)</SelectItem>
                      <SelectItem value="moderate">Moderate ($2,000-$10,000)</SelectItem>
                      <SelectItem value="substantial">Substantial ($10,000+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timeAvailable">Time Available</Label>
                  <Select
                    value={formData.timeAvailable}
                    onValueChange={(value) => handleInputChange("timeAvailable", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time commitment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="part-time">Part-time (5-15 hours/week)</SelectItem>
                      <SelectItem value="significant">Significant (15-30 hours/week)</SelectItem>
                      <SelectItem value="full-time">Full-time (30+ hours/week)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="currentSkills">Current Skills & Strengths</Label>
                <Textarea
                  id="currentSkills"
                  value={formData.currentSkills}
                  onChange={(e) => handleInputChange("currentSkills", e.target.value)}
                  placeholder="List your current skills, talents, and strengths (e.g., songwriting, production, social media, networking)..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="resources">Available Resources</Label>
                <Textarea
                  id="resources"
                  value={formData.resources}
                  onChange={(e) => handleInputChange("resources", e.target.value)}
                  placeholder="What resources do you have access to? (e.g., home studio, instruments, team members, connections)..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Challenges & Priorities</h2>
              <p className="text-muted-foreground">What obstacles do you face and what matters most?</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="biggestChallenge">Biggest Challenge</Label>
                <Textarea
                  id="biggestChallenge"
                  value={formData.biggestChallenge}
                  onChange={(e) => handleInputChange("biggestChallenge", e.target.value)}
                  placeholder="What's the biggest obstacle or challenge you're facing in your music career right now?"
                  rows={3}
                />
              </div>
              <div>
                <Label>Top Priorities (select up to 3)</Label>
                <div className="grid gap-2 md:grid-cols-2 mt-2">
                  {[
                    "Creating new music",
                    "Building audience",
                    "Generating income",
                    "Improving skills",
                    "Networking",
                    "Live performances",
                    "Online presence",
                    "Business setup",
                  ].map((priority) => (
                    <div key={priority} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={priority}
                        checked={formData.priorities.includes(priority)}
                        onChange={(e) => {
                          const currentPriorities = formData.priorities
                          if (e.target.checked && currentPriorities.length < 3) {
                            handleInputChange("priorities", [...currentPriorities, priority])
                          } else if (!e.target.checked) {
                            handleInputChange(
                              "priorities",
                              currentPriorities.filter((p) => p !== priority),
                            )
                          }
                        }}
                        className="rounded"
                      />
                      <Label htmlFor={priority} className="text-sm">
                        {priority}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="successMetrics">How Will You Measure Success?</Label>
                <Textarea
                  id="successMetrics"
                  value={formData.successMetrics}
                  onChange={(e) => handleInputChange("successMetrics", e.target.value)}
                  placeholder="How will you know when you've achieved your goals? (e.g., number of streams, followers, income, shows booked)..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (generatedPlan) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              Your AI-Generated Career Plan
            </h1>
            <p className="text-muted-foreground">Personalized action plan for {formData.artistName}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setGeneratedPlan(null)}>
              Create New Plan
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={downloadPlan}>
              <Download className="mr-2 h-4 w-4" />
              Download Plan
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Personalized Career Plan</CardTitle>
            <CardDescription>AI-generated based on your goals and situation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                {generatedPlan.textPlan || JSON.stringify(generatedPlan, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Link href="/tasks">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Target className="mr-2 h-4 w-4" />
              Add Tasks to Task Manager
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/tools" className="flex items-center text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Link>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Brain className="h-8 w-8 text-purple-600" />
            AI Task & Goal Generator
          </h1>
          <p className="text-muted-foreground">Get personalized tasks and goals based on your music career situation</p>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent className="pt-6">{renderStep()}</CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        {currentStep === totalSteps ? (
          <Button
            onClick={generateAIPlan}
            className="bg-purple-600 hover:bg-purple-700"
            disabled={isGenerating || !formData.artistName || !formData.primaryGoal}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Plan...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate AI Plan
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={nextStep}
            className="bg-purple-600 hover:bg-purple-700"
            disabled={currentStep === 1 && !formData.artistName}
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {/* AI Generation Status */}
      {isGenerating && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              <div>
                <h4 className="font-semibold text-blue-800">AI is creating your personalized plan...</h4>
                <p className="text-sm text-blue-700">
                  Analyzing your goals, resources, and situation to create actionable tasks and milestones.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
