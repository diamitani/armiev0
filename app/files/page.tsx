"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  Search,
  Filter,
  FolderPlus,
  Grid3X3,
  List,
  Download,
  Share2,
  MoreHorizontal,
  File,
  FileText,
  FileImage,
  FileAudio,
  FileVideo,
  Folder,
  Eye,
  Edit,
  Trash2,
  Star,
  Clock,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function FilesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedFolder, setSelectedFolder] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false)

  const [newFolderName, setNewFolderName] = useState("")
  const [newFolderDescription, setNewFolderDescription] = useState("")
  const [newFolderIcon, setNewFolderIcon] = useState("folder")

  // Mock file data
  const [folders, setFolders] = useState([])

  const files = []

  const getFileIcon = (type: string) => {
    switch (type) {
      case "audio":
        return <FileAudio className="h-8 w-8 text-purple-600" />
      case "image":
        return <FileImage className="h-8 w-8 text-pink-600" />
      case "video":
        return <FileVideo className="h-8 w-8 text-blue-600" />
      case "document":
        return <FileText className="h-8 w-8 text-green-600" />
      case "archive":
        return <File className="h-8 w-8 text-orange-600" />
      default:
        return <File className="h-8 w-8 text-gray-600" />
    }
  }

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return

    const newFolder = {
      id: `folder-${Date.now()}`,
      name: newFolderName,
      description: newFolderDescription,
      icon: getIconComponent(newFolderIcon),
      color: getIconColor(newFolderIcon),
      count: 0,
      createdAt: new Date().toISOString(),
    }

    setFolders((prev) => [...prev, newFolder])
    setNewFolderName("")
    setNewFolderDescription("")
    setNewFolderIcon("folder")
    setShowNewFolderDialog(false)
  }

  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case "music":
        return FileAudio
      case "image":
        return FileImage
      case "video":
        return FileVideo
      case "document":
        return FileText
      default:
        return Folder
    }
  }

  const getIconColor = (iconType: string) => {
    switch (iconType) {
      case "music":
        return "bg-purple-100 text-purple-600"
      case "image":
        return "bg-pink-100 text-pink-600"
      case "video":
        return "bg-blue-100 text-blue-600"
      case "document":
        return "bg-green-100 text-green-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const filteredFiles = files.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesFolder = selectedFolder === "all" || file.folder === selectedFolder
    return matchesSearch && matchesFolder
  })

  const getStorageUsed = () => {
    if (files.length === 0) return "0"
    const totalSize = files.reduce((acc, file) => {
      const size = Number.parseFloat(file.size.split(" ")[0])
      const unit = file.size.split(" ")[1]
      const sizeInMB = unit === "GB" ? size * 1024 : size
      return acc + sizeInMB
    }, 0)
    return (totalSize / 1024).toFixed(1)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">File Manager</h1>
          <p className="text-muted-foreground">Organize and manage all your creative assets in one place</p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={showNewFolderDialog} onOpenChange={setShowNewFolderDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FolderPlus className="mr-2 h-4 w-4" />
                New Folder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Folder</DialogTitle>
                <DialogDescription>Organize your files with custom folders</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Folder name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                />
                <Textarea
                  placeholder="Description (optional)"
                  value={newFolderDescription}
                  onChange={(e) => setNewFolderDescription(e.target.value)}
                />
                <Select value={newFolderIcon} onValueChange={setNewFolderIcon}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="music">🎵 Music</SelectItem>
                    <SelectItem value="image">🖼️ Images</SelectItem>
                    <SelectItem value="video">🎬 Videos</SelectItem>
                    <SelectItem value="document">📄 Documents</SelectItem>
                    <SelectItem value="folder">📁 General</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={handleCreateFolder}
                  disabled={!newFolderName.trim()}
                >
                  Create Folder
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Upload className="mr-2 h-4 w-4" />
                Upload Files
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Upload Files</DialogTitle>
                <DialogDescription>Add new files to your creative library</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium mb-2">Drop files here or click to browse</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Supports: Audio (MP3, WAV, FLAC), Images (JPG, PNG, SVG), Videos (MP4, MOV), Documents (PDF, DOC,
                    TXT)
                  </p>
                  <Button variant="outline">Choose Files</Button>
                </div>

                {/* File Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Folder</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select folder" />
                      </SelectTrigger>
                      <SelectContent>
                        {folders.map((folder) => (
                          <SelectItem key={folder.id} value={folder.id}>
                            {folder.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Tags</label>
                    <Input placeholder="Add tags (comma separated)" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea placeholder="Add a description for your files..." />
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700">Upload Files</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Storage Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
            <File className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{files.length}</div>
            <p className="text-xs text-muted-foreground">Across all folders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStorageUsed()} GB</div>
            <p className="text-xs text-muted-foreground">of 100 GB available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Folders</CardTitle>
            <FolderPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{folders.length}</div>
            <p className="text-xs text-muted-foreground">Organized categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Uploads</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search files and tags..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                <SelectTrigger className="w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="All folders" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Folders</SelectItem>
                  {folders.map((folder) => (
                    <SelectItem key={folder.id} value={folder.id}>
                      {folder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="files" className="space-y-6">
        <TabsList>
          <TabsTrigger value="files">All Files</TabsTrigger>
          <TabsTrigger value="folders">Folders</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="starred">Starred</TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="space-y-6">
          {viewMode === "grid" ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredFiles.length > 0 ? (
                filteredFiles.map((file) => (
                  <Card key={file.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(file.type)}
                          {file.starred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="mr-2 h-4 w-4" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardTitle className="text-sm truncate" title={file.name}>
                        {file.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-2">{file.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>{file.size}</span>
                        <span>{new Date(file.uploadDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {file.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {file.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{file.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No files yet</h3>
                  <p className="text-gray-500 mb-4">Upload your first files to get started</p>
                  <Button onClick={() => setShowUploadDialog(true)} className="bg-purple-600 hover:bg-purple-700">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Files
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredFiles.length > 0 ? (
                    filteredFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          {getFileIcon(file.type)}
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium">{file.name}</h3>
                              {file.starred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                            </div>
                            <p className="text-sm text-muted-foreground">{file.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                              <span>{file.size}</span>
                              <span>Modified {new Date(file.lastModified).toLocaleDateString()}</span>
                              <div className="flex space-x-1">
                                {file.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="mr-2 h-4 w-4" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No files yet</h3>
                      <p className="text-gray-500 mb-4">Upload your first files to get started</p>
                      <Button onClick={() => setShowUploadDialog(true)} className="bg-purple-600 hover:bg-purple-700">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Files
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="folders" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {folders.length > 0 ? (
              folders.map((folder) => (
                <Card key={folder.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg ${folder.color}`}>
                        <folder.icon className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary">{folder.count} files</Badge>
                    </div>
                    <CardTitle>{folder.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" onClick={() => setSelectedFolder(folder.id)}>
                      Open Folder
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <FolderPlus className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No folders yet</h3>
                <p className="text-gray-500 mb-4">Create your first folder to organize files</p>
                <Button onClick={() => setShowNewFolderDialog(true)} variant="outline">
                  <FolderPlus className="mr-2 h-4 w-4" />
                  New Folder
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recently Uploaded</CardTitle>
              <CardDescription>Files uploaded in the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {files.filter((file) => {
                  const uploadDate = new Date(file.uploadDate)
                  const weekAgo = new Date()
                  weekAgo.setDate(weekAgo.getDate() - 7)
                  return uploadDate > weekAgo
                }).length > 0 ? (
                  files
                    .filter((file) => {
                      const uploadDate = new Date(file.uploadDate)
                      const weekAgo = new Date()
                      weekAgo.setDate(weekAgo.getDate() - 7)
                      return uploadDate > weekAgo
                    })
                    .map((file) => (
                      <div key={file.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                        {getFileIcon(file.type)}
                        <div className="flex-1">
                          <h3 className="font-medium">{file.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Uploaded {new Date(file.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="secondary">{file.size}</Badge>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-8">
                    <Clock className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-gray-500">No recent uploads</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="starred" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Starred Files</CardTitle>
              <CardDescription>Your favorite and important files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {files.filter((file) => file.starred).length > 0 ? (
                  files
                    .filter((file) => file.starred)
                    .map((file) => (
                      <div key={file.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                        {getFileIcon(file.type)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{file.name}</h3>
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          </div>
                          <p className="text-sm text-muted-foreground">{file.description}</p>
                        </div>
                        <Badge variant="secondary">{file.size}</Badge>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-8">
                    <Star className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-gray-500">No starred files yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
