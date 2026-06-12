'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { useState } from 'react'
import { Lock, Eye, EyeOff, LogIn } from 'lucide-react'
import { loginAction, type ActionResult } from '@/actions/admin'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex items-center justify-center gap-2 bg-aman-gold hover:bg-aman-gold-dark text-white text-sm font-semibold py-3 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
    >
      {pending ? (
        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <LogIn size={16} />
      )}
      {pending ? 'Anmelden…' : 'Anmelden'}
    </button>
  )
}

export function LoginForm() {
  const [state, formAction] = useActionState<ActionResult | null, FormData>(
    loginAction,
    null
  )
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form
      action={formAction}
      className="bg-white rounded-2xl p-7 shadow-2xl space-y-4"
      noValidate
    >
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
          E-Mail-Adresse
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-aman-gold/50 focus:border-aman-gold transition-all"
          placeholder="admin@example.de"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
          Passwort
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-aman-gold/50 focus:border-aman-gold transition-all"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {state && !state.success && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2.5" role="alert">
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  )
}
