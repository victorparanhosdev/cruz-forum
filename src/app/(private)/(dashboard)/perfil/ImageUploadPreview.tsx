'use client'

import { useState, useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import Image from 'next/image'
import { PencilSimpleLine } from '@phosphor-icons/react'

interface ImageUploadPreviewProps {
  defaultImage?: string
  userName: string
}

export function ImageUploadPreview({
  defaultImage,
  userName,
}: ImageUploadPreviewProps) {
  const { setValue } = useFormContext()
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(defaultImage)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl !== defaultImage) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl, defaultImage])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)
      setValue('image', file)
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="relative h-fit w-fit">
      <label htmlFor="upload-photo" className="sr-only">
        Selecionar foto de perfil
      </label>
      <input
        type="file"
        name="upload-photo"
        id="upload-photo"
        className="sr-only"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        aria-label="Selecionar foto de perfil"
      />

      <div
        className="cursor-pointer"
        onClick={handleImageClick}
        role="button"
        aria-label="Selecionar nova foto de perfil"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleImageClick()
            e.preventDefault()
          }
        }}
      >
        <Image
          src={previewUrl || '/default-avatar.png'}
          alt={`Foto do perfil de ${userName}`}
          width={208}
          height={208}
          className="size-24 min-w-24 rounded-full object-cover sm:size-32 sm:min-w-32 md:size-44 md:min-w-44"
          priority
          quality={80}
          ref={imgRef}
        />
      </div>

      <button
        onClick={handleImageClick}
        className="absolute bottom-0 right-1 mb-0 flex cursor-pointer items-center rounded-full bg-green-950 p-1.5 sm:right-3 md:right-5"
        aria-label="Editar foto de perfil"
        type="button"
      >
        <PencilSimpleLine
          className="size-3 text-green-200 sm:size-4 md:size-5"
          weight="fill"
        />
      </button>
    </div>
  )
}
