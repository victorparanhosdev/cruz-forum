'use client'

import { TopicCommentsProps } from '@/app/api/topics/[slug]/comments/route'
import { Comentarios } from '@/components'
import { useEffect, useRef } from 'react'

export function CommentSection({
  comments,
}: {
  comments: TopicCommentsProps[]
}) {
  const lastCommentRef = useRef<HTMLDivElement | null>(null)
  const commentsContainerRef = useRef<HTMLDivElement | null>(null)
  const isFirstRender = useRef(true)
  const prevCommentsLength = useRef(0)

  useEffect(() => {
    const container = commentsContainerRef.current
    const lastComment = lastCommentRef.current
    const currentCommentsLength = comments.length

    if (container) {
      if (isFirstRender.current) {
        container.scrollTop = container.scrollHeight
        isFirstRender.current = false
      } else if (
        lastComment &&
        currentCommentsLength > prevCommentsLength.current
      ) {
        const commentTop = lastComment.offsetTop - container.offsetTop
        const commentHeight = lastComment.offsetHeight
        const containerHeight = container.clientHeight

        container.scrollTo({
          top: commentTop - (containerHeight - commentHeight),
          behavior: 'smooth',
        })
      }

      prevCommentsLength.current = currentCommentsLength
    }
  }, [comments])

  return (
    <div
      className="grid max-h-[calc(100vh-400px)] min-h-[192px] gap-4 overflow-auto px-2"
      ref={commentsContainerRef}
    >
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
        <div className="grid min-h-[142px] place-items-center rounded-lg border border-stone-900 p-4">
          <h1 className='text-sm'>Nenhum comentario por enquanto</h1>
        </div>
      )}
    </div>
  )
}
