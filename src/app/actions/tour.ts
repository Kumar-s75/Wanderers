// src/app/actions/tour.ts
'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { uploadFile } from '@/lib/upload'
import { z } from 'zod'

// Types
type ActionResponse<T> = {
  data?: T
  error?: string
}

// Validation Schemas
const tourSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  summary: z.string().min(10),
  price: z.number().min(0),
  duration: z.number().min(1),
  maxGroupSize: z.number().min(1),
  difficulty: z.enum(['EASY', 'MEDIUM', 'DIFFICULT']),
  location: z.string().min(2),
  startLocation: z.string().min(2),
})

const itinerarySchema = z.object({
  day: z.number().min(1),
  title: z.string().min(3),
  description: z.string().min(10),
})

// Create Tour Action
export async function createTour(
  formData: FormData
): Promise<ActionResponse<any>> {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return {  
        // success: false,
        error: "You must be logged in to create a tour" }
    }

    // Validate tour data
    const tourData = {
      title: formData.get('title'),
      description: formData.get('description'),
      summary: formData.get('summary'),
      price: Number(formData.get('price')),
      duration: Number(formData.get('duration')),
      maxGroupSize: Number(formData.get('maxGroupSize')),
      difficulty: formData.get('difficulty'),
      location: formData.get('location'),
      startLocation: formData.get('startLocation'),
    }

    const validatedTour = tourSchema.parse(tourData)

    // Handle image uploads
    const images = formData.getAll('images') as File[]
    const imageUrls = await Promise.all(
      images.map(async (image, index) => {
        const formData = new FormData()
        formData.append('file', image)
        return uploadFile(formData, 'file')
      })
    )

    // Create tour with images
    const tour = await prisma.tour.create({
      data: {
        ...validatedTour,
        images: {
          create: imageUrls.map(url => ({
            url,
            publicId: url.split('/').pop()!,
          })),
        },
      },
      include: {
        images: true,
      },
    })

    revalidatePath('/tours')
    return { data: tour }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: 'Invalid tour data' }
    }
    console.error('Error creating tour:', error)
    return { error: 'Error creating tour' }
  }
}

// Update Tour Action
export async function updateTour(
  tourId: string,
  formData: FormData
): Promise<ActionResponse<any>> {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return { error: 'Unauthorized' }
    }

    // Validate tour data
    const tourData = {
      title: formData.get('title'),
      description: formData.get('description'),
      summary: formData.get('summary'),
      price: Number(formData.get('price')),
      duration: Number(formData.get('duration')),
      maxGroupSize: Number(formData.get('maxGroupSize')),
      difficulty: formData.get('difficulty'),
      location: formData.get('location'),
      startLocation: formData.get('startLocation'),
    }

    const validatedTour = tourSchema.parse(tourData)

    // Handle new image uploads
    const newImages = formData.getAll('newImages') as File[]
    const imageUrls = await Promise.all(
      newImages.map(async (image) => {
        const formData = new FormData()
        formData.append('file', image)
        return uploadFile(formData, 'file')
      })
    )

    // Update tour
    const tour = await prisma.tour.update({
      where: { id: tourId },
      data: {
        ...validatedTour,
        images: {
          create: imageUrls.map(url => ({
            url,
            publicId: url.split('/').pop()!,
          })),
        },
      },
      include: {
        images: true,
      },
    })

    revalidatePath(`/tours/${tourId}`)
    return { data: tour }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: 'Invalid tour data' }
    }
    console.error('Error updating tour:', error)
    return { error: 'Error updating tour' }
  }
}

// Add Itinerary Action
export async function addItinerary(
  tourId: string,
  formData: FormData
): Promise<ActionResponse<any>> {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return { error: 'Unauthorized' }
    }

    const data = {
      day: Number(formData.get('day')),
      title: formData.get('title'),
      description: formData.get('description'),
    }

    const validatedData = itinerarySchema.parse(data)

    const itinerary = await prisma.itinerary.create({
      data: {
        ...validatedData,
        tourId,
      },
    })

    revalidatePath(`/tours/${tourId}`)
    return { data: itinerary }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: 'Invalid itinerary data' }
    }
    console.error('Error adding itinerary:', error)
    return { error: 'Error adding itinerary' }
  }
}