export const bookingSchema = z.object({
    tourId: z.string(),
    startDate: z.string()
      .refine((date) => new Date(date) > new Date(), {
        message: 'Start date must be in the future',
      }),
    numGuests: z.number()
      .min(1, 'Number of guests must be at least 1')
      .max(10, 'Number of guests must be less than 10'),
  })