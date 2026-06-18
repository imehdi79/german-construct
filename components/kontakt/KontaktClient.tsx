"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Phone, Smartphone, Mail, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { FormInput, FormTextarea, FormSelect, FormCheckbox } from "@/components/ui/FormField";
import { FileUpload } from "@/components/ui/FileUpload";
import { contactSchema, type ContactSchema } from "@/schemas/contact";
import { siteConfig } from "@/config/site";
import { defaultPages } from "@/data/sections";
import type { SiteContent } from "@/lib/content";
import type { KontaktPageCopy } from "@/types";
import { isEmpty } from "@/lib/utils";

export function KontaktClient({
  copy = defaultPages.kontakt,
  contact = siteConfig.contact,
  openingHours = siteConfig.openingHours,
}: {
  copy?: KontaktPageCopy;
  contact?: SiteContent["contact"];
  openingHours?: SiteContent["openingHours"];
}) {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactSchema) => {
    setSubmitError("");
    const formData = new FormData();
    formData.append("vorname", data.vorname);
    formData.append("nachname", data.nachname);
    formData.append("email", data.email);
    formData.append("telefon", data.telefon ?? "");
    formData.append("betreff", data.betreff);
    formData.append("nachricht", data.nachricht);
    formData.append("datenschutz", String(data.datenschutz));
    for (const file of files) formData.append("files", file);

    const res = await fetch("/api/contact", { method: "POST", body: formData });
    const result = await res.json();

    if (result.success) {
      setSubmitSuccess(true);
      reset();
      setFiles([]);
    } else {
      setSubmitError(result.message);
    }
  };

  const addressValue = `${contact.address.street}, ${contact.address.zip} ${contact.address.city}`;
  // const mapsHref = `https://maps.google.com/?q=${encodeURIComponent(addressValue)}`;
  const mapsHref = "";

  const contactInfo = [
    {
      icon: Phone,
      label: copy.contactLabels.phone,
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
    },
    {
      icon: Smartphone,
      label: copy.contactLabels.mobile,
      value: contact.mobile,
      href: `tel:${contact.mobile.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      label: copy.contactLabels.email,
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: MapPin,
      label: copy.contactLabels.address,
      value: addressValue,
      href: mapsHref,
    },
    {
      icon: Clock,
      label: copy.contactLabels.hours,
      value: `${openingHours.weekdays} · ${openingHours.saturday}`,
      href: undefined,
    },
  ];

  return (
    <>
      {/* Page Header */}
      <div className="bg-aman-cream pt-28 md:pt-36 pb-14 border-b border-aman-border">
        <div className="container-aman">
          <nav aria-label="Brotkrümel" className="flex items-center gap-2 text-sm text-aman-text-muted mb-5">
            <Link href="/" className="hover:text-aman-gold transition-colors">
              Startseite
            </Link>
            <span>/</span>
            <span className="text-aman-charcoal">{copy.breadcrumb}</span>
          </nav>
          <SectionTitle eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
        </div>
      </div>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-aman">
          <div className="grid lg:grid-cols-[1fr_420px] gap-14 lg:gap-20">
            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-2xl text-aman-charcoal mb-8">{copy.formHeading}</h2>

              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-16 px-8 bg-green-50 rounded-2xl border border-green-200"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
                    <CheckCircle2 size={32} className="text-green-600" />
                  </div>
                  <h3 className="font-serif text-2xl text-aman-charcoal mb-3">{copy.successTitle}</h3>
                  <p className="text-aman-text-muted mb-6 max-w-md">{copy.successText}</p>
                  <Button variant="secondary" onClick={() => setSubmitSuccess(false)} size="sm">
                    {copy.successButton}
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate aria-label="Kontaktformular">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormInput
                      label="Vorname"
                      required
                      placeholder="Max"
                      autoComplete="given-name"
                      error={errors.vorname?.message}
                      {...register("vorname")}
                    />
                    <FormInput
                      label="Nachname"
                      required
                      placeholder="Mustermann"
                      autoComplete="family-name"
                      error={errors.nachname?.message}
                      {...register("nachname")}
                    />
                  </div>

                  <FormInput
                    label="E-Mail-Adresse"
                    type="email"
                    required
                    placeholder="max@beispiel.de"
                    autoComplete="email"
                    error={errors.email?.message}
                    {...register("email")}
                  />

                  <FormInput
                    label="Telefonnummer"
                    type="tel"
                    placeholder="+49 69 123 456 789"
                    autoComplete="tel"
                    error={errors.telefon?.message}
                    {...register("telefon")}
                  />

                  <FormSelect
                    label="Betreff"
                    required
                    placeholder={copy.betreffPlaceholder}
                    options={copy.betreffOptions}
                    error={errors.betreff?.message}
                    {...register("betreff")}
                  />

                  <FormTextarea
                    label="Ihre Nachricht"
                    required
                    placeholder="Beschreiben Sie Ihr Anliegen oder Projekt..."
                    rows={6}
                    error={errors.nachricht?.message}
                    {...register("nachricht")}
                  />

                  <FileUpload
                    label="Anhänge (optional)"
                    hint="Bilder oder PDF – z. B. Fotos, Pläne oder Skizzen"
                    files={files}
                    onChange={setFiles}
                  />

                  <FormCheckbox
                    label={
                      <>
                        {copy.consent.prefix}
                        <Link href="/datenschutz" className="text-aman-gold underline" target="_blank">
                          {copy.consent.linkText}
                        </Link>
                        {copy.consent.suffix} <span className="text-aman-gold">*</span>
                      </>
                    }
                    error={errors.datenschutz?.message}
                    {...register("datenschutz")}
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
                    {isSubmitting ? copy.submittingLabel : copy.submitLabel}
                  </Button>

                  <p className="text-xs text-aman-text-light">
                    {copy.requiredNote.prefix}
                    <Link href="/datenschutz" className="underline hover:text-aman-gold transition-colors">
                      {copy.requiredNote.linkText}
                    </Link>
                    {copy.requiredNote.suffix}
                  </p>
                </form>
              )}
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl text-aman-charcoal mb-6">{copy.sidebarHeading}</h2>
                <div className="flex flex-col gap-2">
                  {contactInfo.map((item) => {
                    if (isEmpty(item.value)) return null;

                    const Icon = item.icon;
                    const content = (
                      <div className="flex items-start gap-4 p-4 rounded-xl border border-aman-border hover:border-aman-gold hover:shadow-soft transition-all duration-200 group">
                        <div className="w-10 h-10 rounded-lg bg-aman-cream flex items-center justify-center shrink-0 group-hover:bg-aman-gold/10 transition-colors">
                          <Icon size={18} className="text-aman-gold" />
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-aman-text-light mb-0.5">
                            {item.label}
                          </p>
                          <p className="text-sm text-aman-charcoal font-medium leading-relaxed">{item.value}</p>
                        </div>
                      </div>
                    );
                    return item.href ? (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith("https") ? "_blank" : undefined}
                        rel={item.href.startsWith("https") ? "noopener noreferrer" : undefined}
                        aria-label={`${item.label}: ${item.value}`}
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={item.label}>{content}</div>
                    );
                  })}
                </div>
              </div>

              {/* Location photo */}
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-video overflow-hidden rounded-xl border border-aman-border"
                aria-label={`${contact.address.street}, ${contact.address.zip} ${contact.address.city} – ${copy.mapLinkLabel}`}
              >
                <Image
                  src="/location.jpeg"
                  alt={`${contact.address.street}, ${contact.address.zip} ${contact.address.city}`}
                  fill
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-aman-charcoal/80 via-aman-charcoal/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-aman-gold/90">
                    <MapPin size={18} className="text-white" />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
