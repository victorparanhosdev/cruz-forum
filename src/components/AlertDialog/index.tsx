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
  topicSlug: number
  onDeleteTopic: (topicSlug: number) => Promise<void>
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

    try {
      await onDeleteTopic(topicSlug)
    } catch (error) {
      console.error('Erro ao deletar tópico:', error)
    }

    toaster.success({
      title: 'Deletado com sucesso!',
      description: 'O tópico foi removido com sucesso.',
      duration: 3000,
    })
    setIsLoading(false)
    setIsOpen(false)

    router.push('/')
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
            <Button className="min-w-[101.16px] min-h-11">
              <CircleNotch
                className="animate-spin h-full w-full text-white"
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
