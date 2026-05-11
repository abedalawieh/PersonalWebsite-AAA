"use client"

import dynamic from 'next/dynamic'

const TechShowcase3D = dynamic(
  () => import('@/components/3d/tech-showcase').then((mod) => mod.TechShowcase3D),
  { ssr: false }
)

export function TechShowcaseWrapper() {
  return <TechShowcase3D />
}
