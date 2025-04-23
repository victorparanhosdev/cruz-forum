'use client'

import { ComponentProps, ReactNode, useState } from 'react'

import { toaster } from '@/components/ui/toaster'
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CircleNotch } from '@phosphor-icons/react'
import { Button } from '@/components'

interface DeleteTopicResponse {
  message?: string
  error?: string
}

interface AlertDialogProps extends ComponentProps<typeof DialogTrigger> {
  children: ReactNode
  topicSlug: number
  onDeleteTopic: (topicSlug: number) => Promise<DeleteTopicResponse>
}

export const AlertDialogDeleteMyTopic = ({
  topicSlug,
  onDeleteTopic,
  children,
  ...props
}: AlertDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleDeleteTopic() {
    setIsLoading(true)

    await onDeleteTopic(topicSlug)
      .then((res) => {
        if (res.error) {
          setIsLoading(false)
          setIsOpen(false)

          return toaster.error({
            title: 'Error',
            description: res.error,
            duration: 3000,
            type: 'error',
          })
        }

        setIsLoading(false)
        setIsOpen(false)

        toaster.success({
          title: 'Deletado com sucesso!',
          description: res?.message || 'O tópico foi removido com sucesso.',
          duration: 3000,
        })
      })
      .catch(console.error)
  }

  const handleDialogClose = ({ open }: { open: boolean }) => {
    setIsOpen(open)
  }

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={handleDialogClose}
      placement="center"
      role="alertdialog"
    >
      <DialogTrigger
        {...props}
        asChild
        className="flex cursor-pointer items-center"
      >
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleDialogClose({ open: true })
          }}
        >
          {children}
        </button>
      </DialogTrigger>
      <DialogContent
        className="rounded-lg bg-gray-950 md:mx-auto"
        padding={6}
      >
        <DialogHeader padding={0} marginBottom={4}>
          <DialogTitle className="text-lg font-medium sm:text-xl md:text-2xl">
            Excluir Tópico
          </DialogTitle>
        </DialogHeader>

        <DialogBody padding={0}>
          <h1 className="text-xs text-zinc-300 sm:text-sm md:text-base">
            Tem certeza de que deseja excluir o tópico? Essa ação é irreversível
            e não poderá ser desfeita.
          </h1>
        </DialogBody>

        <DialogFooter padding={0} marginTop={6}>
          <DialogActionTrigger asChild>
            <Button
              onClick={(e) => e.preventDefault()}
              type="button"
              state="outline-negative"
            >
              Cancelar
            </Button>
          </DialogActionTrigger>

          {isLoading ? (
            <Button className="min-h-11 min-w-[101.16px]">
              <CircleNotch
                className="h-full w-full animate-spin text-white"
                size={20}
              />
            </Button>
          ) : (
            <Button type="button" onClick={handleDeleteTopic}>
              Continue
            </Button>
          )}
        </DialogFooter>

        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}
