// src/lib/validations/tour.ts
import { z } from 'zod'

export const tourSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  summary: z.string()
    .min(10, 'Summary must be at least 10 characters')
    .max(200, 'Summary must be less than 200 characters'),
  price: z.number()
    .min(0, 'Price must be greater than 0'),
  duration: z.number()
    .min(1, 'Duration must be at least 1 day')
    .max(30, 'Duration must be less than 30 days'),
  maxGroupSize: z.number()
    .min(1, 'Group size must be at least 1')
    .max(50, 'Group size must be less than 50'),
  difficulty: z.enum(['EASY', 'MEDIUM', 'DIFFICULT']),
  location: z.string()
    .min(2, 'Location must be at least 2 characters'),
  startLocation: z.string()
    .min(2, 'Start location must be at least 2 characters'),
})

export type TourFormData = z.infer<typeof tourSchema>

