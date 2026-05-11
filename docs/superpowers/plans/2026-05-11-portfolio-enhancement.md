# Portfolio Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance `portfolio-restructuring` with a profile photo, real SVG tech logos, a cinematic scroll-driven 3D experience roadmap, active-section nav highlighting, and visual polish across all sections.

**Architecture:** Each task touches a single file or a small set of related files. The 3D experience section is the most complex change — the existing `experience-journey.tsx` is fully rewritten to support a 350vh scroll container with a sticky viewport-height panel driven by scroll progress. All other changes are additive or targeted edits.

**Tech Stack:** Next.js 16, React 19, TypeScript, Three.js + React Three Fiber, Tailwind CSS 4.2, shadcn/ui, lucide-react

**Source of assets:** `C:\Abed\personalSite\PersonalWebsite-AAA\public\`

---

## File Map

| File | Action |
|------|--------|
| `public/profile.jpeg` | Copy from old project |
| `public/svg/skills/*.svg` | Copy ~26 SVGs from old project |
| `app/globals.css` | Add keyframe animations (marquee, card entry) |
| `components/about.tsx` | Add profile photo above bio text |
| `components/skills.tsx` | Full rewrite: marquee + SVG category icons |
| `components/3d/experience-journey.tsx` | Full rewrite: cinematic scroll-driven camera |
| `components/3d/experience-journey-wrapper.tsx` | Update loading placeholder |
| `components/nav.tsx` | Add IntersectionObserver active-section tracking |
| `components/hero.tsx` | Gradient name text + bottom vignette |
| `components/clients.tsx` | Update bullet dot color |

---

## Task 1: Copy Assets from Old Project

**Files:**
- Create: `public/profile.jpeg`
- Create: `public/svg/skills/` (directory + 26 SVG files)

- [ ] **Step 1: Copy profile photo**

Run in PowerShell (from the repo root `C:\Abed\personalSite\portfolio-restructuring`):
```powershell
Copy-Item "C:\Abed\personalSite\PersonalWebsite-AAA\public\profile.jpeg" "C:\Abed\personalSite\portfolio-restructuring\public\profile.jpeg"
```

- [ ] **Step 2: Create the skills SVG directory**

```powershell
New-Item -ItemType Directory -Force -Path "C:\Abed\personalSite\portfolio-restructuring\public\svg\skills"
```

- [ ] **Step 3: Copy the relevant skill SVGs**

```powershell
$src = "C:\Abed\personalSite\PersonalWebsite-AAA\public\svg\skills"
$dst = "C:\Abed\personalSite\portfolio-restructuring\public\svg\skills"

$files = @(
  "react.svg", "typescript.svg", "javascript.svg", "csharp.svg",
  "angular.svg", "java.svg", "python.svg", "nodejs-icon.svg",
  "docker.svg", "aws.svg", "postgresql.svg", "mongodb.svg",
  "mysql.svg", "nextJS.svg", "git.svg", "tailwind.svg",
  "graphql.svg", "NestJS.svg", "redux.svg", "express-109.svg",
  "selenium.svg", "pptrdev-icon.svg", "azure.svg", "gcp.svg",
  "figma.svg", "angular-icon.svg"
)

foreach ($f in $files) {
  Copy-Item "$src\$f" "$dst\$f" -ErrorAction SilentlyContinue
}
```

- [ ] **Step 4: Verify copy**

```powershell
(Get-ChildItem "C:\Abed\personalSite\portfolio-restructuring\public\svg\skills").Count
# Expected: 26 (or close, some may not exist in source)

Test-Path "C:\Abed\personalSite\portfolio-restructuring\public\profile.jpeg"
# Expected: True
```

---

## Task 2: Add CSS Animations to globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add keyframes at the end of `app/globals.css`**

Append this block after the existing `@layer base { ... }` block:

```css
/* Marquee animations for skills section */
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes marquee-reverse {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}

/* Experience card entry animation */
@keyframes experienceCardIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-marquee {
  animation: marquee 35s linear infinite;
}
.animate-marquee-reverse {
  animation: marquee-reverse 35s linear infinite;
}
```

---

## Task 3: Add Profile Photo to About Section

**Files:**
- Modify: `components/about.tsx`

The current left column starts with `<p className="text-xs ...">About</p>`. Add the profile photo above it.

- [ ] **Step 1: Add `import Image from 'next/image'` at the top of `about.tsx`**

The file currently has no imports. Add this as the first line:
```tsx
import Image from 'next/image'
```

- [ ] **Step 2: Add the photo block above the About label in the left column**

Find the left column div. It currently starts with:
```tsx
<div>
  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
    About
  </p>
```

Replace that opening with:
```tsx
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
```

---

## Task 4: Rewrite Skills Section with SVG Marquee

**Files:**
- Modify: `components/skills.tsx` (full rewrite)

- [ ] **Step 1: Replace `components/skills.tsx` with the following**

```tsx
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
    title: 'Databases',
    icon: '/svg/skills/postgresql.svg',
    skills: ['SQL Server / MSSQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'MongoDB Atlas', 'Oracle', 'Entity Framework', 'Dapper', 'Hibernate / JPA', 'Query Optimization', 'Stored Procedures', 'Database Design'],
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
```

---

## Task 5: Rewrite Experience Journey — Cinematic Scroll

**Files:**
- Modify: `components/3d/experience-journey.tsx` (full rewrite)

- [ ] **Step 1: Replace the entire file with the following**

```tsx
'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  MeshDistortMaterial,
  Line,
  Sphere,
  Box,
  Octahedron,
  Dodecahedron,
} from '@react-three/drei'
import * as THREE from 'three'
import { useIsMobile } from '@/hooks/use-mobile'

// ─── Data ────────────────────────────────────────────────────────────────────

type Role = {
  company: string
  companyFull: string
  role: string
  period: string
  current?: boolean
  summary: string
  achievements: string[]
  tags: string[]
  position: [number, number, number]
  color: string
}

const roles: Role[] = [
  {
    company: 'TDNT',
    companyFull: 'Triplet Data Networks',
    role: 'Software Engineer',
    period: 'Oct 2022 — May 2024',
    summary: 'Designed telecom gateway systems handling thousands of requests per second for SMS, OTP, and number pool operations.',
    achievements: [
      'Built Didginums — SMS number rental platform',
      'Developed customer-facing REST APIs',
      'Implemented browser automation with Selenium/Puppeteer',
    ],
    tags: ['Node.js', 'React', 'PostgreSQL', 'Telecom'],
    position: [-6, -2, 0],
    color: '#7c9a5e',
  },
  {
    company: 'Born Interactive',
    companyFull: 'Born Interactive',
    role: 'Software Engineer',
    period: 'May 2024 — Mar 2025',
    summary: 'Developed 10+ production web projects across automotive, finance, and telecom sectors.',
    achievements: [
      'Toyota Iraq, Tamam KSA, SNA Lebanon',
      'Full-stack ASP.NET Core & Node.js',
      'CI/CD pipelines and CMS training',
    ],
    tags: ['ASP.NET', 'Node.js', 'SQL Server'],
    position: [-2, 1, -2],
    color: '#a3b87c',
  },
  {
    company: 'Intalio',
    companyFull: 'Intalio',
    role: 'Software Engineer',
    period: 'Mar 2025 — Mar 2026',
    summary: 'Enterprise workflow automation for government clients including Ministry of Justice Jordan.',
    achievements: [
      'Strategy Management System — MOJ Jordan',
      'Reactive microservices with Spring WebFlux',
      'Led team training across 4 countries',
    ],
    tags: ['Java Spring', 'Kafka', 'Docker', 'Keycloak'],
    position: [2, 2.5, -1],
    color: '#c9b458',
  },
  {
    company: 'Aspire / SDS',
    companyFull: 'Aspire Software / SDS',
    role: 'Senior Software Engineer',
    period: 'Mar 2026 — Present',
    current: true,
    summary: 'Leading frontend modernization of Landval — enterprise SaaS for UK real estate appraisal.',
    achievements: [
      'React/TypeScript architecture migration',
      'Multi-tenant RBAC system',
      'Security audits & penetration testing',
    ],
    tags: ['React', 'TypeScript', 'AWS', 'MongoDB'],
    position: [6, 4, 0],
    color: '#8b9f6e',
  },
]

// ─── 3D Primitives ────────────────────────────────────────────────────────────

function MilestoneMarker({
  position,
  color,
  isActive,
  onClick,
  index,
}: {
  position: [number, number, number]
  color: string
  isActive: boolean
  onClick?: () => void
  index: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      const scale = isActive ? 1.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1 : 1
      meshRef.current.scale.setScalar(scale)
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(isActive ? 2.5 : 1.8)
    }
  })

  const Shape = index === 0 ? Box : index === 1 ? Octahedron : index === 2 ? Dodecahedron : Sphere

  return (
    <group position={position}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sphere ref={glowRef} args={[0.6, 16, 16]}>
          <meshBasicMaterial color={color} transparent opacity={isActive ? 0.25 : 0.1} />
        </Sphere>
        <Shape
          ref={meshRef}
          args={index === 0 ? [0.5, 0.5, 0.5] : [0.5, 0]}
          onClick={onClick}
        >
          <MeshDistortMaterial
            color={color}
            distort={isActive ? 0.3 : 0.15}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            emissive={color}
            emissiveIntensity={isActive ? 0.4 : 0.15}
          />
        </Shape>
      </Float>
    </group>
  )
}

function CareerPath({ points }: { points: [number, number, number][] }) {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)))
  }, [points])
  const linePoints = useMemo(() => curve.getPoints(100), [curve])
  return (
    <>
      <Line points={linePoints} color="#7c9a5e" lineWidth={3} transparent opacity={0.6} />
      <Line points={linePoints} color="#a3b87c" lineWidth={1} transparent opacity={0.3} />
    </>
  )
}

function WalkingParticles({ points }: { points: [number, number, number][] }) {
  const count = 8
  const groupRef = useRef<THREE.Group>(null)
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)))
  }, [points])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.children.forEach((child, i) => {
      const t = (state.clock.elapsedTime * 0.08 + i / count) % 1
      const pt = curve.getPoint(t)
      child.position.copy(pt)
      child.scale.setScalar(0.08 + Math.sin(t * Math.PI) * 0.04)
    })
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => (
        <Sphere key={i} args={[1, 8, 8]}>
          <meshBasicMaterial color="#c9b458" transparent opacity={0.8} />
        </Sphere>
      ))}
    </group>
  )
}

function BackgroundParticles() {
  const count = 150
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5
    }
    return pos
  }, [])
  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#7c9a5e" transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

// ─── Desktop: scroll-driven camera ───────────────────────────────────────────

function ScrollCamera({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(roles.map((r) => new THREE.Vector3(...r.position)))
  }, [])
  const camPos = useRef(new THREE.Vector3(0, 2, 12))
  const lookTarget = useRef(new THREE.Vector3(0, 1, 0))

  useFrame(({ camera }) => {
    const t = Math.max(0.001, Math.min(0.999, progressRef.current))
    const pt = curve.getPointAt(t)
    camPos.current.lerp(new THREE.Vector3(pt.x * 0.4, pt.y * 0.35 + 2.5, 12), 0.04)
    camera.position.copy(camPos.current)
    lookTarget.current.lerp(new THREE.Vector3(pt.x * 0.6, pt.y * 0.4 + 0.5, 0), 0.04)
    camera.lookAt(lookTarget.current)
  })

  return null
}

function DesktopScene({
  progressRef,
  activeIndex,
}: {
  progressRef: React.MutableRefObject<number>
  activeIndex: number
}) {
  const pathPoints = roles.map((r) => r.position) as [number, number, number][]
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#a3b87c" />
      <pointLight position={[-10, 5, -10]} intensity={0.4} color="#c9b458" />
      <pointLight position={[0, -5, 5]} intensity={0.3} color="#7c9a5e" />
      <ScrollCamera progressRef={progressRef} />
      <BackgroundParticles />
      <CareerPath points={pathPoints} />
      <WalkingParticles points={pathPoints} />
      {roles.map((role, i) => (
        <MilestoneMarker
          key={role.company}
          position={role.position}
          color={role.color}
          isActive={activeIndex === i}
          index={i}
        />
      ))}
    </>
  )
}

// ─── Mobile: click-driven scene ──────────────────────────────────────────────

function MobileScene({
  activeIndex,
  setActiveIndex,
}: {
  activeIndex: number
  setActiveIndex: (i: number) => void
}) {
  const pathPoints = roles.map((r) => r.position) as [number, number, number][]
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#a3b87c" />
      <pointLight position={[-10, 5, -10]} intensity={0.4} color="#c9b458" />
      <pointLight position={[0, -5, 5]} intensity={0.3} color="#7c9a5e" />
      <BackgroundParticles />
      <CareerPath points={pathPoints} />
      <WalkingParticles points={pathPoints} />
      {roles.map((role, i) => (
        <MilestoneMarker
          key={role.company}
          position={role.position}
          color={role.color}
          isActive={activeIndex === i}
          onClick={() => setActiveIndex(i)}
          index={i}
        />
      ))}
    </>
  )
}

// ─── Role Info Card ───────────────────────────────────────────────────────────

function RoleCard({ role }: { role: Role }) {
  return (
    <div
      className="bg-card/95 backdrop-blur-md border rounded-xl p-5 shadow-2xl"
      style={{
        borderColor: `${role.color}50`,
        animation: 'experienceCardIn 0.35s ease-out',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: role.color }} />
        <span className="text-xs font-mono text-muted-foreground">{role.period}</span>
        {role.current && (
          <span
            className="text-[10px] font-semibold uppercase tracking-widest ml-auto"
            style={{ color: role.color }}
          >
            Current
          </span>
        )}
      </div>
      <h3 className="text-base font-bold text-foreground mb-0.5">{role.role}</h3>
      <p className="text-sm font-medium mb-2" style={{ color: role.color }}>
        {role.companyFull}
      </p>
      <p className="text-xs text-muted-foreground leading-relaxed mb-3">{role.summary}</p>
      <ul className="space-y-1 mb-3">
        {role.achievements.map((ach) => (
          <li key={ach} className="flex items-start gap-2 text-xs text-muted-foreground">
            <span
              className="mt-1 w-1 h-1 rounded-full shrink-0"
              style={{ backgroundColor: role.color }}
            />
            {ach}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1">
        {role.tags.map((tag) => (
          <span
            key={tag}
            className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-secondary text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export function ExperienceJourney() {
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [mobileIndex, setMobileIndex] = useState(3)

  useEffect(() => {
    if (isMobile) return

    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const scrollable = section.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable))
      progressRef.current = progress
      const idx = Math.min(3, Math.floor(progress * 4))
      setActiveIndex((prev) => (prev !== idx ? idx : prev))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  // ── Mobile layout ──
  if (isMobile) {
    return (
      <section id="experience" className="py-16 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Career Journey
          </p>
          <h2 className="text-3xl font-bold text-foreground text-balance mb-6">My Experience</h2>
          <div className="flex flex-wrap gap-2 mb-5">
            {roles.map((role, i) => (
              <button
                key={role.company}
                onClick={() => setMobileIndex(i)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                  mobileIndex === i
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-secondary'
                }`}
              >
                {role.company}
              </button>
            ))}
          </div>
          <div className="h-[380px] rounded-xl border border-border overflow-hidden bg-background/50 mb-5">
            <Canvas
              camera={{ position: [0, 2, 12], fov: 50 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
            >
              <MobileScene activeIndex={mobileIndex} setActiveIndex={setMobileIndex} />
            </Canvas>
          </div>
          <RoleCard role={roles[mobileIndex]} />
        </div>
      </section>
    )
  }

  // ── Desktop: cinematic scroll ──
  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative border-t border-border"
      style={{ height: '350vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background fill */}
        <div className="absolute inset-0 bg-background" />

        {/* Header HUD */}
        <div className="absolute top-8 left-8 z-10 pointer-events-none max-w-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Career Journey
          </p>
          <h2 className="text-2xl font-bold text-foreground">Walk Through My Experience</h2>
          <p
            className="text-sm text-muted-foreground mt-2 transition-opacity duration-700"
            style={{ opacity: activeIndex === 0 ? 0.6 : 0 }}
          >
            Scroll to explore ↓
          </p>
        </div>

        {/* Milestone progress dots (right edge) */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4 items-end">
          {roles.map((role, i) => (
            <div key={role.company} className="flex items-center gap-2">
              <span
                className="text-[10px] font-mono transition-all duration-300"
                style={{
                  opacity: i === activeIndex ? 1 : 0,
                  color: i === activeIndex ? role.color : 'var(--color-muted-foreground)',
                }}
              >
                {role.company}
              </span>
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? '10px' : '6px',
                  height: i === activeIndex ? '10px' : '6px',
                  backgroundColor: i === activeIndex ? role.color : 'var(--color-border)',
                }}
              />
            </div>
          ))}
        </div>

        {/* Role info card (bottom-left) */}
        <div className="absolute bottom-8 left-8 z-10 w-72 md:w-80 xl:w-96">
          <RoleCard key={activeIndex} role={roles[activeIndex]} />
        </div>

        {/* 3D canvas */}
        <Canvas
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          camera={{ position: [0, 2, 12], fov: 50 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <DesktopScene progressRef={progressRef} activeIndex={activeIndex} />
        </Canvas>
      </div>
    </section>
  )
}
```

---

## Task 6: Update Experience Journey Wrapper

**Files:**
- Modify: `components/3d/experience-journey-wrapper.tsx`

The loading placeholder needs to match the desktop section height (or at least be taller). On desktop, the section is 350vh, but the loading state is client-only and brief, so a `min-h-screen` skeleton is enough.

- [ ] **Step 1: Replace the loading placeholder div**

Find:
```tsx
<div className="h-[500px] md:h-[600px] rounded-xl border border-border bg-muted/20 flex items-center justify-center">
  <div className="animate-pulse text-muted-foreground">Loading 3D experience...</div>
</div>
```

Replace with:
```tsx
<div className="min-h-screen rounded-xl border border-border bg-muted/20 flex items-center justify-center">
  <div className="animate-pulse text-muted-foreground text-sm">Loading 3D experience...</div>
</div>
```

---

## Task 7: Add Active Section Highlighting to Nav

**Files:**
- Modify: `components/nav.tsx`

- [ ] **Step 1: Add `activeSection` state and IntersectionObserver**

Add `activeSection` state and observer inside the `Nav` component. Place the observer `useEffect` after the scroll `useEffect`:

```tsx
const [activeSection, setActiveSection] = useState('')

useEffect(() => {
  const ids = ['about', 'experience', 'projects', 'skills', 'contact']
  const observers = ids.map((id) => {
    const el = document.getElementById(id)
    if (!el) return null
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveSection(id)
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )
    obs.observe(el)
    return obs
  })
  return () => observers.forEach((obs) => obs?.disconnect())
}, [])
```

- [ ] **Step 2: Update the desktop nav link className**

Find the desktop nav link:
```tsx
className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase"
```

Replace with:
```tsx
className={`text-xs font-medium transition-colors tracking-wide uppercase ${
  activeSection === link.href.replace('#', '')
    ? 'text-primary'
    : 'text-muted-foreground hover:text-foreground'
}`}
```

---

## Task 8: Polish Hero Section

**Files:**
- Modify: `components/hero.tsx`

- [ ] **Step 1: Apply gradient to the name heading**

Find:
```tsx
<h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance leading-[1.1] mb-6">
  <span className="text-foreground">Abed</span>
  <br />
  <span className="text-foreground">Alawieh</span>
</h1>
```

Replace with:
```tsx
<h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance leading-[1.1] mb-6">
  <span
    style={{
      background: 'linear-gradient(135deg, var(--color-foreground) 0%, var(--color-primary) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }}
  >
    Abed
  </span>
  <br />
  <span
    style={{
      background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }}
  >
    Alawieh
  </span>
</h1>
```

- [ ] **Step 2: Add bottom vignette to blend into the About section**

Find the closing `</section>` tag of the hero. Before it, add:
```tsx
{/* Bottom fade to background */}
<div
  className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
  style={{ background: 'linear-gradient(to bottom, transparent, var(--color-background))' }}
  aria-hidden="true"
/>
```

---

## Task 9: Polish Clients Section Bullet Dots

**Files:**
- Modify: `components/clients.tsx`

- [ ] **Step 1: Update bullet dot color in client list items**

Find (replace_all):
```tsx
className="mt-1.5 w-1 h-1 rounded-full bg-border shrink-0"
```

Replace with:
```tsx
className="mt-1.5 w-1 h-1 rounded-full bg-primary/40 shrink-0"
```

---

## Task 10: Visual Verification

- [ ] **Step 1: Install dependencies (if needed) and start dev server**

```powershell
cd "C:\Abed\personalSite\portfolio-restructuring"
npm run dev
```

- [ ] **Step 2: Open browser at `http://localhost:3000` and verify**

Check each section:
- **Hero:** Name shows olive→gold gradient. Bottom fades smoothly.
- **About:** Profile photo appears above bio text (left column), right column unchanged.
- **Experience (desktop):** Section is tall (350vh). As you scroll, the 3D camera glides along the career path. Bottom-left card updates per role. Right dots highlight the current milestone. Scroll hint fades after first role.
- **Experience (mobile, <768px):** Compact layout with nav buttons, 380px canvas, click-driven, detail card below.
- **Skills:** Two rows of animated tech logos scroll in opposite directions. Category icons show SVG logos. Skill badges unchanged.
- **Clients:** Bullet dots are now olive-tinted instead of gray border.
- **Nav:** As you scroll into each section, the corresponding nav link turns olive/primary color.

---

## Self-Review

**Spec coverage:**
- ✅ Profile photo in About section (Task 3)
- ✅ SVG skill icons copied + marquee (Tasks 1, 4)
- ✅ Cinematic scroll experience roadmap (Tasks 5, 6)
- ✅ Color consistency — clients dots, hero gradient (Tasks 8, 9)
- ✅ Nav active highlighting (Task 7)
- ✅ CSS animations foundation (Task 2)

**Placeholder scan:** No TBDs or incomplete sections.

**Type consistency:**
- `Role` type defined once in `experience-journey.tsx`, used by `RoleCard`, `DesktopScene`, `MobileScene` — all consistent.
- `SkillGroup.icon` is `string | null` — handled with conditional render in Task 4.
- `progressRef` is `React.MutableRefObject<number>` — passed to `ScrollCamera` and `DesktopScene` consistently.
- `MilestoneMarker.onClick` is `(() => void) | undefined` — optional, safe for both desktop (no click) and mobile (click) usage.
