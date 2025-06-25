"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Brain, Plus, Upload, FileText, Music, Calendar, Award, Trash2, Edit, Save, X } from "lucide-react"

export default function KnowledgeBasePage() {
  const [isAddingPersonal, setIsAddingPersonal] = useState(false)
  const [isAddingFile, setIsAddingFile] = useState(false)
  const [personalInfo, setPersonalInfo] = useState([
    {
      id: 1,
      category: "Personal",
      title: "Artist Background",
      content: "Independent R&B artist from Los Angeles, started music in 2019, influenced by Frank Ocean and SZA",
      lastUpdated: "2 days ago",
    },
    {
      id: 2,
      category: "Music",
      title: "Current Projects",
      content: "Working on debut album 'Midnight Dreams', 12 tracks, collaboration with Maya on track 3",
      lastUpdated: "1 week ago",
    },
    {
      id: 3,
      category: "Goals",
      title: "2024 Objectives",
      content: "Release debut album, gain 10K monthly listeners, book first tour, sign with indie label",
      lastUpdated: "1 month ago",
    },
  ])

  const [files, setFiles] = useState([
    {
      id: 1,
      name: "Artist Bio Draft.docx",
      type: "document",
      size: "2.4 KB",
      uploadDate: "3 days ago",
      category: "Marketing",
    },
    {
      id: 2,
      name: "Demo Track - Midnight.mp3",
      type: "audio",
      size: "8.2 MB",
      uploadDate: "1 week ago",
      category: "Music",
    },
    {
      id: 3,
      name: "Press Photos.zip",
      type: "images",
      size: "15.7 MB",
      uploadDate: "2 weeks ago",
      category: "Media",
    },
  ])

  const getFileIcon = (type: string) => {
    switch (type) {
      case "audio":
        return Music
      case "document":
        return FileText
      case "images":
        return Award
      default:
        return FileText
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Personal":
        return "bg-purple-100 text-purple-800 dark:bg-purple-950/30 dark:text-purple-400"
      case "Music":
        return "bg-pink-100 text-pink-800 dark:bg-pink-950/30 dark:text-pink-400"
      case "Goals":
        return "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400"
      case "Marketing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400"
      case "Media":
        return "bg-orange-100 text-orange-800 dark:bg-orange-950/30 dark:text-orange-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-950/30 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Brain className="mr-3 h-8 w-8 text-armie-secondary" />
            Armie's Knowledge Base
          </h1>
          <p className="text-muted-foreground mt-2">
            Store your personal information, files, and context so Armie can provide better, personalized assistance
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => setIsAddingPersonal(true)}
            className="bg-armie-secondary hover:bg-armie-secondary/80 text-armie-primary"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Info
          </Button>
          <Button onClick={() => setIsAddingFile(true)} variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload File
          </Button>
        </div>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="files">Files & Media</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          {/* Add New Personal Info */}
          {isAddingPersonal && (
            <Card className="border-armie-secondary/20">
              <CardHeader>
                <CardTitle className="text-lg">Add Personal Information</CardTitle>
                <CardDescription>Help Armie learn more about you and your music career</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Personal</option>
                      <option>Music</option>
                      <option>Goals</option>
                      <option>Business</option>
                      <option>Preferences</option>
                    </select>
                  </div>
                  <div>
                    <Label>Title</Label>
                    <Input placeholder="e.g., Musical Influences, Career Goals..." />
                  </div>
                </div>
                <div>
                  <Label>Content</Label>
                  <Textarea
                    placeholder="Provide detailed information that will help Armie understand you better..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button className="bg-armie-secondary hover:bg-armie-secondary/80 text-armie-primary">
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingPersonal(false)}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Personal Information Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {personalInfo.map((info) => (
              <Card key={info.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className={getCategoryColor(info.category)}>{info.category}</Badge>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{info.content}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    Updated {info.lastUpdated}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="files" className="space-y-6">
          {/* Upload File Interface */}
          {isAddingFile && (
            <Card className="border-armie-secondary/20">
              <CardHeader>
                <CardTitle className="text-lg">Upload File</CardTitle>
                <CardDescription>Add files that Armie can reference and use in conversations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-armie-secondary/20 rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-armie-secondary/50 mb-4" />
                  <p className="text-lg font-medium mb-2">Drag and drop files here</p>
                  <p className="text-muted-foreground mb-4">or click to browse</p>
                  <Button className="bg-armie-secondary hover:bg-armie-secondary/80 text-armie-primary">
                    Choose Files
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button className="bg-armie-secondary hover:bg-armie-secondary/80 text-armie-primary">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingFile(false)}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Files Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {files.map((file) => {
              const FileIcon = getFileIcon(file.type)
              return (
                <Card key={file.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-armie-secondary/20">
                        <FileIcon className="h-6 w-6 text-armie-secondary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{file.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {file.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{file.size}</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mt-2">
                          <Calendar className="mr-1 h-3 w-3" />
                          {file.uploadDate}
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Memory Settings</CardTitle>
              <CardDescription>Configure how Armie uses and stores your information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-save conversations</h4>
                    <p className="text-sm text-muted-foreground">Automatically save chat history for context</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enabled
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Smart suggestions</h4>
                    <p className="text-sm text-muted-foreground">Use stored info for personalized recommendations</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enabled
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Data retention</h4>
                    <p className="text-sm text-muted-foreground">How long to keep your information</p>
                  </div>
                  <select className="p-2 border rounded-md">
                    <option>Forever</option>
                    <option>1 Year</option>
                    <option>6 Months</option>
                    <option>3 Months</option>
                  </select>
                </div>
              </div>
              <div className="pt-6 border-t">
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
