"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Briefcase, ChevronDown, CheckCircle2, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { FormInput, FormTextarea, FormSelect, FormCheckbox } from "@/components/ui/FormField";
import { FileUpload } from "@/components/ui/FileUpload";
import { jobApplicationSchema, type JobApplicationSchema } from "@/schemas/jobs";
import { projectTypes } from "@/data/jobs";
import { defaultPages } from "@/data/sections";
import type { Job, StellenangebotePageCopy } from "@/types";
import { cn } from "@/lib/utils";

function JobCard({
  job,
  onApply,
  copy,
}: {
  job: Job;
  onApply: (jobTitle: string) => void;
  copy: StellenangebotePageCopy;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <article className="bg-white rounded-2xl border border-aman-border overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:border-aman-gold/30">
      <div className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-aman-cream text-aman-stone-500">
                <Briefcase size={11} />
                {job.type}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-aman-gold/10 text-aman-gold">
                {job.level}
              </span>
            </div>
            <h2 className="font-serif text-xl text-aman-charcoal">{job.title}</h2>
          </div>
          <Button
            variant="gold"
            size="sm"
            onClick={() => onApply(job.title)}
            className="shrink-0"
            icon={<ArrowRight size={14} />}
          >
            {copy.applyLabel}
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-aman-text-muted mb-4">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-aman-gold" />
            {job.location}
          </span>
          {job.salary && (
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-aman-gold" />
              {job.salary}
            </span>
          )}
        </div>

        <p className="text-sm text-aman-text-muted leading-relaxed">{job.description}</p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-sm text-aman-gold hover:text-aman-gold-dark transition-colors mt-4 font-medium"
          aria-expanded={expanded}
        >
          {expanded ? copy.detailsHide : copy.detailsShow}
          <ChevronDown size={15} className={cn("transition-transform duration-200", expanded && "rotate-180")} />
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-8 border-t border-aman-border pt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-medium text-aman-charcoal uppercase tracking-wider mb-4">
                    {copy.requirementsTitle}
                  </h3>
                  <ul className="space-y-2">
                    {job.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-2.5 text-sm text-aman-text-muted">
                        <CheckCircle2 size={15} className="text-aman-gold shrink-0 mt-0.5" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-aman-charcoal uppercase tracking-wider mb-4">
                    {copy.benefitsTitle}
                  </h3>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2.5 text-sm text-aman-text-muted">
                        <CheckCircle2 size={15} className="text-aman-gold shrink-0 mt-0.5" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-aman-border">
                <Button variant="gold" size="md" onClick={() => onApply(job.title)} icon={<ArrowRight size={15} />}>
                  {copy.applyLabelLong}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export function StellenangeboteClient({
  jobs,
  copy = defaultPages.stellenangebote,
}: {
  jobs: Job[];
  copy?: StellenangebotePageCopy;
}) {
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JobApplicationSchema>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: { position: selectedJob },
  });

  const handleApply = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    reset({ position: jobTitle });
    setShowForm(true);
    setSubmitSuccess(false);
    setTimeout(() => {
      document.getElementById("bewerbungsformular")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const onSubmit = async (data: JobApplicationSchema) => {
    setSubmitError("");
    const formData = new FormData();
    formData.append("vorname", data.vorname);
    formData.append("nachname", data.nachname);
    formData.append("email", data.email);
    formData.append("telefon", data.telefon ?? "");
    formData.append("position", data.position);
    formData.append("anschreiben", data.anschreiben);
    formData.append("datenschutz", String(data.datenschutz));
    for (const file of files) formData.append("files", file);

    // ✅ Call the API route instead of the server action directly
    const res = await fetch("/api/jobs/apply", { method: "POST", body: formData });
    const result = await res.json();

    if (result.success) {
      setSubmitSuccess(true);
      reset();
      setFiles([]);
    } else {
      setSubmitError(result.message);
    }
  };

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

      {/* Jobs */}
      <section className="section-padding bg-white">
        <div className="container-aman">
          <div className="grid gap-6 mb-12">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} onApply={handleApply} copy={copy} />
            ))}
          </div>

          {/* Spontaneous Application */}
          <div className="bg-aman-cream rounded-2xl p-8 md:p-10 border border-aman-border text-center">
            <h3 className="font-serif text-2xl text-aman-charcoal mb-3">{copy.spontaneousTitle}</h3>
            <p className="text-aman-text-muted mb-6 max-w-lg mx-auto">{copy.spontaneousText}</p>
            <Button
              variant="primary"
              size="md"
              onClick={() => handleApply(copy.spontaneousCtaLabel)}
              icon={<ArrowRight size={15} />}
            >
              {copy.spontaneousCtaLabel}
            </Button>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <AnimatePresence>
        {showForm && (
          <motion.section
            id="bewerbungsformular"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="section-padding bg-aman-cream border-t border-aman-border scroll-mt-20"
            aria-label="Bewerbungsformular"
          >
            <div className="container-aman max-w-2xl mx-auto">
              <SectionTitle
                eyebrow={copy.formEyebrow}
                title={selectedJob ? `Bewerbung: ${selectedJob}` : copy.formTitleFallback}
                align="center"
                className="mb-10"
              />

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
                  <p className="text-aman-text-muted max-w-md">{copy.successText}</p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5 bg-white rounded-2xl p-7 md:p-10 shadow-soft border border-aman-border"
                  noValidate
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormInput
                      label="Vorname"
                      required
                      autoComplete="given-name"
                      error={errors.vorname?.message}
                      {...register("vorname")}
                    />
                    <FormInput
                      label="Nachname"
                      required
                      autoComplete="family-name"
                      error={errors.nachname?.message}
                      {...register("nachname")}
                    />
                  </div>

                  <FormInput
                    label="E-Mail"
                    type="email"
                    required
                    autoComplete="email"
                    error={errors.email?.message}
                    {...register("email")}
                  />

                  <FormInput
                    label="Telefon"
                    type="tel"
                    autoComplete="tel"
                    error={errors.telefon?.message}
                    {...register("telefon")}
                  />

                  <FormSelect
                    label={copy.positionLabel}
                    required
                    options={[
                      ...jobs.map((j) => ({ value: j.title, label: j.title })),
                      ...projectTypes.slice(-2).map((p) => ({ value: p.label, label: p.label })),
                    ]}
                    placeholder={copy.positionPlaceholder}
                    error={errors.position?.message}
                    {...register("position")}
                  />

                  <FormTextarea
                    label={copy.coverLetterLabel}
                    required
                    rows={7}
                    placeholder={copy.coverLetterPlaceholder}
                    hint={copy.coverLetterHint}
                    error={errors.anschreiben?.message}
                    {...register("anschreiben")}
                  />

                  <FileUpload
                    label="Unterlagen (Lebenslauf, Zeugnisse …)"
                    hint="PDF oder Bilder – mehrere Dateien möglich"
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

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      variant="gold"
                      size="lg"
                      loading={isSubmitting}
                      icon={<ArrowRight size={16} />}
                    >
                      {isSubmitting ? copy.submittingLabel : copy.submitLabel}
                    </Button>
                    <Button type="button" variant="ghost" size="lg" onClick={() => setShowForm(false)}>
                      {copy.cancelLabel}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
