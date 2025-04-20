// src/lib/upload.ts
// Add document upload functionality
export async function uploadDocument(formData: FormData, fieldName: string) {
    const file = formData.get(fieldName) as File
    
    if (!file) {
      throw new Error('No file uploaded')
    }
  
    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Only PDF and image files are allowed')
    }
  
    // Validate file size (e.g., max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File size must be less than 10MB')
    }
  
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
  
    // Generate unique filename
    const uniqueId = uuidv4()
    const extension = file.name.split('.').pop()
    const filename = `documents/${uniqueId}.${extension}`
  
    // Save to public directory
    const path = join(process.cwd(), 'public/uploads', filename)
    await writeFile(path, buffer)
  
    return `/uploads/${filename}`
  }