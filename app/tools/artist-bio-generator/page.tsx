"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, User, Copy, Download, RefreshCw, Sparkles, Award, Music, MapPin } from "lucide-react"
import { toast } from "sonner"

export default function ArtistBioGeneratorPage() {
  const [formData, setFormData] = useState({
    artistName: "",
    genre: "",
    location: "",
    yearsActive: "",
    achievements: "",
    influences: "",
    currentProjects: "",
    personalStory: "",
    bioType: "short",
    tone: "professional",
  })
  const [generatedBio, setGeneratedBio] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const bioTypes = [
    { value: "short", label: "Short Bio (50-100 words)" },
    { value: "medium", label: "Medium Bio (150-250 words)" },
    { value: "long", label: "Long Bio (300-500 words)" },
    { value: "press", label: "Press Release Bio" },
    { value: "social", label: "Social Media Bio" },
  ]

  const tones = [
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual & Friendly" },
    { value: "artistic", label: "Artistic & Creative" },
    { value: "edgy", label: "Edgy & Bold" },
    { value: "inspirational", label: "Inspirational" },
  ]

  const genres = [
    "Pop",
    "Rock",
    "Hip-Hop",
    "R&B",
    "Country",
    "Folk",
    "Electronic",
    "Jazz",
    "Blues",
    "Reggae",
    "Punk",
    "Metal",
    "Indie",
    "Alternative",
    "Classical",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateBio = async () => {
    if (!formData.artistName.trim()) {
      toast.error("Please enter your artist name")
      return
    }

    setIsGenerating(true)
    try {
      const prompt = `Create a ${formData.bioType} artist biography with the following information:

Artist Name: ${formData.artistName}
Genre: ${formData.genre || "Not specified"}
Location: ${formData.location || "Not specified"}
Years Active: ${formData.yearsActive || "Not specified"}
Key Achievements: ${formData.achievements || "None specified"}
Musical Influences: ${formData.influences || "Not specified"}
Current Projects: ${formData.currentProjects || "Not specified"}
Personal Story: ${formData.personalStory || "Not specified"}

Bio Type: ${formData.bioType}
Tone: ${formData.tone}

Requirements:
- Make it engaging and professional
- Highlight unique aspects of the artist
- Include relevant achievements and background
- Make it suitable for ${formData.bioType === "press" ? "press releases and media kits" : formData.bioType === "social" ? "social media profiles" : "general promotional use"}
- Keep the tone ${formData.tone}
- Focus on what makes this artist special and memorable

Please write a compelling biography that tells the artist's story effectively.`

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
          assistantType: "artist-bio-generator",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate bio")
      }

      const data = await response.json()
      setGeneratedBio(data.content)
      toast.success("Artist bio generated successfully!")
    } catch (error) {
      console.error("Error generating bio:", error)
      toast.error("Failed to generate bio. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const copyBio = async () => {
    if (!generatedBio) return

    try {
      await navigator.clipboard.writeText(generatedBio)
      toast.success("Bio copied to clipboard!")
    } catch (error) {
      toast.error("Failed to copy bio")
    }
  }

  const downloadBio = () => {
    if (!generatedBio) return

    const element = document.createElement("a")
    const file = new Blob([generatedBio], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${formData.artistName.replace(/[^a-z0-9]/gi, "_")}_bio.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success("Bio downloaded!")
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <FileText className="w-8 h-8 mr-3 text-green-600" />
            Artist Bio Generator
          </h1>
          <p className="text-muted-foreground">Create compelling artist biographies and press materials</p>
        </div>
      </div>

      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Create Bio</TabsTrigger>
          <TabsTrigger value="tips">Writing Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-green-600" />
                  Artist Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="artistName">Artist Name *</Label>
                    <Input
                      id="artistName"
                      placeholder="Your artist name"
                      value={formData.artistName}
                      onChange={(e) => handleInputChange("artistName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Genre</Label>
                    <Select value={formData.genre} onValueChange={(value) => handleInputChange("genre", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        {genres.map((genre) => (
                          <SelectItem key={genre} value={genre.toLowerCase()}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, State/Country"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="yearsActive">Years Active</Label>
                    <Input
                      id="yearsActive"
                      placeholder="e.g., 2018-present"
                      value={formData.yearsActive}
                      onChange={(e) => handleInputChange("yearsActive", e.target.value)}
                    />
                  </div>
                </div>

                {/* Bio Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Bio Type</Label>
                    <Select value={formData.bioType} onValueChange={(value) => handleInputChange("bioType", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {bioTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Tone</Label>
                    <Select value={formData.tone} onValueChange={(value) => handleInputChange("tone", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tones.map((tone) => (
                          <SelectItem key={tone.value} value={tone.value}>
                            {tone.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Detailed Info */}
                <div>
                  <Label htmlFor="achievements">Key Achievements</Label>
                  <Textarea
                    id="achievements"
                    placeholder="Awards, chart positions, notable performances, collaborations..."
                    value={formData.achievements}
                    onChange={(e) => handleInputChange("achievements", e.target.value)}
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="influences">Musical Influences</Label>
                  <Textarea
                    id="influences"
                    placeholder="Artists, genres, or experiences that influence your music..."
                    value={formData.influences}
                    onChange={(e) => handleInputChange("influences", e.target.value)}
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="currentProjects">Current Projects</Label>
                  <Textarea
                    id="currentProjects"
                    placeholder="Upcoming releases, tours, collaborations..."
                    value={formData.currentProjects}
                    onChange={(e) => handleInputChange("currentProjects", e.target.value)}
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="personalStory">Personal Story</Label>
                  <Textarea
                    id="personalStory"
                    placeholder="Your musical journey, background, what makes you unique..."
                    value={formData.personalStory}
                    onChange={(e) => handleInputChange("personalStory", e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={generateBio}
                  disabled={!formData.artistName.trim() || isGenerating}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating Bio...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Bio
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-green-600" />
                    Generated Bio
                  </CardTitle>
                  {generatedBio && (
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={copyBio}>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadBio}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {generatedBio ? (
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4 min-h-[400px]">
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">{generatedBio}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{generatedBio.split(" ").length} words</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground capitalize">{formData.bioType} bio</span>
                      </div>
                      <Button variant="outline" size="sm" onClick={generateBio} disabled={isGenerating}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FileText className="w-16 h-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Ready to Create Your Bio</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      Fill in your artist information above and click "Generate Bio" to create your professional
                      biography.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-600" />
                  Bio Essentials
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <p>• Start with your name and genre</p>
                  <p>• Include your location and background</p>
                  <p>• Highlight key achievements</p>
                  <p>• Mention current projects</p>
                  <p>• Keep it concise and engaging</p>
                  <p>• End with a call to action</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Music className="w-5 h-5 mr-2 text-purple-600" />
                  Writing Style
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <p>• Write in third person</p>
                  <p>• Use active voice</p>
                  <p>• Be specific with details</p>
                  <p>• Show, don't just tell</p>
                  <p>• Include personality</p>
                  <p>• Avoid clichés</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Different Uses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <p>• Press releases (formal)</p>
                  <p>• Social media (casual)</p>
                  <p>• Website about page</p>
                  <p>• Streaming platforms</p>
                  <p>• Grant applications</p>
                  <p>• Booking inquiries</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
