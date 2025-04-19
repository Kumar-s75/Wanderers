// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { tours } from './data/tours'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.booking.deleteMany()
  await prisma.review.deleteMany()
  await prisma.image.deleteMany()
  await prisma.itinerary.deleteMany()
  await prisma.included.deleteMany()
  await prisma.notIncluded.deleteMany()
  await prisma.tour.deleteMany()

  // Seed tours
  for (const tour of tours) {
    await prisma.tour.create({
      data: {
        ...tour,
        images: {
          create: tour.images,
        },
        itinerary: {
          create: tour.itinerary,
        },
        included: {
          create: tour.included,
        },
        notIncluded: {
          create: tour.notIncluded,
        },
      },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })