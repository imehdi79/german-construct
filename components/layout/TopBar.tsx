import { Phone, Smartphone, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { SiteContent } from "@/lib/content";
import { isEmpty } from "@/lib/utils";

export function TopBar({ contact = siteConfig.contact }: { contact?: SiteContent["contact"] }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-aman-charcoal text-white/80 text-xs py-2.5 hidden md:block">
      <div className="container-aman">
        <div className="flex items-center justify-end gap-6">
          {!isEmpty(contact.phone) && (
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 hover:text-aman-gold transition-colors"
              aria-label={`Festnetz: ${contact.phone}`}
            >
              <Phone size={12} className="shrink-0" />
              <span>{contact.phone}</span>
            </a>
          )}

          {!isEmpty(contact.mobile) && (
            <a
              href={`tel:${contact.mobile.replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 hover:text-aman-gold transition-colors"
              aria-label={`Mobil: ${contact.mobile}`}
            >
              <Smartphone size={12} className="shrink-0" />
              <span>{contact.mobile}</span>
            </a>
          )}

          {!isEmpty(contact.email) && (
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-1.5 hover:text-aman-gold transition-colors"
              aria-label={`E-Mail: ${contact.email}`}
            >
              <Mail size={12} className="shrink-0" />
              <span>{contact.email}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
