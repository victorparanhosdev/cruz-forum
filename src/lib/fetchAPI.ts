import { cookies } from 'next/headers'

type RequestParams = {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: Record<string, unknown> | FormData
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

  const isFormData = data instanceof FormData

  const headers: HeadersInit = {
    Cookie: cookieString,
  }

  if (!isFormData && data) {
    headers['Content-Type'] = 'application/json'
  }

  const options: RequestInit = {
    method,
    headers,
    body: data ? (isFormData ? data : JSON.stringify(data)) : undefined,
    next,
  }

  return fetch(url, options)
}
