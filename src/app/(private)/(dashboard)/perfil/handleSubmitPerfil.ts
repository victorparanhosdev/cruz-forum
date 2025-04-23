'use client'

import { SchemaPerfilFormProps } from './PerfilForm'

export async function handleSubmitPerfil({
  image: file,
  name,
}: SchemaPerfilFormProps): Promise<boolean> {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', name)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/perfil`,
      {
        body: formData,
        method: 'PUT',
      },
    )

    if (!response.ok) {
      return false
    }
    return true
  } catch (error) {
    console.error('Erro ao processar perfil:', error)
  }
}
