'use client'

import dynamic from 'next/dynamic'

const HeroScene = dynamic(
  () => import('@/components/3d/hero-scene').then((mod) => mod.HeroScene),
  { ssr: false }
)

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* 3D Background Scene */}
      <HeroScene />

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />
      {/* Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'var(--color-primary)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto w-full z-10">
        <div className="max-w-3xl">
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

          <p className="text-xl md:text-2xl font-medium text-primary mb-4 tracking-tight">
            Senior Software Engineer & Technical Consultant
          </p>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10 text-pretty">
            Full-stack engineer and technical consultant delivering client-facing
            implementations, customizations, and support for enterprise SaaS platforms.
            I translate business requirements into technical solutions — from SQL Server /
            T-SQL engineering and BI reporting to cloud deployment — and guide clients through
            the full project lifecycle, from implementation to post-live support.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              View Projects
            </a>
            <a
              href="#experience"
              className="px-5 py-2.5 rounded-md border border-border bg-background/80 backdrop-blur-sm text-foreground text-sm font-semibold hover:border-primary transition-colors"
            >
              Experience
            </a>
            <a
              href="mailto:abedrazakalawiyeh@gmail.com"
              className="px-5 py-2.5 rounded-md border border-border bg-background/80 backdrop-blur-sm text-foreground text-sm font-semibold hover:border-primary transition-colors"
            >
              Contact Me
            </a>
          </div>

          {/* Quick stats */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border pt-10">
            {[
              { value: '5+', label: 'Years Experience' },
              { value: '20+', label: 'Production Projects' },
              { value: 'MSc', label: 'Computer Engineering' },
            ].map((stat) => (
              <div key={stat.label} className="bg-background/60 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
        {/* Bottom fade to background */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--color-background))' }}
          aria-hidden="true"
        />
    </section>
  )
}
