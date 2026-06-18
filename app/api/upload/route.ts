import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { isAuthenticated } from '@/lib/auth'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')
const MAX_BYTES = 8 * 1024 * 1024

const ALLOWED_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/gif': 'gif',
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { success: false, message: 'Nicht autorisiert. Bitte erneut anmelden.' },
      { status: 401 }
    )
  }

  const formData = await req.formData()
  const file = formData.get('file')

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json(
      { success: false, message: 'Keine Datei erhalten.' },
      { status: 400 }
    )
  }

  const ext = ALLOWED_EXT[file.type]
  if (!ext) {
    return NextResponse.json(
      { success: false, message: 'Nur Bilddateien (JPG, PNG, WebP, AVIF, GIF) sind erlaubt.' },
      { status: 400 }
    )
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { success: false, message: 'Die Datei ist zu groß (max. 8 MB).' },
      { status: 400 }
    )
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
    return NextResponse.json(
      { success: false, message: 'Speichern fehlgeschlagen. Bitte versuchen Sie es erneut.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true, url: `/uploads/${filename}` })
}