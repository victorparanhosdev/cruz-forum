'use client'
import { PerfilProps } from '@/app/api/perfil/route'
import { ImageUploadPreview } from './ImageUploadPreview'
import { Button, Input, InputMsgErro, Label } from '@/components'
import {
  ChatText,
  ChatCircleDots,
  BookmarkSimple,
  CircleNotch,
} from '@phosphor-icons/react'
import { handleSubmitPerfil } from './handleSubmitPerfil'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { toaster } from '@/components/ui/toaster'
import { useRouter } from 'next/navigation'

interface PerfilFormProps {
  topicsText: string
  commentsText: string
  savedTopicsText: string
  data: PerfilProps
}
const SchemaPerfilForm = z.object({
  image: z.instanceof(File).optional(),
  name: z.string().min(3, 'Digite pelo menos 3 caracteres').optional(),
})

export type SchemaPerfilFormProps = z.infer<typeof SchemaPerfilForm>

export const PerfilForm = ({
  commentsText,
  data,
  savedTopicsText,
  topicsText,
}: PerfilFormProps) => {
  const session = useSession()
  const router = useRouter()

  const methods = useForm({
    resolver: zodResolver(SchemaPerfilForm),
    defaultValues: {
      name: data.name || '',
    },
  })

  async function handleSubmitPerfilForm({
    image,
    name,
  }: SchemaPerfilFormProps) {
    await handleSubmitPerfil({ image, name }).then((res) => {
      if (!res) {
        toaster.error({
          title: 'Perfil',
          description: 'Não foi possivel atualizar',
        })
      }
      if (res) {
        session.update()

        toaster.success({
          title: 'Perfil',
          description: 'Perfil atualizado com sucesso!',
        })
      }
    })
  }

  function handleCancel() {
    methods.reset()
    router.replace('/')
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmitPerfilForm)}
        className="flex gap-20 p-6"
      >
        <div className="grid justify-items-center gap-9">
          <ImageUploadPreview defaultImage={data.image} userName={data.name} />

          <div className="text-center">
            <h2 className="whitespace-nowrap text-3xl font-bold">
              {data.name}
            </h2>
            <p className="text-sm text-gray-400">{data.email}</p>
          </div>

          <ul className="grid gap-4">
            <li className="flex items-center gap-2 px-4 py-1">
              <ChatText size={24} /> {topicsText}
            </li>
            <li className="flex items-center gap-2 px-4 py-1">
              <ChatCircleDots size={24} /> {commentsText}
            </li>
            <li className="flex items-center gap-2 px-4 py-1">
              <BookmarkSimple size={24} />
              {savedTopicsText}
            </li>
          </ul>
        </div>
        <div className="min-h-full w-px bg-gray-800" />

        <div className="flex flex-col gap-9">
          <h2 className="text-2xl font-medium">Alterar Dados: </h2>

          <div className="grid gap-4">
            <div>
              <Label>Nome:</Label>
              <Input
                type="text"
                placeholder="Escreva seu nome"
                state="default"
                name="name"
                {...methods.register('name')}
              />
              {methods.formState.errors?.name?.message && (
                <InputMsgErro
                  className="mt-1.5"
                  text={methods.formState.errors?.name?.message}
                />
              )}
            </div>
            <div>
              <Label>Email:</Label>
              <Input
                type="email"
                placeholder="email@email.com"
                state="default"
                disabled
                defaultValue={data.email}
              />
            </div>
          </div>

          <div className="grid grid-flow-col gap-2">
            <Button
              type="button"
              className="w-full"
              state="outline-negative"
              onClick={handleCancel}
            >
              Cancelar
            </Button>

            {methods.formState.isSubmitting ? (
              <Button className="min-h-11 min-w-[166.63px]">
                <CircleNotch
                  className="h-full w-full animate-spin text-white"
                  size={20}
                />
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Salvar Alterações
              </Button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
