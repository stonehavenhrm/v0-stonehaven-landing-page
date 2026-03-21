import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/contexts/language-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Stonehaven Property Services | Professional Landscaping & Snow Removal in Halifax",
  description:
    "Stonehaven Property Services offers expert landscaping, lawn care, snow removal, and property maintenance in Halifax, Nova Scotia. Residential & commercial services available year-round. Call 902-789-2444 for a free quote.",
  keywords: [
    "Stonehaven Property Services",
    "Halifax landscaping",
    "snow removal Halifax",
    "lawn care Nova Scotia",
    "property maintenance Halifax",
    "residential landscaping",
    "commercial snow removal",
    "lawn mowing Halifax",
    "garden maintenance",
    "pressure washing",
    "garbage removal",
  ],
  authors: [{ name: "Stonehaven Property Services" }],
  creator: "Stonehaven Property Services",
  publisher: "Stonehaven Property Services",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://stonehavenhrm.ca"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Stonehaven Property Services | Professional Landscaping & Snow Removal",
    description:
      "Expert landscaping and property maintenance services in Halifax. From lawn care and garden maintenance to snow removal and year-round property upkeep.",
    url: "https://stonehavenhrm.ca",
    siteName: "Stonehaven Property Services",
    images: [
      {
        url: "/images/43b440f2-8e1b-4a4a-975f-85430b6b3820-removalai-preview.png",
        width: 1200,
        height: 630,
        alt: "Stonehaven Property Services - Professional Landscaping",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stonehaven Property Services | Professional Landscaping & Snow Removal",
    description: "Expert landscaping and property maintenance services in Halifax. From lawn care to snow removal.",
    images: ["/images/43b440f2-8e1b-4a4a-975f-85430b6b3820-removalai-preview.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
