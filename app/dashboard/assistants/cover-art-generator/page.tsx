"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Download, Copy, RefreshCw, Palette, Sparkles, Loader2, ImageIcon, Wand2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

const artStyles = [
  { value: "photorealistic", label: "Photorealistic" },
  { value: "digital-art", label: "Digital Art" },
  { value: "abstract", label: "Abstract" },
  { value: "minimalist", label: "Minimalist" },
  { value: "vintage", label: "Vintage" },
  { value: "grunge", label: "Grunge" },
  { value: "neon", label: "Neon/Cyberpunk" },
  { value: "watercolor", label: "Watercolor" },
  { value: "oil-painting", label: "Oil Painting" },
  { value: "comic", label: "Comic Book" },
]

const moods = [
  { value: "energetic", label: "Energetic" },
  { value: "dark", label: "Dark" },
  { value: "dreamy", label: "Dreamy" },
  { value: "aggressive", label: "Aggressive" },
  { value: "peaceful", label: "Peaceful" },
  { value: "mysterious", label: "Mysterious" },
  { value: "romantic", label: "Romantic" },
  { value: "futuristic", label: "Futuristic" },
  { value: "nostalgic", label: "Nostalgic" },
  { value: "rebellious", label: "Rebellious" },
]

const genres = [
  { value: "hip-hop", label: "Hip Hop" },
  { value: "rock", label: "Rock" },
  { value: "pop", label: "Pop" },
  { value: "electronic", label: "Electronic" },
  { value: "jazz", label: "Jazz" },
  { value: "classical", label: "Classical" },
  { value: "country", label: "Country" },
  { value: "r&b", label: "R&B" },
  { value: "indie", label: "Indie" },
  { value: "metal", label: "Metal" },
]

const quickPrompts = [
  "A vibrant cityscape at night with neon lights",
  "Abstract geometric shapes in bold colors",
  "A lone figure silhouetted against a sunset",
  "Vintage microphone with musical notes floating around",
  "Futuristic robot DJ with glowing elements",
  "Watercolor splash with musical instruments",
]

export default function CoverArtGeneratorPage() {
  const [formData, setFormData] = useState({
    artistName: "",
    albumTitle: "",
    genre: "",
    mood: "",
    style: "",
    customPrompt: "",
  })
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateCoverArt = async () => {
    if (!formData.artistName || !formData.albumTitle) {
      toast.error("Please fill in artist name and album title")
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-cover-art", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to generate cover art")
      }

      const data = await response.json()
      setGeneratedImage(data.imageUrl)
      toast.success("Cover art generated successfully!")
    } catch (error) {
      console.error("Error generating cover art:", error)
      toast.error("Failed to generate cover art. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadImage = async () => {
    if (!generatedImage) return

    try {
      // Create a proxy to download the image through our API to avoid CORS issues
      const response = await fetch("/api/download-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: generatedImage }),
      })

      if (!response.ok) {
        throw new Error("Failed to download image")
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${formData.artistName.replace(/[^a-z0-9]/gi, "_")}_${formData.albumTitle.replace(/[^a-z0-9]/gi, "_")}_cover.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success("Image downloaded!")
    } catch (error) {
      console.error("Download error:", error)
      toast.error("Failed to download image. Please try right-clicking and saving the image manually.")
    }
  }

  const copyImageUrl = async () => {
    if (!generatedImage) return

    try {
      await navigator.clipboard.writeText(generatedImage)
      toast.success("Image URL copied to clipboard!")
    } catch (error) {
      toast.error("Failed to copy URL")
    }
  }

  const useQuickPrompt = (prompt: string) => {
    setFormData((prev) => ({ ...prev, customPrompt: prompt }))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/assistants">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Assistants
            </Button>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Cover Art Generator</h1>
            <p className="text-muted-foreground">Create professional album covers with AI-powered design</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wand2 className="w-5 h-5" />
                <span>Album Details</span>
              </CardTitle>
              <CardDescription>Provide basic information about your album</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="artistName">Artist Name *</Label>
                  <Input
                    id="artistName"
                    placeholder="Enter artist name"
                    value={formData.artistName}
                    onChange={(e) => handleInputChange("artistName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="albumTitle">Album Title *</Label>
                  <Input
                    id="albumTitle"
                    placeholder="Enter album title"
                    value={formData.albumTitle}
                    onChange={(e) => handleInputChange("albumTitle", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Genre</Label>
                  <Select value={formData.genre} onValueChange={(value) => handleInputChange("genre", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map((genre) => (
                        <SelectItem key={genre.value} value={genre.value}>
                          {genre.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Mood</Label>
                  <Select value={formData.mood} onValueChange={(value) => handleInputChange("mood", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mood" />
                    </SelectTrigger>
                    <SelectContent>
                      {moods.map((mood) => (
                        <SelectItem key={mood.value} value={mood.value}>
                          {mood.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Art Style</Label>
                  <Select value={formData.style} onValueChange={(value) => handleInputChange("style", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      {artStyles.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Description</CardTitle>
              <CardDescription>Describe your vision for the cover art (optional)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe the visual elements, colors, themes, or specific imagery you want..."
                value={formData.customPrompt}
                onChange={(e) => handleInputChange("customPrompt", e.target.value)}
                rows={4}
              />

              <div className="space-y-3">
                <Label className="text-sm font-medium">Quick Prompts:</Label>
                <div className="grid grid-cols-1 gap-2">
                  {quickPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="justify-start text-left h-auto p-3 text-xs bg-transparent"
                      onClick={() => setFormData((prev) => ({ ...prev, customPrompt: prompt }))}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={generateCoverArt}
            disabled={isGenerating || !formData.artistName || !formData.albumTitle}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Cover Art
              </>
            )}
          </Button>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ImageIcon className="w-5 h-5" />
                <span>Generated Cover Art</span>
              </CardTitle>
              <CardDescription>Your AI-generated album cover will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              {generatedImage ? (
                <div className="space-y-4">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={generatedImage || "/placeholder.svg"}
                      alt="Generated cover art"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error("Image failed to load:", generatedImage)
                        toast.error("Failed to load generated image")
                      }}
                      onLoad={() => {
                        console.log("Image loaded successfully:", generatedImage)
                      }}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={downloadImage} className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button onClick={copyImageUrl} variant="outline" className="flex-1 bg-transparent">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy URL
                    </Button>
                    <Button onClick={generateCoverArt} variant="outline" disabled={isGenerating}>
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="aspect-square bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700">
                  <div className="text-center space-y-3">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">No cover art generated yet</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Fill in the form and click generate to create your cover art
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-blue-900 dark:text-blue-100">Tips for Better Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <p>• Be specific about colors, themes, and visual elements</p>
                <p>• Mention the genre and mood to get style-appropriate designs</p>
                <p>• Try different art styles to find what fits your music</p>
                <p>• Use descriptive adjectives (vibrant, dark, minimalist, etc.)</p>
                <p>• Reference specific imagery or concepts you want included</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
