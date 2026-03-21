"use client"

import { useState } from "react"
import { CallBanner } from "@/components/call-banner"
import { Header } from "@/components/header"
import { ServiceGrid } from "@/components/service-grid"
import { ServicesSection } from "@/components/services-section"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { DiagonalGallery } from "@/components/diagonal-gallery"
import { FreeQuoteModal } from "@/components/free-quote-modal"
import { JoinTeamModal } from "@/components/join-team-modal"

export default function Home() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#16213e] via-[#1a1a2e] to-[#0a0a0a] overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://stonehavenhrm.ca",
            name: "Stonehaven Property Services",
            image: "https://stonehavenhrm.ca/images/43b440f2-8e1b-4a4a-975f-85430b6b3820-removalai-preview.png",
            url: "https://stonehavenhrm.ca",
            telephone: "+1-902-789-2444",
            email: "contact@stonehavenhrm.ca",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Halifax",
              addressRegion: "NS",
              addressCountry: "CA",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 44.6488,
              longitude: -63.5752,
            },
            areaServed: {
              "@type": "GeoCircle",
              geoMidpoint: {
                "@type": "GeoCoordinates",
                latitude: 44.6488,
                longitude: -63.5752,
              },
              geoRadius: "50000",
            },
            priceRange: "$$",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "08:00",
                closes: "18:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Saturday",
                opens: "09:00",
                closes: "17:00",
              },
            ],
            sameAs: ["https://www.facebook.com/stonehavenpropertyservices", "https://www.instagram.com/stonehavenhrm"],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Property Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Snow Removal",
                    description: "Professional snow plowing and removal services",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Lawn Care",
                    description: "Complete lawn maintenance and landscaping services",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Garbage Removal",
                    description: "Waste removal and property cleanup",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Pressure Washing",
                    description: "Professional pressure washing for properties",
                  },
                },
              ],
            },
          }),
        }}
      />

      <CallBanner />
      <Header />

      <DiagonalGallery />

      <main className="container mx-auto px-2 sm:px-4 lg:px-0 py-0 overflow-x-hidden">
        <div className="border-b-2 border-border/30">
          <ServiceGrid />
        </div>

        <div className="grid lg:grid-cols-3 gap-0">
          <div className="lg:col-span-2 border-r-0 lg:border-r-2 border-border/30 lg:pr-2 pt-2">
            <ServicesSection />
          </div>
          <div className="lg:col-span-1 border-t-2 lg:border-t-0 border-border/30 px-2 sm:px-0">
            <Sidebar
              onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
              onOpenJoinModal={() => setIsJoinModalOpen(true)}
            />
          </div>
        </div>
      </main>

      <Footer />

      <FreeQuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
      <JoinTeamModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
    </div>
  )
}
