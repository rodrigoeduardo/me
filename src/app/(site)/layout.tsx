import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google'
import '../globals.css'
import { SiteWrapper } from './SiteWrapper'

const primaryFont = Space_Grotesk({
  variable: '--font-primary',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

const secondaryFont = IBM_Plex_Mono({
  variable: '--font-secondary',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export default function SiteLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
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
        className={`${primaryFont.variable} ${secondaryFont.variable} antialiased bg-background text-foreground`}
      >
        <SiteWrapper>{children}</SiteWrapper>
      </body>
    </html>
  )
}
