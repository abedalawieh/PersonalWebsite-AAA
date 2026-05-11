import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { ExperienceJourneyWrapper } from '@/components/3d/experience-journey-wrapper'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
import { Clients } from '@/components/clients'
import { Contact, Footer } from '@/components/contact'
import { TechShowcaseWrapper } from '@/components/3d/tech-showcase-wrapper'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <ExperienceJourneyWrapper />
        <Projects />
        <TechShowcaseWrapper />
        <Skills />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
