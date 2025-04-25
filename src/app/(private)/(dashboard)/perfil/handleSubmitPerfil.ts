'use client'

import { SchemaPerfilFormProps } from './PerfilForm'

type HandleSubmitPerfilResponse = boolean | { messageFileSize: string }

export async function handleSubmitPerfil({
  image: file,
  name,
}: SchemaPerfilFormProps): Promise<HandleSubmitPerfilResponse> {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', name)
    const files = formData.get('file') as File
    const fileSizeImagem = 5 * 1024 * 1024 // 5MB

    if (files && files.size > fileSizeImagem) {
      return {
        messageFileSize: 'O tamanho máximo permitido para imagens é de 5 MB',
      }
    }

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
