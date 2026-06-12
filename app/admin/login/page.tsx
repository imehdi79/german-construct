import { redirect } from 'next/navigation'
import { Lock } from 'lucide-react'
import { isAuthenticated } from '@/lib/auth'
import { LoginForm } from '@/components/admin/LoginForm'

export default async function AdminLoginPage() {
  if (await isAuthenticated()) {
    redirect('/admin/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-aman-charcoal to-aman-stone-500">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-aman-gold/20 border border-aman-gold/30 mb-5">
            <Lock size={24} className="text-aman-gold" />
          </div>
          <h1 className="text-2xl font-serif text-white mb-1">Admin-Bereich</h1>
          <p className="text-sm text-white/50">Fliesen-Naturstein AMAN</p>
        </div>

        <LoginForm />

        <p className="text-center text-xs text-white/30 mt-6">
          Geschützter Bereich · Nur für autorisierte Mitarbeiter
        </p>
      </div>
    </div>
  )
}
