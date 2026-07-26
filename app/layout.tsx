import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Patna Run Club — Run. Connect. Celebrate.',
  description: 'Patna Run Club — Run Patna, Run Strong. Join Patna\'s most energetic running community. Weekly Sunday runs at Shiv Puri Park, marathons, Zumba, and more. Only ₹149 to register!',
  keywords: 'Patna Run Club, running club Patna, marathon Patna, Sunday run Patna, fitness club Patna, Dr Shweta Singh, patnarunclub',
  openGraph: {
    title: 'Patna Run Club — Run. Connect. Celebrate.',
    description: 'Join Patna\'s most vibrant running community. Every Sunday at 6AM, Shiv Puri Park.',
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport = {
  themeColor: '#FF6B1A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
