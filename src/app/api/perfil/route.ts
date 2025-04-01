
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options'
import prisma from '@/lib/prisma'

export interface PerfilProps {
  quantityTopics: number;
  quantitySavedTopics: number;
  quantityComments: number;
  image: string;
  name: string;
  email: string;
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

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id
        },
        select: {
            image: true,
            name: true,
            email: true,
            _count: {
                select: {
                    topics: true,
                    comments: true,
                    savedTopics: true
                }
            }
        }
        
    }).then( res => {

        return {
            ...res,
            _count: undefined,
            quantityTopics: res._count.topics,
            quantitySavedTopics: res._count.savedTopics,
            quantityComments: res._count.comments
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

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    
    const { avatarUrl, name } = await req.json();

  
    const userData = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { name: true },
    });

    if (!userData) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

  
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name || userData.name, 
        image: avatarUrl,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (erro) {
    return NextResponse.json(
      { error: "Erro interno do servidor", erro },
      { status: 500 }
    );
  }
}
