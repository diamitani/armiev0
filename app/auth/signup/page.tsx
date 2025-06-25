"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Bot, Sparkles, CheckCircle } from "lucide-react"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreeToTerms: false,
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate account creation
    setTimeout(() => {
      localStorage.setItem(
        "armie_user",
        JSON.stringify({
          name: formData.name,
          email: formData.email,
          plan: "Free Trial",
          signedIn: true,
        }),
      )
      router.push("/dashboard")
    }, 2000)
  }

  const benefits = [
    "19 specialized AI assistants",
    "Professional contract templates",
    "Automated social media content",
    "Music catalog management",
    "Revenue optimization tools",
    "24/7 AI support",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Benefits */}
        <div className="hidden lg:block space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">Join 10,000+ Artists Using Armie</h2>
            <p className="text-xl text-gray-300">
              Transform your music career with AI-powered tools designed specifically for artists.
            </p>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-armie-secondary flex-shrink-0" />
                <span className="text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-armie-secondary/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-armie-secondary" />
              </div>
              <div>
                <div className="font-semibold text-white">Free 14-Day Trial</div>
                <div className="text-sm text-gray-400">No credit card required</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Get full access to all AI assistants and premium features. Cancel anytime.
            </p>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div>
          <Link
            href="/landing"
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors lg:hidden"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <Card className="bg-white/5 border-white/10 backdrop-blur-md shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <Image
                  src="/images/armie-logo-icon.png"
                  alt="Armie Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <span className="text-2xl font-bold text-white">Armie</span>
              </div>
              <div>
                <CardTitle className="text-2xl text-white">Create Your Account</CardTitle>
                <CardDescription className="text-gray-400">Start your AI-powered music career journey</CardDescription>
              </div>
              <Badge className="bg-armie-secondary/20 text-armie-secondary border-armie-secondary/30">
                <Sparkles className="w-3 h-3 mr-1" />
                14-Day Free Trial
              </Badge>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-armie-secondary"
                      required
                    />
                  </div>
                </div>

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
                      placeholder="Create a strong password"
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

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                    className="border-white/20 data-[state=checked]:bg-armie-secondary data-[state=checked]:border-armie-secondary"
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-400">
                    I agree to the{" "}
                    <Link href="/terms" className="text-armie-secondary hover:text-armie-secondary/80">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-armie-secondary hover:text-armie-secondary/80">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-armie-secondary hover:bg-armie-secondary/80 text-armie-primary py-3"
                  disabled={isLoading || !formData.agreeToTerms}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Creating Account...
                    </div>
                  ) : (
                    "Start Free Trial"
                  )}
                </Button>
              </form>

              <div className="relative">
                <Separator className="bg-white/10" />
                <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-2 text-gray-400 text-sm">
                  or
                </span>
              </div>

              <div className="space-y-3">
                <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>

                <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Continue with Facebook
                </Button>
              </div>

              <div className="text-center text-sm text-gray-400">
                Already have an account?{" "}
                <Link href="/auth/signin" className="text-armie-secondary hover:text-armie-secondary/80 font-medium">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
