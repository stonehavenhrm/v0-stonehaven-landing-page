"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function DiagonalGallery() {
  const { t } = useLanguage()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const checkScroll = () => {
    if (isMobile) {
      setShowLeftArrow(false)
      setShowRightArrow(false)
      return
    }

    const container = scrollContainerRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container
    setShowLeftArrow(scrollLeft > 10)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    checkScroll()
    container.addEventListener("scroll", checkScroll)
    window.addEventListener("resize", checkScroll)

    return () => {
      container.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [isMobile])

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = container.clientWidth * 0.8
    const targetScroll =
      direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    })
  }

  return (
    <div className="w-full relative p-4 sm:p-6 lg:p-8">
      {!isMobile && showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6 text-gray-900" />
        </button>
      )}

      {!isMobile && showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6 text-gray-900" />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        className="flex flex-col md:flex-row gap-0 w-full md:h-[70vh] md:min-h-[500px] my-0 md:overflow-x-auto md:scrollbar-hide md:scroll-smooth overflow-x-hidden"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Pattern 1 */}
        <GalleryPattern index={0} delay="delay-0">
          {/* Top Triangle - Summer Pic (cut grass) */}
          <Link href="#lawn-mowing">
            <div
              className="absolute inset-0 overflow-hidden group cursor-pointer"
              style={{
                clipPath: "polygon(0 0, 100% 0, 0 100%)",
              }}
            >
              <Image
                src="/professional-lawn-mowing-freshly-cut-green-grass-s.jpg"
                alt={t("lawnMowing")}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
            </div>
          </Link>

          {/* Bottom Triangle - Summer Pic (Trim Botes) */}
          <Link href="#hedge-trimming">
            <div
              className="absolute inset-0 overflow-hidden group cursor-pointer"
              style={{
                clipPath: "polygon(100% 100%, 0 100%, 100% 0)",
              }}
            >
              <Image
                src="/professional-landscaping-trimming-hedges-bushes-su.jpg"
                alt={t("hedgeTrimming")}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
            </div>
          </Link>
        </GalleryPattern>

        {/* Pattern 2 */}
        <GalleryPattern index={1} delay="delay-100">
          <Link href="#leaf-collection">
            <div
              className="absolute inset-0 overflow-hidden group cursor-pointer"
              style={{
                clipPath: "polygon(0 0, 100% 0, 0 100%)",
              }}
            >
              <Image
                src="/images/f866b6aa-328b-4521-95df-e75b146fb88d.jpeg"
                alt={t("leafCollection")}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
            </div>
          </Link>

          <Link href="#aeration">
            <div
              className="absolute inset-0 overflow-hidden group cursor-pointer"
              style={{
                clipPath: "polygon(100% 100%, 0 100%, 100% 0)",
              }}
            >
              <Image
                src="/lawn-aeration-service-improving-soil-health.jpg"
                alt={t("lawnAeration")}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
             
            </div>
          </Link>
        </GalleryPattern>
      </div>
    </div>
  )
}

function GalleryPattern({ children, index, delay }: { children: React.ReactNode; index: number; delay: string }) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isIntersecting && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isIntersecting, hasAnimated])

  return (
    <div
      ref={ref}
      className={`relative w-full h-[400px] md:min-w-0 md:w-full md:h-full overflow-hidden transition-all duration-700 ${delay} ${
        hasAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {children}
    </div>
  )
}
