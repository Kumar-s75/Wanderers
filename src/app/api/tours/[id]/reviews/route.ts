// src/app/api/tours/[id]/reviews/route.ts
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiError, successResponse, errorResponse } from '@/lib/api-response'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'

const createReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10),
})

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return errorResponse(
        new ApiError(401, 'Unauthorized')
      )
    }

    const body = await request.json()
    const validatedData = createReviewSchema.parse(body)

    // Check if tour exists
    const tour = await prisma.tour.findUnique({
      where: { id: params.id },
    })

    if (!tour) {
      return errorResponse(
        new ApiError(404, 'Tour not found')
      )
    }

    // Check if user has booked the tour
    const booking = await prisma.booking.findFirst({
      where: {
        tourId: params.id,
        userId: session.user.id,
        status: 'COMPLETED',
      },
    })

    if (!booking) {
      return errorResponse(
        new ApiError(403, 'You can only review tours you have completed')
      )
    }

    // Check if user has already reviewed
    const existingReview = await prisma.review.findFirst({
      where: {
        tourId: params.id,
        userId: session.user.id,
      },
    })

    if (existingReview) {
      return errorResponse(
        new ApiError(400, 'You have already reviewed this tour')
      )
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        tourId: params.id,
        userId: session.user.id,
        rating: validatedData.rating,
        comment: validatedData.comment,
      },
      include: {
        user: true,
      },
    })

    return successResponse(review, 'Review created successfully')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return errorResponse(
        new ApiError(400, 'Invalid review data', error.errors)
      )
    }
    
    console.error('Error creating review:', error)
    return errorResponse(
      new ApiError(500, 'Error creating review')
    )
  }
}