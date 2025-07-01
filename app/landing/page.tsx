"use client"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Music,
  FileText,
  Users,
  TrendingUp,
  Star,
  Check,
  Send,
  Bot,
  Sparkles,
  ArrowRight,
  Play,
  MessageCircle,
  Zap,
  Shield,
  Globe,
} from "lucide-react"
import Link from "next/link"

const suggestedPrompts = [
  "Help me review a record label contract",
  "Create a social media strategy for my new single",
  "What should I include in a performance agreement?",
  "How do I price my music for streaming platforms?",
]

export default function LandingPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi! I'm Armie, your AI assistant for the music industry. I can help you with contracts, marketing, career advice, and more. What would you like to know?",
      },
    ],
  })

  const handleSuggestedPrompt = (prompt: string) => {
    handleInputChange({ target: { value: prompt } } as any)
    handleSubmit({ preventDefault: () => {} } as any)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Armie
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-purple-600 transition-colors">
                Pricing
              </Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-purple-600 transition-colors">
                Testimonials
              </Link>
              <Link href="/auth/signin" className="text-gray-600 hover:text-purple-600 transition-colors">
                Sign In
              </Link>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-Powered Music Industry Assistant
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Your AI Assistant for the{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Music Industry
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Navigate contracts, boost your career, and make informed decisions with Armie - the AI assistant built
                  specifically for independent artists and musicians.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Link href="/auth/signup">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/dashboard">
                    View Dashboard
                    <Play className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="lg:pl-8">
              <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Chat with Armie</CardTitle>
                      <p className="text-sm text-gray-500">Try our AI assistant now</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Messages */}
                  <div className="h-80 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.role === "user"
                              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                              : "bg-white border shadow-sm"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white border shadow-sm p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Suggested Prompts */}
                  <div className="grid grid-cols-1 gap-2">
                    {suggestedPrompts.map((prompt, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-left justify-start h-auto p-2 text-xs bg-transparent"
                        onClick={() => handleSuggestedPrompt(prompt)}
                      >
                        <MessageCircle className="w-3 h-3 mr-2 flex-shrink-0" />
                        <span className="truncate">{prompt}</span>
                      </Button>
                    ))}
                  </div>

                  {/* Input */}
                  <form onSubmit={handleSubmit} className="flex space-x-2">
                    <Input
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Ask Armie anything..."
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-blue-100 text-blue-700">Features</Badge>
            <h2 className="text-4xl font-bold">Everything you need to succeed</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and AI assistance designed specifically for independent artists
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">Smart Contracts</h3>
                <p className="text-gray-600">
                  AI-powered contract review, generation, and negotiation assistance for all your music industry needs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Career Guidance</h3>
                <p className="text-gray-600">
                  Personalized advice on career development, industry networking, and strategic decision making.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Marketing Tools</h3>
                <p className="text-gray-600">
                  Social media strategies, press release generation, and promotional campaign planning.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold">AI Assistants</h3>
                <p className="text-gray-600">
                  Specialized AI tools for lyrics, bios, press releases, and other creative content.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold">Rights Management</h3>
                <p className="text-gray-600">
                  Track and manage your intellectual property, publishing rights, and licensing deals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold">Industry Network</h3>
                <p className="text-gray-600">
                  Connect with industry professionals, collaborators, and potential business partners.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-green-100 text-green-700">Testimonials</Badge>
            <h2 className="text-4xl font-bold">Loved by independent artists</h2>
            <p className="text-xl text-gray-600">See what artists are saying about Armie</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600">
                  "Armie helped me negotiate my first record deal. The contract analysis was spot-on and saved me
                  thousands."
                </p>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Sarah Martinez</p>
                    <p className="text-sm text-gray-500">Singer-Songwriter</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600">
                  "The marketing strategies from Armie doubled my streaming numbers in just 3 months. Incredible
                  results!"
                </p>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>DJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">DJ Johnson</p>
                    <p className="text-sm text-gray-500">Electronic Producer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600">
                  "As an independent artist, Armie is like having a whole team of industry experts in my pocket."
                </p>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>MR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Mike Rodriguez</p>
                    <p className="text-sm text-gray-500">Hip-Hop Artist</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-purple-100 text-purple-700">Pricing</Badge>
            <h2 className="text-4xl font-bold">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-gray-200">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold">Starter</h3>
                  <p className="text-gray-600">Perfect for emerging artists</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold">
                    $29<span className="text-lg text-gray-500">/month</span>
                  </div>
                  <p className="text-sm text-gray-500">14-day free trial</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>AI contract review</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Basic marketing tools</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Career guidance</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <Link href="/auth/signup">Start Free Trial</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-600 text-white">Most Popular</Badge>
              </div>
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold">Professional</h3>
                  <p className="text-gray-600">For serious independent artists</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold">
                    $79<span className="text-lg text-gray-500">/month</span>
                  </div>
                  <p className="text-sm text-gray-500">14-day free trial</p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Everything in Starter</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Advanced AI assistants</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Rights management</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Industry networking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  asChild
                >
                  <Link href="/auth/signup">Start Free Trial</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready to take your music career to the next level?</h2>
          <p className="text-xl opacity-90">
            Join thousands of independent artists who trust Armie with their music business decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100" asChild>
              <Link href="/auth/signup">
                Start Your Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
              asChild
            >
              <Link href="/dashboard">Explore Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Armie</span>
              </div>
              <p className="text-gray-400">AI-powered assistant for independent artists and musicians.</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#features" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="hover:text-white transition-colors">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Armie. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
