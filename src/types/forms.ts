// src/types/forms.ts
import { z } from 'zod'

export const tourSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  price: z.number().min(0, 'Price must be positive'),
  duration: z.number().min(1, 'Duration must be at least 1 day'),
  maxGroupSize: z.number().min(1, 'Group size must be at least 1'),
  difficulty: z.enum(['EASY', 'MEDIUM', 'DIFFICULT']),
  location: z.string().min(1, 'Location is required'),
  startLocation: z.string().min(1, 'Start location is required'),
  featured: z.boolean().default(false),
  images: z.array(z.instanceof(File)).optional(),  // Added to match our file upload
  itinerary: z.array(z.object({  // Added to match our itinerary implementation
    day: z.number(),
    title: z.string(),
    description: z.string()
  })).optional(),
  included: z.array(z.string()).optional(),  // Added to match our implementation
  notIncluded: z.array(z.string()).optional()  // Added to match our implementation
})

export const bookingSchema = z.object({
  tourId: z.string(),
  startDate: z.date(),
  numGuests: z.number().min(1, 'Must book for at least 1 guest'),
  specialRequests: z.string().optional(),
  userId: z.string()  // Added to match our server action
})

export const reviewSchema = z.object({
  tourId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, 'Review must be at least 10 characters'),
  photos: z.array(z.instanceof(File)).optional(),  // Updated to match our implementation
  userId: z.string()  // Added to match our server action
})