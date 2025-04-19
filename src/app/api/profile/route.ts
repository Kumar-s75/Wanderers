// src/app/api/profile/route.ts
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiError, successResponse, errorResponse } from '@/lib/api-response'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'

const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  bio: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return errorResponse(
        new ApiError(401, 'Unauthorized')
      )
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
    })

    return successResponse(profile)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return errorResponse(
      new ApiError(500, 'Error fetching profile')
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return errorResponse(
        new ApiError(401, 'Unauthorized')
      )
    }

    const body = await request.json()
    const validatedData = updateProfileSchema.parse(body)

    const profile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: validatedData,
      create: {
        ...validatedData,
        userId: session.user.id,
      },
    })

    return successResponse(profile, 'Profile updated successfully')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return errorResponse(
        new ApiError(400, 'Invalid profile data', error.errors)
      )
    }
    
    console.error('Error updating profile:', error)
    return errorResponse(
      new ApiError(500, 'Error updating profile')
    )
  }
}