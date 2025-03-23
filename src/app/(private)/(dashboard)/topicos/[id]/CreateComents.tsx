'use client'
import { Button, TextArea } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { PaperPlaneRight, X } from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'

import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const SchemaFormComments = z.object({
  comments: z.string(),
})

type CommentFormProps = {
  onAddComments: ({
    comments,
    topicId,
  }: {
    comments: string
    topicId: string
  }) => Promise<void>
  topicId: string
}

type SchemaFormCommentsProps = z.infer<typeof SchemaFormComments>

export const CommentForm = ({ onAddComments, topicId }: CommentFormProps) => {
  const [isCommentActive, setCommentActive] = useState(false)

  const { data } = useSession()

  const { handleSubmit, register } = useForm<SchemaFormCommentsProps>({
    resolver: zodResolver(SchemaFormComments),
    defaultValues: {
      comments: '',
    },
  })

  const handleCommentToggle = () => {
    setCommentActive((prevState) => !prevState)
  }

  const handleCancel = () => {
    setCommentActive(false)
  }

  async function handleFormSubmit({ comments }: SchemaFormCommentsProps) {
    await onAddComments({ comments, topicId })
    handleCancel()
  }

  return (
    <div className="flex min-h-20 w-full justify-end">
      {isCommentActive ? (
        <form
          className="flex w-full items-center gap-3"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <figure>
            <Image
              src={data?.user.image ?? '/placeholderperfil.png'}
              alt="Foto do Perfil"
              width={48}
              height={48}
              className="w-12 rounded-full object-cover"
            />
          </figure>
          <TextArea
            state="default"
            placeholder="Escreva aqui o comentário..."
            className="min-h-full w-full resize-y overflow-auto bg-black"
            {...register('comments')}
          />
          <div className="flex items-center gap-3">
            <button aria-label="Cancelar comentário" onClick={handleCancel}>
              <X
                size={28}
                className="text-red-600 transition hover:scale-105 hover:text-red-500"
              />
            </button>
            <button aria-label="Enviar comentário" type="submit">
              <PaperPlaneRight
                size={28}
                className="text-green-600 transition hover:scale-105 hover:text-green-400"
              />
            </button>
          </div>
        </form>
      ) : (
        <Button onClick={handleCommentToggle} className="h-fit px-6 py-4">
          Comentar
        </Button>
      )}
    </div>
  )
}
