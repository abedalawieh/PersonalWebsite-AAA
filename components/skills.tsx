'use client'

/* eslint-disable @next/next/no-img-element */

import { ShieldCheck } from 'lucide-react'

type SkillGroup = {
  title: string
  icon: string | null
  skills: string[]
}

const groups: SkillGroup[] = [
  {
    title: 'Consulting & Client Delivery',
    icon: null,
    skills: ['Requirements Gathering', 'Client Implementation', 'Customization & Configuration', 'Technical Investigations', 'Stakeholder Communication', 'Post-Live Support', 'Project Lifecycle Delivery', 'Business-to-Technical Translation'],
  },
  {
    title: 'SQL & Database Engineering',
    icon: '/svg/skills/postgresql.svg',
    skills: ['SQL Server (T-SQL)', 'Stored Procedures', 'Functions', 'Views', 'CTEs', 'Window Functions', 'Complex Joins', 'Query Optimization', 'Performance Tuning', 'Indexing', 'Transactions', 'Schema Design', 'Data Migration', 'ETL'],
  },
  {
    title: 'Reporting & BI',
    icon: null,
    skills: ['Power BI', 'Apache Superset', 'SQL Reporting', 'Dashboards', 'Data Analysis', 'KPI Tracking'],
  },
  {
    title: 'Backend',
    icon: '/svg/skills/csharp.svg',
    skills: ['C#', 'ASP.NET Core', 'ASP.NET MVC', '.NET 8', 'Java Spring Boot', 'Spring WebFlux', 'Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'WebSockets', 'Microservices', 'Background Jobs', 'Clean Architecture', 'SOLID Principles'],
  },
  {
    title: 'Frontend',
    icon: '/svg/skills/react.svg',
    skills: ['React.js', 'Next.js', 'Angular', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Redux', 'Vite', 'jQuery', 'Bootstrap', 'Design Systems', 'Responsive UI', 'Component Libraries', 'Frontend Architecture'],
  },
  {
    title: 'Database Platforms & ORMs',
    icon: '/svg/skills/mongoDB.svg',
    skills: ['MSSQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'MongoDB Atlas', 'Oracle', 'Entity Framework', 'Dapper', 'Hibernate / JPA'],
  },
  {
    title: 'Cloud & DevOps',
    icon: '/svg/skills/docker.svg',
    skills: ['Docker', 'Docker Compose', 'Kubernetes', 'AWS S3', 'AWS EC2', 'IIS', 'Windows Server', 'GitHub Actions', 'GitLab CI/CD', 'New Relic APM', 'SSL / HTTPS', 'Environment Management', 'Deployment Automation'],
  },
  {
    title: 'Security & IAM',
    icon: null,
    skills: ['Keycloak', 'JWT', 'RBAC', 'SSO', 'MFA / TOTP', 'Active Directory', 'User Provisioning', 'OWASP ZAP', 'Semgrep', 'SAST / DAST', 'Secure API Design', 'Dependency Scanning', 'Security Headers'],
  },
  {
    title: 'AI & Data',
    icon: '/svg/skills/python.svg',
    skills: ['Python', 'Computer Vision', 'YOLOv8–v12', 'EfficientDet', 'CenterNet', 'Deep Learning', 'Model Benchmarking', 'Power BI', 'Apache Superset', 'Google Earth Engine', 'Kaggle', 'AI/ML Research'],
  },
  {
    title: 'Testing & Automation',
    icon: '/svg/skills/selenium.svg',
    skills: ['Selenium', 'Puppeteer', 'Postman', 'BDD', 'Page Object Model', 'API Testing', 'Browser Automation', 'Web Scraping', 'Manual Testing', 'Automated Testing'],
  },
  {
    title: 'Tools & Platforms',
    icon: '/svg/skills/git.svg',
    skills: ['GitHub', 'GitLab', 'Jira', 'Azure DevOps', 'VS Code', 'Kafka', 'RabbitMQ', 'gRPC', 'SharePoint', 'MongoDB Compass', 'GitHub Copilot', 'Claude Code'],
  },
]

const marqueeRow1 = [
  { name: 'React', src: '/svg/skills/react.svg' },
  { name: 'TypeScript', src: '/svg/skills/typescript.svg' },
  { name: 'C#', src: '/svg/skills/csharp.svg' },
  { name: 'Docker', src: '/svg/skills/docker.svg' },
  { name: 'AWS', src: '/svg/skills/aws.svg' },
  { name: 'PostgreSQL', src: '/svg/skills/postgresql.svg' },
  { name: 'Angular', src: '/svg/skills/angular.svg' },
  { name: 'Java', src: '/svg/skills/java.svg' },
  { name: 'Python', src: '/svg/skills/python.svg' },
  { name: 'Node.js', src: '/svg/skills/nodejs-icon.svg' },
  { name: 'Git', src: '/svg/skills/git.svg' },
  { name: 'MongoDB', src: '/svg/skills/mongoDB.svg' },
]

const marqueeRow2 = [
  { name: 'Tailwind', src: '/svg/skills/tailwind.svg' },
  { name: 'GraphQL', src: '/svg/skills/graphql.svg' },
  { name: 'NestJS', src: '/svg/skills/NestJS.svg' },
  { name: 'Next.js', src: '/svg/skills/nextJS.svg' },
  { name: 'Redux', src: '/svg/skills/redux.svg' },
  { name: 'Azure', src: '/svg/skills/azure.svg' },
  { name: 'Figma', src: '/svg/skills/figma.svg' },
  { name: 'Selenium', src: '/svg/skills/selenium.svg' },
  { name: 'MySQL', src: '/svg/skills/mysql.svg' },
  { name: 'GCP', src: '/svg/skills/gcp.svg' },
  { name: 'Express', src: '/svg/skills/express-109.svg' },
  { name: 'Puppeteer', src: '/svg/skills/pptrdev-icon.svg' },
]

function MarqueeRow({ items, reverse = false }: { items: typeof marqueeRow1; reverse?: boolean }) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden py-1">
      <div
        className={reverse ? 'animate-marquee-reverse' : 'animate-marquee'}
        style={{ display: 'flex', gap: '1.5rem', width: 'max-content' }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex flex-col items-center gap-1.5 shrink-0 group"
          >
            <div className="w-10 h-10 rounded-lg bg-muted/40 flex items-center justify-center group-hover:bg-muted/80 transition-colors">
              <img
                src={item.src}
                alt={item.name}
                width={24}
                height={24}
                className="w-6 h-6 opacity-50 group-hover:opacity-90 transition-opacity grayscale group-hover:grayscale-0 object-contain"
              />
            </div>
            <span className="text-[9px] text-muted-foreground font-medium opacity-60 group-hover:opacity-100 transition-opacity">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          Skills
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
          Technical Skills
        </h2>
        <p className="text-muted-foreground mb-12 max-w-xl leading-relaxed">
          A broad and deep technical skill set built across enterprise, SaaS, telecom, and cloud environments.
        </p>

        {/* Scrolling tech logo marquee */}
        <div className="mb-14 space-y-2 -mx-6 px-6 overflow-hidden">
          <MarqueeRow items={marqueeRow1} />
          <MarqueeRow items={marqueeRow2} reverse />
        </div>

        {/* Skill group cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {groups.map((group) => (
            <div
              key={group.title}
              className="rounded-lg border border-border bg-muted/20 p-5 hover:bg-muted/40 hover:border-border/80 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                {group.icon ? (
                  <div className="w-6 h-6 flex items-center justify-center">
                    <img
                      src={group.icon}
                      alt={group.title}
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain opacity-75"
                    />
                  </div>
                ) : (
                  <ShieldCheck className="w-5 h-5 text-primary opacity-75 shrink-0" />
                )}
                <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded text-[11px] font-medium"
                    style={{ background: 'var(--tag-bg)', color: 'var(--tag-fg)' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Security + AI highlights */}
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-border bg-muted/20 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Security & Audit
            </p>
            <h3 className="text-base font-bold text-foreground mb-3">
              Security-Aware Engineering
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              I treat security as part of the engineering process. I have used OWASP ZAP for penetration testing
              and Semgrep for static analysis, investigated SQL injection vectors and security header gaps,
              and helped prepare ISO audit evidence including backup/restore runbooks, failover drills, and
              operational documentation for MongoDB Atlas.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['OWASP ZAP', 'Semgrep', 'SAST/DAST', 'Penetration Testing', 'SQL Injection', 'Security Headers', 'CSP', 'Audit Evidence', 'MongoDB Atlas Runbooks'].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded text-[11px] font-medium" style={{ background: 'var(--tag-bg)', color: 'var(--tag-fg)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/20 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              AI Research
            </p>
            <h3 className="text-base font-bold text-foreground mb-3">
              Computer Vision & Object Detection
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              My MSc thesis benchmarked YOLOv8 through YOLOv12, EfficientDet, and CenterNet for real-time
              drone detection against complex backgrounds. Evaluated precision, recall, mAP, inference speed,
              and model size for edge/resource-constrained surveillance deployments. YOLOv12 demonstrated the
              best speed-accuracy trade-off.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['Python', 'YOLOv8–v12', 'EfficientDet', 'CenterNet', 'Object Detection', 'Model Benchmarking', 'Real-Time Inference', 'Drone Detection'].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded text-[11px] font-medium" style={{ background: 'var(--tag-bg)', color: 'var(--tag-fg)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
