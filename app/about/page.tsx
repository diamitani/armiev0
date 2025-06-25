import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target, Users, DollarSign, Sparkles, TrendingUp, Shield, Music, Zap, Globe, Award } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: Sparkles,
      title: "General Assistant",
      description: "AI-powered task planner and strategic guide for your music career",
    },
    {
      icon: Music,
      title: "Music Catalog Manager",
      description: "Organizes discography, metadata, and digital assets",
    },
    {
      icon: Target,
      title: "Branding Assistant",
      description: "Builds and maintains brand identity and strategy",
    },
    {
      icon: TrendingUp,
      title: "Social Media Toolkit",
      description: "Auto-generates copy, images, and content calendars",
    },
    {
      icon: Shield,
      title: "Administrative Tools",
      description: "EIN setup, PRO registration, contract wizard, tax manager",
    },
    {
      icon: DollarSign,
      title: "Monetization Guides",
      description: "Grants, licensing, and revenue path discovery",
    },
  ]

  const stats = [
    { label: "AI Tools Available", value: "50+", icon: Zap },
    { label: "Monthly Active Artists", value: "10K+", icon: Users },
    { label: "Revenue Generated", value: "$2M+", icon: DollarSign },
    { label: "Countries Served", value: "25+", icon: Globe },
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Music className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold">ARMIE</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          AI-powered artist career management platform that brings together every tool an independent or signed artist
          needs to build, manage, and grow their music career—all in one dashboard.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Badge className="bg-purple-100 text-purple-800">
            <Award className="mr-1 h-3 w-3" />
            Industry Leading
          </Badge>
          <Badge className="bg-green-100 text-green-800">
            <Sparkles className="mr-1 h-3 w-3" />
            AI Powered
          </Badge>
        </div>
      </div>

      {/* Problem & Solution */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">The Problem</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700">
              Today's artists face fragmented workflows: from creating cover art, generating contracts, managing taxes,
              or promoting on social media, they juggle dozens of tools. Managers are expensive or inaccessible, and
              most "all-in-one" solutions only scratch the surface of artists' true business needs.
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Our Solution</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700">
              ARMIE offers an integrated suite of AI tools tailored specifically for artists—from catalog management to
              branding, licensing, tax setup, contract generation, social content, and more. It doesn't just automate
              busywork—it provides strategic, guided assistance, helping artists move forward every day.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Platform Impact</CardTitle>
          <CardDescription className="text-center">
            Empowering artists worldwide with AI-driven career management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <stat.icon className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Business Model */}
      <Card>
        <CardHeader>
          <CardTitle>Business Model</CardTitle>
          <CardDescription>Hybrid SaaS and usage-based pricing for maximum accessibility</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Subscription Base</h3>
                  <p className="text-sm text-muted-foreground">
                    $5/month or $50/year flat fee for platform access and base credits
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Zap className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Credit Upsell</h3>
                  <p className="text-sm text-muted-foreground">
                    Tasks like contract generation or cover art creation use credits with built-in margins
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Value Proposition</h4>
              <p className="text-sm text-purple-700">
                This model allows us to scale with high LTV artists while remaining accessible for emerging talent.
                Artists pay for what they use, making professional-grade tools available regardless of budget.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Features */}
      <Card>
        <CardHeader>
          <CardTitle>Product Highlights</CardTitle>
          <CardDescription>
            Comprehensive tools designed to integrate seamlessly and automate repetitive tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <feature.icon className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vision */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="text-purple-900">Our Vision</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-800 text-lg">
            Our vision is to democratize artist management—making powerful, professional-grade support accessible to
            every creative, regardless of budget or experience level.
          </p>
          <div className="mt-6">
            <Button className="bg-purple-600 hover:bg-purple-700">Start Your Journey</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
