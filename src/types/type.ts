export type Project = {
  id: number
  name: string
  description: string | null
  dueDate: string
  status: 'pending' | 'is_progress' | 'completed'
  imagePath: string | null
  createdBy: number
  updatedBy: number
  createdAt: string
  updatedAt: string
}

export type Task = {
  id: number
  name: string
  description: string | null
  dueDate: string
  status: 'pending' | 'is_progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  imagePath: string | null
  createdBy: number
  updatedBy: number
  createdAt: string
  updatedAt: string
  assignedUserId: number
  projectId: number
}

export type User = {
  id: number
  name: string
}

export type ValidationErrorType = {
  name: string[]
  description: string[]
  due_date: string[]
  status: string[]
  priority: string[]
}
