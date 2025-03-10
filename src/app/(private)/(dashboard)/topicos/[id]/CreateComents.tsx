'use client'
import { Button, TextArea } from '@/components'
import { PaperPlaneRight, X } from '@phosphor-icons/react'
import Image from 'next/image'
import { useState } from 'react'

export const CommentForm = () => {
  const [isCommentActive, setCommentActive] = useState(false)

  const handleCommentToggle = () => {
    setCommentActive((prevState) => !prevState)
  }

  const handleCancel = () => {
    setCommentActive(false)
  }

  return (
    <div className="flex min-h-20 w-full justify-end">
      {isCommentActive ? (
        <div className="flex w-full items-center gap-3">
          <figure>
            <Image
              src="https://github.com/victorparanhosdev.png"
              alt="Foto do Perfil"
              width={48}
              height={48}
              className="w-12 rounded-full object-cover"
            />
          </figure>
          <TextArea
            state="default"
            placeholder="Escreva aqui o comentário..."
            className="min-h-full w-full resize-y overflow-auto"
          />
          <div className="flex items-center gap-3">
            <button aria-label="Cancelar comentário" onClick={handleCancel}>
              <X
                size={28}
                className="text-red-600 transition hover:scale-105 hover:text-red-500"
              />
            </button>
            <button aria-label="Enviar comentário">
              <PaperPlaneRight
                size={28}
                className="text-green-600 transition hover:scale-105 hover:text-green-400"
              />
            </button>
          </div>
        </div>
      ) : (
        <Button onClick={handleCommentToggle} className="h-fit px-6 py-4">
          Comentar
        </Button>
      )}
    </div>
  )
}
