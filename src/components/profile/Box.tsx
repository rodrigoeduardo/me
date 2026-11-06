import type { ReactNode } from 'react'

interface BoxProps {
  title?: ReactNode
  aside?: ReactNode
  id?: string
  className?: string
  children: ReactNode
}

// The standard content box: a pale headline strip over a white body.
export function Box({ title, aside, id, className = '', children }: BoxProps) {
  return (
    <section
      id={id}
      className={`bg-surface border border-rule ${className}`}
      aria-labelledby={id && title ? `${id}-title` : undefined}
    >
      {title && (
        <header className='flex items-baseline justify-between gap-3 px-3 py-2 bg-surface-head border-b border-rule'>
          <h2
            id={id ? `${id}-title` : undefined}
            className='text-[15px] font-bold leading-tight'
          >
            {title}
          </h2>
          {aside && <div className='text-xs text-muted'>{aside}</div>}
        </header>
      )}
      {children}
    </section>
  )
}

interface RailHeadingProps {
  children: ReactNode
}

export function RailHeading({ children }: RailHeadingProps) {
  return (
    <h2 className='px-1 pt-4 pb-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-muted'>
      {children}
    </h2>
  )
}

interface BoxButtonProps {
  href: string
  children: ReactNode
  external?: boolean
}

// Full-width action that closes a box, like "Complete statistics".
export function BoxButton({ href, children, external }: BoxButtonProps) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className='block mx-3 mb-3 py-2 text-center text-[13px] font-bold text-link border border-rule hover:bg-surface-head transition-colors'
    >
      {children}
    </a>
  )
}
