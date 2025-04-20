// src/app/actions/profile.ts
'use server'

import { uploadFile } from '@/lib/upload'
import { prisma } from '@/lib/prisma'

export async function updateProfilePhoto(formData: FormData) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      throw new Error('Unauthorized')
    }

    // Upload the profile photo
    const photoUrl = await uploadFile(formData, 'photo')

    // Update user profile with new photo URL
    const updatedProfile = await prisma.profile.update({
      where: { userId: session.user.id },
      data: { image: photoUrl },
    })

    return { success: true, data: updatedProfile }
  } catch (error) {
    return { success: false, error: error.message }
  }
}