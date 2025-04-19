import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiError, successResponse, errorResponse } from '@/lib/api-response'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(
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

    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: {
        tour: {
          include: {
            images: true,
          },
        },
        payment: true,
      },
    })

    if (!booking) {
      return errorResponse(
        new ApiError(404, 'Booking not found')
      )
    }

    // Check if user owns the booking
    if (booking.userId !== session.user.id) {
      return errorResponse(
        new ApiError(403, 'Forbidden')
      )
    }

    return successResponse(booking)
  } catch (error) {
    console.error('Error fetching booking:', error)
    return errorResponse(
      new ApiError(500, 'Error fetching booking')
    )
  }
}