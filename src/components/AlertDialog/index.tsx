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

interface DeleteTopicResponse {
  message?: string
  error?: string
}

interface AlertDialogProps extends ComponentProps<typeof DialogTrigger> {
  children: ReactNode
  topicSlug: number
  onDeleteTopic: (topicSlug: number) => Promise<DeleteTopicResponse>
}

export const AlertDialog = ({
  topicSlug,
  onDeleteTopic,
  children,
  ...props
}: AlertDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

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

        router.refresh()
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
      <DialogTrigger {...props} className="flex cursor-pointer items-center">
        {children}
      </DialogTrigger>
      <DialogContent className="rounded-lg bg-gray-950" padding={6}>
        <DialogHeader padding={0} marginBottom={4}>
          <DialogTitle className="text-2xl font-medium">
            Excluir Tópico
          </DialogTitle>
        </DialogHeader>

        <DialogBody padding={0}>
          <h1 className="text-base text-zinc-300">
            Tem certeza de que deseja excluir o tópico nome do tópico? Essa ação
            é irreversível e não poderá ser desfeita.
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
