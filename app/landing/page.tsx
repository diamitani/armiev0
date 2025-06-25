"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Bot,
  Sparkles,
  FileText,
  Palette,
  Share2,
  PenTool,
  Mail,
  Users,
  Radio,
  Award,
  Building,
  Calculator,
  Shield,
  Globe,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Target,
  Calendar,
  ArrowRight,
  Check,
  Star,
  Zap,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  const aiAssistants = [
    { name: "General Assistant", icon: Sparkles, color: "text-purple-400" },
    { name: "Contract Assistant", icon: FileText, color: "text-blue-400" },
    { name: "Cover Art Generator", icon: Palette, color: "text-pink-400" },
    { name: "Social Media Assistant", icon: Share2, color: "text-green-400" },
    { name: "Lyric Generator", icon: PenTool, color: "text-yellow-400" },
    { name: "Email Generator", icon: Mail, color: "text-cyan-400" },
    { name: "Bio Generator", icon: Users, color: "text-indigo-400" },
    { name: "EPK Assistant", icon: FileText, color: "text-teal-400" },
    { name: "Press Release", icon: Radio, color: "text-rose-400" },
    { name: "Branding Assistant", icon: Award, color: "text-amber-400" },
    { name: "EIN Manager", icon: Building, color: "text-slate-400" },
    { name: "Tax Manager", icon: Calculator, color: "text-emerald-400" },
    { name: "P.R.O. Manager", icon: Shield, color: "text-orange-400" },
    { name: "Licensing Assistant", icon: Globe, color: "text-violet-400" },
    { name: "DM Generator", icon: MessageSquare, color: "text-lime-400" },
    { name: "Grant Finder", icon: DollarSign, color: "text-sky-400" },
    { name: "Revenue Generator", icon: TrendingUp, color: "text-fuchsia-400" },
    { name: "Task Generator", icon: Target, color: "text-red-400" },
    { name: "Calendar Assistant", icon: Calendar, color: "text-neutral-400" },
  ]

  const features = [
    {
      title: "Strategic Planning",
      description: "AI-powered career roadmaps and goal setting",
      icon: Target,
    },
    {
      title: "Creative Support",
      description: "From lyrics to cover art, AI helps create",
      icon: Palette,
    },
    {
      title: "Business Management",
      description: "Contracts, taxes, and legal compliance made simple",
      icon: Building,
    },
    {
      title: "Marketing & Promotion",
      description: "Social media, press releases, and fan engagement",
      icon: Share2,
    },
    {
      title: "Revenue Optimization",
      description: "Discover new income streams and opportunities",
      icon: TrendingUp,
    },
    {
      title: "Industry Connections",
      description: "Network building and professional outreach",
      icon: Users,
    },
  ]

  const testimonials = [
    {
      name: "Maya Chen",
      role: "Independent Artist",
      content: "Armie handles everything my old label used to do, but better. I finally have control over my career.",
      avatar: "MC",
    },
    {
      name: "Jordan Rivers",
      role: "Singer-Songwriter",
      content:
        "The AI assistants are like having a full team. Contract generation alone saved me thousands in legal fees.",
      avatar: "JR",
    },
    {
      name: "Alex Thompson",
      role: "Producer",
      content: "From social media to business setup, Armie democratizes what used to require major label resources.",
      avatar: "AT",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image src="/images/armie-logo-icon.png" alt="Armie Logo" width={32} height={32} className="rounded-lg" />
              <span className="text-xl font-bold bg-gradient-to-r from-armie-secondary to-purple-400 bg-clip-text text-transparent">
                Armie
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost" className="text-white hover:text-armie-secondary">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-armie-secondary hover:bg-armie-secondary/80 text-armie-primary">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Build Your AI
              </span>
              <span className="block bg-gradient-to-r from-armie-secondary to-purple-400 bg-clip-text text-transparent">
                Music Label
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Armie equips independent musicians with AI-powered artist management assistants to help with every task a
              label does - from creative development to business operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-armie-secondary hover:bg-armie-secondary/80 text-armie-primary px-8 py-4 text-lg font-semibold"
                >
                  Start Building Your Label
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
                >
                  Explore AI Assistants
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center space-x-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-armie-secondary" />
                <span>19 AI Assistants</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-armie-secondary" />
                <span>10,000+ Artists</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-armie-secondary" />
                <span>24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistants Showcase */}
      <section id="features" className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Your Complete AI Label Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Every assistant you need to run a professional music operation, powered by cutting-edge AI technology.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-16">
            {aiAssistants.map((assistant, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-4 text-center">
                  <assistant.icon className={`w-8 h-8 ${assistant.color} mx-auto mb-2`} />
                  <p className="text-sm font-medium text-white">{assistant.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6">
                  <feature.icon className="w-12 h-12 text-armie-secondary mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Labels Do vs What Armie Does */}
      <section className="py-20 px-6 bg-black">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Everything a Label Does, AI-Powered
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Traditional labels charge 50-80% of your revenue. Armie gives you the same services with AI efficiency.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Traditional Music Labels Provide:</h3>
              <div className="space-y-4">
                {[
                  "A&R and Artist Development",
                  "Marketing and Promotion",
                  "Distribution and Sales",
                  "Legal and Business Affairs",
                  "Creative Services",
                  "Industry Connections",
                  "Financial Management",
                  "Brand Development",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-armie-secondary mb-6">Armie AI Assistants Deliver:</h3>
              <div className="space-y-4">
                {[
                  "AI-Powered Career Strategy",
                  "Automated Social Media & PR",
                  "Direct Distribution Guidance",
                  "Contract Generation & Legal Help",
                  "Cover Art & Content Creation",
                  "Network Building & Outreach",
                  "Revenue Optimization",
                  "Brand Identity Development",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-armie-secondary flex-shrink-0" />
                    <span className="text-white font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Artists Building Their Own Labels
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-armie-secondary text-armie-secondary" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-armie-secondary/20 flex items-center justify-center">
                      <span className="text-armie-secondary font-bold text-sm">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-black">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ready to Build Your AI Music Label?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of independent artists who've taken control of their careers with AI-powered management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-armie-secondary hover:bg-armie-secondary/80 text-armie-primary px-8 py-4 text-lg font-semibold"
                >
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6 bg-black">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Image src="/images/armie-logo-icon.png" alt="Armie Logo" width={32} height={32} className="rounded-lg" />
              <span className="text-xl font-bold bg-gradient-to-r from-armie-secondary to-purple-400 bg-clip-text text-transparent">
                Armie
              </span>
            </div>
            <p className="text-gray-400 text-center md:text-right">
              © 2024 Armie AI. Empowering independent artists worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
