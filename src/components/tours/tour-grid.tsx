// src/components/tours/tour-grid.tsx
import { cn } from '@/lib/utils'
import { TourCard } from './tour-card'

interface TourGridProps {
  tours: any[] // Replace with proper type
  className?: string
}

export function TourGrid({ tours, className }: TourGridProps) {
  return (
    <div className={cn(
      'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      className
    )}>
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  )
}