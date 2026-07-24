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
    role: 'Software Engineer & Consultant',
    period: 'Mar 2025 — Mar 2026',
    summary: 'Consulting and full-stack delivery for enterprise & government clients including Ministry of Justice Jordan; client requirement gathering, BI reporting, and workflow automation.',
    achievements: [
      'Strategy Management System — MOJ Jordan',
      'Client requirement gathering & on-site delivery in Jordan',
      'BI dashboards with Power BI & Apache Superset',
    ],
    tags: ['ASP.NET', 'Angular', 'Java Spring', 'Kafka', 'Power BI', 'Keycloak'],
    position: [2, 2.5, -1],
    color: '#c9b458',
  },
  {
    company: 'Aspire / SDS',
    companyFull: 'Aspire Software / SDS',
    role: 'Software Engineer & Technical Consultant',
    period: 'Mar 2026 — Present',
    current: true,
    summary: 'Consulting directly with UK real estate & property-development clients on Landval — an enterprise SaaS platform — delivering tailored SQL Server solutions, customizations, and deployments.',
    achievements: [
      'Complex T-SQL, stored procedures & query optimization',
      'Requirements gathering & tailored client customizations',
      'Multi-tenant RBAC, AWS deployment & security reviews',
    ],
    tags: ['SQL Server / T-SQL', 'ASP.NET Core', 'React', 'TypeScript', 'AWS', 'MongoDB'],
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
