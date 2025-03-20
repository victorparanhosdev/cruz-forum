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
import { ReactNode, useState } from 'react'
import {
  Button,
  Input,
  InputMsgErro,
  Label,
  TextArea,
  TextAreaMsgErro,
} from '@/components'
import { useForm, UseFormRegister } from 'react-hook-form'
import { z as zod } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
const createTopicSchema = zod.object({
  title: zod.string().min(6, {
    message: 'Titulo é obrigatório e deve conter no minimo 6 caracteres',
  }),
  descricao: zod.string().min(1, {
    message: 'Descrição é obrigatório',
  }),
})

export type CreateTopicFormData = zod.infer<typeof createTopicSchema>

const DEFAULT_FORM_VALUES: CreateTopicFormData = {
  title: '',
  descricao: '',
}

interface TopicDialogProps {
  children: ReactNode
}

export const TopicDialog = ({ children }: TopicDialogProps) => {
 const [isClosedModal, setClosedModal] = useState(false)
 const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateTopicFormData>({
    resolver: zodResolver(createTopicSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  })

  const handleCreateTopic = async (data: CreateTopicFormData) => {
    
    const { descricao, title } = data

      await fetch('http://localhost:3000/api/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, descricao }),
      }).then(res => res.json()).catch(console.error)

      handleDialogClose({open: false})
      router.refresh()
    
  }

  const handleDialogClose = ({ open }: { open: boolean }) => {
    if (!open) {
      reset(DEFAULT_FORM_VALUES)
    }
    setClosedModal(open)

  }

  return (
    <DialogRoot open={isClosedModal} placement="center" onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="rounded-lg bg-gray-950" padding={6}>
        <DialogHeader padding={0} marginBottom={4}>
          <DialogTitle className="text-2xl font-medium">
            Criar Tópico
          </DialogTitle>
        </DialogHeader>

        <DialogBody padding={0}>
          <form
            id="topic-form"
            className="flex min-h-[258px] flex-col  gap-4"
            onSubmit={handleSubmit(handleCreateTopic)}
            name="topic-form"
          >
            <FormField
              label="Titulo *:"
              name="title"
              placeholder="Escreva o titulo"
              register={register}
              error={errors.title?.message}
            />

            <FormField
              label="Descrição *:"
              name="descricao"
              placeholder="Escreva uma descrição"
              register={register}
              error={errors.descricao?.message}
              isTextArea
            />
          </form>
        </DialogBody>

        <DialogFooter padding={0} marginTop={6}>
          <DialogActionTrigger asChild>
            <Button state="outline-negative" className="w-full">
              Cancelar
            </Button>
          </DialogActionTrigger>
          <Button type="submit" form="topic-form" className="w-full">
            {isSubmitting ? 'Carregando': 'Criar'}
          </Button>
        </DialogFooter>

        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

interface FormFieldProps {
  label: string
  name: 'title' | 'descricao'
  placeholder: string
  register: UseFormRegister<CreateTopicFormData>
  error?: string
  isTextArea?: boolean
}

const FormField = ({
  label,
  name,
  placeholder,
  register,
  error,
  isTextArea = false,
}: FormFieldProps) => {
  const state = error ? 'negative' : 'default'

  return (
    <div>
      <Label htmlFor={name} className="mb-2 text-xs">
        {label}
      </Label>

      {isTextArea ? (
        <TextArea
          state={state}
          placeholder={placeholder}
          id={name}
          {...register(name)}
        />
      ) : (
        <Input
          id={name}
          state={state}
          placeholder={placeholder}
          {...register(name)}
        />
      )}

      {error &&
        (isTextArea ? (
          <TextAreaMsgErro text={error} />
        ) : (
          <InputMsgErro text={error} />
        ))}
    </div>
  )
}
