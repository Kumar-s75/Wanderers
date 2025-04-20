// src/components/reviews/review-form.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { reviewSchema, type ReviewFormData } from '@/lib/validations/review'
import { Form, FormField } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/store/hooks'
import { createReview } from '@/store/slices/reviewSlice'
import { showToast } from '@/store/slices/uiSlice'

interface ReviewFormProps {
  tourId: string
  onSuccess?: () => void
}

export function ReviewForm({ tourId, onSuccess }: ReviewFormProps) {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      tourId,
      rating: 5,
    },
  })

  const onSubmit = async (data: ReviewFormData) => {
    try {
      await dispatch(createReview(data)).unwrap()
      dispatch(showToast({
        message: 'Review submitted successfully!',
        type: 'success',
      }))
      onSuccess?.()
    } catch (error) {
      dispatch(showToast({
        message: error.message,
        type: 'error',
      }))
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Rating" error={errors.rating?.message}>
        <select
          {...register('rating', { valueAsNumber: true })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        >
          <option value={5}>5 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={2}>2 Stars</option>
          <option value={1}>1 Star</option>
        </select>
      </FormField>

      <FormField label="Comment" error={errors.comment?.message}>
        <Textarea
          {...register('comment')}
          placeholder="Share your experience..."
          rows={4}
        />
      </FormField>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </Form>
  )
}