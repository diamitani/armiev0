"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/components/auth-provider"
import {
  Brain,
  Search,
  Plus,
  FileText,
  Music,
  Users,
  Target,
  Tag,
  Edit,
  Trash2,
  MoreVertical,
  Crown,
  Sparkles,
  BookOpen,
  Lightbulb,
  Star,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface KnowledgeItem {
  id: string
  title: string
  content: string
  category: "goals" | "projects" | "contacts" | "ideas" | "resources" | "achievements"
  tags: string[]
  createdDate: Date
  updatedDate: Date
  aiGenerated: boolean
}

export default function KnowledgeBasePage() {
  const { user } = useAuth()
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([
    {
      id: "1",
      title: "2024 Music Career Goals",
      content:
        "Reach 10,000 monthly listeners on Spotify, complete debut album, book first tour with 10+ shows, collaborate with 3 artists, establish strong social media presence.",
      category: "goals",
      tags: ["2024", "spotify", "album", "tour"],
      createdDate: new Date("2024-01-01"),
      updatedDate: new Date("2024-01-15"),
      aiGenerated: false,
    },
    {
      id: "2",
      title: "Summer Dreams Album Project",
      content:
        "10-track album blending R&B and pop influences. Target completion: March 2024. Collaborating with Maya Rodriguez on track 3. Budget: $15,000. Recording at Sunset Studios.",
      category: "projects",
      tags: ["album", "r&b", "pop", "collaboration"],
      createdDate: new Date("2023-12-15"),
      updatedDate: new Date("2024-01-20"),
      aiGenerated: false,
    },
    {
      id: "3",
      title: "Industry Contacts",
      content:
        "Maya Rodriguez (Producer) - maya@musicpro.com, Sarah Chen (Playlist Curator) - sarah@indiemusic.com, Mike Johnson (Venue Owner) - mike@bluenotevenue.com",
      category: "contacts",
      tags: ["networking", "producer", "curator", "venue"],
      createdDate: new Date("2024-01-10"),
      updatedDate: new Date("2024-01-25"),
      aiGenerated: false,
    },
    {
      id: "4",
      title: "Song Ideas & Concepts",
      content:
        "1. 'Midnight Reflections' - introspective ballad about late-night thoughts. 2. 'City Lights' - upbeat track about urban life. 3. 'Homecoming' - nostalgic piece about returning to roots.",
      category: "ideas",
      tags: ["songwriting", "concepts", "ballad", "upbeat"],
      createdDate: new Date("2024-01-05"),
      updatedDate: new Date("2024-01-22"),
      aiGenerated: true,
    },
    {
      id: "5",
      title: "Music Industry Resources",
      content:
        "SubmitHub for playlist submissions, Bandcamp for direct sales, ReverbNation for promotion, ASCAP for performance rights, CD Baby for distribution.",
      category: "resources",
      tags: ["tools", "distribution", "promotion", "rights"],
      createdDate: new Date("2024-01-08"),
      updatedDate: new Date("2024-01-18"),
      aiGenerated: true,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [newItem, setNewItem] = useState({
    title: "",
    content: "",
    category: "ideas" as KnowledgeItem["category"],
    tags: "",
  })

  const isPremiumUser = user?.plan === "pro" || user?.plan === "enterprise"

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "goals":
        return Target
      case "projects":
        return Music
      case "contacts":
        return Users
      case "ideas":
        return Lightbulb
      case "resources":
        return BookOpen
      case "achievements":
        return Star
      default:
        return FileText
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "goals":
        return "bg-green-100 text-green-700"
      case "projects":
        return "bg-purple-100 text-purple-700"
      case "contacts":
        return "bg-blue-100 text-blue-700"
      case "ideas":
        return "bg-yellow-100 text-yellow-700"
      case "resources":
        return "bg-orange-100 text-orange-700"
      case "achievements":
        return "bg-pink-100 text-pink-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const filteredItems = knowledgeItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = filterCategory === "all" || item.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const addKnowledgeItem = () => {
    if (!newItem.title.trim() || !newItem.content.trim()) return

    const item: KnowledgeItem = {
      id: Date.now().toString(),
      title: newItem.title,
      content: newItem.content,
      category: newItem.category,
      tags: newItem.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      createdDate: new Date(),
      updatedDate: new Date(),
      aiGenerated: false,
    }

    setKnowledgeItems((prev) => [item, ...prev])
    setNewItem({
      title: "",
      content: "",
      category: "ideas",
      tags: "",
    })
    setIsAddingItem(false)
  }

  const deleteItem = (itemId: string) => {
    setKnowledgeItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const generateAIInsights = () => {
    // Simulate AI-generated insights
    const aiInsight: KnowledgeItem = {
      id: Date.now().toString(),
      title: "AI Career Analysis & Recommendations",
      content:
        "Based on your goals and current progress: 1. Focus on playlist submissions to reach 10K listeners faster. 2. Consider TikTok marketing for 'Summer Dreams' album. 3. Network with local radio DJs for airplay opportunities. 4. Plan acoustic versions of your songs for intimate venues.",
      category: "ideas",
      tags: ["ai-analysis", "recommendations", "strategy"],
      createdDate: new Date(),
      updatedDate: new Date(),
      aiGenerated: true,
    }

    setKnowledgeItems((prev) => [aiInsight, ...prev])
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
          <p className="text-muted-foreground">Your personal repository of music career information and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge
            className={`${isPremiumUser ? "bg-gradient-to-r from-yellow-400 to-orange-500" : "bg-gray-500"} text-white`}
          >
            {isPremiumUser && <Crown className="w-3 h-3 mr-1" />}
            {user?.plan?.toUpperCase() || "FREE"}
          </Badge>
          <Button onClick={generateAIInsights} variant="outline">
            <Sparkles className="w-4 h-4 mr-2" />
            AI Insights
          </Button>
          <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
            <DialogTrigger asChild>
              <Button className="bg-armie-secondary text-armie-primary hover:bg-armie-secondary/80">
                <Plus className="w-4 h-4 mr-2" />
                Add Knowledge
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Knowledge Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    placeholder="Enter title..."
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={newItem.content}
                    onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                    placeholder="Enter detailed content..."
                    rows={6}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <Select
                      value={newItem.category}
                      onValueChange={(value: KnowledgeItem["category"]) => setNewItem({ ...newItem, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="goals">Goals</SelectItem>
                        <SelectItem value="projects">Projects</SelectItem>
                        <SelectItem value="contacts">Contacts</SelectItem>
                        <SelectItem value="ideas">Ideas</SelectItem>
                        <SelectItem value="resources">Resources</SelectItem>
                        <SelectItem value="achievements">Achievements</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      value={newItem.tags}
                      onChange={(e) => setNewItem({ ...newItem, tags: e.target.value })}
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddingItem(false)}>
                    Cancel
                  </Button>
                  <Button onClick={addKnowledgeItem}>Add Item</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search knowledge base..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="goals">Goals</SelectItem>
            <SelectItem value="projects">Projects</SelectItem>
            <SelectItem value="contacts">Contacts</SelectItem>
            <SelectItem value="ideas">Ideas</SelectItem>
            <SelectItem value="resources">Resources</SelectItem>
            <SelectItem value="achievements">Achievements</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Knowledge Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredItems.map((item) => {
          const CategoryIcon = getCategoryIcon(item.category)

          return (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-10 h-10 rounded-lg ${getCategoryColor(item.category)} flex items-center justify-center`}
                    >
                      <CategoryIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg mb-1">{item.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge className={`text-xs ${getCategoryColor(item.category)}`}>{item.category}</Badge>
                        {item.aiGenerated && (
                          <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                            <Sparkles className="w-3 h-3 mr-1" />
                            AI
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => deleteItem(item.id)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.content}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Created: {item.createdDate.toLocaleDateString()}</span>
                  <span>Updated: {item.updatedDate.toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No knowledge items found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || filterCategory !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Start building your knowledge base by adding your first item"}
            </p>
            <div className="flex justify-center space-x-3">
              <Button
                onClick={() => setIsAddingItem(true)}
                className="bg-armie-secondary text-armie-primary hover:bg-armie-secondary/80"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Knowledge
              </Button>
              <Button onClick={generateAIInsights} variant="outline">
                <Sparkles className="w-4 h-4 mr-2" />
                AI Insights
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Enhancement CTA */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-8 text-center">
          <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">AI-Powered Knowledge Enhancement</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Armie analyzes your knowledge base to provide personalized insights, identify patterns, and suggest
            actionable next steps for your music career.
          </p>
          <Button onClick={generateAIInsights} size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600">
            <Sparkles className="w-5 h-5 mr-2" />
            Generate AI Insights
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
