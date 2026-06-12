'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  checkCredentials,
  createSession,
  destroySession,
  isAuthenticated,
} from '@/lib/auth'
import {
  saveSiteContent,
  saveServices,
  saveJobs,
  saveGallery,
  saveFormSchemas,
  savePlannerCards,
  saveTestimonials,
  saveLegal,
  resetContent,
  type FullContent,
} from '@/lib/content'

export interface ActionResult {
  success: boolean
  message: string
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function loginAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')

  // Small constant delay to blunt brute-force timing.
  await new Promise((r) => setTimeout(r, 400))

  if (!checkCredentials(email, password)) {
    return { success: false, message: 'Ungültige E-Mail-Adresse oder Passwort.' }
  }

  await createSession()
  redirect('/admin/dashboard')
}

export async function logoutAction(): Promise<void> {
  await destroySession()
  redirect('/admin/login')
}

// ─── Publish (the "Save & Republish" / CI-CD-like action) ────────────────────

export async function publishContentAction(
  content: FullContent
): Promise<ActionResult> {
  if (!(await isAuthenticated())) {
    return { success: false, message: 'Nicht autorisiert. Bitte erneut anmelden.' }
  }

  try {
    await Promise.all([
      saveSiteContent(content.site),
      saveServices(content.services),
      saveJobs(content.jobs),
      saveGallery(content.gallery),
      saveFormSchemas(content.formSchemas),
      savePlannerCards(content.plannerCards),
      saveTestimonials(content.testimonials),
      saveLegal(content.legal),
    ])
  } catch (err) {
    console.error('Publish failed:', err)
    return {
      success: false,
      message: 'Speichern fehlgeschlagen. Bitte versuchen Sie es erneut.',
    }
  }

  // Republish: regenerate every statically-cached public page with fresh content.
  // Pages stay server-rendered HTML → fully SEO-friendly. WordPress-style publish.
  revalidatePath('/', 'layout')

  return {
    success: true,
    message: 'Änderungen gespeichert und veröffentlicht. Die Website ist aktualisiert.',
  }
}

// ─── Hard reset (restore the original default content) ───────────────────────

export interface ResetResult extends ActionResult {
  content?: FullContent
}

export async function resetContentAction(): Promise<ResetResult> {
  if (!(await isAuthenticated())) {
    return { success: false, message: 'Nicht autorisiert. Bitte erneut anmelden.' }
  }

  try {
    const content = await resetContent()
    // Republish so the public site reflects the restored defaults immediately.
    revalidatePath('/', 'layout')
    return {
      success: true,
      message: 'Alle Inhalte wurden auf die Standardwerte zurückgesetzt.',
      content,
    }
  } catch (err) {
    console.error('Reset failed:', err)
    return {
      success: false,
      message: 'Zurücksetzen fehlgeschlagen. Bitte versuchen Sie es erneut.',
    }
  }
}
