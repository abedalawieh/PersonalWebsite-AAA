'use client'

import dynamic from 'next/dynamic'

const ProjectIcon3D = dynamic(
  () => import('@/components/3d/project-icon').then((mod) => mod.ProjectIcon3D),
  { ssr: false, loading: () => <div className="w-14 h-14 rounded-lg bg-muted animate-pulse shrink-0" /> }
)

type Project = {
  title: string
  category: string
  description: string
  impact: string
  details: string[]
  tags: string[]
  accent: string
}

const projects: Project[] = [
  {
    title: 'Landval SaaS Platform',
    category: 'Enterprise SaaS · Real Estate',
    description:
      'Enterprise financial appraisal platform for land development viability analysis. Used by major UK housebuilders including Persimmon Homes, Metcalfe, Vivid, and Gentoo for cashflow modeling, sensitivity analysis, and project value assessment.',
    impact: 'Modernized frontend architecture and multi-tenant system for a commercially active SaaS product serving enterprise clients.',
    details: [
      'Migrated legacy frontend to React.js, TypeScript, and Tailwind CSS; built reusable design system from scratch.',
      'Redesigned multi-tenant architecture: Organisation → Division → Region with RBAC, branding inheritance, and license rules.',
      'Led LandvalCloud database migration consolidating per-tenant MongoDB databases into a single scalable architecture.',
      'Integrated Keycloak for SSO, MFA/TOTP, JWT, user provisioning, and identity lifecycle management.',
      'Deployed on AWS S3 (frontend) and Windows IIS (backend); monitored with New Relic APM.',
    ],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Redux', 'ASP.NET Core', 'C#', 'MongoDB', 'Keycloak', 'AWS', 'New Relic'],
    accent: '#7c9a5e',
  },
  {
    title: 'Ministry of Justice Jordan — Strategy Management System',
    category: 'Government Enterprise · Strategy & KPIs',
    description:
      'A strategic management platform for tracking national programs, projects, strategic goals, KPIs, dashboards, and financial indicators. Integrated with Oracle financial systems MIZAN and JIFMIS used by the Jordanian government.',
    impact: 'Delivered a mission-critical government system supporting national strategy execution and reporting for the Ministry of Justice.',
    details: [
      'Built backend services for strategic goal tracking, KPI calculations, progress dashboards, and financial reporting.',
      'Integrated with Oracle enterprise financial systems (MIZAN, JIFMIS) for data accuracy and audit compliance.',
      'Optimized complex queries, implemented caching, and built background jobs for reporting pipelines.',
      'Traveled to Jordan for on-site client requirement gathering and technical alignment.',
    ],
    tags: ['ASP.NET Core', 'C#', 'SQL Server', 'Oracle', 'REST APIs', 'Caching', 'Dashboards'],
    accent: '#a3b87c',
  },
  {
    title: 'Telecom Gateway Platform — Didginums',
    category: 'Telecom · High-Traffic Systems',
    description:
      'A high-throughput telecom gateway platform for SMS number rental, OTP verification, and multi-provider routing. Built to handle thousands of requests per second with reliability, speed, and fault tolerance as core requirements.',
    impact: 'Built a scalable telecom system with customer-facing APIs and an operational dashboard for managing phone number pools at volume.',
    details: [
      'Designed and built gateway routing logic integrating with multiple SMS and OTP providers.',
      'Built the Didginums product for renting SMS numbers and managing phone number pools end-to-end.',
      'Developed customer-facing REST APIs and internal dashboards for telecom operations.',
      'Implemented browser automation with Selenium and Puppeteer for workflow support.',
      'Built Telegram bots using Telegraf and developed web scraping tools for data acquisition.',
    ],
    tags: ['Node.js', 'Express.js', 'React.js', 'PostgreSQL', 'MySQL', 'REST APIs', 'Selenium', 'Puppeteer', 'Telegraf', 'Telecom'],
    accent: '#c9b458',
  },
  {
    title: 'Enterprise Workflow & IAM Platform — Intalio',
    category: 'Enterprise · Workflow Automation · IAM',
    description:
      'Full-stack development on Intalio\'s enterprise workflow and identity management platform. Delivered workflow automation, case management, correspondence tracking, document management, and integration projects for enterprise and government clients.',
    impact: 'Served enterprise and government clients across Jordan, Lebanon, and the MENA region with complex workflow and identity management systems.',
    details: [
      'Built MEA-related staff and duty ticket workflow systems with complex JSON-based approval routing.',
      'Led SharePoint-to-CTS migration preserving data integrity and operational continuity.',
      'Built reactive microservices using Spring WebFlux and Kafka for event-driven communication.',
      'Containerized enterprise applications (IAM, CTS, Case Portal, Viewer, DS) using Docker and Docker Compose.',
      'Integrated AI summarizer and cognitive chatbot features into enterprise workflow platforms.',
    ],
    tags: ['ASP.NET Core', 'Angular', 'Java', 'Spring WebFlux', 'Kafka', 'Docker', 'Kubernetes', 'Keycloak', 'Oracle', 'Power BI'],
    accent: '#8b9f6e',
  },
  {
    title: 'Production Web Platforms — Born Interactive',
    category: 'Web Development · CMS · Production',
    description:
      'Supported and developed more than 10 live production websites across automotive, financial services, telecom, and corporate sectors for internationally known clients.',
    impact: 'Delivered production-grade features and ongoing maintenance across 10+ live client websites with zero downtime tolerance.',
    details: [
      'Toyota Iraq (toyota.iq) — automotive platform features, content, and backend services.',
      'Tamam KSA (tamam.life) — financial services platform development and maintenance.',
      'The Net Global and SNA Lebanon — corporate web platforms and CMS improvements.',
      'Managed CI/CD pipelines and server deployments; delivered CMS training directly to clients.',
      'Built multilingual Arabic/English content experiences using ASP.NET Core and Node.js.',
    ],
    tags: ['ASP.NET Core', 'Node.js', 'JavaScript', 'SQL Server', 'Entity Framework', 'Bootstrap', 'CI/CD', 'CMS'],
    accent: '#b8a84e',
  },
  {
    title: "Master's Thesis — Real-Time Drone Detection",
    category: 'AI Research · Computer Vision',
    description:
      'MSc thesis: Comparative Analysis of YOLOv8, YOLOv9, YOLOv11, YOLOv12, EfficientDet, and CenterNet for Real-Time Drone Detection — evaluating state-of-the-art object detection models for surveillance applications.',
    impact: 'Identified YOLOv12 as the optimal model for speed-accuracy trade-off in real-time drone surveillance at edge environments.',
    details: [
      'Trained and benchmarked YOLOv8, YOLOv9, YOLOv11, YOLOv12, EfficientDet, and CenterNet on drone detection datasets.',
      'Evaluated models on precision, recall, mAP, inference speed (FPS), model size, and speed-accuracy trade-off.',
      'Addressed detection of small, fast-moving targets against complex backgrounds under real-time constraints.',
      'Prepared full thesis documentation and defense material for LIU MSc program.',
    ],
    tags: ['Python', 'Computer Vision', 'YOLOv8–v12', 'EfficientDet', 'CenterNet', 'Deep Learning', 'Kaggle', 'Model Benchmarking'],
    accent: '#6b8b4e',
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          Projects
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
          Featured Work
        </h2>
        <p className="text-muted-foreground mb-14 max-w-xl leading-relaxed">
          Production systems delivered for enterprise clients, government entities, and SaaS platforms.
          Every project listed here was shipped and used in the real world.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group relative rounded-lg border border-border bg-muted/20 hover:bg-muted/40 hover:border-border/80 transition-all duration-200 overflow-hidden flex flex-col"
            >
              {/* Top accent line */}
              <div
                className="h-0.5 w-full"
                style={{ background: project.accent }}
                aria-hidden="true"
              />

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start gap-4 mb-3">
                  {/* 3D Project Icon */}
                  <ProjectIcon3D accent={project.accent} />
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                      {project.category}
                    </p>
                    <h3 className="text-base font-bold text-foreground leading-snug">{project.title}</h3>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Impact callout */}
                <div
                  className="rounded-md px-3 py-2 mb-4 text-xs text-muted-foreground leading-relaxed border-l-2"
                  style={{ borderColor: project.accent, background: 'var(--tag-bg)' }}
                >
                  <span className="font-semibold" style={{ color: project.accent }}>Impact: </span>
                  {project.impact}
                </div>

                {/* Details */}
                <ul className="space-y-1.5 mb-5 flex-1" aria-label="Project details">
                  {project.details.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="mt-1 w-1 h-1 rounded-full shrink-0" style={{ background: project.accent }} aria-hidden="true" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[11px] font-medium"
                      style={{ background: 'var(--tag-bg)', color: 'var(--tag-fg)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
