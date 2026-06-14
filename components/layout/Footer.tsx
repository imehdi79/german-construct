import Link from "next/link";
import { Phone, Smartphone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";
import { defaultFooter } from "@/data/sections";
import type { SiteContent } from "@/lib/content";
import { isEmpty } from "@/lib/utils";

export function Footer({
  footer = defaultFooter,
  contact = siteConfig.contact,
  openingHours = siteConfig.openingHours,
  social = siteConfig.social,
  brandName = siteConfig.name,
}: {
  footer?: SiteContent["footer"];
  contact?: SiteContent["contact"];
  openingHours?: SiteContent["openingHours"];
  social?: SiteContent["social"];
  brandName?: string;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-aman-charcoal text-white/70" aria-label="Seitenende">
      {/* Main Footer */}
      <div className="container-aman py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Logo variant="light" className="mb-6" />

            <p className="text-sm leading-relaxed mb-6">{footer.description}</p>

            <div className="flex items-center gap-3">
              {!isEmpty(social.instagram) && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-white/20 hover:border-aman-gold hover:text-aman-gold transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              )}
              {!isEmpty(social.facebook) && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-white/20 hover:border-aman-gold hover:text-aman-gold transition-colors"
                  aria-label="Facebook"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-sm font-medium uppercase tracking-widest mb-5">{footer.servicesTitle}</h3>
            <ul className="space-y-2.5">
              {footer.serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-aman-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white text-sm font-medium uppercase tracking-widest mb-5">{footer.companyTitle}</h3>
            <ul className="space-y-2.5">
              {footer.companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-aman-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-sm font-medium uppercase tracking-widest mb-5">{footer.contactTitle}</h3>
            <address className="not-italic space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin size={14} className="shrink-0 mt-0.5 text-aman-gold" />
                <span>
                  {contact.address.street}
                  <br />
                  {contact.address.zip} {contact.address.city}
                </span>
              </div>

              {!isEmpty(contact.phone) && (
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm hover:text-aman-gold transition-colors"
                >
                  <Phone size={14} className="shrink-0 text-aman-gold" />
                  {contact.phone}
                </a>
              )}

              {!isEmpty(contact.mobile) && (
                <a
                  href={`tel:${contact.mobile.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm hover:text-aman-gold transition-colors"
                >
                  <Smartphone size={14} className="shrink-0 text-aman-gold" />
                  {contact.mobile}
                </a>
              )}

              {!isEmpty(contact.email) && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-sm hover:text-aman-gold transition-colors"
                >
                  <Mail size={14} className="shrink-0 text-aman-gold" />
                  {contact.email}
                </a>
              )}

              <div className="flex items-start gap-3 text-sm pt-2 border-t border-white/10">
                <Clock size={14} className="shrink-0 mt-0.5 text-aman-gold" />
                <div className="space-y-1">
                  <p>{openingHours.weekdays}</p>
                  <p>{openingHours.saturday}</p>
                  <p className="text-white/40">{openingHours.sunday}</p>
                </div>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-aman py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <p>
              © {currentYear} {brandName}. {footer.copyrightSuffix}
            </p>

            <nav aria-label="Rechtliche Links" className="flex items-center gap-5">
              {footer.legalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-aman-gold transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
