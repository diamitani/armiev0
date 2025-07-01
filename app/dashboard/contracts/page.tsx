"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Plus,
  Wand2,
  Users,
  Music,
  Calendar,
  Briefcase,
  Shield,
  DollarSign,
  ArrowRight,
  BookOpen,
  Zap,
} from "lucide-react"
import Link from "next/link"

const contractTypes = [
  {
    id: "artist-management",
    title: "Artist Management Agreement",
    description: "Comprehensive management contract for artist-manager relationships",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    complexity: "High",
    popular: true,
  },
  {
    id: "recording-contract",
    title: "Recording Contract",
    description: "Studio recording and production agreement with rights and royalty specifications",
    icon: Music,
    color: "from-purple-500 to-pink-500",
    complexity: "High",
    popular: true,
  },
  {
    id: "booking-agreement",
    title: "Performance Booking Agreement",
    description: "Live performance contract for venues, festivals, and private events",
    icon: Calendar,
    color: "from-green-500 to-emerald-500",
    complexity: "Medium",
    popular: true,
  },
  {
    id: "producer-agreement",
    title: "Producer Agreement",
    description: "Music production collaboration contract with credit and compensation terms",
    icon: Briefcase,
    color: "from-orange-500 to-red-500",
    complexity: "Medium",
    popular: false,
  },
  {
    id: "licensing-deal",
    title: "Music Licensing Agreement",
    description: "Sync licensing contract for film, TV, advertising, and digital media",
    icon: Shield,
    color: "from-indigo-500 to-purple-500",
    complexity: "Medium",
    popular: false,
  },
  {
    id: "distribution-deal",
    title: "Distribution Agreement",
    description: "Digital and physical distribution contract with streaming platforms",
    icon: DollarSign,
    color: "from-teal-500 to-green-500",
    complexity: "High",
    popular: false,
  },
]

export default function ContractsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Contracts Hub</h1>
          <p className="text-muted-foreground">Create, customize, and manage professional music industry contracts</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Wand2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">AI Contract Wizard</h3>
            <p className="text-sm text-muted-foreground mb-4">Get personalized contract help from our AI assistant</p>
            <Link href="/dashboard/contracts/wizard">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Zap className="w-4 h-4 mr-2" />
                Start Wizard
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Browse Templates</h3>
            <p className="text-sm text-muted-foreground mb-4">Explore our library of professional contract templates</p>
            <Link href="/dashboard/contracts/templates">
              <Button variant="outline" className="w-full bg-transparent">
                <BookOpen className="w-4 h-4 mr-2" />
                View Templates
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Custom Contract</h3>
            <p className="text-sm text-muted-foreground mb-4">Create a completely custom contract from scratch</p>
            <Link href="/dashboard/contracts/wizard">
              <Button variant="outline" className="w-full bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Create Custom
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Popular Templates */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Popular Contract Types</h2>
          <Link href="/dashboard/contracts/templates">
            <Button variant="outline" size="sm">
              View All Templates
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contractTypes.map((contract) => {
            const IconComponent = contract.icon
            return (
              <Card key={contract.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-r ${contract.color} flex items-center justify-center`}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex items-center space-x-2">
                      {contract.popular && (
                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                          Popular
                        </Badge>
                      )}
                      <Badge
                        variant={
                          contract.complexity === "High"
                            ? "destructive"
                            : contract.complexity === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {contract.complexity}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{contract.title}</CardTitle>
                  <CardDescription className="text-sm">{contract.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex space-x-2">
                    <Link href={`/dashboard/contracts/${contract.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        Preview
                      </Button>
                    </Link>
                    <Link href={`/dashboard/contracts/wizard?template=${contract.id}`} className="flex-1">
                      <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                        Use Template
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Help Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Need Help Getting Started?</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                Our AI Contract Wizard can help you understand what type of contract you need and guide you through the
                creation process step by step.
              </p>
              <Link href="/dashboard/contracts/wizard">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Wand2 className="w-4 h-4 mr-2" />
                  Get AI Help
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
