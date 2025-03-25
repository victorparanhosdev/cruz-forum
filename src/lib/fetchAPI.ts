import { cookies } from 'next/headers'

type RequestParams = {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: Record<string, unknown>
  next?: NextFetchRequestConfig
}

export async function fetchAPI({
  url,
  method = 'GET',
  data,
  next,
}: RequestParams): Promise<Response> {
  const cookieStore = await cookies()
  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieString,
    },
    body: data ? JSON.stringify(data) : undefined,
    next,
  }

  return fetch(url, options)
}
