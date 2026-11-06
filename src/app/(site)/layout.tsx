import { Open_Sans } from 'next/font/google'
import '../globals.css'
import { SiteWrapper } from './SiteWrapper'

const primaryFont = Open_Sans({
  variable: '--font-primary',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800']
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
        className={`${primaryFont.variable} antialiased bg-background text-foreground`}
      >
        <SiteWrapper>{children}</SiteWrapper>
      </body>
    </html>
  )
}
