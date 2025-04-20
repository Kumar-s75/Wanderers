// // src/components/tours/tour-form.tsx
// 'use client'

// import { useFormState } from 'react-dom'
// import { createTour, updateTour } from '@/app/actions/tour'
// import { useOptimisticUpdate } from '@/hooks/use-optimistic-update'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import { ImageUpload } from '@/components/ui/image-upload'

// const initialState = {
//   error: null,
//   data: null,
// }

// export function TourForm({ tour }: { tour?: any }) {
//   const [state, formAction] = useFormState(
//     tour ? updateTour.bind(null, tour.id) : createTour,
//     initialState
//   )

//   const { data: optimisticData, update, isPending } = useOptimisticUpdate(
//     tour || {},
//     async (newData) => {
//       // Handle optimistic update
//       console.log('Optimistic update:', newData)
//     }
//   )

//   return (
//     <form action={formAction} className="space-y-6">
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium">
//             Title
//           </label>
//           <Input
//             type="text"
//             id="title"
//             name="title"
//             defaultValue={tour?.title}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="price" className="block text-sm font-medium">
//             Price
//           </label>
//           <Input
//             type="number"
//             id="price"
//             name="price"
//             defaultValue={tour?.price}
//             required
//             min={0}
//           />
//         </div>

//         <div>
//           <label htmlFor="duration" className="block text-sm font-medium">
//             Duration (days)
//           </label>
//           <Input
//             type="number"
//             id="duration"
//             name="duration"
//             defaultValue={tour?.duration}
//             required
//             min={1}
//           />
//         </div>

//         <div>
//           <label htmlFor="maxGroupSize" className="block text-sm font-medium">
//             Max Group Size
//           </label>
//           <Input
//             type="number"
//             id="maxGroupSize"
//             name="maxGroupSize"
//             defaultValue={tour?.maxGroupSize}
//             required
//             min={1}
//           />
//         </div>

//         <div>
//           <label htmlFor="difficulty" className="block text-sm font-medium">
//             Difficulty
//           </label>
//           <select
//             id="difficulty"
//             name="difficulty"
//             defaultValue={tour?.difficulty}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
//             required
//           >
//             <option value="EASY">Easy</option>
//             <option value="MEDIUM">Medium</option>
//             <option value="DIFFICULT">Difficult</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="location" className="block text-sm font-medium">
//             Location
//           </label>
//           <Input
//             type="text"
//             id="location"
//             name="location"
//             defaultValue={tour?.location}
//             required
//           />
//         </div>
//       </div>

//       <div>
//         <label htmlFor="summary" className="block text-sm font-medium">
//           Summary
//         </label>
//         <Textarea
//           id="summary"
//           name="summary"
//           defaultValue={tour?.summary}
//           required
//           rows={3}
//         />
//       </div>

//       <div>
//         <label htmlFor="description" className="block text-sm font-medium">
//           Description
//         </label>
//         <Textarea
//           id="description"
//           name="description"
//           defaultValue={tour?.description}
//           required
//           rows={6}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium">
//           Images
//         </label>
//         <ImageUpload
//           name="images"
//           multiple
//           defaultValue={tour?.images}
//         />
//       </div>

//       {state.error && (
//         <p className="text-sm text-red-500">{state.error}</p>
//       )}

//       <Button
//         type="submit"
//         className="w-full"
//         disabled={isPending}
//       >
//         {isPending ? 'Saving...' : tour ? 'Update Tour' : 'Create Tour'}
//       </Button>
//     </form>
//   )
// }

// src/components/tours/tour-form.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { tourSchema, type TourFormData } from '@/lib/validations/tour'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/store/hooks'
import { createTour } from '@/store/slices/tourSlice'
import { showToast } from '@/store/slices/uiSlice'

interface TourFormProps {
  initialData?: TourFormData
  onSuccess?: () => void
}

export function TourForm({ initialData, onSuccess }: TourFormProps) {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TourFormData>({
    resolver: zodResolver(tourSchema),
    defaultValues: initialData,
  })

  const onSubmit = async (data: TourFormData) => {
    try {
      await dispatch(createTour(data)).unwrap()
      dispatch(showToast({
        message: 'Tour created successfully!',
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
      <FormField label="Title" error={errors.title?.message}>
        <Input
          {...register('title')}
          placeholder="Enter tour title"
        />
      </FormField>

      <FormField label="Summary" error={errors.summary?.message}>
        <Textarea
          {...register('summary')}
          placeholder="Enter tour summary"
          rows={3}
        />
      </FormField>

      <FormField label="Description" error={errors.description?.message}>
        <Textarea
          {...register('description')}
          placeholder="Enter tour description"
          rows={6}
        />
      </FormField>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="Price" error={errors.price?.message}>
          <Input
            type="number"
            {...register('price', { valueAsNumber: true })}
            placeholder="Enter price"
          />
        </FormField>

        <FormField label="Duration (days)" error={errors.duration?.message}>
          <Input
            type="number"
            {...register('duration', { valueAsNumber: true })}
            placeholder="Enter duration"
          />
        </FormField>

        <FormField label="Max Group Size" error={errors.maxGroupSize?.message}>
          <Input
            type="number"
            {...register('maxGroupSize', { valueAsNumber: true })}
            placeholder="Enter max group size"
          />
        </FormField>

        <FormField label="Difficulty" error={errors.difficulty?.message}>
          <select
            {...register('difficulty')}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            <option value="">Select difficulty</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="DIFFICULT">Difficult</option>
          </select>
        </FormField>

        <FormField label="Location" error={errors.location?.message}>
          <Input
            {...register('location')}
            placeholder="Enter location"
          />
        </FormField>

        <FormField label="Start Location" error={errors.startLocation?.message}>
          <Input
            {...register('startLocation')}
            placeholder="Enter start location"
          />
        </FormField>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Tour'}
      </Button>
    </Form>
  )
}