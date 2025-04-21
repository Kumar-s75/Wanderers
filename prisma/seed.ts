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
        title: tour.title,
        slug: tour.slug,
        description: tour.description,
        summary: tour.summary,
        price: tour.price,
        duration: tour.duration,
        maxGroupSize: tour.maxGroupSize,
        difficulty: tour.difficulty,
        location: tour.location,
        startLocation: tour.startLocation,
        featured: tour.featured,
        images: {
          create: tour.images,
        },
        itinerary: {
          create: tour.itinerary,
        },
        included: {
          create: tour.included.map(item => ({ item })),
        },
        notIncluded: {
          create: tour.notIncluded.map(item => ({ item })),
        },
      },
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

  