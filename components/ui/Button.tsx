import { forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never }

type ButtonAsLink = ButtonBaseProps & { href: string; external?: boolean } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'href'
  >

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-aman-charcoal text-white hover:bg-aman-text active:scale-[0.98]',
  secondary:
    'bg-aman-cream text-aman-charcoal hover:bg-aman-sand border border-aman-border active:scale-[0.98]',
  outline:
    'bg-transparent text-aman-charcoal border border-aman-charcoal hover:bg-aman-charcoal hover:text-white active:scale-[0.98]',
  ghost:
    'bg-transparent text-aman-charcoal hover:bg-aman-cream active:scale-[0.98]',
  gold:
    'bg-aman-gold text-white hover:bg-aman-gold-dark active:scale-[0.98] shadow-[0_4px_20px_rgba(201,169,110,0.3)]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs gap-1.5',
  md: 'px-6 py-3 text-sm gap-2',
  lg: 'px-8 py-4 text-base gap-2.5',
}

const baseClasses =
  'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aman-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wider select-none'

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const {
      variant = 'primary',
      size = 'md',
      className,
      children,
      loading,
      icon,
      iconPosition = 'right',
      ...rest
    } = props

    const classes = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    )

    const content = (
      <>
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {!loading && icon && iconPosition === 'left' && icon}
        {children}
        {!loading && icon && iconPosition === 'right' && icon}
      </>
    )

    if ('href' in rest && rest.href) {
      const { href, external, ...linkRest } = rest as ButtonAsLink
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
            ref={ref as React.Ref<HTMLAnchorElement>}
            {...(linkRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {content}
          </a>
        )
      }
      return (
        <Link
          href={href}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(linkRest as Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>)}
        >
          {content}
        </Link>
      )
    }

    return (
      <button
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={loading || (rest as ButtonAsButton).disabled}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    )
  }
)
