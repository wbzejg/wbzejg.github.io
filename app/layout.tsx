import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SectionContainer from '@/components/SectionContainer';
import Header from '@/components/Header';
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <script async src="https://analytics.umami.is/script.js" data-website-id="0540c0a2-cf27-4994-aad4-dacfbe2004ec"></script>
      <body className={`bg-gray-200 dark:bg-gray-900 ${inter.className}`}>
        <ThemeProviders>
          <SectionContainer>
            <div className="flex h-screen flex-col justify-between font-sans">
              <Header />
              <main className="mb-auto mt-8">{children}</main>
            </div>
          </SectionContainer>
        </ThemeProviders>
      </body>
    </html>
  )
}
