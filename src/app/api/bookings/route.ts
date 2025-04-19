// src/app/api/bookings/route.ts
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiError, successResponse, errorResponse } from '@/lib/api-response'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'

const createBookingSchema = z.object({
  tourId: z.string(),
  startDate: z.string().transform(str => new Date(str)),
  numGuests: z.number().min(1),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return errorResponse(
        new ApiError(401, 'Unauthorized')
      )
    }

    const body = await request.json()
    const validatedData = createBookingSchema.parse(body)

    // Check if tour exists and get price
    const tour = await prisma.tour.findUnique({
      where: { id: validatedData.tourId },
      select: { price: true },
    })

    if (!tour) {
      return errorResponse(
        new ApiError(404, 'Tour not found')
      )
    }

    // Calculate end date (start date + duration)
    const endDate = new Date(validatedData.startDate)
    endDate.setDate(endDate.getDate() + validatedData.numGuests)

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        tourId: validatedData.tourId,
        userId: session.user.id,
        startDate: validatedData.startDate,
        endDate,
        numGuests: validatedData.numGuests,
        totalPrice: tour.price * validatedData.numGuests,
      },
      include: {
        tour: {
          include: {
            images: true,
          },
        },
      },
    })

    return successResponse(booking, 'Booking created successfully')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return errorResponse(
        new ApiError(400, 'Invalid booking data', error.errors)
      )
    }
    
    console.error('Error creating booking:', error)
    return errorResponse(
      new ApiError(500, 'Error creating booking')
    )
  }
}

