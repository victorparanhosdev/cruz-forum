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
import { ComponentProps, ReactNode } from 'react'
import { Button } from '@/components'

interface AlertDialogProps extends ComponentProps<typeof DialogTrigger> {
  children: ReactNode
}

export const AlertDialog = ({ children, ...props }: AlertDialogProps) => {
  return (
    <DialogRoot placement="center" role="alertdialog">
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
          <Button type="button" form="topic-form">
            Continue
          </Button>
        </DialogFooter>

        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}
