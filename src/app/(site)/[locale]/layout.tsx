import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Open_Sans } from 'next/font/google'
import '../../globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getTranslator } from '@/lib/i18n'
import { isLocale, locales } from '@/lib/locales'
import { baseOpenGraph } from '@/lib/site'

const primaryFont = Open_Sans({
  variable: '--font-primary',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800']
})

interface SiteLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({
  params
}: Omit<SiteLayoutProps, 'children'>): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getTranslator(locale)

  return {
    title: { default: t('meta.title'), template: '%s | Rodrigo Eduardo' },
    description: t('meta.description'),
    openGraph: { ...baseOpenGraph(locale), type: 'website' }
  }
}

export default async function SiteLayout({
  children,
  params
}: SiteLayoutProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body
        className={`${primaryFont.variable} antialiased bg-background text-foreground`}
      >
        <Header locale={locale} />
        <main className='min-h-screen'>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  )
}
