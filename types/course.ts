export interface Course {
  id: number
  title: string
  description: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  chapters: number
  students: number
  rating: number
  progress: number
  icon: any
  color: string
  modules: string[]
  keyPoints?: string[]
}

export interface ChecklistItem {
  id: number
  task: string
  description: string
  link: string
  completed: boolean
  priority: "High" | "Medium" | "Low"
  estimatedTime: string
}

export interface QuickSetupResource {
  title: string
  description: string
  url: string
  icon: any
  color: string
  category: string
}
