"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { t } = useLanguage()
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    setHasLoaded(true)
  }, [])

  return (
    <footer 
      className={`border-t border-border/40 bg-black/90 py-12 mt-16 transition-all duration-700 ${
        hasLoaded 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Stonehaven Property Services. {t("allRightsReserved")}
          </p>
          <div className="mt-4 flex justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-primary">
              {t("privacyPolicy")}
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              {t("termsOfService")}
            </a>
            
          </div>
        </div>
      </div>
    </footer>
  )
}
