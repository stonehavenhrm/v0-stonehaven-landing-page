"use client"

import { Phone } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function CallBanner() {
  const { t } = useLanguage()

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-2">
        <a
          href="tel:+19027892444"
          className="flex items-center justify-center gap-2 text-sm md:text-base font-medium hover:opacity-90 transition-opacity"
        >
          <Phone className="h-4 w-4" />
          <span>
            {t("callUsNow")} <span className="font-bold">902-789-2444</span>
          </span>
        </a>
      </div>
    </div>
  )
}
