// src/app/actions/profile.ts
'use server'
import { getServerSession } from 'next-auth'
import { uploadFile } from '@/lib/upload'
import { prisma } from '@/lib/prisma'
import { authOptions } from '../api/auth/[...nextauth]/route'

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
    if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Unknown error", error)
  }
}
}