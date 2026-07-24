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
  title: 'Abed Alawieh — Senior Software Engineer & Technical Consultant',
  description:
    'Senior Software Engineer and Technical Consultant based in Beirut, Lebanon. Client-facing implementations and customizations for enterprise SaaS platforms, SQL Server / T-SQL engineering, BI reporting, cloud deployment, and identity management.',
  generator: 'v0.app',
  keywords: [
    'Senior Software Engineer',
    'Technical Consultant',
    'Full-Stack Engineer',
    'SQL Server Developer',
    'T-SQL',
    'Enterprise SaaS',
    '.NET Developer',
    'React Developer',
    'Power BI',
    'Abed Alawieh',
    'Beirut',
    'Lebanon',
    'ASP.NET Core',
  ],
  openGraph: {
    title: 'Abed Alawieh — Senior Software Engineer & Technical Consultant',
    description:
      'Senior Software Engineer and Technical Consultant delivering client-facing implementations, SQL Server / T-SQL solutions, BI reporting, and enterprise SaaS customizations.',
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
