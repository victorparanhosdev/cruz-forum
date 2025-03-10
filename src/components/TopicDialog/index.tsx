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
} from "@/components/ui/dialog"
import { ReactNode } from "react"
import { Button, Input, InputMsgErro, Label } from "@/components"
import { useForm, UseFormRegister } from 'react-hook-form'
import { z as zod } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextArea, TextAreaMsgErro } from "../TextArea"


const createTopicSchema = zod.object({
  titulo: zod.string().min(6, { 
    message: 'Titulo é obrigatório e deve conter no minimo 6 caracteres' 
  }),
  descricao: zod.string().min(1, { 
    message: 'Descrição é obrigatório' 
  })
})


type CreateTopicFormData = zod.infer<typeof createTopicSchema>


const DEFAULT_FORM_VALUES: CreateTopicFormData = {
  titulo: '',
  descricao: ''
}

interface TopicDialogProps {
  children: ReactNode
}

export const TopicDialog = ({ children }: TopicDialogProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<CreateTopicFormData>({
    resolver: zodResolver(createTopicSchema),
    defaultValues: DEFAULT_FORM_VALUES
  })

  const handleCreateTopic = async (data: CreateTopicFormData) => {
    const { descricao, titulo } = data
    console.log(titulo, descricao)

  }

  const handleDialogClose = ({ open }: { open: boolean }) => {
    if (!open) {
      reset(DEFAULT_FORM_VALUES)
    }
  }

  return (
    <DialogRoot placement='center' onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-gray-950 rounded-lg" padding={6}>
        <DialogHeader padding={0} marginBottom={4}>
          <DialogTitle className="text-2xl font-medium">Criar Tópico</DialogTitle>
        </DialogHeader>
        
        <DialogBody padding={0}>
          <form 
            id="topic-form" 
            className="flex flex-col gap-4  min-h-[258px]" 
            onSubmit={handleSubmit(handleCreateTopic)}
          >
            <FormField 
              label="Titulo *:" 
              name="titulo" 
              placeholder="Escreva o titulo"
              register={register}
              error={errors.titulo?.message}
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
            <Button state="outline-negative" className="w-full">Cancelar</Button>
          </DialogActionTrigger>
          <Button type="submit" form="topic-form" className="w-full">Criar</Button>
        </DialogFooter>
        
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}


interface FormFieldProps {
  label: string
  name: 'titulo' | 'descricao'
  placeholder: string
  register: UseFormRegister<CreateTopicFormData>;
  error?: string
  isTextArea?: boolean
}

const FormField = ({ 
  label, 
  name, 
  placeholder, 
  register, 
  error, 
  isTextArea = false 
}: FormFieldProps) => {
  const state = error ? 'negative' : 'default'
  
  return (
    <div>
      <Label htmlFor={name} className="mb-2 text-xs">{label}</Label>
      
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
      
      {error && (
        isTextArea ? (
          <TextAreaMsgErro text={error} />
        ) : (
          <InputMsgErro text={error} />
        )
      )}
    </div>
  )
}