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
import { toaster } from '../ui/toaster'
import { CircleNotch } from '@phosphor-icons/react'

const createTopicSchema = zod.object({
  title: zod
    .string()
    .min(1, {
      message: 'Titulo é obrigatório',
    })
    .max(60, 'O maximo é ate 60 caracteres'),
  descricao: zod
    .string()
    .min(1, {
      message: 'Descrição é obrigatório',
    })
    .max(200, 'O maximo permitido é ate 200 caracteres'),
})

export type CreateTopicFormData = zod.infer<typeof createTopicSchema>

const DEFAULT_FORM_VALUES: CreateTopicFormData = {
  title: '',
  descricao: '',
}

interface TopicDialogProps {
  children: ReactNode
  onCreateTopic: ({
    descricao,
    title,
  }: CreateTopicFormData) => Promise<{ error?: string }>
}

export const TopicDialog = ({ onCreateTopic, children }: TopicDialogProps) => {
  const [isClosedModal, setClosedModal] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateTopicFormData>({
    resolver: zodResolver(createTopicSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  })

  const handleCreateTopic = async ({
    title,
    descricao,
  }: CreateTopicFormData) => {
    try {
      const response = await onCreateTopic({ title, descricao })

      if (response?.error) {
        return toaster.error({
          description: response.error,
          duration: 3000,
        })
      }

      toaster.success({
        title: 'Topico criado com sucesso!',
        description: 'O tópico foi criado com sucesso.',
        duration: 3000,
      })
    } catch (error) {
      console.error(error)
    }

    handleDialogClose({ open: false })
  }

  const handleDialogClose = ({ open }: { open: boolean }) => {
    if (!open) {
      reset(DEFAULT_FORM_VALUES)
    }
    setClosedModal(open)
  }

  return (
    <DialogRoot
      open={isClosedModal}
      placement="center"
      onOpenChange={handleDialogClose}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="mx-6 rounded-lg bg-gray-950 md:mx-auto"
        padding={6}
      >
        <DialogHeader padding={0} marginBottom={4}>
          <DialogTitle className="text-2xl font-medium">
            Criar Tópico
          </DialogTitle>
        </DialogHeader>

        <DialogBody padding={0}>
          <form
            id="topic-form"
            className="flex min-h-[258px] flex-col gap-4"
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
          {isSubmitting ? (
            <Button className="min-h-11 w-full">
              <CircleNotch
                className="h-full w-full animate-spin text-white"
                size={20}
              />
            </Button>
          ) : (
            <Button type="submit" form="topic-form" className="w-full">
              Criar
            </Button>
          )}
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
