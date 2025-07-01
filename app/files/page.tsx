"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/auth-provider"
import {
  Upload,
  File,
  Music,
  ImageIcon,
  FileText,
  Video,
  Search,
  Download,
  Trash2,
  Share,
  Eye,
  MoreVertical,
  Grid,
  List,
  Crown,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FileItem {
  id: string
  name: string
  type: "audio" | "image" | "document" | "video"
  size: number
  uploadDate: Date
  folder?: string
  url?: string
}

export default function FilesPage() {
  const { user } = useAuth()
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: "1",
      name: "Summer Dreams - Demo.mp3",
      type: "audio",
      size: 5.2,
      uploadDate: new Date("2024-01-15"),
      folder: "Demos",
    },
    {
      id: "2",
      name: "Album Cover Draft.png",
      type: "image",
      size: 2.1,
      uploadDate: new Date("2024-01-14"),
      folder: "Artwork",
    },
    {
      id: "3",
      name: "Contract - Distribution.pdf",
      type: "document",
      size: 0.8,
      uploadDate: new Date("2024-01-13"),
      folder: "Legal",
    },
    {
      id: "4",
      name: "Music Video Rough Cut.mp4",
      type: "video",
      size: 125.5,
      uploadDate: new Date("2024-01-12"),
      folder: "Videos",
    },
  ])

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFolder, setSelectedFolder] = useState("All")
  const [sortBy, setSortBy] = useState("date")

  const isPremiumUser = user?.plan === "pro" || user?.plan === "enterprise"
  const storageUsed = files.reduce((total, file) => total + file.size, 0)
  const storageLimit = isPremiumUser ? (user?.plan === "enterprise" ? 100 : 10) : 1

  const folders = ["All", "Demos", "Artwork", "Legal", "Videos", "Lyrics", "Contracts"]

  const getFileIcon = (type: string) => {
    switch (type) {
      case "audio":
        return Music
      case "image":
        return ImageIcon
      case "document":
        return FileText
      case "video":
        return Video
      default:
        return File
    }
  }

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case "audio":
        return "bg-green-100 text-green-700"
      case "image":
        return "bg-purple-100 text-purple-700"
      case "document":
        return "bg-blue-100 text-blue-700"
      case "video":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const formatFileSize = (sizeInMB: number) => {
    if (sizeInMB < 1) {
      return `${(sizeInMB * 1024).toFixed(0)} KB`
    }
    return `${sizeInMB.toFixed(1)} MB`
  }

  const filteredFiles = files
    .filter((file) => {
      const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFolder = selectedFolder === "All" || file.folder === selectedFolder
      return matchesSearch && matchesFolder
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "size":
          return b.size - a.size
        case "type":
          return a.type.localeCompare(b.type)
        default:
          return b.uploadDate.getTime() - a.uploadDate.getTime()
      }
    })

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files
    if (!uploadedFiles) return

    Array.from(uploadedFiles).forEach((file) => {
      const newFile: FileItem = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type.startsWith("audio/")
          ? "audio"
          : file.type.startsWith("image/")
            ? "image"
            : file.type.startsWith("video/")
              ? "video"
              : "document",
        size: file.size / (1024 * 1024), // Convert to MB
        uploadDate: new Date(),
        folder: "Uploads",
      }
      setFiles((prev) => [newFile, ...prev])
    })
  }, [])

  const deleteFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">File Manager</h1>
          <p className="text-muted-foreground">Upload, organize, and manage your music files</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge
            className={`${isPremiumUser ? "bg-gradient-to-r from-yellow-400 to-orange-500" : "bg-gray-500"} text-white`}
          >
            {isPremiumUser && <Crown className="w-3 h-3 mr-1" />}
            {user?.plan?.toUpperCase() || "FREE"}
          </Badge>
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
            accept="audio/*,image/*,video/*,.pdf,.doc,.docx,.txt"
          />
          <label htmlFor="file-upload">
            <Button className="bg-armie-secondary text-armie-primary hover:bg-armie-secondary/80">
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          </label>
        </div>
      </div>

      {/* Storage Usage */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Storage Usage</h3>
            <span className="text-sm text-muted-foreground">
              {storageUsed.toFixed(1)} GB / {storageLimit} GB
            </span>
          </div>
          <Progress value={(storageUsed / storageLimit) * 100} className="h-3" />
          {storageUsed / storageLimit > 0.8 && (
            <p className="text-sm text-orange-600 mt-2">
              You're running low on storage space. Consider upgrading your plan.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={selectedFolder} onValueChange={setSelectedFolder}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {folders.map((folder) => (
                <SelectItem key={folder} value={folder}>
                  {folder}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="size">Size</SelectItem>
              <SelectItem value="type">Type</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid className="w-4 h-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Files Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredFiles.map((file) => {
            const FileIcon = getFileIcon(file.type)
            return (
              <Card key={file.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-lg ${getFileTypeColor(file.type)} flex items-center justify-center`}
                    >
                      <FileIcon className="w-5 h-5" />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="w-4 h-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => deleteFile(file.id)}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h4 className="font-medium text-sm mb-1 truncate" title={file.name}>
                    {file.name}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatFileSize(file.size)}</span>
                    <span>{file.uploadDate.toLocaleDateString()}</span>
                  </div>
                  {file.folder && (
                    <Badge variant="outline" className="text-xs mt-2">
                      {file.folder}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredFiles.map((file) => {
                const FileIcon = getFileIcon(file.type)
                return (
                  <div key={file.id} className="flex items-center justify-between p-4 hover:bg-gray-50 group">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div
                        className={`w-8 h-8 rounded ${getFileTypeColor(file.type)} flex items-center justify-center`}
                      >
                        <FileIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{file.name}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{formatFileSize(file.size)}</span>
                          <span>{file.uploadDate.toLocaleDateString()}</span>
                          {file.folder && (
                            <Badge variant="outline" className="text-xs">
                              {file.folder}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="w-4 h-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => deleteFile(file.id)}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {filteredFiles.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No files found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || selectedFolder !== "All"
                ? "Try adjusting your search or filter criteria"
                : "Upload your first file to get started"}
            </p>
            {!searchTerm && selectedFolder === "All" && (
              <label htmlFor="file-upload">
                <Button className="bg-armie-secondary text-armie-primary hover:bg-armie-secondary/80">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Files
                </Button>
              </label>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
