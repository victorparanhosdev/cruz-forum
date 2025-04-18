'use client'

import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import Image from 'next/image'
import { PencilSimpleLine } from '@phosphor-icons/react'
import { Label } from '@/components'

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

  return (
    <div className="relative h-fit w-fit">
      <input
        type="file"
        name="upload-photo"
        id="upload-photo"
        className="sr-only"
        accept="image/*"
        onChange={handleFileChange}
      />
      <Image
        src={previewUrl || '/default-avatar.png'}
        alt={`Foto do perfil de ${userName}`}
        width={208}
        height={208}
        className="sm:min-w-size-32 size-24 min-w-24 rounded-full object-cover sm:size-32 md:size-52 md:min-w-52"
        priority
        quality={80}
      />
      <Label
        htmlFor="upload-photo"
        className="absolute bottom-0 right-0 mb-0 flex cursor-pointer items-center rounded-full bg-green-950 p-1.5 md:right-8"
      >
        <PencilSimpleLine
          className="size-4 text-green-200 md:size-6"
          weight="fill"
        />
      </Label>
    </div>
  )
}
