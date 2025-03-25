'use client'
import { Button, Input, InputMsgErro, Label } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleNotch, EnvelopeSimple } from '@phosphor-icons/react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const SchemaFormEmail = z.object({
  email: z.string().email({ message: 'Digite um e-mail inválido' }),
})

type SchemaFormEmailProps = z.infer<typeof SchemaFormEmail>

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

  async function handleSignIn(provider: string) {
    await signIn(provider, { callbackUrl: '/' })
  }
  async function handleFormEmailSubmit({ email }: SchemaFormEmailProps) {
    await signIn('email', { email, callbackUrl: '/' })
  }

  return (
    <div className="grid w-full gap-4">
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
          className={`flex w-full items-center`}
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

      <div className="grid gap-3">
        <button
          onClick={() => handleSignIn('google')}
          type="button"
          className="flex items-center gap-3 rounded-lg border border-stone-700 px-6 py-1 transition hover:enabled:bg-hover-btn-gray"
        >
          <Image
            alt="google"
            height={49}
            width={48}
            src="/google.svg"
            className="object-cover"
          />
          Fazer login com o Google
        </button>
        <button
          type="button"
          className="flex items-center gap-3 rounded-lg border border-stone-700 px-6 py-1 transition hover:enabled:bg-hover-btn-gray"
        >
          <Image
            onClick={() => handleSignIn('facebook')}
            alt="facebook"
            height={49}
            width={48}
            src="/facebook.svg"
            className="object-cover"
          />
          Fazer login com o Facebook
        </button>
      </div>
    </div>
  )
}
