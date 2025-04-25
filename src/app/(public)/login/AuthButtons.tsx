'use client'
import { Button, Input, InputMsgErro, Label } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleNotch, EnvelopeSimple } from '@phosphor-icons/react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { toaster } from '@/components/ui/toaster'

const SchemaFormEmail = z.object({
  email: z.string().email({ message: 'Digite um e-mail inválido' }),
})

type SchemaFormEmailProps = z.infer<typeof SchemaFormEmail>

const ProvidersAuth = () => {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

  async function handleSignIn(provider: string) {
    try {
      setLoadingProvider(provider)
      await signIn(provider, { callbackUrl: '/' })
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingProvider(null)
    }
  }

  return (
    <div className="grid gap-3">
      <button
        onClick={() => handleSignIn('google')}
        type="button"
        disabled={loadingProvider !== null}
        className="flex items-center justify-center gap-3 rounded-lg border border-stone-700 px-4 py-2 text-sm transition hover:enabled:bg-hover-btn-gray disabled:opacity-70 sm:px-6"
      >
        {loadingProvider === 'google' ? (
          <>
            <CircleNotch size={32} className="animate-spin" /> Carregando...
          </>
        ) : (
          <>
            <Image
              alt="google"
              height={49}
              width={48}
              src="/google.svg"
              className="size-8 object-cover"
            />{' '}
            Fazer login com o Google
          </>
        )}
      </button>

      <button
        onClick={() => handleSignIn('github')}
        type="button"
        disabled={loadingProvider !== null}
        className="flex items-center justify-center gap-3 rounded-lg border border-stone-700 px-4 py-2 text-sm transition hover:enabled:bg-hover-btn-gray disabled:opacity-70 sm:px-6"
      >
        {loadingProvider === 'github' ? (
          <>
            <CircleNotch size={32} className="animate-spin" /> Carregando...
          </>
        ) : (
          <>
            <Image
              alt="github"
              height={49}
              width={48}
              src="/github.svg"
              className="size-8 object-cover"
            />{' '}
            Fazer login com o GitHub
          </>
        )}
      </button>

      {/* <button
      onClick={() => handleSignIn('facebook')}
      type="button"
      className="flex items-center justify-center gap-3 rounded-lg border border-stone-700 px-4 py-2 text-sm transition hover:enabled:bg-hover-btn-gray sm:px-6"
    >
      <Image
        alt="facebook"
        height={49}
        width={48}
        src="/facebook.svg"
        className="size-8 object-cover"
      />
      Fazer login com o Facebook
    </button> */}
    </div>
  )
}

export const AuthButtons = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SchemaFormEmailProps>({
    resolver: zodResolver(SchemaFormEmail),
    defaultValues: {
      email: '',
    },
  })

  async function handleFormEmailSubmit({ email }: SchemaFormEmailProps) {
    try {
      const response = await signIn('email', {
        email,
        callbackUrl: '/',
        redirect: false,
      })

      if (!response.ok) {
        return toaster.error({
          description: response.error,
          duration: 3000,
        })
      }

      toaster.success({
        title: 'Confira seu e-mail!',
        description:
          'Enviamos um link de acesso para sua caixa de entrada. Verifique também a pasta de spam.',
        duration: 4000,
      })
    } catch (error) {
      toaster.error({
        description: 'Ocorreu um erro ao tentar enviar o e-mail.',
        duration: 3000,
      })
    }
  }

  return (
    <div className="flex w-full flex-col gap-4 md:grid">
      <form
        onSubmit={handleSubmit(handleFormEmailSubmit)}
        className="grid w-full gap-4"
      >
        <div>
          <Label>Entrar com e-mail</Label>
          <Input
            placeholder="victor@email.com"
            state={errors.email?.message ? 'negative' : 'default'}
            withIcon={<EnvelopeSimple size={20} />}
            {...register('email')}
          />
          {errors.email?.message && (
            <InputMsgErro text={errors.email.message} />
          )}
        </div>

        <Button
          type="submit"
          state="default"
          className="flex w-full items-center"
          classNameIcon="animate-spin text-white"
          iconLeft={isSubmitting && CircleNotch}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Carregando...' : 'Continue com seu e-mail'}
        </Button>
      </form>

      <p className='flex w-full items-center gap-2 font-medium before:block before:h-px before:w-full before:bg-stone-700 before:content-[""] after:block after:h-px after:w-full after:bg-stone-700 after:content-[""]'>
        ou
      </p>

      <ProvidersAuth />
    </div>
  )
}
