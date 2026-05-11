const clientGroups = [
  {
    category: 'Enterprise SaaS & Real Estate',
    clients: ['Landval / Aspire Software', 'Persimmon Homes', 'Metcalfe', 'Vivid', 'Gentoo', 'Citizen', 'Backhouse', 'Shelton Development Services'],
  },
  {
    category: 'Government & Public Sector',
    clients: ['Ministry of Justice Jordan', 'Jordan Government Systems'],
  },
  {
    category: 'Aviation & Transport',
    clients: ['MEA / Middle East Airlines (Workflow & Ticketing Systems)'],
  },
  {
    category: 'Insurance & Financial',
    clients: ['Allianz Maroc', 'Tamam KSA (tamam.life)', 'Nawatek'],
  },
  {
    category: 'Automotive & Corporate',
    clients: ['Toyota Iraq (toyota.iq)', 'The Net Global', 'SNA Lebanon'],
  },
  {
    category: 'Telecom & Technology',
    clients: ['TDNT / Triplet Data Networks and Telecommunications', 'Didginums Platform'],
  },
]

export function Clients() {
  return (
    <section id="clients" className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          Client Exposure
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
          Clients & Projects
        </h2>
        <p className="text-muted-foreground mb-14 max-w-xl leading-relaxed">
          I have delivered software for enterprises, government entities, and international businesses
          across multiple industries. Names are used professionally and at a high level only.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {clientGroups.map((group) => (
            <div
              key={group.category}
              className="rounded-lg border border-border bg-muted/20 p-5 hover:bg-muted/40 transition-colors duration-200"
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest text-primary mb-3">
                {group.category}
              </p>
              <ul className="space-y-1.5" aria-label={`${group.category} clients`}>
                {group.clients.map((client) => (
                  <li key={client} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/40 shrink-0" aria-hidden="true" />
                    {client}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Teaching & Leadership */}
        <div className="mt-14 rounded-lg border border-border bg-muted/20 p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Leadership & Teaching
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-base font-bold text-foreground mb-3">Teaching & Training</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                I have taught Web Development and .NET topics to Master&apos;s students at Lebanese University,
                covering C#, ASP.NET Core, REST APIs, Docker, deployment, secure coding, SOLID principles,
                clean architecture, and software engineering best practices.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I delivered technical training and presentations to international teams across Intalio&apos;s
                PS Egypt, PS Qatar, PS Lebanon, and PS France units on emerging technologies and engineering standards.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground mb-3">Technical Leadership</h3>
              <ul className="space-y-2">
                {[
                  'Supervised junior developers, assigned tasks, and guided project milestones.',
                  'Conducted code reviews and raised team code quality standards.',
                  'Trusted with architecture decisions, technical direction, and delivery ownership.',
                  'Traveled to Jordan for direct client requirement gathering and alignment.',
                  'Delivered client-facing demos, technical explanations, and onboarding sessions.',
                  'Worked directly with product managers, CTOs, and international stakeholders.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-0.5 shrink-0 text-primary" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
