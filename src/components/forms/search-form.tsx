// src/components/forms/search-form.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  location: z.string().optional(),
  duration: z.string().optional(),
})

type SearchFormData = z.infer<typeof searchSchema>

export function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  })

  const onSubmit = (data: SearchFormData) => {
    // Handle search
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm md:flex-row md:items-end"
    >
      <div className="flex-1">
        <Input
          {...register('query')}
          placeholder="Search tours..."
          error={errors.query?.message}
        />
      </div>
      <div className="flex-1">
        <Input
          {...register('location')}
          placeholder="Location"
          error={errors.location?.message}
        />
      </div>
      <div className="flex-1">
        <Input
          {...register('duration')}
          placeholder="Duration (days)"
          error={errors.duration?.message}
        />
      </div>
      <Button type="submit" className="md:w-auto">
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
    </form>
  )
}

