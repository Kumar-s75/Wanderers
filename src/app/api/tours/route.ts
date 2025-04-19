// src/app/api/tours/route.ts
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiError, successResponse, errorResponse } from '@/lib/api-response'
import { z } from 'zod'

const querySchema = z.object({
  page: z.string().optional().transform(Number),
  limit: z.string().optional().transform(Number),
  search: z.string().optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'DIFFICULT']).optional(),
  minPrice: z.string().optional().transform(Number),
  maxPrice: z.string().optional().transform(Number),
  duration: z.string().optional().transform(Number),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const validatedQuery = querySchema.parse(Object.fromEntries(searchParams))
    
    const {
      page = 1,
      limit = 10,
      search,
      difficulty,
      minPrice,
      maxPrice,
      duration,
    } = validatedQuery

    const where = {
      AND: [
        search ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        } : {},
        difficulty ? { difficulty } : {},
        minPrice ? { price: { gte: minPrice } } : {},
        maxPrice ? { price: { lte: maxPrice } } : {},
        duration ? { duration } : {},
      ],
    }

    const [tours, total] = await Promise.all([
      prisma.tour.findMany({
        where,
        include: {
          images: true,
          reviews: {
            include: {
              user: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.tour.count({ where }),
    ])

    return successResponse({
      tours,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return errorResponse(
        new ApiError(400, 'Invalid query parameters', error.errors)
      )
    }
    
    console.error('Error fetching tours:', error)
    return errorResponse(
      new ApiError(500, 'Error fetching tours')
    )
  }
}

