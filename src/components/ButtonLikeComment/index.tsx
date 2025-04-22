'use client'
import { Heart } from '@phosphor-icons/react/dist/ssr'
import { ButtonHTMLAttributes, useState } from 'react'
import { toaster } from '../ui/toaster'
import { motion } from 'framer-motion'

interface LikeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  likes: number
  commentId: string
  isLike: boolean
}

interface HeartIconProps {
  isActive: boolean
  isHovered: boolean
}

const HeartIcon = ({ isActive, isHovered }: HeartIconProps) => {
  return (
    <motion.div
      initial={false}
      animate={{ scale: isActive || isHovered ? 1.1 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Heart
        className={`${isActive ? 'text-green-600' : isHovered ? 'text-green-600' : 'text-white'}`}
        size={20}
        aria-hidden="true"
        weight={isActive || isHovered ? 'fill' : 'regular'}
      />
    </motion.div>
  )
}

export const ButtonLikeComment = ({
  likes,
  isLike,
  commentId,
  ...props
}: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(isLike)
  const [likeCount, setLikeCount] = useState<number>(likes)
  const [isHovered, setIsHovered] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function formatLikeText(count: number): string {
    if (count === 0) return 'Curtir'
    return count === 1 ? '1 curtida' : `${count} curtidas`
  }

  async function toggleLike() {
    if (isSubmitting) return

    setIsSubmitting(true)

    const newLikeState = !isLiked

    setIsLiked(newLikeState)
    setLikeCount((prevCount) =>
      newLikeState ? prevCount + 1 : Math.max(0, prevCount - 1),
    )

    if (!newLikeState) {
      setIsHovered(false)
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/comments/${commentId}/likes`,
        {
          method: 'PUT',
        },
      ).then((res) => res.json())

      if (response.isLike !== newLikeState) {
        setIsLiked(response.isLike)
        setLikeCount((prevCount) =>
          response.isLike ? prevCount + 1 : Math.max(0, prevCount - 1),
        )
      }

      if (response.error) {
        setIsLiked(!newLikeState)
        setLikeCount((prevCount) =>
          !newLikeState ? prevCount + 1 : Math.max(0, prevCount - 1),
        )

        toaster.create({
          description: response.error,
          type: 'error',
          duration: 1500,
        })
      }
    } catch (error) {
      setIsLiked(!newLikeState)
      setLikeCount((prevCount) =>
        !newLikeState ? prevCount + 1 : Math.max(0, prevCount - 1),
      )

      toaster.create({
        description: 'Erro ao processar sua curtida',
        type: 'error',
        duration: 1500,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <button
      {...props}
      onClick={toggleLike}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        if (!isLiked) {
          setIsHovered(false)
        }
      }}
      disabled={isSubmitting}
      aria-label={isLiked ? 'Remover curtida' : 'Curtir tópico'}
      aria-pressed={isLiked}
      className="flex items-center gap-2 transition-colors focus:outline-none"
    >
      <HeartIcon isActive={isLiked} isHovered={isHovered} />
      <span className="text-xs">{formatLikeText(likeCount)}</span>
    </button>
  )
}
