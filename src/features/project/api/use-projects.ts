import { useQuery } from '@tanstack/react-query'

import { useCsrfToken } from '@/features/auth/api/use-csrf-token'

import { Project } from '@/types/type'

type ResponseType = {
  data: Project[]
}

export const useProjects = () => {
  const { csrfToken, getCsrfToken } = useCsrfToken()

  const fetchProject = async () => {
    await csrfToken()

    const csrf = getCsrfToken()

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/user/projects`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-XSRF-TOKEN': csrf!,
      },
    })

    if (!res.ok) {
      throw new Error('Unauthenticated.')
    }

    return res.json()
  }

  const { data, isLoading } = useQuery<ResponseType>({
    queryKey: ['userProjects'],
    queryFn: fetchProject,
    staleTime: Infinity,
  })

  return { data, isLoading }
}
