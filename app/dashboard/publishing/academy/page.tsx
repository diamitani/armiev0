"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Search,
  Play,
  CheckCircle,
  ExternalLink,
  Globe,
  DollarSign,
  FileText,
  Sparkles,
  Shield,
  Building,
} from "lucide-react"
import Image from "next/image"
import type { Course } from "@/types/course" // Import Course type
import { Target } from "lucide-react" // Import Target icon

export default function PublishingAcademyPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const courses: Course[] = [
    // Declare courses array with Course type
    {
      id: 1,
      title: "How To: Distribute Your Music",
      description: "Navigate the world of music distribution and maximize your reach across all streaming platforms",
      category: "Distribution",
      difficulty: "Beginner",
      duration: "2-3 hours",
      chapters: 7,
      students: 1234,
      rating: 4.8,
      progress: 0,
      icon: Globe,
      color: "bg-blue-100 text-blue-600",
      modules: [
        "Introduction to Music Distribution",
        "Major Digital Service Providers (DSPs)",
        "Niche and Regional Platforms",
        "Pre-Release Strategies",
        "Revenue Streams and Royalty Models",
        "Marketing and Promotion Strategies",
        "Building a Sustainable Distribution Strategy",
      ],
    },
    {
      id: 2,
      title: "How to Add Songs to Your P.R.O. Account",
      description: "Complete guide to registering your songs with performing rights organizations",
      category: "Royalties",
      difficulty: "Beginner",
      duration: "1-2 hours",
      chapters: 7,
      students: 987,
      rating: 4.9,
      progress: 0,
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
      modules: [
        "Introduction to P.R.O.s",
        "How to Sign Up with a P.R.O.",
        "Adding Songs to Your Account",
        "Claiming Tracks and Registration",
        "Collecting Royalties",
        "Frequently Asked Questions",
        "Next Steps and Catalog Management",
      ],
    },
    {
      id: 3,
      title: "How to Distribute Your Music - DSP Platforms",
      description: "Master TuneCore, DistroKid, CD Baby and other distribution services",
      category: "Distribution",
      difficulty: "Beginner",
      duration: "2-3 hours",
      chapters: 7,
      students: 1456,
      rating: 4.7,
      progress: 0,
      icon: Globe,
      color: "bg-blue-100 text-blue-600",
      modules: [
        "Introduction to Music Distribution",
        "Comparing Popular Distribution Platforms",
        "How to Distribute Your Music",
        "Maximizing Revenue from DSPs",
        "Choosing the Best DSP",
        "Frequently Asked Questions",
        "Getting Started Today",
      ],
    },
    {
      id: 4,
      title: "How To Copyright Your Music",
      description: "Protect your creative works and understand copyright law for musicians",
      category: "Legal",
      difficulty: "Intermediate",
      duration: "3-4 hours",
      chapters: 7,
      students: 892,
      rating: 4.8,
      progress: 0,
      icon: Shield,
      color: "bg-red-100 text-red-600",
      modules: [
        "Introduction to Copyrights",
        "Types of Copyrights for Music",
        "How to Copyright Your Music",
        "Benefits of Copyrighting",
        "Enforcing Your Copyright",
        "Frequently Asked Questions",
        "Next Steps After Registration",
      ],
    },
    {
      id: 5,
      title: "How to Create a Music Catalogue",
      description: "Organize and manage your music catalog for licensing opportunities",
      category: "Organization",
      difficulty: "Intermediate",
      duration: "2-3 hours",
      chapters: 8,
      students: 654,
      rating: 4.6,
      progress: 0,
      icon: FileText,
      color: "bg-purple-100 text-purple-600",
      modules: [
        "Introduction to Music Catalogues",
        "How to Categorize Your Music",
        "Best Practices for Organization",
        "Tagging and Metadata",
        "Sharing with Industry Professionals",
        "Maintaining Your Catalogue",
        "Frequently Asked Questions",
        "Keeping Your Catalogue Organized",
      ],
    },
    {
      id: 6,
      title: "How to Register with a P.R.O.",
      description: "Complete guide to performing rights organizations and maximizing royalties",
      category: "Royalties",
      difficulty: "Beginner",
      duration: "2-3 hours",
      chapters: 7,
      students: 1123,
      rating: 4.9,
      progress: 0,
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
      modules: [
        "Introduction to P.R.O.s",
        "Types of Royalties",
        "How to Register",
        "Maximizing Your Royalties",
        "Comparing Major P.R.O.s",
        "Frequently Asked Questions",
        "Next Steps",
      ],
    },
    {
      id: 7,
      title: "Music Licensing - Monetizing Through Licensing",
      description: "Master sync licensing and music supervision for TV, film, and advertising",
      category: "Licensing",
      difficulty: "Advanced",
      duration: "4-5 hours",
      chapters: 7,
      students: 567,
      rating: 4.8,
      progress: 0,
      icon: Sparkles,
      color: "bg-yellow-100 text-yellow-600",
      modules: [
        "Introduction to Music Licensing",
        "Types of Music Licensing",
        "How to Contact Music Supervisors",
        "Submitting Music for Licensing",
        "Platforms and Music Libraries",
        "Frequently Asked Questions",
        "Securing Licensing Deals",
      ],
    },
    {
      id: 8,
      title: "How To: Trademark Your Brand",
      description: "Protect your artist name, logo, and brand identity legally",
      category: "Legal",
      difficulty: "Advanced",
      duration: "3-4 hours",
      chapters: 7,
      students: 432,
      rating: 4.7,
      progress: 0,
      icon: Shield,
      color: "bg-red-100 text-red-600",
      modules: [
        "Introduction to Trademarks",
        "Types of Trademarks",
        "How to Trademark Your Brand",
        "Benefits of Registration",
        "Enforcing Your Trademark",
        "Frequently Asked Questions",
        "Next Steps After Registration",
      ],
    },
    {
      id: 9,
      title: "How to Register an E.I.N.",
      description: "Set up your music business properly with an Employer Identification Number",
      category: "Business",
      difficulty: "Beginner",
      duration: "1-2 hours",
      chapters: 7,
      students: 789,
      rating: 4.8,
      progress: 0,
      icon: Building,
      color: "bg-orange-100 text-orange-600",
      modules: [
        "Introduction to E.I.N.",
        "Role of E.I.N. in Business",
        "How to Apply for E.I.N.",
        "Benefits of Having E.I.N.",
        "Sole Proprietorship and E.I.N.",
        "Frequently Asked Questions",
        "Next Steps After Registration",
      ],
    },
  ]

  const quickSetupResources = [
    {
      title: "ASCAP Registration",
      description: "Register with ASCAP for performance royalties",
      url: "https://www.ascap.com",
      icon: ExternalLink,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "BMI Registration",
      description: "Register with BMI for performance royalties",
      url: "https://www.bmi.com",
      icon: ExternalLink,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Copyright Office",
      description: "Register your music copyrights",
      url: "https://www.copyright.gov",
      icon: ExternalLink,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "IRS E.I.N. Application",
      description: "Get your business tax ID number",
      url: "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online",
      icon: ExternalLink,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "TuneCore Distribution",
      description: "Distribute your music worldwide",
      url: "https://www.tunecore.com",
      icon: ExternalLink,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "USPTO Trademark Search",
      description: "Search and register trademarks",
      url: "https://www.uspto.gov",
      icon: ExternalLink,
      color: "bg-pink-100 text-pink-600",
    },
  ]

  const categories = ["all", "Distribution", "Royalties", "Legal", "Organization", "Licensing", "Business"]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700"
      case "Advanced":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getModuleIcon = (type: string) => {
    switch (type) {
      case "video":
        return Play
      case "reading":
        return BookOpen
      case "checklist":
        return CheckCircle
      case "external":
        return ExternalLink
      default:
        return FileText
    }
  }

  if (selectedCourse) {
    return (
      <div className="space-y-6 p-6">
        {/* Course Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setSelectedCourse(null)}>
              ← Back to Courses
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                <selectedCourse.icon className={`h-8 w-8 text-white p-1.5 rounded-lg ${selectedCourse.color}`} />
                {selectedCourse.title}
              </h1>
              <p className="text-muted-foreground">{selectedCourse.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className={getDifficultyColor(selectedCourse.difficulty)}>{selectedCourse.difficulty}</Badge>
            <Badge variant="outline">{selectedCourse.duration}</Badge>
          </div>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>Track your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{selectedCourse.progress}%</span>
              </div>
              <Progress value={selectedCourse.progress} className="h-2" />
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{selectedCourse.chapters}</div>
                  <div className="text-sm text-muted-foreground">Chapters</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{selectedCourse.modules.length}</div>
                  <div className="text-sm text-muted-foreground">Modules</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{selectedCourse.duration}</div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Content */}
        <Card>
          <CardHeader>
            <CardTitle>Course Content</CardTitle>
            <CardDescription>Comprehensive curriculum designed for your success</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Accordion component is not imported, assuming it's used elsewhere */}
            {/* Accordion type="single" collapsible className="w-full"> */}
            {/*   {selectedCourse.chapters.map((chapter, chapterIndex) => ( */}
            {/*     <AccordionItem key={chapter.id} value={chapter.id}> */}
            {/*       <AccordionTrigger className="text-left"> */}
            {/*         <div className="flex items-center space-x-3"> */}
            {/*           <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold"> */}
            {/*             {chapterIndex + 1} */}
            {/*           </div> */}
            {/*           <div> */}
            {/*             <div className="font-semibold">{chapter.title}</div> */}
            {/*             <div className="text-sm text-muted-foreground">{chapter.modules.length} modules</div> */}
            {/*           </div> */}
            {/*         </div> */}
            {/*       </AccordionTrigger> */}
            {/*       <AccordionContent> */}
            {/*         <div className="space-y-3 ml-11"> */}
            {/*           {chapter.modules.map((module, moduleIndex) => { */}
            {/*             const ModuleIcon = getModuleIcon(module.type) */}
            {/*             return ( */}
            {/*               <div */}
            {/*                 key={module.id} */}
            {/*                 className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors" */}
            {/*               > */}
            {/*                 <div className="flex items-center justify-center w-6 h-6 rounded bg-gray-100 text-gray-600"> */}
            {/*                   <ModuleIcon className="w-3 h-3" /> */}
            {/*                 </div> */}
            {/*                 <div className="flex-1"> */}
            {/*                   <div className="font-medium">{module.title}</div> */}
            {/*                   <div className="text-sm text-muted-foreground">{module.duration}</div> */}
            {/*                 </div> */}
            {/*                 <div className="flex items-center space-x-2"> */}
            {/*                   {module.completed && <CheckCircle className="w-4 h-4 text-green-600" />} */}
            {/*                   <Button size="sm" variant={module.completed ? "outline" : "default"}> */}
            {/*                     {module.completed ? "Review" : "Start"} */}
            {/*                   </Button> */}
            {/*                 </div> */}
            {/*               </div> */}
            {/*             ) */}
            {/*           })} */}
            {/*         </div> */}
            {/*       </AccordionContent> */}
            {/*     </AccordionItem> */}
            {/*   ))} */}
            {/* </Accordion> */}
          </CardContent>
        </Card>

        {/* Quick Setup Checklist */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Quick Setup Checklist
            </CardTitle>
            <CardDescription>Essential steps to get started with your publishing journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {[
                {
                  task: "Register with a P.R.O. (ASCAP, BMI, or SESAC)",
                  link: "https://www.ascap.com",
                  completed: false,
                },
                {
                  task: "Apply for your E.I.N. (Employer Identification Number)",
                  link: "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online",
                  completed: false,
                },
                { task: "Choose a music distribution platform", link: "https://www.tunecore.com", completed: false },
                {
                  task: "Register your songs for copyright protection",
                  link: "https://www.copyright.gov",
                  completed: false,
                },
                {
                  task: "Set up SoundExchange account for digital royalties",
                  link: "https://www.soundexchange.com",
                  completed: false,
                },
                { task: "Create and organize your music catalog", link: "#", completed: false },
                { task: "Research sync licensing opportunities", link: "#", completed: false },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border">
                  <CheckCircle className={`w-5 h-5 ${item.completed ? "text-green-600" : "text-gray-300"}`} />
                  <div className="flex-1">
                    <span className={item.completed ? "line-through text-muted-foreground" : ""}>{item.task}</span>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Go
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Image src="/images/armie-logo.png" alt="ARMIE" width={40} height={40} className="rounded-lg" />
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Publishing Academy</h1>
              <p className="text-slate-600">Master music publishing, distribution, and business fundamentals</p>
            </div>
          </div>
        </div>
        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200">
          <BookOpen className="w-3 h-3 mr-1" />9 Courses Available
        </Badge>
      </div>

      {/* Quick Setup Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Quick Setup Resources
          </CardTitle>
          <CardDescription>Direct links to essential services and registrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickSetupResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${resource.color}`}>
                      <resource.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{resource.title}</h3>
                      <p className="text-sm text-slate-500">{resource.description}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category === "all" ? "All Categories" : category}
            </Button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${course.color}`}>
                  <course.icon className="w-5 h-5" />
                </div>
                <Badge className={getDifficultyColor(course.difficulty)}>{course.difficulty}</Badge>
              </div>
              <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  {course.chapters} chapters
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {course.students.toLocaleString()} students
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {course.rating}
                </div>
              </div>

              {course.progress > 0 && (
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              )}

              <Button className="w-full">
                {course.progress > 0 ? (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Continue Course
                  </>
                ) : (
                  <>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Start Course
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-600 mb-2">No courses found</h3>
          <p className="text-slate-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
