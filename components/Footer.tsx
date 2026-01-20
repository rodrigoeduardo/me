'use client'

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-foreground/5 py-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/50">
          <p>© {currentYear} Rodrigo Eduardo. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/rodrigoeduardo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/rodrigoedb/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
