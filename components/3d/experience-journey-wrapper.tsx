'use client'

import dynamic from 'next/dynamic'

const ExperienceJourney = dynamic(
  () => import('@/components/3d/experience-journey').then((mod) => mod.ExperienceJourney),
  { 
    ssr: false,
    loading: () => (
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Career Journey
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-6">
            Walk Through My Experience
          </h2>
          <div className="min-h-screen rounded-xl border border-border bg-muted/20 flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground text-sm">Loading 3D experience...</div>
          </div>
        </div>
      </section>
    )
  }
)

export function ExperienceJourneyWrapper() {
  return <ExperienceJourney />
}
