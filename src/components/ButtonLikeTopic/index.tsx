'use client'
import { Heart } from '@phosphor-icons/react/dist/ssr'
import { ButtonHTMLAttributes, useState } from 'react'
import { toaster } from '../ui/toaster'
import { motion } from 'framer-motion'

interface ButtonLikeTopicProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  likes: number
  topicSlug: number
  isLike: boolean
}

function IconHeartComponent({ isLike }: { isLike: boolean }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={false}
      animate={{ scale: isLike || isHovered ? 1.1 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseEnter={() => !isLike && setIsHovered(true)}
      onMouseLeave={() => !isLike && setIsHovered(false)}
    >
      <Heart
        className="text-white"
        size={20}
        aria-hidden="true"
        weight={isLike ? 'fill' : isHovered ? 'fill' : 'regular'}
      />
    </motion.div>
  )
}

export const ButtonLikeTopic = ({
  likes,
  isLike,
  topicSlug,
  ...props
}: ButtonLikeTopicProps) => {
  const [isLikeTopic, setIsLikeTopic] = useState(isLike)
  const [counterLikes, setCounterLikes] = useState<number>(likes)

  async function handleLikeTopic() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/topics/${topicSlug}/likes`,
        {
          method: 'PUT',
        },
      ).then((res) => res.json())

      if (response.isLike) {
        setCounterLikes((prev) => prev + 1)
        setIsLikeTopic(true)
        return
      }

      if (response.error) {
        toaster.create({
          description: response.error,
          type: 'error',
          duration: 1500,
        })
        return
      }

      setCounterLikes((prev) => prev - 1)
      setIsLikeTopic(false)
    } catch (error) {
      toaster.create({
        description: 'Error ao curtir topico',
        type: 'error',
        duration: 1500,
      })
    }
  }

  return (
    <button
      {...props}
      onClick={handleLikeTopic}
      aria-label="Botão de curtir"
      className="flex items-center gap-2"
    >
      <IconHeartComponent isLike={isLikeTopic} /> {counterLikes} curtidas
    </button>
  )
}
