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
