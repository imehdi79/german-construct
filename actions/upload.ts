'use server'

import { promises as fs } from 'fs'
import path from 'path'
import { isAuthenticated } from '@/lib/auth'

export interface UploadResult {
  success: boolean
  /** Public URL of the stored image (e.g. `/uploads/bad-1730000000000.jpg`). */
  url?: string
  message?: string
}

// Uploads are written under public/uploads so they're served as static assets
// at /uploads/<name>. In production this path is a persisted Docker volume
// (see docker-compose.yml) and is backed up/restored by deploy.sh.
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')
const MAX_BYTES = 8 * 1024 * 1024 // 8 MB

const ALLOWED_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/gif': 'gif',
}

/**
 * Stores an admin-uploaded image and returns its public URL. Auth-gated to the
 * admin session; validates type and size.
 */
export async function uploadImage(formData: FormData): Promise<UploadResult> {
  if (!(await isAuthenticated())) {
    return { success: false, message: 'Nicht autorisiert. Bitte erneut anmelden.' }
  }

  const file = formData.get('file')
  if (!(file instanceof File) || file.size === 0) {
    return { success: false, message: 'Keine Datei erhalten.' }
  }

  const ext = ALLOWED_EXT[file.type]
  if (!ext) {
    return { success: false, message: 'Nur Bilddateien (JPG, PNG, WebP, AVIF, GIF) sind erlaubt.' }
  }
  if (file.size > MAX_BYTES) {
    return { success: false, message: 'Die Datei ist zu groß (max. 8 MB).' }
  }

  const base =
    file.name
      .replace(/\.[^.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40) || 'bild'
  const filename = `${base}-${Date.now()}.${ext}`

  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true })
    await fs.writeFile(path.join(UPLOAD_DIR, filename), Buffer.from(await file.arrayBuffer()))
  } catch (err) {
    console.error('Image upload failed:', err)
    return { success: false, message: 'Speichern fehlgeschlagen. Bitte versuchen Sie es erneut.' }
  }

  return { success: true, url: `/uploads/${filename}` }
}
