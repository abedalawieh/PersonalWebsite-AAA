import Image from 'next/image'

const highlights = [
  'Backend engineering & API design',
  'SaaS modernization & frontend architecture',
  'Enterprise & government systems',
  'Telecom gateway & high-traffic systems',
  'Cloud, Docker, AWS, IIS deployment',
  'Identity & access management (Keycloak)',
  'Security testing & audit readiness',
  'AI & computer vision research',
  'Technical leadership & mentoring',
  'Client-facing delivery & stakeholder communication',
]

export function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left column */}
          <div>
            <div className="mb-8">
              <Image
                src="/profile.jpeg"
                alt="Abed Alawieh"
                width={160}
                height={160}
                className="w-40 h-40 rounded-xl object-cover object-top ring-1 ring-primary/20 shadow-lg"
                priority
              />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              About
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance leading-tight mb-6">
              Engineering systems that work at scale
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I am a Senior Software Engineer with hands-on experience building, maintaining, and modernizing
                real production systems across enterprise SaaS, telecom, government, and digital agency environments.
              </p>
              <p>
                My work spans the full stack — designing secure backend APIs, modernizing legacy frontends,
                containerizing multi-service deployments, and integrating identity and access management systems
                trusted by enterprise clients and government entities.
              </p>
              <p>
                I hold an MSc in Computer Engineering from Lebanese International University and hold the
                {' '}<span className="text-foreground font-medium">Microsoft Certified: Power Platform Developer Associate</span>{' '}
                certification. I have taught web development to graduate students and mentored junior engineers
                in professional environments.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Beirut, Lebanon
              </span>
              <span className="w-px h-4 bg-border" aria-hidden="true" />
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                abedalawieh@gmail.com
              </span>
            </div>
          </div>

          {/* Right column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
              Core Strengths
            </p>
            <ul className="space-y-2" aria-label="Core strengths list">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="mt-0.5 shrink-0 text-primary"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Education & Certification */}
            <div className="mt-10 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Education & Certification
              </p>
              {[
                {
                  title: 'MSc Computer Engineering',
                  sub: 'Lebanese International University · June 2025',
                },
                {
                  title: 'BSc Computer Engineering',
                  sub: 'Lebanese International University · June 2023',
                },
                {
                  title: 'Microsoft Certified: Power Platform Developer Associate',
                  sub: 'Microsoft Certification',
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 items-start">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
