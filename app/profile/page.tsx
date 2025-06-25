"use client"

import { useState } from "react"
import {
  User,
  Camera,
  MapPin,
  Globe,
  Mail,
  Phone,
  Calendar,
  Music,
  Users,
  Award,
  Settings,
  Edit3,
  Instagram,
  Twitter,
  Youtube,
  AirplayIcon as Spotify,
  CloudIcon as SoundCloud,
  Facebook,
  Save,
  X,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Alex Rodriguez",
    stageName: "Alex R",
    bio: "Independent artist creating soulful R&B and pop music. Based in Los Angeles, working on my debut album.",
    location: "Los Angeles, CA",
    website: "www.alexrmusic.com",
    email: "alex@alexrmusic.com",
    phone: "+1 (555) 123-4567",
    genre: "R&B, Pop",
    yearsActive: "2019 - Present",
    label: "Independent",
    socialLinks: {
      instagram: "@alexrmusic",
      twitter: "@alexrmusic",
      youtube: "AlexRMusicOfficial",
      spotify: "Alex R",
      soundcloud: "alexrmusic",
      facebook: "AlexRMusicPage",
    },
  })

  const [editData, setEditData] = useState(profileData)

  const handleSave = () => {
    setProfileData(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(profileData)
    setIsEditing(false)
  }

  const stats = [
    { label: "Songs Released", value: "12", icon: Music },
    { label: "Collaborations", value: "8", icon: Users },
    { label: "Awards", value: "3", icon: Award },
    { label: "Years Active", value: "5", icon: Calendar },
  ]

  const recentActivity = [
    { action: "Released new single", item: "Midnight Dreams", date: "2 days ago" },
    { action: "Updated bio", item: "Profile information", date: "1 week ago" },
    { action: "Added new collaboration", item: "Summer Vibes ft. Maya", date: "2 weeks ago" },
    { action: "Completed contract", item: "Distribution Agreement", date: "3 weeks ago" },
  ]

  return (
    <div className="space-y-6">
      {/* Cover Photo & Profile Picture Section */}
      <Card className="overflow-hidden">
        <div className="relative h-48 bg-armie-gradient">
          <div className="absolute inset-0 bg-gradient-to-r from-armie-primary/20 to-armie-secondary/20" />
          <Button variant="ghost" size="sm" className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white">
            <Camera className="h-4 w-4 mr-2" />
            Change Cover
          </Button>
        </div>

        <div className="relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-background bg-armie-gradient flex items-center justify-center">
                <User className="h-16 w-16 text-armie-accent" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-armie-secondary hover:bg-armie-secondary/80 text-armie-primary p-0"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 mt-4 sm:mt-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold armie-primary">{profileData.name}</h1>
                  <p className="text-lg text-muted-foreground">"{profileData.stageName}"</p>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profileData.location}
                  </div>
                </div>
                <div className="flex space-x-2 mt-4 sm:mt-0">
                  <Button
                    variant={isEditing ? "destructive" : "outline"}
                    onClick={isEditing ? handleCancel : () => setIsEditing(true)}
                  >
                    {isEditing ? (
                      <>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                  {isEditing && (
                    <Button
                      onClick={handleSave}
                      className="bg-armie-secondary hover:bg-armie-secondary/80 text-armie-primary"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              {/* Bio Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    About Me
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea
                      value={editData.bio}
                      onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      className="min-h-[100px]"
                    />
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">{profileData.bio}</p>
                  )}
                </CardContent>
              </Card>

              {/* Music Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Music className="h-5 w-5 mr-2" />
                    Music Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Genre</Label>
                      {isEditing ? (
                        <Input
                          value={editData.genre}
                          onChange={(e) => setEditData({ ...editData, genre: e.target.value })}
                          placeholder="e.g., Pop, R&B, Hip-Hop"
                        />
                      ) : (
                        <p className="text-muted-foreground">{profileData.genre}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Years Active</Label>
                      {isEditing ? (
                        <Input
                          value={editData.yearsActive}
                          onChange={(e) => setEditData({ ...editData, yearsActive: e.target.value })}
                          placeholder="e.g., 2019 - Present"
                        />
                      ) : (
                        <p className="text-muted-foreground">{profileData.yearsActive}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Label</Label>
                      {isEditing ? (
                        <Input
                          value={editData.label}
                          onChange={(e) => setEditData({ ...editData, label: e.target.value })}
                          placeholder="e.g., Independent, Sony Music"
                        />
                      ) : (
                        <p className="text-muted-foreground">{profileData.label}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="h-5 w-5 mr-2" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </Label>
                      {isEditing ? (
                        <Input
                          type="email"
                          value={editData.email}
                          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        />
                      ) : (
                        <p className="text-muted-foreground">{profileData.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        Phone
                      </Label>
                      {isEditing ? (
                        <Input
                          value={editData.phone}
                          onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                        />
                      ) : (
                        <p className="text-muted-foreground">{profileData.phone}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center">
                        <Globe className="h-4 w-4 mr-1" />
                        Website
                      </Label>
                      {isEditing ? (
                        <Input
                          value={editData.website}
                          onChange={(e) => setEditData({ ...editData, website: e.target.value })}
                        />
                      ) : (
                        <a href={`https://${profileData.website}`} className="text-armie-secondary hover:underline">
                          {profileData.website}
                        </a>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        Location
                      </Label>
                      {isEditing ? (
                        <Input
                          value={editData.location}
                          onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                        />
                      ) : (
                        <p className="text-muted-foreground">{profileData.location}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { platform: "Instagram", icon: Instagram, key: "instagram" },
                      { platform: "Twitter", icon: Twitter, key: "twitter" },
                      { platform: "YouTube", icon: Youtube, key: "youtube" },
                      { platform: "Spotify", icon: Spotify, key: "spotify" },
                      { platform: "SoundCloud", icon: SoundCloud, key: "soundcloud" },
                      { platform: "Facebook", icon: Facebook, key: "facebook" },
                    ].map(({ platform, icon: Icon, key }) => (
                      <div key={platform} className="space-y-2">
                        <Label className="text-sm font-medium flex items-center">
                          <Icon className="h-4 w-4 mr-1" />
                          {platform}
                        </Label>
                        {isEditing ? (
                          <Input
                            value={editData.socialLinks[key as keyof typeof editData.socialLinks]}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                socialLinks: { ...editData.socialLinks, [key]: e.target.value },
                              })
                            }
                            placeholder={`Your ${platform} handle`}
                          />
                        ) : (
                          <p className="text-muted-foreground">
                            {profileData.socialLinks[key as keyof typeof profileData.socialLinks] || "Not connected"}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-armie-accent/50">
                        <div className="w-2 h-2 rounded-full bg-armie-secondary mt-2" />
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.action}</span>
                            {activity.item && (
                              <>
                                {" "}
                                <span className="text-armie-secondary">"{activity.item}"</span>
                              </>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Profile Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Profile Visibility</Label>
                    <Select defaultValue="public">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public - Anyone can view</SelectItem>
                        <SelectItem value="private">Private - Only you can view</SelectItem>
                        <SelectItem value="contacts">Contacts Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Email Notifications</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Notifications</SelectItem>
                        <SelectItem value="important">Important Only</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-3 rounded-lg bg-armie-accent/50">
                    <stat.icon className="h-6 w-6 mx-auto mb-2 text-armie-secondary" />
                    <div className="text-2xl font-bold armie-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Music className="h-4 w-4 mr-2" />
                Upload New Track
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Find Collaborators
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Award className="h-4 w-4 mr-2" />
                Submit to Contests
              </Button>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Badge className="bg-armie-secondary text-armie-primary">New</Badge>
                  <span className="text-sm">First Single Released</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-armie-primary text-armie-accent">Pro</Badge>
                  <span className="text-sm">Profile Completed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-armie-secondary text-armie-primary">Social</Badge>
                  <span className="text-sm">Connected 5 Platforms</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
