'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Phone, Smartphone, Mail, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { FormInput, FormTextarea, FormSelect, FormCheckbox } from '@/components/ui/FormField'
import { contactSchema, type ContactSchema } from '@/schemas/contact'
import { submitContact } from '@/actions/contact'
import { siteConfig } from '@/config/site'

const betreffOptions = [
  { value: 'fliesenarbeiten', label: 'Fliesenarbeiten' },
  { value: 'natursteinarbeiten', label: 'Natursteinarbeiten' },
  { value: 'estricharbeiten', label: 'Estricharbeiten' },
  { value: 'verfugungen', label: 'Verfugungsarbeiten' },
  { value: 'sanierung', label: 'Sanierungsarbeiten' },
  { value: 'terrasse', label: 'Terrassen & Außenbereiche' },
  { value: 'kostenvoranschlag', label: 'Kostenvoranschlag anfragen' },
  { value: 'sonstiges', label: 'Sonstiges' },
]

const contactInfo = [
  {
    icon: Phone,
    label: 'Telefon',
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`,
  },
  {
    icon: Smartphone,
    label: 'Mobil',
    value: siteConfig.contact.mobile,
    href: `tel:${siteConfig.contact.mobile.replace(/\s/g, '')}`,
  },
  {
    icon: Mail,
    label: 'E-Mail',
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: MapPin,
    label: 'Adresse',
    value: `${siteConfig.contact.address.street}, ${siteConfig.contact.address.zip} ${siteConfig.contact.address.city}`,
    href: `https://maps.google.com/?q=${encodeURIComponent(
      `${siteConfig.contact.address.street}, ${siteConfig.contact.address.zip} ${siteConfig.contact.address.city}`
    )}`,
  },
  {
    icon: Clock,
    label: 'Öffnungszeiten',
    value: `${siteConfig.openingHours.weekdays} · ${siteConfig.openingHours.saturday}`,
    href: undefined,
  },
]

export default function KontaktPage() {
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactSchema) => {
    const result = await submitContact(data)
    if (result.success) {
      setSubmitSuccess(true)
      reset()
    } else {
      setSubmitError(result.message)
    }
  }

  return (
    <>
      {/* Page Header */}
      <div className="bg-aman-cream pt-28 md:pt-36 pb-14 border-b border-aman-border">
        <div className="container-aman">
          <nav aria-label="Brotkrümel" className="flex items-center gap-2 text-sm text-aman-text-muted mb-5">
            <Link href="/" className="hover:text-aman-gold transition-colors">Startseite</Link>
            <span>/</span>
            <span className="text-aman-charcoal">Kontakt</span>
          </nav>
          <SectionTitle
            eyebrow="Sprechen Sie uns an"
            title="Kontaktieren Sie uns"
            subtitle="Wir freuen uns auf Ihre Anfrage und melden uns innerhalb von 24 Stunden bei Ihnen."
          />
        </div>
      </div>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-aman">
          <div className="grid lg:grid-cols-[1fr_420px] gap-14 lg:gap-20">
            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-2xl text-aman-charcoal mb-8">
                Schreiben Sie uns
              </h2>

              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-16 px-8 bg-green-50 rounded-2xl border border-green-200"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
                    <CheckCircle2 size={32} className="text-green-600" />
                  </div>
                  <h3 className="font-serif text-2xl text-aman-charcoal mb-3">
                    Nachricht gesendet!
                  </h3>
                  <p className="text-aman-text-muted mb-6 max-w-md">
                    Vielen Dank für Ihre Nachricht! Wir melden uns innerhalb von 24 Stunden
                    bei Ihnen zurück.
                  </p>
                  <Button variant="secondary" onClick={() => setSubmitSuccess(false)} size="sm">
                    Neue Nachricht senden
                  </Button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                  noValidate
                  aria-label="Kontaktformular"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormInput
                      label="Vorname"
                      required
                      placeholder="Max"
                      autoComplete="given-name"
                      error={errors.vorname?.message}
                      {...register('vorname')}
                    />
                    <FormInput
                      label="Nachname"
                      required
                      placeholder="Mustermann"
                      autoComplete="family-name"
                      error={errors.nachname?.message}
                      {...register('nachname')}
                    />
                  </div>

                  <FormInput
                    label="E-Mail-Adresse"
                    type="email"
                    required
                    placeholder="max@beispiel.de"
                    autoComplete="email"
                    error={errors.email?.message}
                    {...register('email')}
                  />

                  <FormInput
                    label="Telefonnummer"
                    type="tel"
                    placeholder="+49 69 123 456 789"
                    autoComplete="tel"
                    error={errors.telefon?.message}
                    {...register('telefon')}
                  />

                  <FormSelect
                    label="Betreff"
                    required
                    placeholder="Bitte wählen Sie einen Betreff"
                    options={betreffOptions}
                    error={errors.betreff?.message}
                    {...register('betreff')}
                  />

                  <FormTextarea
                    label="Ihre Nachricht"
                    required
                    placeholder="Beschreiben Sie Ihr Anliegen oder Projekt..."
                    rows={6}
                    error={errors.nachricht?.message}
                    {...register('nachricht')}
                  />

                  <FormCheckbox
                    label={
                      <>
                        Ich habe die{' '}
                        <Link href="/datenschutz" className="text-aman-gold underline" target="_blank">
                          Datenschutzerklärung
                        </Link>{' '}
                        gelesen und stimme der Verarbeitung meiner personenbezogenen Daten zur
                        Bearbeitung meiner Anfrage zu.{' '}
                        <span className="text-aman-gold">*</span>
                      </>
                    }
                    error={errors.datenschutz?.message}
                    {...register('datenschutz')}
                  />

                  {submitError && (
                    <p className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-3" role="alert">
                      {submitError}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    loading={isSubmitting}
                    icon={<ArrowRight size={16} />}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? 'Wird gesendet…' : 'Nachricht senden'}
                  </Button>

                  <p className="text-xs text-aman-text-light">
                    Mit <span className="text-aman-gold">*</span> gekennzeichnete Felder sind Pflichtfelder.
                    Ihre Daten werden gemäß unserer{' '}
                    <Link href="/datenschutz" className="underline hover:text-aman-gold transition-colors">
                      Datenschutzerklärung
                    </Link>{' '}
                    verarbeitet.
                  </p>
                </form>
              )}
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl text-aman-charcoal mb-6">
                  Kontaktdaten
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((item) => {
                    const Icon = item.icon
                    const content = (
                      <div className="flex items-start gap-4 p-4 rounded-xl border border-aman-border hover:border-aman-gold hover:shadow-soft transition-all duration-200 group">
                        <div className="w-10 h-10 rounded-lg bg-aman-cream flex items-center justify-center shrink-0 group-hover:bg-aman-gold/10 transition-colors">
                          <Icon size={18} className="text-aman-gold" />
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-aman-text-light mb-0.5">
                            {item.label}
                          </p>
                          <p className="text-sm text-aman-charcoal font-medium leading-relaxed">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    )
                    return item.href ? (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith('https') ? '_blank' : undefined}
                        rel={item.href.startsWith('https') ? 'noopener noreferrer' : undefined}
                        aria-label={`${item.label}: ${item.value}`}
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={item.label}>{content}</div>
                    )
                  })}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-xl overflow-hidden border border-aman-border aspect-video bg-aman-cream flex items-center justify-center">
                <div className="text-center p-6">
                  <MapPin size={32} className="text-aman-gold mx-auto mb-3" />
                  <p className="text-sm text-aman-text-muted">
                    {siteConfig.contact.address.street}
                    <br />
                    {siteConfig.contact.address.zip} {siteConfig.contact.address.city}
                  </p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      `${siteConfig.contact.address.street}, ${siteConfig.contact.address.zip} ${siteConfig.contact.address.city}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-xs text-aman-gold underline"
                  >
                    In Google Maps öffnen
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
