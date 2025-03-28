'use client'
import { BookmarkSimple } from '@phosphor-icons/react'
import { HtmlHTMLAttributes, useState } from 'react'
import { toaster } from '../ui/toaster'
import { usePathname, useRouter } from 'next/navigation'

interface ButtonSavedTopic extends HtmlHTMLAttributes<HTMLButtonElement> {
  topicSlug: number
  isSavedTopic: boolean
}

export const ButtonSavedTopic = ({
  topicSlug,
  isSavedTopic,
  ...props
}: ButtonSavedTopic) => {
  const [isSaved, setSaved] = useState(isSavedTopic)
  const pathname = usePathname()
  const router = useRouter()

  async function handleSavedTopic() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/topics/${topicSlug}/saved`,
      {
        method: 'PUT',
      },
    ).then((res) => res.json())

    if (response.isSaved) {
      toaster.create({
        description: 'Tópico salvo com sucesso!',
        type: 'info',
        duration: 1500,
      })

      return setSaved(true)
    }

    if (!response.iSaved && pathname === '/salvos') {
      router.refresh()
    }

    toaster.create({
      description: "Tópico removido de 'Salvos'",
      type: 'error',
      duration: 1500,
    })

    setSaved(false)
  }

  return (
    <button {...props} onClick={handleSavedTopic}>
      <BookmarkSimple
        className="text-white"
        size={36}
        aria-hidden="true"
        weight={isSaved ? 'fill' : 'regular'}
      />
    </button>
  )
}
