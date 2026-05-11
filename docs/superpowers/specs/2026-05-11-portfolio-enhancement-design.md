# Portfolio Enhancement Design
**Date:** 2026-05-11  
**Project:** `portfolio-restructuring`  
**Reference:** `PersonalWebsite-AAA` (asset/content source)

---

## Scope

Enhance the new v0 portfolio (`portfolio-restructuring`) by migrating useful assets from the old version, upgrading the 3D experience roadmap to a cinematic scroll-driven design, replacing abstract 3D skill icons with real SVG tech logos, adding a profile photo to the About section, and polishing the overall visual consistency.

---

## 1. Asset Migration

Copy from `PersonalWebsite-AAA/public/` into `portfolio-restructuring/public/`:

**Profile photo:**
- `profile.jpeg` → `public/profile.jpeg`

**Tech SVG icons** → `public/svg/skills/` (only the ones relevant to the current skill set):
- react.svg, typescript.svg, javascript.svg, csharp.svg, angular.svg, java.svg, python.svg
- nodejs-icon.svg, docker.svg, aws.svg, postgresql.svg, mongodb.svg, mysql.svg
- nextJS.svg, git.svg, tailwind.svg, graphql.svg, NestJS.svg, redux.svg
- express-109.svg, selenium.svg, pptrdev-icon.svg, azure.svg, gcp.svg, figma.svg

---

## 2. About Section — Profile Photo

**Change:** Add `profile.jpeg` to the left column of the About grid, above the bio text.

**Layout (left column):**
```
[Profile photo — rounded-lg, ring-1 ring-primary/30, 180×180px]
About (label)
Engineering systems that work at scale (heading)
[Bio paragraphs]
[Location + Email strip]
```

**Right column:** Unchanged — Core Strengths list + Education & Certification.

**Image styling:** `w-44 h-44 rounded-lg object-cover object-top ring-1 ring-primary/30 mb-8`

---

## 3. Cinematic Scroll Experience Roadmap

**Concept:** Scroll-driven 3D camera flight along the career path. The section is a tall scroll container (~350vh). Inside, a sticky panel (100vh) locks in place while the user scrolls through it. Scroll progress (0→1) drives the camera position along the CatmullRom curve connecting the four role milestones.

### Architecture

**Scroll hook** (`hooks/use-scroll-progress.ts`):
- Accepts a `sectionRef: RefObject<HTMLElement>`
- Returns a `progressRef: MutableRefObject<number>` (updated via passive scroll listener, no re-render)
- Returns `activeIndex: number` (state, updates only when crossing milestone thresholds)

**Section layout** (in `experience-journey.tsx`):
```
<section id="experience" style={{ height: '350vh' }}>
  <div class="sticky top-0 h-screen overflow-hidden">
    <!-- Header HUD (top-left) -->
    <div class="absolute top-0 left-0 z-10 p-8 pointer-events-none">
      <p class="label">Career Journey</p>
      <h2>Walk Through My Experience</h2>
      <p class="scroll-hint" [fades after first milestone]>Scroll to explore ↓</p>
    </div>

    <!-- Milestone dots (right edge) -->
    <div class="absolute right-8 top-1/2 -translate-y-1/2 z-10">
      [4 vertical dots, active = bg-primary]
    </div>

    <!-- Role info card (bottom-left) -->
    <div class="absolute bottom-8 left-8 z-10 w-80 md:w-96">
      [Glassmorphism card: role, company, period, summary, tags]
      [Animates on activeIndex change with opacity+translate transition]
    </div>

    <!-- 3D Canvas (full bleed background) -->
    <Canvas class="absolute inset-0 w-full h-full" />
  </div>
</section>
```

**Camera movement** (inside `useFrame`):
```ts
const t = progressRef.current
const point = curve.getPointAt(t)
const tangent = curve.getTangentAt(Math.min(t + 0.01, 1))

// Camera: slightly above and behind the current path point
const camTarget = { x: point.x, y: point.y + 2, z: point.z + 8 }
camera.position.lerp(camTarget, 0.04)

// LookAt: forward along the path, slightly up
const lookTarget = { x: point.x + tangent.x * 5, y: point.y + tangent.y + 1, z: point.z + tangent.z * 5 }
camera.lookAt(lookTarget)
```

**Milestone thresholds:**
- Role 0 (TDNT): t ∈ [0, 0.25)
- Role 1 (Born Interactive): t ∈ [0.25, 0.5)
- Role 2 (Intalio): t ∈ [0.5, 0.75)
- Role 3 (Aspire/SDS): t ∈ [0.75, 1.0]

**Role colors (consistent with CSS vars):**
- TDNT: `#7c9a5e` (≈ olive-mid)
- Born: `#a3b87c` (≈ olive-light)
- Intalio: `#c9b458` (≈ olive-gold)
- Aspire/SDS: `#8b9f6e` (replace washed `#d4e4bc`)

**Mobile fallback:** On `md` breakpoint and below, show the existing static click-to-explore layout (section height = auto, no sticky, canvas with button navigation below).

---

## 4. Skills Section — Real SVG Logos

**Remove:** `SkillIcon3D` dynamic import and usage.

**Add — Tech marquee** (above the skill group grid):
- Two rows of SVG logos, infinite marquee animation (row 1 scrolls left, row 2 scrolls right)
- Logos: react, typescript, csharp, docker, aws, postgresql, angular, java, python, nodejs, git, mongodb, tailwind, graphql, NestJS, nextJS, redux, azure, figma, selenium
- Each logo: `w-8 h-8 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0`

**Category icon mapping** (replaces the 3D sphere):
- Backend → `/svg/skills/csharp.svg`
- Frontend → `/svg/skills/react.svg`
- Databases → `/svg/skills/postgresql.svg`
- Cloud & DevOps → `/svg/skills/docker.svg`
- Security & IAM → lucide `ShieldCheck` icon (no SVG available)
- AI & Data → `/svg/skills/python.svg`
- Testing & Automation → `/svg/skills/selenium.svg`
- Tools & Platforms → `/svg/skills/git.svg`

---

## 5. Color Consistency & Polish

### Navigation — Active Section Highlighting
Use `IntersectionObserver` to track which section is in the viewport. Nav links get `text-primary` when their target section is active (replaces always-muted style).

### Hero — Gradient Name
Apply a subtle CSS gradient to "Abed Alawieh" heading:
```css
background: linear-gradient(135deg, var(--foreground), var(--primary));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Hero — Bottom Vignette
Add a subtle radial gradient overlay at the bottom of the hero section to blend into the About section below.

### Clients Section Dots
Change `bg-border` on client list bullets to `bg-primary/40` for visual consistency with the olive palette.

### Spacing Consistency
All major sections: `py-24 px-6`. Experience section (sticky): `h-screen` for sticky panel, no extra padding. Border dividers: `border-t border-border` on all sections except About (which is visually separated by the hero).

### Typography
Section labels: `text-xs font-semibold uppercase tracking-widest text-primary` — already consistent.
Section headings: `text-3xl md:text-4xl font-bold text-foreground text-balance` — already consistent.

---

## Files Modified

| File | Change |
|------|--------|
| `public/profile.jpeg` | Add (copy from old project) |
| `public/svg/skills/*.svg` | Add ~25 tech SVGs (copy from old project) |
| `components/about.tsx` | Add profile photo above bio |
| `components/skills.tsx` | Remove SkillIcon3D; add SVG marquee + category icons |
| `components/3d/experience-journey.tsx` | Full rewrite: cinematic scroll-driven camera |
| `components/3d/experience-journey-wrapper.tsx` | Update loading state height (350vh container) |
| `hooks/use-scroll-progress.ts` | New file: scroll progress hook |
| `components/nav.tsx` | Add active section highlighting |
| `app/globals.css` | Add marquee animation keyframes |

---

## Out of Scope
- Contact form (already has mailto links; EmailJS integration is future work)
- Blog section (not in new version; out of scope)
- Dark mode toggle (theme switching infrastructure exists; not activating now)
- Project screenshot images (old project images are generic stock; not applicable to new real projects)
