"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Music, Sparkles, ArrowLeft, CheckCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [artistName, setArtistName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await signUp(email, password, name, artistName)

      if (result.success) {
        router.push("/dashboard")
      } else {
        setError(result.error || "Sign up failed")
      }
    } catch (error) {
      console.error("Sign up error:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4">
            <Music className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-2">
            ARMIE <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
          </h1>
          <p className="text-gray-300 mt-2 text-sm sm:text-base">Your AI Music Career Assistant</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl sm:text-2xl text-white">Join ARMIE</CardTitle>
            <CardDescription className="text-gray-300 text-sm sm:text-base">
              Start your AI-powered music career journey
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert className="bg-red-500/10 border-red-500/20 text-red-200">
                  <AlertDescription className="text-sm">{error}</AlertDescription>
                </Alert>
              )}

              {/* Benefits */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <p className="text-sm font-medium text-green-200">What you get with ARMIE:</p>
                </div>
                <ul className="space-y-1 text-xs text-green-300">
                  <li>• AI-powered contract analysis & advice</li>
                  <li>• Personalized marketing strategies</li>
                  <li>• Revenue optimization guidance</li>
                  <li>• Industry networking insights</li>
                </ul>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white text-sm">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={isLoading}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-white text-sm">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                  disabled={isLoading}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="artistName" className="text-white text-sm">
                  Artist/Stage Name
                </Label>
                <Input
                  id="artistName"
                  type="text"
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                  placeholder="Your artist name (optional)"
                  disabled={isLoading}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white text-sm">
                  Password *
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a secure password"
                    required
                    minLength={6}
                    disabled={isLoading}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 pr-10 h-11"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-gray-400">Minimum 6 \
