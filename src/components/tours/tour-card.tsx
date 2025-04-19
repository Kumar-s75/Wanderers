// src/components/tours/tour-card.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, MapPin, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TourCardProps {
  tour: {
    id: string
    title: string
    slug: string
    summary: string
    price: number
    duration: number
    location: string
    images: { url: string }[]
    reviews: { rating: number }[]
  }
  className?: string
}

export function TourCard({ tour, className }: TourCardProps) {
  const averageRating = tour.reviews.reduce((acc, review) => acc + review.rating, 0) / tour.reviews.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md',
        className
      )}
    >
      <Link href={`/tours/${tour.slug}`}>
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={tour.images[0].url}
            alt={tour.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{averageRating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{tour.location}</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold">{tour.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {tour.summary}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{tour.duration} days</span>
            </div>
            <span className="font-semibold">${tour.price}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}