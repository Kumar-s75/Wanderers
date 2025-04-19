import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiError, successResponse, errorResponse } from '@/lib/api-response'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tour = await prisma.tour.findUnique({
      where: { id: params.id },
      include: {
        images: true,
        itinerary: true,
        included: true,
        notIncluded: true,
        reviews: {
          include: {
            user: true,
          },
        },
      },
    })

    if (!tour) {
      return errorResponse(
        new ApiError(404, 'Tour not found')
      )
    }

    return successResponse(tour)
  } catch (error) {
    console.error('Error fetching tour:', error)
    return errorResponse(
      new ApiError(500, 'Error fetching tour')
    )
  }
}