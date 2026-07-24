'use client'

import { useState } from 'react'

type Role = {
  company: string
  companyFull: string
  role: string
  period: string
  current?: boolean
  location?: string
  summary: string
  achievements: string[]
  tags: string[]
}

const roles: Role[] = [
  {
    company: 'Aspire / SDS',
    companyFull: 'Aspire Software / Shelton Development Services',
    role: 'Software Engineer & Technical Consultant',
    period: 'Mar 2026 — Present',
    current: true,
    location: 'Remote',
    summary:
      'Software engineer and technical consultant on Landval — an enterprise SaaS platform for real estate financial appraisal used by UK housebuilders. Consulting directly with UK-based clients in the real estate and property development sector: gathering requirements, engineering complex SQL Server / T-SQL solutions, and delivering tailored customizations and deployments alongside frontend modernization and AWS cloud operations.',
    achievements: [
      'Designed and optimized complex T-SQL queries, stored procedures, functions, and views; improved performance through indexing, execution-plan analysis, and query tuning.',
      'Consulted directly with UK enterprise clients — gathering requirements and delivering tailored customizations, deployments, and SQL-based reporting solutions.',
      'Participated in database schema design, data migration, and ETL activities across the multi-tenant platform.',
      'Leading migration of legacy frontend to React.js, TypeScript, and Tailwind CSS with a reusable design system.',
      'Designed and implemented a complete UI component library (Button, Input, Badge, Card, PageHeader, etc.) aligned with a Stripe/Linear-inspired design style.',
      'Architected multi-tenant organization hierarchy (Organisation → Division → Region) with RBAC, branding inheritance, and license propagation.',
      'Implemented and maintained SSO, MFA/TOTP, JWT-based auth, and user provisioning flows using Keycloak.',
      'Led LandvalCloud migration: consolidated database-per-tenant MongoDB architecture into a unified multi-tenant model with full data integrity.',
      'Investigated production issues via New Relic APM, AWS EC2 server logs, and Windows IIS logs; improved application observability.',
      'Conducted OWASP ZAP penetration tests and Semgrep SAST scans; prepared audit evidence and security remediation.',
      'Collaborated with product leadership and clients including Persimmon Homes, Metcalfe, Vivid, and Gentoo.',
    ],
    tags: ['SQL Server / T-SQL', 'Stored Procedures', 'Query Optimization', 'ETL', 'React', 'TypeScript', 'Tailwind CSS', 'ASP.NET Core', 'C#', 'MongoDB', 'PostgreSQL', 'Keycloak', 'AWS S3/EC2', 'IIS', 'New Relic', 'Docker'],
  },
  {
    company: 'Intalio',
    companyFull: 'Intalio',
    role: 'Software Engineer & Consultant',
    period: 'Mar 2025 — Mar 2026',
    location: 'Beirut, Lebanon',
    summary:
      'Developed and maintained enterprise workflow automation systems for government and corporate clients, including the Ministry of Justice Jordan. Built backend services, IAM integrations, reactive microservices, Docker environments, and BI dashboards. Supervised junior engineers and delivered technical training to international teams.',
    achievements: [
      'Built the Strategy Management System for the Ministry of Justice Jordan — tracking KPIs, programs, projects, and strategic goals with Oracle financial integrations (MIZAN, JIFMIS).',
      'Developed MEA-related staff and duty ticket workflow systems with complex approval routing and JSON-based form handling.',
      'Led migration from SharePoint to Intalio CTS, ensuring data integrity and operational continuity.',
      'Built reactive microservices with Spring WebFlux and Kafka for non-blocking, event-driven enterprise communication.',
      'Designed Docker-based deployments for IAM, CTS, Case Portal, Viewer, and Designer applications.',
      'Integrated enterprise systems with Keycloak, Active Directory, Oracle, SharePoint, and Amadeus.',
      'Supervised junior developers; delivered technical training to PS Egypt, PS Qatar, PS Lebanon, and PS France teams.',
      'Traveled to Jordan for client requirement gathering and business logic alignment.',
    ],
    tags: ['ASP.NET Core', 'C#', 'Angular', 'Java Spring Boot', 'Spring WebFlux', 'Kafka', 'Docker', 'Kubernetes', 'Keycloak', 'Active Directory', 'Oracle', 'MSSQL', 'PostgreSQL', 'Power BI', 'Apache Superset'],
  },
  {
    company: 'Born Interactive',
    companyFull: 'Born Interactive',
    role: 'Software Engineer',
    period: 'May 2024 — Mar 2025',
    location: 'Beirut, Lebanon',
    summary:
      'Supported and developed more than 10 production web projects across automotive, finance, telecom, and corporate sectors. Worked full-stack across ASP.NET Core, Node.js, SQL Server, and CMS platforms; managed deployments, client training, and performance improvements.',
    achievements: [
      'Developed and maintained production websites for clients including Toyota Iraq, Tamam KSA, The Net Global, and SNA Lebanon.',
      'Built new features, fixed bugs, improved performance, and updated backend and frontend code across multiple simultaneous live projects.',
      'Managed deployments via CI/CD pipelines and manual FileZilla-based workflows for diverse hosting environments.',
      'Conducted client training on CMS platforms; worked with multilingual Arabic/English content structures.',
      'Improved non-blocking backend performance using Spring WebFlux.',
    ],
    tags: ['ASP.NET Core', 'ASP.NET MVC', 'C#', 'Node.js', 'JavaScript', 'jQuery', 'Bootstrap', 'SQL Server', 'Entity Framework', 'CI/CD', 'CMS'],
  },
  {
    company: 'TDNT',
    companyFull: 'Triplet Data Networks and Telecommunications',
    role: 'Software Engineer',
    period: 'Oct 2022 — May 2024',
    location: 'Beirut, Lebanon',
    summary:
      'Designed and built high-traffic telecom gateway systems capable of handling thousands of requests per second for SMS, OTP, and number pool operations. Built the Didginums platform for SMS number rental and developed customer-facing APIs, automation tools, and full-stack dashboards.',
    achievements: [
      'Designed telecom gateway systems integrating with multiple SMS and OTP providers at scale.',
      'Built Didginums — a platform for renting SMS numbers and managing phone number pools with backend routing and provider integration.',
      'Developed customer-facing REST APIs and full-stack dashboards for telecom operations monitoring.',
      'Implemented browser automation workflows using Selenium and Puppeteer for telecom-related processes.',
      'Migrated application data layer from raw SQL to an ORM approach, improving maintainability.',
      'Built Telegram bots using Telegraf for extended platform reach and user interaction.',
    ],
    tags: ['Node.js', 'Express.js', 'React.js', 'Next.js', 'PostgreSQL', 'MySQL', 'REST APIs', 'Selenium', 'Puppeteer', 'Telegraf', 'Telecom Gateways', 'SMS/OTP', '.NET'],
  },
]

export function Experience() {
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <section id="experience" className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          Experience
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-14">
          Professional Timeline
        </h2>

        <div className="space-y-3">
          {roles.map((role, i) => {
            const isOpen = expanded === i
            return (
              <div
                key={role.company}
                className={`border rounded-lg transition-all duration-200 ${
                  isOpen ? 'border-primary/40 bg-muted/60' : 'border-border bg-muted/20 hover:border-border/80'
                }`}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-start gap-4"
                  aria-expanded={isOpen}
                >
                  {/* Left: period */}
                  <div className="hidden md:block w-40 shrink-0 pt-0.5">
                    <span className="text-xs font-mono text-muted-foreground">{role.period}</span>
                    {role.current && (
                      <span className="mt-1 block text-[10px] font-semibold uppercase tracking-widest text-green-400">
                        Current
                      </span>
                    )}
                  </div>

                  {/* Center: title */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-base font-semibold text-foreground">{role.role}</span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-sm text-primary font-medium">{role.companyFull}</span>
                      {role.current && (
                        <span className="md:hidden text-[10px] font-semibold uppercase tracking-widest text-green-400">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground md:hidden mb-1">{role.period}</div>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {role.summary}
                    </p>
                  </div>

                  {/* Right: chevron */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 md:pl-[calc(160px+24px+16px)]">
                    <ul className="space-y-2 mb-6" aria-label="Key achievements">
                      {role.achievements.map((ach) => (
                        <li key={ach} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="mt-0.5 shrink-0 text-primary"
                            aria-hidden="true"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5">
                      {role.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[11px] font-medium"
                          style={{
                            background: 'var(--tag-bg)',
                            color: 'var(--tag-fg)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
