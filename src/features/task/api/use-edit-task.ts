import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useCsrfToken } from '@/features/auth/api/use-csrf-token'

import { Task } from '@/types/type'

type RequestType = Pick<Task, 'name' | 'description' | 'status' | 'dueDate' | 'imagePath' | 'priority' | 'projectId'>

export const useEditTask = (taskId: number | undefined) => {
  const queryClient = useQueryClient()

  const { csrfToken, getCsrfToken } = useCsrfToken()

  const editTask = async ({ ...props }: RequestType) => {
    await csrfToken()

    const csrf = getCsrfToken()

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/tasks/${taskId}`, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(props),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-XSRF-TOKEN': csrf!,
      },
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(JSON.stringify(error))
    }

    return res.json()
  }
  const { mutate, isPending } = useMutation({
    mutationKey: ['editTask', taskId],
    mutationFn: (props: RequestType) => editTask(props),
    onSuccess(_, variables) {
      queryClient.invalidateQueries({ queryKey: ['userProjects'] })

      queryClient.invalidateQueries({ queryKey: ['project', variables.projectId] })
    },
  })

  return { mutate, isPending }
}
