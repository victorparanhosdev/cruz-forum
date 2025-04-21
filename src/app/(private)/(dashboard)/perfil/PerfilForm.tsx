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
        className="flex flex-col gap-9 py-6 sm:gap-12 lg:flex-row"
      >
        <div className="flex w-full items-center justify-center md:w-auto">
          <div className="grid gap-2 sm:gap-6 md:flex md:grid-cols-none md:grid-rows-none md:flex-col md:items-center md:justify-center md:justify-items-center lg:min-w-[330px]">
            <ImageUploadPreview
              defaultImage={data.image}
              userName={data.name}
            />

            <div className="order-2 col-span-2 pt-4 text-center sm:pt-0 md:order-none">
              <h2 className="whitespace-nowrap text-xl font-bold lg:text-2xl">
                {data.name}
              </h2>
              <p className="text-xs text-gray-400 md:text-sm">{data.email}</p>
            </div>

            <ul className="order-1 grid gap-1 md:order-none md:gap-4">
              <li className="flex items-center gap-2 whitespace-nowrap px-4 py-1 text-xs sm:text-sm md:text-base">
                <ChatText className="size-4 md:size-6" /> {topicsText}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap px-4 py-1 text-xs sm:text-sm md:text-base">
                <ChatCircleDots className="size-4 md:size-6" /> {commentsText}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap px-4 py-1 text-xs sm:text-sm md:text-base">
                <BookmarkSimple className="size-4 md:size-6" />
                {savedTopicsText}
              </li>
            </ul>
          </div>
        </div>
        <div className="h-px w-full bg-gray-800 lg:h-auto lg:w-px" />

        <div className="flex flex-col gap-6 md:gap-9">
          <h2 className="text-base font-medium md:text-lg lg:text-2xl">
            Alterar Dados:{' '}
          </h2>

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
              <Button className="min-h-11 min-w-[120px]">
                <CircleNotch
                  className="h-full w-full animate-spin text-white"
                  size={20}
                />
              </Button>
            ) : (
              <Button type="submit" className="min-w-[120px]">
                Salvar
              </Button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
