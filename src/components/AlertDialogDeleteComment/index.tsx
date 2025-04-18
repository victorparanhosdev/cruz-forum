'use client'
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
import { ComponentProps, ReactNode, useState } from 'react'
import { Button } from '@/components'
import { toaster } from '@/components/ui/toaster'
import { CircleNotch } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'

interface AlertDialogProps extends ComponentProps<typeof DialogTrigger> {
  children: ReactNode
  commentId: string
}

export const AlertDialogDeleteComment = ({
  commentId,
  children,
  ...props
}: AlertDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleDeleteComment() {
    setIsLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/comments/${commentId}/delete`,
        { method: 'DELETE' },
      )

      if (!response.ok) {
        const errorData = await response.json()

        if (errorData.error) {
          setIsLoading(false)
          setIsOpen(false)

          return toaster.error({
            title: 'Error',
            description: errorData.error,
            duration: 2000,
            type: 'error',
          })
        }

        return errorData
      }

      const data = await response.json()

      router.refresh()
      setIsLoading(false)
      setIsOpen(false)

      toaster.success({
        title: 'Deletado com sucesso!',
        description: data?.message || 'O comentario foi removido com sucesso.',
        duration: 1500,
      })

      return data
    } catch (error) {
      console.log('Deu errado:', error)
      return { error: 'Erro desconhecido ao excluir o comentario.' }
    }
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
      <DialogTrigger {...props} className="flex cursor-pointer items-center">
        {children}
      </DialogTrigger>
      <DialogContent
        className="mx-6 rounded-lg bg-gray-950 md:mx-auto"
        padding={6}
      >
        <DialogHeader padding={0} marginBottom={4}>
          <DialogTitle className="text-lg font-medium sm:text-xl md:text-2xl">
            Excluir Comentário
          </DialogTitle>
        </DialogHeader>

        <DialogBody padding={0}>
          <h1 className="text-xs text-zinc-300 sm:text-sm md:text-base">
            Tem certeza de que deseja excluir o comentario?
          </h1>
        </DialogBody>

        <DialogFooter padding={0} marginTop={6}>
          <DialogActionTrigger asChild>
            <Button state="outline-negative">Cancelar</Button>
          </DialogActionTrigger>

          {isLoading ? (
            <Button className="min-h-11 min-w-[101.16px]">
              <CircleNotch
                className="h-full w-full animate-spin text-white"
                size={20}
              />
            </Button>
          ) : (
            <Button type="button" onClick={handleDeleteComment}>
              Continue
            </Button>
          )}
        </DialogFooter>

        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}
