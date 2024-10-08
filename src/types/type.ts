export type Project = {
  id: number
  name: string
  description: string | null
  dueDate: string
  status: 'pending' | 'progress' | 'completed'
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
  status: 'pending' | 'progress' | 'completed'
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
  role: 'admin' | 'member'
  email_verified_at: string
}

export type ValidationErrorType = {
  name: string[]
  description: string[]
  dueDate: string[]
  status: string[]
  priority: string[]
}
