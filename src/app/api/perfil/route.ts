import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options'
import prisma from '@/lib/prisma'
import cloudinary from '@/lib/cloudinary'
export interface PerfilProps {
  quantityTopics: number
  quantitySavedTopics: number
  quantityComments: number
  image: string
  name: string
  email: string
}

export interface UpdatedUserProps {
  name: string
  id: string
  email: string
  image: string
}

export interface UserDataProps {
  name: string
  image: string
}

function extractPublicIdFromUrl(url: string | null): string | null {
  if (!url || !url.includes('cloudinary.com')) return null

  const matches = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/)
  return matches ? matches[1] : null
}

export async function GET(
  req: NextRequest,
): Promise<NextResponse<PerfilProps | { error: string }>> {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        {
          status: 401,
        },
      )
    }

    const user = await prisma.user
      .findUnique({
        where: {
          id: session.user.id,
        },
        select: {
          image: true,
          name: true,
          email: true,
          _count: {
            select: {
              topics: true,
              comments: true,
              savedTopics: true,
            },
          },
        },
      })
      .then((res) => {
        return {
          ...res,
          _count: undefined,
          quantityTopics: res._count.topics,
          quantitySavedTopics: res._count.savedTopics,
          quantityComments: res._count.comments,
        }
      })

    return NextResponse.json(user)
  } catch (erro) {
    return NextResponse.json(
      { error: 'Erro interno do servidor', erro },
      { status: 500 },
    )
  }
}

export async function PUT(
  req: NextRequest,
): Promise<NextResponse<UpdatedUserProps | UserDataProps | { error: string }>> {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 },
      )
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const userName = formData.get('name') as string | null

    const userData = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { name: true, image: true },
    })

    if (!userData) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 },
      )
    }

    const updateData: { name?: string; image?: string } = {}

    if (userName) {
      updateData.name = userName
    }
    if (file && file.size > 0) {
      try {
        const oldImagePublicId = extractPublicIdFromUrl(userData.image)
        if (oldImagePublicId) {
          try {
            await new Promise<void>((resolve, reject) => {
              cloudinary.uploader.destroy(oldImagePublicId, (error, result) => {
                if (error) {
                  console.warn('Erro ao excluir imagem antiga:', error)
                }
                resolve()
              })
            })
          } catch (deleteError) {
            console.warn('Erro ao excluir imagem antiga:', deleteError)
          }
        }

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const result = await new Promise<{ secure_url: string }>(
          (resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                folder: 'perfils',
                resource_type: 'image',
                public_id: `user_${session.user.id}_${Date.now()}`,
                overwrite: true,
                invalidate: true,
              },
              (error, result) => {
                if (error) return reject(error)
                resolve(result as { secure_url: string })
              },
            )

            stream.end(buffer)
          },
        )

        updateData.image = result.secure_url
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError)
        return NextResponse.json(
          { error: 'Erro ao fazer upload da imagem' },
          { status: 422 },
        )
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(userData)
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}

export const config = {
  api: {
    bodyParser: false,
    responseLimit: '5mb',
  },
}
