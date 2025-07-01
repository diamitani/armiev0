"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/auth-provider"
import {
  GraduationCap,
  Search,
  Play,
  BookOpen,
  Clock,
  Star,
  Award,
  Crown,
  Sparkles,
  CheckCircle,
  Users,
  TrendingUp,
  Target,
  Zap,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  category: "marketing" | "production" | "business" | "performance" | "songwriting" | "technology"
  level: "beginner" | "intermediate" | "advanced"
  duration: number // in hours
  lessons: number
  rating: number
  enrolled: number
  price: number
  isPremium: boolean
  progress?: number
  completed?: boolean
  thumbnail: string
  tags: string[]
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned: boolean
  earnedDate?: Date
  category: string
}

export default function AcademyHubPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("courses")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterLevel, setFilterLevel] = useState("all")

  const isPremiumUser = user?.plan === "pro" || user?.plan === "enterprise"

  const courses: Course[] = [
    {
      id: "1",
      title: "Music Marketing Fundamentals",
      description: "Learn the essential strategies for promoting your music and building a fanbase in the digital age.",
      instructor: "Sarah Johnson",
      category: "marketing",
      level: "beginner",
      duration: 8,
      lessons: 24,
      rating: 4.8,
      enrolled: 1247,
      price: 0,
      isPremium: false,
      progress: 75,
      completed: false,
      thumbnail: "/placeholder.svg?height=200&width=300",
      tags: ["Social Media", "Streaming", "Fanbase", "Digital Marketing"],
    },
    {
      id: "2",
      title: "Advanced Music Production Techniques",
      description: "Master professional production techniques used by top producers in the industry.",
      instructor: "Mike Chen",
      category: "production",
      level: "advanced",
      duration: 12,
      lessons: 36,
      rating: 4.9,
      enrolled: 892,
      price: 199,
      isPremium: true,
      progress: 30,
      completed: false,
      thumbnail: "/placeholder.svg?height=200&width=300",
      tags: ["Mixing", "Mastering", "DAW", "Sound Design"],
    },
    {
      id: "3",
      title: "Music Business & Rights Management",
      description: "Understand the business side of music, including contracts, royalties, and rights management.",
      instructor: "Lisa Rodriguez",
      category: "business",
      level: "intermediate",
      duration: 10,
      lessons: 30,
      rating: 4.7,
      enrolled: 654,
      price: 149,
      isPremium: true,
      thumbnail: "/placeholder.svg?height=200&width=300",
      tags: ["Contracts", "Royalties", "Publishing", "Legal"],
    },
    {
      id: "4",
      title: "Songwriting Masterclass",
      description: "Develop your songwriting skills with proven techniques from hit songwriters.",
      instructor: "David Park",
      category: "songwriting",
      level: "intermediate",
      duration: 6,
      lessons: 18,
      rating: 4.6,
      enrolled: 1089,
      price: 0,
      isPremium: false,
      progress: 100,
      completed: true,
      thumbnail: "/placeholder.svg?height=200&width=300",
      tags: ["Lyrics", "Melody", "Song Structure", "Creativity"],
    },
    {
      id: "5",
      title: "Live Performance & Stage Presence",
      description: "Build confidence and captivate audiences with professional performance techniques.",
      instructor: "Emma Thompson",
      category: "performance",
      level: "beginner",
      duration: 5,
      lessons: 15,
      rating: 4.5,
      enrolled: 743,
      price: 99,
      isPremium: true,
      thumbnail: "/placeholder.svg?height=200&width=300",
      tags: ["Stage Presence", "Confidence", "Audience", "Performance"],
    },
    {
      id: "6",
      title: "Music Technology & AI Tools",
      description: "Explore cutting-edge music technology and AI tools transforming the industry.",
      instructor: "Alex Kim",
      category: "technology",
      level: "advanced",
      duration: 8,
      lessons: 24,
      rating: 4.8,
      enrolled: 456,
      price: 179,
      isPremium: true,
      thumbnail: "/placeholder.svg?height=200&width=300",
      tags: ["AI", "Technology", "Innovation", "Future"],
    },
  ]

  const achievements: Achievement[] = [
    {
      id: "1",
      title: "First Course Completed",
      description: "Completed your first course in the Academy",
      icon: "🎓",
      earned: true,
      earnedDate: new Date("2024-01-15"),
      category: "milestone",
    },
    {
      id: "2",
      title: "Marketing Expert",
      description: "Completed all marketing courses",
      icon: "📈",
      earned: false,
      category: "expertise",
    },
    {
      id: "3",
      title: "Quick Learner",
      description: "Completed a course in under 24 hours",
      icon: "⚡",
      earned: true,
      earnedDate: new Date("2024-01-20"),
      category: "achievement",
    },
    {
      id: "4",
      title: "Knowledge Seeker",
      description: "Enrolled in 5 or more courses",
      icon: "🔍",
      earned: false,
      category: "milestone",
    },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "marketing":
        return TrendingUp
      case "production":
        return Zap
      case "business":
        return Target
      case "performance":
        return Users
      case "songwriting":
        return BookOpen
      case "technology":
        return Sparkles
      default:
        return BookOpen
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "marketing":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
      case "production":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
      case "business":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      case "performance":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
      case "songwriting":
        return "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300"
      case "technology":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      case "intermediate":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "advanced":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || course.category === filterCategory
    const matchesLevel = filterLevel === "all" || course.level === filterLevel
    return matchesSearch && matchesCategory && matchesLevel
  })

  const enrolledCourses = courses.filter((c) => c.progress !== undefined)
  const completedCourses = courses.filter((c) => c.completed)
  const totalHoursLearned = enrolledCourses.reduce(
    (sum, course) => sum + (course.duration * (course.progress || 0)) / 100,
    0,
  )
  const earnedAchievements = achievements.filter((a) => a.earned).length

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-orange-600" />
            Academy Hub
          </h1>
          <p className="text-muted-foreground">Advance your music career with expert-led courses and training</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge
            className={`${isPremiumUser ? "bg-gradient-to-r from-yellow-400 to-orange-500" : "bg-gray-500"} text-white`}
          >
            {isPremiumUser && <Crown className="w-3 h-3 mr-1" />}
            {user?.plan?.toUpperCase() || "FREE"}
          </Badge>
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Search className="w-4 h-4 mr-2" />
            Browse Courses
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Enrolled Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{enrolledCourses.length}</div>
            <p className="text-xs text-muted-foreground">Currently learning</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Completed Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedCourses.length}</div>
            <p className="text-xs text-muted-foreground">Certificates earned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Hours Learned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{Math.round(totalHoursLearned)}</div>
            <p className="text-xs text-muted-foreground">Time invested</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Award className="w-4 h-4 mr-2" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{earnedAchievements}</div>
            <p className="text-xs text-muted-foreground">Badges earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">All Courses</TabsTrigger>
          <TabsTrigger value="my-learning">My Learning</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="songwriting">Songwriting</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Courses Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => {
              const CategoryIcon = getCategoryIcon(course.category)
              const isAccessible = !course.isPremium || isPremiumUser

              return (
                <Card
                  key={course.id}
                  className={`group hover:shadow-lg transition-all duration-300 ${!isAccessible ? "opacity-60" : ""}`}
                >
                  <div className="relative">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {course.isPremium && (
                      <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                        <Crown className="w-3 h-3 mr-1" />
                        Pro
                      </Badge>
                    )}
                    {course.progress !== undefined && (
                      <div className="absolute bottom-2 left-2 right-2">
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                      </div>
                      {course.completed && <CheckCircle className="w-5 h-5 text-green-600" />}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="line-clamp-2 mb-4">{course.description}</CardDescription>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                            {course.duration}h
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-1 text-muted-foreground" />
                            {course.lessons} lessons
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                          {course.rating}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <Badge className={`text-xs ${getCategoryColor(course.category)}`}>
                            <CategoryIcon className="w-3 h-3 mr-1" />
                            {course.category}
                          </Badge>
                          <Badge className={`text-xs ${getLevelColor(course.level)}`}>{course.level}</Badge>
                        </div>
                        <span className="text-sm font-bold">{course.price === 0 ? "Free" : `$${course.price}`}</span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {course.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        className="w-full"
                        disabled={!isAccessible}
                        variant={course.progress !== undefined ? "outline" : "default"}
                      >
                        {course.completed ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Completed
                          </>
                        ) : course.progress !== undefined ? (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Continue Learning
                          </>
                        ) : isAccessible ? (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            {course.price === 0 ? "Start Course" : "Enroll Now"}
                          </>
                        ) : (
                          <>
                            <Crown className="w-4 h-4 mr-2" />
                            Requires Pro
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="my-learning" className="space-y-6">
          {enrolledCourses.length > 0 ? (
            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-24 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{course.title}</h3>
                            <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                          </div>
                          {course.completed && (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress: {course.progress}%</span>
                            <span>
                              {Math.round((course.duration * (course.progress || 0)) / 100)}h / {course.duration}h
                            </span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex space-x-2">
                            <Badge className={`text-xs ${getCategoryColor(course.category)}`}>{course.category}</Badge>
                            <Badge className={`text-xs ${getLevelColor(course.level)}`}>{course.level}</Badge>
                          </div>
                          <Button size="sm">
                            <Play className="w-4 h-4 mr-2" />
                            {course.completed ? "Review" : "Continue"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No courses enrolled yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start your learning journey by enrolling in your first course.
                </p>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Search className="w-4 h-4 mr-2" />
                  Browse Courses
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`transition-all duration-300 ${achievement.earned ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 dark:from-yellow-950/20 dark:to-orange-950/20 dark:border-yellow-800" : "opacity-60"}`}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                  {achievement.earned ? (
                    <div className="space-y-2">
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Earned
                      </Badge>
                      {achievement.earnedDate && (
                        <p className="text-xs text-muted-foreground">{achievement.earnedDate.toLocaleDateString()}</p>
                      )}
                    </div>
                  ) : (
                    <Badge variant="outline">Not Earned</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Premium CTA for Free Users */}
      {!isPremiumUser && (
        <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200 dark:from-orange-950/20 dark:to-yellow-950/20 dark:border-orange-800">
          <CardContent className="p-8 text-center">
            <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Unlock Premium Learning Content</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get access to advanced courses, exclusive masterclasses, personalized learning paths, certificates, and
              direct access to industry experts with Pro.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <GraduationCap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Advanced Courses</p>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Certificates</p>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Expert Access</p>
              </div>
              <div className="text-center">
                <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Learning Paths</p>
              </div>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-orange-600 to-yellow-600">
              <Sparkles className="w-5 h-5 mr-2" />
              Upgrade to Pro
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
