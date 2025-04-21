// src/components/tours/tour-list.tsx
'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchTours } from '@/store/slices/tourSlice'
import { TourCard } from './tour-card'
import { Loading } from '@/components/ui/Loading'
import { Error } from '@/components/ui/error'

export function TourList() {
  const dispatch = useAppDispatch()
  const { tours, loading, error } = useAppSelector((state) => state.tours)

  useEffect(() => {
    dispatch(fetchTours())
  }, [dispatch])

  if (loading) return <Loading />
  if (error) return <Error message={error} />

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour = {tour} />
      ))}
    </div>
  )
}