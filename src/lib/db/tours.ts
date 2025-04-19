// src/lib/db/tours.ts
import { prisma } from '../prisma'
import { Prisma } from '@prisma/client'

export type TourWithRelations = Prisma.TourGetPayload<{
  include: {
    images: true
    itinerary: true
    included: true
    notIncluded: true
    reviews: {
      include: {
        user: true
      }
    }
  }
}>

export const tourQueries = {
  // Get all tours with pagination and filters
  getAllTours: async ({
    page = 1,
    limit = 10,
    search,
    difficulty,
    minPrice,
    maxPrice,
    duration,
  }: {
    page?: number
    limit?: number
    search?: string
    difficulty?: string
    minPrice?: number
    maxPrice?: number
    duration?: number
  }) => {
    const where: Prisma.TourWhereInput = {
      AND: [
        search ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        } : {},
        difficulty ? { difficulty: difficulty as any } : {},
        minPrice ? { price: { gte: minPrice } } : {},
        maxPrice ? { price: { lte: maxPrice } } : {},
        duration ? { duration: duration } : {},
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

    return {
      tours,
      total,
      pages: Math.ceil(total / limit),
    }
  },

  // Get a single tour by slug
  getTourBySlug: async (slug: string) => {
    return prisma.tour.findUnique({
      where: { slug },
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
  },

  // Create a new tour
  createTour: async (data: Prisma.TourCreateInput) => {
    return prisma.tour.create({
      data,
      include: {
        images: true,
        itinerary: true,
        included: true,
        notIncluded: true,
      },
    })
  },

  // Update a tour
  updateTour: async (id: string, data: Prisma.TourUpdateInput) => {
    return prisma.tour.update({
      where: { id },
      data,
      include: {
        images: true,
        itinerary: true,
        included: true,
        notIncluded: true,
      },
    })
  },

  // Delete a tour
  deleteTour: async (id: string) => {
    return prisma.tour.delete({
      where: { id },
    })
  },
}



 