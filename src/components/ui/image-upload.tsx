// src/components/ui/image-upload.tsx
'use client'

import { useCallback, useState } from 'react'
// import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { X } from 'lucide-react'

interface ImageUploadProps {
  name: string
  multiple?: boolean
  defaultValue?: { url: string }[]
  onChange?: (files: File[]) => void
}

export function ImageUpload({
  name,
  multiple = false,
  defaultValue = [],
  onChange,
}: ImageUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>(defaultValue.map(img => img.url))

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => multiple ? [...prev, ...acceptedFiles] : acceptedFiles)
    
    const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file))
    setPreviews(prev => multiple ? [...prev, ...newPreviews] : newPreviews)
    
    onChange?.(acceptedFiles)
  }, [multiple, onChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    multiple,
  })

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}`}
      >
        <input {...getInputProps()} name={name} />
        <p className="text-sm text-gray-600">
          {isDragActive
            ? 'Drop the files here...'
            : 'Drag & drop images here, or click to select files'}
        </p>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {previews.map((preview, index) => (
            <div key={preview} className="relative group">
              <Image
                src={preview}
                alt={`Preview ${index + 1}`}
                width={200}
                height={200}
                className="rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}