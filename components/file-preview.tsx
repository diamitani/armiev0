"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, Download, Share2, Edit, Star, Tag, Calendar, FileIcon as FileSize, User, Save, Copy } from "lucide-react"

interface FilePreviewProps {
  file: {
    id: number
    name: string
    type: string
    size: string
    folder: string
    tags: string[]
    uploadDate: string
    lastModified: string
    starred: boolean
    description: string
  }
  isOpen: boolean
  onClose: () => void
}

export function FilePreview({ file, isOpen, onClose }: FilePreviewProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(file.name)
  const [editedDescription, setEditedDescription] = useState(file.description)
  const [editedTags, setEditedTags] = useState(file.tags.join(", "))

  const handleSave = () => {
    // Here you would save the changes
    console.log("Saving changes:", {
      name: editedName,
      description: editedDescription,
      tags: editedTags.split(",").map((tag) => tag.trim()),
    })
    setIsEditing(false)
  }

  const renderPreview = () => {
    switch (file.type) {
      case "image":
        return (
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🖼️</span>
              </div>
              <p className="text-sm text-muted-foreground">Image Preview</p>
            </div>
          </div>
        )
      case "audio":
        return (
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎵</span>
              </div>
              <div className="w-full max-w-md">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center space-x-4">
                    <Button size="sm" className="rounded-full w-10 h-10">
                      ▶️
                    </Button>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-purple-600 rounded-full w-1/3"></div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">1:23 / 3:45</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "video":
        return (
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🎬</span>
              </div>
              <p className="text-sm text-muted-foreground">Video Preview</p>
              <Button size="sm" className="mt-2">
                Play Video
              </Button>
            </div>
          </div>
        )
      case "document":
        return (
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">📄</span>
              </div>
              <p className="text-sm text-muted-foreground">Document Preview</p>
              <Button size="sm" className="mt-2">
                Open Document
              </Button>
            </div>
          </div>
        )
      default:
        return (
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">📁</span>
              </div>
              <p className="text-sm text-muted-foreground">File Preview</p>
            </div>
          </div>
        )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DialogTitle className="truncate">{file.name}</DialogTitle>
              {file.starred && <Star className="h-5 w-5 text-yellow-500 fill-current" />}
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Preview Area */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">{renderPreview()}</CardContent>
            </Card>
          </div>

          {/* File Details */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">File Details</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="mr-2 h-4 w-4" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <label className="text-sm font-medium">File Name</label>
                      <Input value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Tags</label>
                      <Input
                        value={editedTags}
                        onChange={(e) => setEditedTags(e.target.value)}
                        placeholder="Comma separated tags"
                      />
                    </div>
                    <Button onClick={handleSave} className="w-full">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-2">
                      <FileSize className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{file.size}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Uploaded {new Date(file.uploadDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Alex Rodriguez</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Description</p>
                      <p className="text-sm text-muted-foreground">{file.description}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Tags</p>
                      <div className="flex flex-wrap gap-1">
                        {file.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            <Tag className="mr-1 h-3 w-3" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">File Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Star className="mr-2 h-4 w-4" />
                  {file.starred ? "Remove from Starred" : "Add to Starred"}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate File
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Download Original
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                  <X className="mr-2 h-4 w-4" />
                  Delete File
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
