
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { PencilSimpleLine } from '@phosphor-icons/react';
import { Label } from '@/components';

export function ImageUploadPreview({ defaultImage, userName }) {
  const [previewUrl, setPreviewUrl] = useState(defaultImage);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };



  return (
    <div className="relative w-fit">
      <input
        type="file"
        name="upload-photo"
        id="upload-photo"
        className="sr-only"
        accept="image/*"
        onChange={handleFileChange}
      />
      <Image
        src={previewUrl}
        alt={`Foto do perfil de ${userName}`}
        width={208}
        height={208}
        className="size-52 rounded-full object-cover"
        priority
        quality={80}
      />
      <Label
        htmlFor="upload-photo"
        className="absolute bottom-0 right-8 mb-0 flex cursor-pointer items-center rounded-full bg-green-950 p-1.5"
      >
        <PencilSimpleLine
          size={24}
          className="text-green-200"
          weight="fill"
        />
      </Label>
    </div>
  );
}