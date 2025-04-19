export const bookingQueries = {
    // Create a new booking
    createBooking: async (data: Prisma.BookingCreateInput) => {
      return prisma.booking.create({
        data,
        include: {
          tour: true,
          user: true,
        },
      })
    },
    getUserBookings: async (userId: string) => {
        return prisma.booking.findMany({
          where: { userId },
          include: {
            tour: {
              include: {
                images: true,
              },
            },
            payment: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        })
      },
      updateBookingStatus: async (id: string, status: Prisma.BookingStatus) => {
        return prisma.booking.update({
          where: { id },
          data: { status },
          include: {
            tour: true,
            user: true,
          },
        })
      },
    }      