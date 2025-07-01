"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Plus,
  Users,
  Building,
  Phone,
  Mail,
  MapPin,
  Star,
  Filter,
  Bot,
  FileText,
  Instagram,
  Twitter,
  Linkedin,
  Globe,
  Edit,
  Trash2,
} from "lucide-react"
import { toast } from "sonner"

const contactCategories = [
  "All",
  "Producer",
  "Record Label",
  "Venue",
  "Manager",
  "Agent",
  "Lawyer",
  "Publicist",
  "Other",
]

const relationshipStatus = ["Currently Working", "Potential", "Past Collaboration", "Friend", "Cold Contact"]

const mockContacts = [
  {
    id: "1",
    name: "Marcus Johnson",
    company: "Stellar Records",
    category: "Record Label",
    relationship: "Currently Working",
    rating: 5,
    email: "marcus@stellarrecords.com",
    phone: "+1 (555) 123-4567",
    location: "Los Angeles, CA",
    avatar: "/placeholder-user.jpg",
    notes: "A&R at Stellar Records. Very interested in indie rock. Great communication and quick decision maker.",
    tags: ["A&R", "Indie Rock", "Quick Response"],
    socialLinks: {
      instagram: "@marcusjohnson",
      twitter: "@marcusj_music",
      linkedin: "marcus-johnson-music",
      website: "stellarrecords.com",
    },
    lastContact: "2024-01-15",
    contractHistory: ["Recording Contract", "Distribution Agreement"],
  },
  {
    id: "2",
    name: "Sarah Chen",
    company: "Beat Factory Studios",
    category: "Producer",
    relationship: "Past Collaboration",
    rating: 4,
    email: "sarah@beatfactory.com",
    phone: "+1 (555) 987-6543",
    location: "Nashville, TN",
    avatar: "/placeholder-user.jpg",
    notes: "Produced our last EP. Excellent with vocal production and has great industry connections.",
    tags: ["Producer", "Vocal Specialist", "Industry Connections"],
    socialLinks: {
      instagram: "@sarahchenproducer",
      website: "beatfactorystudios.com",
    },
    lastContact: "2023-12-20",
    contractHistory: ["Producer Agreement"],
  },
  {
    id: "3",
    name: "The Blue Moon",
    company: "Independent Venue",
    category: "Venue",
    relationship: "Potential",
    rating: 3,
    email: "booking@bluemoonvenue.com",
    phone: "+1 (555) 456-7890",
    location: "Austin, TX",
    avatar: "/placeholder-user.jpg",
    notes: "Mid-size venue perfect for our target audience. Booking manager is responsive.",
    tags: ["Venue", "Mid-Size", "Austin"],
    socialLinks: {
      instagram: "@bluemoonaustin",
      website: "bluemoonvenue.com",
    },
    lastContact: "2024-01-10",
    contractHistory: [],
  },
  {
    id: "4",
    name: "David Rodriguez",
    company: "Rodriguez Management",
    category: "Manager",
    relationship: "Friend",
    rating: 5,
    email: "david@rodriguezmanagement.com",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    avatar: "/placeholder-user.jpg",
    notes: "Manages several successful indie artists. Great strategic thinker and industry knowledge.",
    tags: ["Manager", "Strategic", "Indie Focus"],
    socialLinks: {
      linkedin: "david-rodriguez-music",
      website: "rodriguezmanagement.com",
    },
    lastContact: "2024-01-12",
    contractHistory: ["Management Agreement"],
  },
]

export default function ContactsPage() {
  const [contacts, setContacts] = useState(mockContacts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedRelationship, setSelectedRelationship] = useState("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState<any>(null)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [isLoadingAI, setIsLoadingAI] = useState(false)

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.notes.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || contact.category === selectedCategory
    const matchesRelationship = selectedRelationship === "All" || contact.relationship === selectedRelationship
    return matchesSearch && matchesCategory && matchesRelationship
  })

  const getAISuggestions = async () => {
    setIsLoadingAI(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content:
                "Based on my music career as an indie artist, suggest 5 types of industry contacts I should prioritize building relationships with. Keep it brief and actionable.",
            },
          ],
          context: "contact_suggestions",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const suggestions = data.message.split("\n").filter((line: string) => line.trim().length > 0)
        setAiSuggestions(suggestions.slice(0, 5))
      }
    } catch (error) {
      console.error("Error getting AI suggestions:", error)
      toast.error("Failed to get AI suggestions")
    } finally {
      setIsLoadingAI(false)
    }
  }

  const handleAddContact = () => {
    setIsAddDialogOpen(true)
  }

  const handleDeleteContact = (contactId: string) => {
    setContacts(contacts.filter((c) => c.id !== contactId))
    toast.success("Contact deleted successfully")
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Producer: "bg-purple-100 text-purple-800",
      "Record Label": "bg-blue-100 text-blue-800",
      Venue: "bg-green-100 text-green-800",
      Manager: "bg-orange-100 text-orange-800",
      Agent: "bg-red-100 text-red-800",
      Lawyer: "bg-gray-100 text-gray-800",
      Publicist: "bg-pink-100 text-pink-800",
      Other: "bg-yellow-100 text-yellow-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const getRelationshipColor = (relationship: string) => {
    const colors: Record<string, string> = {
      "Currently Working": "bg-green-100 text-green-800",
      Potential: "bg-blue-100 text-blue-800",
      "Past Collaboration": "bg-purple-100 text-purple-800",
      Friend: "bg-yellow-100 text-yellow-800",
      "Cold Contact": "bg-gray-100 text-gray-800",
    }
    return colors[relationship] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Contacts</h1>
              <p className="text-muted-foreground">Manage your music industry network</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={getAISuggestions} variant="outline" disabled={isLoadingAI}>
              <Bot className="w-4 h-4 mr-2" />
              {isLoadingAI ? "Getting AI Tips..." : "AI Networking Tips"}
            </Button>
            <Button onClick={handleAddContact}>
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {contactCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Select value={selectedRelationship} onValueChange={setSelectedRelationship}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Relationships</SelectItem>
                {relationshipStatus.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      {aiSuggestions.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/50 dark:to-blue-950/50 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
              <Bot className="w-5 h-5" />
              AI Networking Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-purple-800 dark:text-purple-200">{suggestion}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{contacts.length}</p>
                <p className="text-sm text-muted-foreground">Total Contacts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {contacts.filter((c) => c.relationship === "Currently Working").length}
                </p>
                <p className="text-sm text-muted-foreground">Active Relationships</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{contacts.reduce((acc, c) => acc + c.contractHistory.length, 0)}</p>
                <p className="text-sm text-muted-foreground">Contract Connections</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{contacts.filter((c) => c.rating >= 4).length}</p>
                <p className="text-sm text-muted-foreground">High-Rated Contacts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="group hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                    <AvatarFallback>
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{contact.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{contact.company}</p>
                    <div className="flex items-center gap-1 mt-1">{renderStars(contact.rating)}</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedContact(contact)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteContact(contact.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className={getCategoryColor(contact.category)}>{contact.category}</Badge>
                <Badge className={getRelationshipColor(contact.relationship)}>{contact.relationship}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="truncate">{contact.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{contact.location}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Notes:</p>
                <p className="text-sm text-muted-foreground line-clamp-3">{contact.notes}</p>
              </div>

              {contact.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {contact.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {contact.contractHistory.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Contract History:</p>
                  <div className="flex flex-wrap gap-1">
                    {contact.contractHistory.map((contract, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <FileText className="w-3 h-3 mr-1" />
                        {contract}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-2">
                  {contact.socialLinks.instagram && (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Instagram className="w-4 h-4" />
                    </Button>
                  )}
                  {contact.socialLinks.twitter && (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Twitter className="w-4 h-4" />
                    </Button>
                  )}
                  {contact.socialLinks.linkedin && (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  )}
                  {contact.socialLinks.website && (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Globe className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Last contact: {new Date(contact.lastContact).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredContacts.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No contacts found</h3>
            <p className="text-muted-foreground text-center mb-4">
              Try adjusting your search terms or filters, or add your first contact.
            </p>
            <Button onClick={handleAddContact}>
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add Contact Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
            <DialogDescription>Add a new contact to your music industry network.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Contact name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Company name" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {contactCategories.slice(1).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    {relationshipStatus.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="contact@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="City, State" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Add notes about this contact..." />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setIsAddDialogOpen(false)
                toast.success("Contact added successfully!")
              }}
            >
              Add Contact
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
