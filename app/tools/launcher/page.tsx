"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Sparkles,
  Music,
  FileText,
  TrendingUp,
  DollarSign,
  Palette,
  Users,
  Target,
  Settings,
  Play,
  ExternalLink,
} from "lucide-react"

export default function ToolLauncher() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Complete tools data with assistant integration
  const toolsData = {
    "Creative & Content": [
      {
        name: "Lyric Generator",
        function: "AI-powered songwriting assistance",
        benefit: "Professional lyrics and creative inspiration",
        icon: Music,
        color: "bg-pink-100 text-pink-800",
        assistantId: "asst_DTX9YgbEBJF3CUEhTSFLKcpX",
        category: "Creative",
      },
      {
        name: "Cover Art Generator",
        function: "Creates professional album artwork",
        benefit: "High-quality visuals without a designer",
        icon: Palette,
        color: "bg-purple-100 text-purple-800",
        assistantId: "asst_Z5ph6wcWbN0lQtHhhcaOk22e",
        category: "Creative",
      },
      {
        name: "Artist Bio Generator",
        function: "Crafts compelling artist biographies",
        benefit: "Professional bios for all platforms",
        icon: Users,
        color: "bg-blue-100 text-blue-800",
        assistantId: "asst_KJT77mSv8sJ8TU7OzBs7yhfR",
        category: "Creative",
      },
      {
        name: "Press Release Generator",
        function: "Creates media-ready announcements",
        benefit: "Professional PR materials instantly",
        icon: FileText,
        color: "bg-green-100 text-green-800",
        assistantId: "asst_SUj354vflrMlN0CPsZyAJHmX",
        category: "Creative",
      },
      {
        name: "EPK Assistant",
        function: "Generates electronic press kits",
        benefit: "Complete media packages",
        icon: FileText,
        color: "bg-cyan-100 text-cyan-800",
        assistantId: "asst_ZwJ1mFl5YmqKLbXaFC4vlDfV",
        category: "Creative",
      },
    ],
    "Business & Admin": [
      {
        name: "Music Contract Assistant",
        function: "Generates and reviews legal agreements",
        benefit: "Professional contracts without lawyers",
        icon: FileText,
        color: "bg-red-100 text-red-800",
        assistantId: "asst_Nymek457SSrroXFq5NN7jI8c",
        category: "Business",
      },
      {
        name: "EIN Assistant",
        function: "Guides business registration process",
        benefit: "Professional business setup",
        icon: Settings,
        color: "bg-gray-100 text-gray-800",
        assistantId: "asst_xbXRpLZ1bdZY1Ta58OVOm0se",
        category: "Business",
      },
      {
        name: "P.R.O. Manager",
        function: "Manages performance rights registration",
        benefit: "Maximizes royalty collection",
        icon: Target,
        color: "bg-orange-100 text-orange-800",
        assistantId: "asst_JzS3uAozUXoSSQKTOGwcZq9b",
        category: "Business",
      },
      {
        name: "Grant Finder",
        function: "Identifies funding opportunities",
        benefit: "Access to grants and funding",
        icon: DollarSign,
        color: "bg-green-100 text-green-800",
        assistantId: "asst_68xWYrwKf0jC8GTKENI7qnHp",
        category: "Business",
      },
    ],
    "Marketing & Social": [
      {
        name: "Social Media Assistant",
        function: "Creates social media content and strategies",
        benefit: "Consistent online presence",
        icon: TrendingUp,
        color: "bg-blue-100 text-blue-800",
        assistantId: "asst_72K2zP1pLWfYvzZKuPckcpPI",
        category: "Marketing",
      },
      {
        name: "Email Generator",
        function: "Creates professional email templates",
        benefit: "Effective communication tools",
        icon: FileText,
        color: "bg-purple-100 text-purple-800",
        assistantId: "asst_MHNXJQMA2zZEUUjgVV9a4EuH",
        category: "Marketing",
      },
      {
        name: "DM Generator",
        function: "Generates personalized direct messages",
        benefit: "Professional networking support",
        icon: Users,
        color: "bg-pink-100 text-pink-800",
        assistantId: "asst_ivGHChOaLkRCiovPkGQXtSm1",
        category: "Marketing",
      },
      {
        name: "Branding Assistant",
        function: "Develops brand identity and strategy",
        benefit: "Cohesive professional branding",
        icon: Sparkles,
        color: "bg-yellow-100 text-yellow-800",
        assistantId: "asst_VMlI4tdNLNRyXW59oxxZCdAk",
        category: "Marketing",
      },
    ],
  }

  const allTools = Object.values(toolsData).flat()
  const filteredTools = allTools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.function.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" ||
      Object.keys(toolsData).find(
        (cat) => toolsData[cat].includes(tool) && cat.toLowerCase().replace(/[^a-z]/g, "") === selectedCategory,
      )
    return matchesSearch && matchesCategory
  })

  const launchTool = (tool: any) => {
    // In a real implementation, this would connect to the specific OpenAI assistant
    console.log(`Launching ${tool.name} with assistant ID: ${tool.assistantId}`)

    // For now, redirect to the tool page or open in a new window
    if (tool.name === "Music Contract Assistant") {
      window.open("/contracts", "_blank")
    } else if (tool.name === "Social Media Assistant") {
      window.open("/tools/social-media-assistant", "_blank")
    } else {
      // Generic tool launch - could open a specialized interface
      window.open(`/tools/${tool.name.toLowerCase().replace(/\s+/g, "-")}`, "_blank")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Tool Launcher</h1>
          <p className="text-muted-foreground">Launch specialized AI assistants for your music career needs</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-purple-100 text-purple-800">
            <Sparkles className="mr-1 h-3 w-3" />
            {allTools.length} AI Tools
          </Badge>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search AI tools by name or function..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tools Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Tools</TabsTrigger>
          <TabsTrigger value="creativecontent">Creative</TabsTrigger>
          <TabsTrigger value="businessadmin">Business</TabsTrigger>
          <TabsTrigger value="marketingsocial">Marketing</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${tool.color}`}>
                      <tool.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{tool.function}</p>
                  <p className="text-sm font-medium text-purple-700 mb-4">{tool.benefit}</p>
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={() => launchTool(tool)}>
                      <Play className="mr-2 h-4 w-4" />
                      Launch Tool
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  {tool.assistantId && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Assistant ID: {tool.assistantId.slice(0, 20)}...
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {Object.keys(toolsData).map((category) => (
          <TabsContent key={category} value={category.toLowerCase().replace(/[^a-z]/g, "")} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {toolsData[category].map((tool, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-lg ${tool.color}`}>
                        <tool.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{tool.function}</p>
                    <p className="text-sm font-medium text-purple-700 mb-4">{tool.benefit}</p>
                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={() => launchTool(tool)}>
                        <Play className="mr-2 h-4 w-4" />
                        Launch Tool
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    {tool.assistantId && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Assistant ID: {tool.assistantId.slice(0, 20)}...
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Assistant Status */}
      <Card>
        <CardHeader>
          <CardTitle>Connected AI Assistants</CardTitle>
          <CardDescription>Real-time status of your specialized AI assistants</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {allTools.slice(0, 8).map((tool, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{tool.name}</p>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
