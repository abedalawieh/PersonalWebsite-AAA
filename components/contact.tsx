export function Contact() {
  return (
    <section id="contact" className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
            {"Let's work together"}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10 text-pretty">
            I am open to Senior Software Engineer, Technical Consultant, Full-Stack Engineer, and SaaS
            implementation and delivery opportunities. Whether you are building a product, modernizing a
            platform, or need someone who can consult with clients and turn requirements into working
            software — I would love to connect.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <a
              href="mailto:abedrazakalawiyeh@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Send an Email
            </a>
            <a
              href="https://www.linkedin.com/in/abed-alawieh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md border border-border bg-muted text-foreground text-sm font-semibold hover:border-primary transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://github.com/abedalawieh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md border border-border bg-muted text-foreground text-sm font-semibold hover:border-primary transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              GitHub
            </a>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Email', value: 'abedrazakalawiyeh@gmail.com', href: 'mailto:abedrazakalawiyeh@gmail.com' },
              { label: 'Phone', value: '+961 76 073 446', href: 'tel:+96176073446' },
              { label: 'Location', value: 'Beirut, Lebanon', href: null },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-border bg-muted/20 px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                  {item.label}
                </p>
                {item.href ? (
                  <a href={item.href} className="text-sm text-foreground font-medium hover:text-primary transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm text-foreground font-medium">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} Abed Alawieh · Senior Software Engineer & Technical Consultant
        </p>
        <p className="text-center">
          Beirut, Lebanon · Available for remote & on-site opportunities
        </p>
        <div className="flex items-center gap-4">
          <a href="mailto:abedrazakalawiyeh@gmail.com" className="hover:text-foreground transition-colors">Email</a>
          <a href="https://www.linkedin.com/in/abed-alawieh-0431051a4/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
          <a href="https://github.com/abedalawieh" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
