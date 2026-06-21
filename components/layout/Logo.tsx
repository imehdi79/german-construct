import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md";
  className?: string;
  priority?: boolean;
}

/**
 * Brand logo. The "Aman" script stays as artwork; the "Fliesen · Naturstein"
 * tagline is rendered as real text (Playfair) so it stays crisp and legible at
 * header size, where the baked-in subtitle of the full artwork turned to mush.
 *
 * One navy artwork (`aman.webp`) is used everywhere: on dark/transparent
 * surfaces (`variant="light"`) it is knocked out to white via
 * `brightness-0 invert`, and the tagline switches to white.
 */
export function Logo({ variant = "dark", size = "md", className, priority = false }: LogoProps) {
  const isLight = variant === "light";

  const scriptBox = size === "sm" ? "w-16 h-9" : "w-20 h-10 md:w-24 md:h-12";
  const taglineSize = size === "sm" ? "text-[7px]" : "text-[10px] md:text-[11px]";

  return (
    <Link
      href="/"
      className={cn("flex items-center shrink-0 group", className)}
      aria-label="Fliesen-Naturstein AMAN – Zur Startseite"
    >
      {/* Script wordmark + crisp text tagline */}
      <span className="flex items-center gap-1 flex-col">
        <span className={cn("relative", scriptBox, isLight && "brightness-0 invert")}>
          <Image
            src="/aman.webp"
            alt=""
            fill
            sizes="(min-width: 768px) 96px, 80px"
            className="object-contain"
            priority={priority}
          />
        </span>
        <span
          className={cn(
            "font-serif font-bold uppercase leading-none whitespace-nowrap",
            taglineSize,
            isLight ? "text-white" : "text-aman-charcoal",
          )}
          style={{ letterSpacing: "0.16em" }}
        >
          Fliesen AMAN
        </span>
      </span>
    </Link>
  );
}
