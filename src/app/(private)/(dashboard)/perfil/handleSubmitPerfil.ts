'use server'

import { fetchAPI } from '@/lib/fetchAPI'
import { revalidatePath } from 'next/cache'
import { SchemaPerfilFormProps } from './PerfilForm'

export async function handleSubmitPerfil({
  image: file,
  name,
}: SchemaPerfilFormProps): Promise<boolean> {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', name)

    const response = await fetchAPI({
      url: `${process.env.NEXTAUTH_URL}/api/perfil`,
      method: 'PUT',
      data: formData,
    })

    if (!response.ok) {
      return false
    }
    revalidatePath('/perfil')
    return true
  } catch (error) {
    console.error('Erro ao processar perfil:', error)
  }
}
