import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md";
  className?: string;
  priority?: boolean;
}

export function Logo({ variant = "dark", size = "md", className, priority = false }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3 shrink-0 group", className)}
      aria-label="Fliesen-Naturstein AMAN – Zur Startseite"
    >
      <div
        className={cn(
          "relative",
          size === "sm" ? "w-20 h-10" : "w-20 h-10 md:w-48 md:h-20",
          isLight && "brightness-0 invert",
        )}
      >
        <Image
          src="/logo-no-background.png"
          alt="Fliesen-Naturstein AMAN"
          fill
          className={cn("object-contain md:scale-[1.5] scale-[2.1]")}
          priority={priority}
        />
      </div>
      {/* <div
        className={cn(
          'hidden sm:block transition-colors duration-300',
          isLight ? 'text-white' : 'text-aman-charcoal'
        )}
      >
        <p className="font-serif text-lg leading-none tracking-tight">AMAN</p>
        <p
          className={cn(
            'text-[10px] uppercase tracking-[0.15em] mt-0.5',
            isLight ? 'text-white/50' : 'opacity-60'
          )}
        >
          Fliesen · Naturstein
        </p>
      </div> */}
    </Link>
  );
}
