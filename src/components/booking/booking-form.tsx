// // src/components/booking/booking-form.tsx
// 'use client'

// import { useState } from 'react'
// import { useAppDispatch, useAppSelector } from '@/store/hooks'
// import { createBooking } from '@/store/slices/bookingSlice'
// import { showToast } from '@/store/slices/uiSlice'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'

// export function BookingForm({ tourId }: { tourId: string }) {
//   const dispatch = useAppDispatch()
//   const { loading } = useAppSelector((state) => state.bookings)
//   const [formData, setFormData] = useState({
//     startDate: '',
//     numGuests: 1,
//   })

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     try {
//       await dispatch(createBooking({
//         tourId,
//         ...formData,
//       })).unwrap()
      
//       dispatch(showToast({
//         message: 'Booking created successfully!',
//         type: 'success',
//       }))
//     } catch (error) {
//       dispatch(showToast({
//         message: error.message,
//         type: 'error',
//       }))
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label htmlFor="startDate" className="block text-sm font-medium">
//           Start Date
//         </label>
//         <Input
//           type="date"
//           id="startDate"
//           value={formData.startDate}
//           onChange={(e) => setFormData(prev => ({
//             ...prev,
//             startDate: e.target.value,
//           }))}
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="numGuests" className="block text-sm font-medium">
//           Number of Guests
//         </label>
//         <Input
//           type="number"
//           id="numGuests"
//           value={formData.numGuests}
//           onChange={(e) => setFormData(prev => ({
//             ...prev,
//             numGuests: parseInt(e.target.value),
//           }))}
//           min={1}
//           required
//         />
//       </div>

//       <Button type="submit" disabled={loading}>
//         {loading ? 'Creating Booking...' : 'Book Now'}
//       </Button>
//     </form>
//   )
// }

// src/components/booking/booking-form.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookingSchema, type BookingFormData } from '@/lib/validations/booking'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/store/hooks'
import { createBooking } from '@/store/slices/bookingSlice'
import { showToast } from '@/store/slices/uiSlice'

interface BookingFormProps {
  tourId: string
  onSuccess?: () => void
}

export function BookingForm({ tourId, onSuccess }: BookingFormProps) {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      tourId,
      numGuests: 1,
    },
  })

  const onSubmit = async (data: BookingFormData) => {
    try {
      await dispatch(createBooking(data)).unwrap()
      dispatch(showToast({
        message: 'Booking created successfully!',
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
      <FormField label="Start Date" error={errors.startDate?.message}>
        <Input
          type="date"
          {...register('startDate')}
          min={new Date().toISOString().split('T')[0]}
        />
      </FormField>

      <FormField label="Number of Guests" error={errors.numGuests?.message}>
        <Input
          type="number"
          {...register('numGuests', { valueAsNumber: true })}
          min={1}
          max={10}
        />
      </FormField>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Booking...' : 'Book Now'}
      </Button>
    </Form>
  )
}