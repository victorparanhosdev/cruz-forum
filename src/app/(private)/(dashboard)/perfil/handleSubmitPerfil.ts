'use server'

import fs from 'fs'
import path from 'path'
import { writeFile } from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'
import { fetchAPI } from '@/lib/fetchAPI'
import { revalidatePath } from 'next/cache'
import { SchemaPerfilFormProps } from './PerfilForm'

export async function handleSubmitPerfil({
  image: file,
  name,
}: SchemaPerfilFormProps): Promise<boolean> {
  try {
    let imagePath = null

    if (file && file.size > 0) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${uuidv4()}.${fileExt}`

      const uploadDir = path.join(process.cwd(), 'public', 'perfis')
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }

      const filePath = path.join(uploadDir, fileName)

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      await writeFile(filePath, buffer)

      imagePath = `/perfis/${fileName}`
    }

    const response = await fetchAPI({
      url: `${process.env.NEXTAUTH_URL}/api/perfil`,
      method: 'PUT',
      data: { avatarUrl: imagePath, name },
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
