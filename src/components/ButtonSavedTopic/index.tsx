'use client'
import { BookmarkSimple } from '@phosphor-icons/react'
import { HtmlHTMLAttributes, useState } from 'react'
import { toaster } from '../ui/toaster'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
interface ButtonSavedTopic extends HtmlHTMLAttributes<HTMLButtonElement> {
  topicSlug: number
  isSavedTopic: boolean
}

function IconBookMarkSimple({ isSaved }: { isSaved: boolean }) {
  const [isHovered, setIsHovered] = useState(false)

  const handleTouch = () => {
    if (isSaved) return
    setIsHovered(true)

    setTimeout(() => {
      setIsHovered(false)
    }, 500)
  }

  return (
    <motion.div
      initial={false}
      animate={{ scale: isSaved || isHovered ? 1.1 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseEnter={() => !isSaved && setIsHovered(true)}
      onMouseLeave={() => !isSaved && setIsHovered(false)}
      onTouchStart={handleTouch}
    >
      <BookmarkSimple
        className="text-white"
        aria-hidden="true"
        size={28}
        weight={isSaved ? 'fill' : isHovered ? 'fill' : 'regular'}
      />
    </motion.div>
  )
}
export const ButtonSavedTopic = ({
  topicSlug,
  isSavedTopic,
  ...props
}: ButtonSavedTopic) => {
  const [isSaved, setSaved] = useState(isSavedTopic)
  const pathname = usePathname()
  const router = useRouter()

  async function handleSavedTopic(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
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

    if (response.error) {
      return toaster.create({
        description: response.error,
        type: 'error',
        duration: 1500,
      })
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
      <IconBookMarkSimple isSaved={isSaved} />
    </button>
  )
}
