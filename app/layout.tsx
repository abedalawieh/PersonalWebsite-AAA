import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Abed Alawieh — Senior Software Engineer',
  description:
    'Senior Full-Stack Software Engineer based in Beirut, Lebanon. Specializing in backend engineering, SaaS modernization, enterprise systems, cloud deployment, and identity management.',
  generator: 'v0.app',
  keywords: [
    'Senior Software Engineer',
    'Full-Stack Engineer',
    'Backend Engineer',
    '.NET Developer',
    'React Developer',
    'Abed Alawieh',
    'Beirut',
    'Lebanon',
    'SaaS',
    'Enterprise',
    'ASP.NET Core',
  ],
  openGraph: {
    title: 'Abed Alawieh — Senior Software Engineer',
    description:
      'Senior Full-Stack Software Engineer specializing in backend engineering, SaaS modernization, enterprise systems, and cloud deployment.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
