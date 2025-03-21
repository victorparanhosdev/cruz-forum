import { cookies } from 'next/headers'

type RequestParams = {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: any
}

export async function fetchAPI<T>({
  url,
  method,
  data,
}: RequestParams): Promise<T> {
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
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`Erro ao fazer requisição: ${response.statusText}`)
    }
    return (await response.json()) as T
  } catch (error) {
    console.error('Erro na requisição:', error)
    throw error
  }
}
