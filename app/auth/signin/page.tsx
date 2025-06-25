"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Bot, Sparkles } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call with minimal delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      const userData = {
        name: "Alex Rodriguez",
        email: formData.email,
        plan: "Pro",
        signedIn: true,
        id: "user_123",
        avatar: "/placeholder.svg?height=40&width=40",
      }

      signIn(userData)
    } catch (error) {
      console.error("Sign in failed:", error)
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setIsLoading(true)

    try {
      const userData = {
        name: "Alex Rodriguez",
        email: "demo@armie.ai",
        plan: "Pro",
        signedIn: true,
        id: "demo_user",
        avatar: "/placeholder.svg?height=40&width=40",
      }

      signIn(userData)
    } catch (error) {
      console.error("Demo login failed:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back to Landing */}
        <Link
          href="/landing"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card className="bg-white/5 border-white/10 backdrop-blur-md shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <Image src="/images/armie-logo-icon.png" alt="Armie Logo" width={40} height={40} className="rounded-lg" />
              <span className="text-2xl font-bold text-white">Armie</span>
            </div>
            <div>
              <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
              <CardDescription className="text-gray-400">Sign in to your AI music career manager</CardDescription>
            </div>
            <Badge className="bg-armie-secondary/20 text-armie-secondary border-armie-secondary/30">
              <Bot className="w-3 h-3 mr-1" />
              19 AI Assistants Ready
            </Badge>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Demo Login Button */}
            <Button
              onClick={handleDemoLogin}
              className="w-full bg-armie-secondary hover:bg-armie-secondary/80 text-armie-primary py-3 mb-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Loading Dashboard...
                </div>
              ) : (
                <>
                  <Bot className="w-4 h-4 mr-2" />
                  Try Demo Account
                </>
              )}
            </Button>

            <div className="relative">
              <Separator className="bg-white/10" />
              <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-2 text-gray-400 text-sm">
                or sign in with email
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-armie-secondary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-armie-secondary"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="outline"
                className="w-full border-white/10 text-white hover:bg-white/5 py-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Loading Dashboard...
                  </div>
                ) : (
                  "Sign In with Email"
                )}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-armie-secondary hover:text-armie-secondary/80 font-medium">
                Sign up for free
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-xs text-gray-500">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  )
}
