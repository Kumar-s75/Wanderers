import { prisma } from "../prisma"
import { Prisma } from "@/generated/prisma"
export const reviewQueries = {
    // Create a new review
    createReview: async (data: Prisma.ReviewCreateInput) => {
      return prisma.review.create({
        data,
        include: {
          user: true,
          tour: true,
        },
      })
    },

    getTourReviews: async (tourId: string) => {
        return prisma.review.findMany({
          where: { tourId },
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        })
      },
    }