// src/types/index.ts
import { User, Tour, Booking, Review, Image, Itinerary, Included, NotIncluded } from '@prisma/client'

// Tour Types
export interface TourWithDetails extends Tour {
  images: Image[]
  itinerary: Itinerary[]
  included: Included[]  // Changed from { item: string }[] to match Prisma schema
  notIncluded: NotIncluded[]  // Changed from { item: string }[] to match Prisma schema
  reviews: Review[]
  user: User
}

// Update TourFormData to match our form implementation
export interface TourFormData {
  title: string
  description: string
  summary: string
  price: number
  duration: number
  maxGroupSize: number
  difficulty: 'EASY' | 'MEDIUM' | 'DIFFICULT'
  location: string
  startLocation: string
  featured: boolean
  images: File[]  // This matches our file upload implementation
  itinerary: {
    day: number
    title: string
    description: string
  }[]
  included: string[]  // This matches our form implementation
  notIncluded: string[]  // This matches our form implementation
}

// Update BookingFormData to match our server action
export interface BookingFormData {
  tourId: string
  startDate: Date
  numGuests: number
  specialRequests?: string
  userId: string  // Added to match our server action
}

// Update ReviewFormData to match our implementation
export interface ReviewFormData {
  tourId: string
  rating: number
  comment: string
  photos?: File[]  // Changed from images to photos to match our implementation
  userId: string  // Added to match our server action
}

// Update ApiResponse to match our server actions
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string  // Added to match our server action responses
}

// Update FormState to match our form implementations
export interface FormState {
  success?: boolean
  error?: string
  fieldErrors?: Record<string, string>
  isLoading?: boolean
  message?: string  // Added to match our form responses
}

// Update TourSearchParams to match our search implementation
export interface TourSearchParams {
  location?: string
  difficulty?: 'EASY' | 'MEDIUM' | 'DIFFICULT'  // Updated to match our enum
  duration?: number
  priceRange?: {
    min: number
    max: number
  }
  startDate?: Date
  groupSize?: number
  search?: string  // Added to match our search implementation
}

// Update TourFilters to match our filter implementation
export interface TourFilters {
  difficulty?: ('EASY' | 'MEDIUM' | 'DIFFICULT')[]  // Updated to match our enum
  duration?: number[]
  priceRange?: {
    min: number
    max: number
  }
  rating?: number
  featured?: boolean
  location?: string  // Added to match our filter implementation
}

// Update ImageUploadResponse to match our upload implementation
export interface ImageUploadResponse {
  url: string
  publicId?: string  // Made optional as we don't always use it
  error?: string  // Added to match our error handling
}

// Update PaymentIntent to match our Stripe implementation
export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: 'requires_payment_method' | 'requires_confirmation' | 'succeeded' | 'canceled'  // Updated to match Stripe statuses
  clientSecret: string
  paymentMethod?: string  // Added to match our payment implementation
}