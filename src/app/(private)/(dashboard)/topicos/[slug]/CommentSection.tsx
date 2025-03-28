'use client'

import { TopicCommentsProps } from '@/app/api/topics/[slug]/comments/route'
import { Comentarios } from '@/components'
import { useEffect, useRef } from 'react'

export function CommentSection({
  comments,
}: {
  comments: TopicCommentsProps[]
}) {
  const lastCommentRef = useRef(null)

  useEffect(() => {
    if (lastCommentRef.current) {
      lastCommentRef.current.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [comments])

  return (
    <div className="grid max-h-[474px] gap-4 overflow-auto">
      {Array.isArray(comments) && comments.length > 0 ? (
        comments.map((comment, index) => {
          return (
            <Comentarios
              key={comment.id}
              dataComment={comment}
              ref={index === comments.length - 1 ? lastCommentRef : null}
            />
          )
        })
      ) : (
        <div className="grid min-h-[162px] place-items-center rounded-lg border border-stone-900 p-4">
          <h1>Nenhuma comentario por enquanto</h1>
        </div>
      )}
    </div>
  )
}
