"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/components/auth-provider"
import {
  Plus,
  Target,
  Calendar,
  Star,
  TrendingUp,
  Music,
  Users,
  DollarSign,
  Zap,
  MoreVertical,
  Edit,
  Trash2,
  Crown,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface Task {
  id: string
  title: string
  description: string
  category: "creative" | "business" | "marketing" | "networking" | "learning"
  priority: "low" | "medium" | "high"
  status: "todo" | "in-progress" | "completed"
  dueDate?: Date
  createdDate: Date
  aiGenerated: boolean
}

export default function TasksPage() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Finish recording vocals for 'Summer Dreams'",
      description: "Complete the lead vocals and harmonies for the chorus and bridge sections",
      category: "creative",
      priority: "high",
      status: "in-progress",
      dueDate: new Date("2024-02-15"),
      createdDate: new Date("2024-01-10"),
      aiGenerated: true,
    },
    {
      id: "2",
      title: "Submit music to 5 Spotify playlists",
      description: "Research and submit latest single to relevant independent playlists",
      category: "marketing",
      priority: "medium",
      status: "todo",
      dueDate: new Date("2024-02-20"),
      createdDate: new Date("2024-01-12"),
      aiGenerated: true,
    },
    {
      id: "3",
      title: "Update social media bio across platforms",
      description: "Refresh bio with latest achievements and upcoming releases",
      category: "marketing",
      priority: "low",
      status: "completed",
      createdDate: new Date("2024-01-08"),
      aiGenerated: false,
    },
    {
      id: "4",
      title: "Network with local venue owners",
      description: "Reach out to 3 local venues for potential booking opportunities",
      category: "networking",
      priority: "medium",
      status: "todo",
      dueDate: new Date("2024-02-25"),
      createdDate: new Date("2024-01-14"),
      aiGenerated: true,
    },
  ])

  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("dueDate")
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "creative" as Task["category"],
    priority: "medium" as Task["priority"],
    dueDate: "",
  })

  const isPremiumUser = user?.plan === "pro" || user?.plan === "enterprise"

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "creative":
        return Music
      case "business":
        return DollarSign
      case "marketing":
        return TrendingUp
      case "networking":
        return Users
      case "learning":
        return Star
      default:
        return Target
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "creative":
        return "bg-purple-100 text-purple-700"
      case "business":
        return "bg-green-100 text-green-700"
      case "marketing":
        return "bg-blue-100 text-blue-700"
      case "networking":
        return "bg-orange-100 text-orange-700"
      case "learning":
        return "bg-pink-100 text-pink-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "all") return true
      if (filter === "completed") return task.status === "completed"
      if (filter === "pending") return task.status !== "completed"
      if (filter === "ai-generated") return task.aiGenerated
      return task.category === filter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        case "category":
          return a.category.localeCompare(b.category)
        case "status":
          return a.status.localeCompare(b.status)
        default:
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return a.dueDate.getTime() - b.dueDate.getTime()
      }
    })

  const completedTasks = tasks.filter((task) => task.status === "completed").length
  const totalTasks = tasks.length
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "completed" ? "todo" : "completed",
            }
          : task,
      ),
    )
  }

  const addTask = () => {
    if (!newTask.title.trim()) return

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      category: newTask.category,
      priority: newTask.priority,
      status: "todo",
      dueDate: newTask.dueDate ? new Date(newTask.dueDate) : undefined,
      createdDate: new Date(),
      aiGenerated: false,
    }

    setTasks((prev) => [task, ...prev])
    setNewTask({
      title: "",
      description: "",
      category: "creative",
      priority: "medium",
      dueDate: "",
    })
    setIsAddingTask(false)
  }

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  const generateAITasks = () => {
    // Simulate AI task generation
    const aiTasks: Task[] = [
      {
        id: Date.now().toString() + "1",
        title: "Create Instagram Reels for new single",
        description: "Develop 3-5 short-form video content pieces to promote your latest release",
        category: "marketing",
        priority: "high",
        status: "todo",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        createdDate: new Date(),
        aiGenerated: true,
      },
      {
        id: Date.now().toString() + "2",
        title: "Research sync licensing opportunities",
        description: "Identify 5 music supervisors or sync agencies that match your genre",
        category: "business",
        priority: "medium",
        status: "todo",
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
        createdDate: new Date(),
        aiGenerated: true,
      },
    ]

    setTasks((prev) => [...aiTasks, ...prev])
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task Manager</h1>
          <p className="text-muted-foreground">Organize your music career goals and track progress</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge
            className={`${isPremiumUser ? "bg-gradient-to-r from-yellow-400 to-orange-500" : "bg-gray-500"} text-white`}
          >
            {isPremiumUser && <Crown className="w-3 h-3 mr-1" />}
            {user?.plan?.toUpperCase() || "FREE"}
          </Badge>
          <Button onClick={generateAITasks} variant="outline">
            <Zap className="w-4 h-4 mr-2" />
            Generate AI Tasks
          </Button>
          <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
            <DialogTrigger asChild>
              <Button className="bg-armie-secondary text-armie-primary hover:bg-armie-secondary/80">
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Enter task title..."
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Enter task description..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <Select
                      value={newTask.category}
                      onValueChange={(value: Task["category"]) => setNewTask({ ...newTask, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="networking">Networking</SelectItem>
                        <SelectItem value="learning">Learning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Select
                      value={newTask.priority}
                      onValueChange={(value: Task["priority"]) => setNewTask({ ...newTask, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date (Optional)</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddingTask(false)}>
                    Cancel
                  </Button>
                  <Button onClick={addTask}>Add Task</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Progress Overview</h3>
            <span className="text-sm text-muted-foreground">
              {completedTasks} of {totalTasks} tasks completed
            </span>
          </div>
          <Progress value={completionRate} className="h-3" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>{completionRate.toFixed(0)}% Complete</span>
            <span>{totalTasks - completedTasks} remaining</span>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Sort */}
      <div className="flex flex-wrap gap-4 items-center">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="ai-generated">AI Generated</SelectItem>
            <SelectItem value="creative">Creative</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="networking">Networking</SelectItem>
            <SelectItem value="learning">Learning</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dueDate">Due Date</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="category">Category</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => {
          const CategoryIcon = getCategoryIcon(task.category)
          const isOverdue = task.dueDate && task.dueDate < new Date() && task.status !== "completed"

          return (
            <Card
              key={task.id}
              className={`transition-all duration-200 ${task.status === "completed" ? "opacity-75" : ""} ${isOverdue ? "border-red-200 bg-red-50/50" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <Checkbox
                      checked={task.status === "completed"}
                      onCheckedChange={() => toggleTaskStatus(task.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3
                          className={`font-semibold ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}
                        >
                          {task.title}
                        </h3>
                        {task.aiGenerated && (
                          <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                            <Zap className="w-3 h-3 mr-1" />
                            AI
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={`text-xs ${getCategoryColor(task.category)}`}>
                          <CategoryIcon className="w-3 h-3 mr-1" />
                          {task.category}
                        </Badge>
                        <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>{task.priority} priority</Badge>
                        {task.dueDate && (
                          <Badge
                            variant="outline"
                            className={`text-xs ${isOverdue ? "border-red-300 text-red-700" : ""}`}
                          >
                            <Calendar className="w-3 h-3 mr-1" />
                            {task.dueDate.toLocaleDateString()}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => deleteTask(task.id)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
            <p className="text-muted-foreground mb-6">
              {filter === "all"
                ? "Create your first task to start organizing your music career goals"
                : "No tasks match your current filter criteria"}
            </p>
            <div className="flex justify-center space-x-3">
              <Button
                onClick={() => setIsAddingTask(true)}
                className="bg-armie-secondary text-armie-primary hover:bg-armie-secondary/80"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
              <Button onClick={generateAITasks} variant="outline">
                <Zap className="w-4 h-4 mr-2" />
                Generate AI Tasks
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
