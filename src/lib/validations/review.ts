export const reviewSchema = z.object({
    tourId: z.string(),
    rating: z.number()
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating must be less than 5'),
    comment: z.string()
      .min(10, 'Comment must be at least 10 characters')
      .max(500, 'Comment must be less than 500 characters'),
  })
  
  export type ReviewFormData = z.infer<typeof reviewSchema>