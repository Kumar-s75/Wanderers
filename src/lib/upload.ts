// src/lib/upload.ts
import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function uploadFile(formData: FormData, fieldName: string) {
  const file = formData.get(fieldName) as File;
  
  if (!file) {
    throw new Error('No file uploaded');
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Only image files are allowed');
  }

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File size must be less than 5MB');
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate unique filename
  const uniqueFilename = `${uuidv4()}${path.extname(file.name)}`;
  const filePath = path.join(process.cwd(), 'public/uploads', uniqueFilename);

  // Save file
  await writeFile(filePath, buffer);

  // Return the URL path
  return `/uploads/${uniqueFilename}`;
}