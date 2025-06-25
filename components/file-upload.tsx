"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, File, FileAudio, FileImage, FileVideo, FileText, X, CheckCircle, AlertCircle } from "lucide-react"

interface FileUploadProps {
  onFilesSelected?: (files: File[]) => void
  acceptedTypes?: string[]
  maxFileSize?: number // in MB
  maxFiles?: number
}

export function FileUpload({
  onFilesSelected,
  acceptedTypes = ["*"],
  maxFileSize = 100,
  maxFiles = 10,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{
      file: File
      progress: number
      status: "uploading" | "completed" | "error"
      id: string
    }>
  >([])

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <FileImage className="h-8 w-8 text-pink-600" />
    if (type.startsWith("audio/")) return <FileAudio className="h-8 w-8 text-purple-600" />
    if (type.startsWith("video/")) return <FileVideo className="h-8 w-8 text-blue-600" />
    if (type.includes("pdf") || type.includes("document")) return <FileText className="h-8 w-8 text-green-600" />
    return <File className="h-8 w-8 text-gray-600" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const validateFile = (file: File) => {
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size exceeds ${maxFileSize}MB limit`
    }
    if (acceptedTypes.length > 0 && !acceptedTypes.includes("*")) {
      const fileType = file.type
      const isAccepted = acceptedTypes.some((type) => {
        if (type.endsWith("/*")) {
          return fileType.startsWith(type.slice(0, -1))
        }
        return fileType === type
      })
      if (!isAccepted) {
        return "File type not supported"
      }
    }
    return null
  }

  const simulateUpload = (fileId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === fileId ? { ...f, progress: 100, status: "completed" } : f)),
        )
      } else {
        setUploadedFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, progress: Math.round(progress) } : f)))
      }
    }, 200)
  }

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files)
      const validFiles: File[] = []
      const newUploadedFiles: typeof uploadedFiles = []

      fileArray.forEach((file) => {
        const error = validateFile(file)
        const id = Math.random().toString(36).substr(2, 9)

        if (error) {
          newUploadedFiles.push({
            file,
            progress: 0,
            status: "error",
            id,
          })
        } else {
          validFiles.push(file)
          newUploadedFiles.push({
            file,
            progress: 0,
            status: "uploading",
            id,
          })
          // Start simulated upload
          setTimeout(() => simulateUpload(id), 100)
        }
      })

      setUploadedFiles((prev) => [...prev, ...newUploadedFiles])
      if (validFiles.length > 0 && onFilesSelected) {
        onFilesSelected(validFiles)
      }
    },
    [onFilesSelected, maxFileSize, acceptedTypes],
  )

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFiles(e.dataTransfer.files)
      }
    },
    [handleFiles],
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <Card
        className={`border-2 border-dashed transition-colors ${
          dragActive ? "border-purple-400 bg-purple-50" : "border-gray-300 hover:border-purple-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="p-8 text-center">
          <Upload className={`mx-auto h-12 w-12 mb-4 ${dragActive ? "text-purple-600" : "text-gray-400"}`} />
          <p className="text-lg font-medium mb-2">Drop files here or click to browse</p>
          <p className="text-sm text-muted-foreground mb-4">
            Supports: Audio (MP3, WAV, FLAC), Images (JPG, PNG, SVG), Videos (MP4, MOV), Documents (PDF, DOC, TXT)
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Maximum file size: {maxFileSize}MB • Maximum files: {maxFiles}
          </p>
          <input
            type="file"
            multiple
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
            accept={acceptedTypes.join(",")}
          />
          <label htmlFor="file-upload">
            <Button variant="outline" className="cursor-pointer">
              Choose Files
            </Button>
          </label>
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">Upload Progress</h3>
            <div className="space-y-3">
              {uploadedFiles.map((uploadFile) => (
                <div key={uploadFile.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  {getFileIcon(uploadFile.file.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium truncate">{uploadFile.file.name}</p>
                      <div className="flex items-center space-x-2">
                        {uploadFile.status === "completed" && <CheckCircle className="h-4 w-4 text-green-600" />}
                        {uploadFile.status === "error" && <AlertCircle className="h-4 w-4 text-red-600" />}
                        <Button variant="ghost" size="sm" onClick={() => removeFile(uploadFile.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>{formatFileSize(uploadFile.file.size)}</span>
                      <Badge
                        variant={
                          uploadFile.status === "completed"
                            ? "default"
                            : uploadFile.status === "error"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {uploadFile.status === "uploading" && `${uploadFile.progress}%`}
                        {uploadFile.status === "completed" && "Completed"}
                        {uploadFile.status === "error" && "Error"}
                      </Badge>
                    </div>
                    {uploadFile.status === "uploading" && <Progress value={uploadFile.progress} className="h-1" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
