"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Phone, Mail, ChevronDown, Menu } from "lucide-react"
import { Logo } from "@/components/logo"
import { useLanguage } from "@/contexts/language-context"
import { FreeQuoteModal } from "@/components/free-quote-modal"
import { JoinTeamModal } from "@/components/join-team-modal"
import { ServiceRequestModal } from "@/components/service-request-modal"

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
  const [isServiceRequestModalOpen, setIsServiceRequestModalOpen] = useState(false)
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  const [isMobileLangDropdownOpen, setIsMobileLangDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mobileDropdownRef = useRef<HTMLDivElement>(null)

  const languageOptions = [
    { code: "en" as const, label: "EN", flag: "🇨🇦" },
    { code: "fr" as const, label: "FR", flag: "🇫🇷" },
    { code: "ar" as const, label: "AR", flag: "🇸🇦" },
    { code: "es" as const, label: "ES", flag: "🇪🇸" },
    { code: "zh" as const, label: "ZH", flag: "🇨🇳" },
  ]

  const currentLanguage = languageOptions.find((lang) => lang.code === language)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false)
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
        setIsMobileLangDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <>
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-40 bg-muted">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between">
            {/* Left: Contact Links - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              <Link
                href="tel:+19027892444"
                className="flex items-center gap-2 text-sm transition-colors hover:text-primary text-foreground"
              >
                <Phone className="h-4 w-4" />
                <span>902-789-2444</span>
              </Link>
              <Link
                href="mailto:contact@stonehavenhrm.ca"
                className="flex items-center gap-2 text-sm transition-colors hover:text-primary text-foreground"
              >
                <Mail className="h-4 w-4" />
                <span>contact@stonehavenhrm.ca</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2">
              <Menu className="h-6 w-6" />
            </button>

            {/* Center: Logo */}
            <div className="md:absolute md:left-1/2 md:-translate-x-1/2">
              <Logo />
            </div>

            {/* Right: Navigation + Language Selector */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="px-3 lg:px-4 py-2 text-sm font-medium hover:text-primary transition-colors text-foreground"
              >
                {t("freeQuoteNav")}
              </button>
              <button
                onClick={() => setIsJoinModalOpen(true)}
                className="px-3 lg:px-4 py-2 text-sm font-medium hover:text-primary transition-colors text-foreground"
              >
                {t("joinTeamNav")}
              </button>
              <button
                onClick={() => setIsServiceRequestModalOpen(true)}
                className="px-3 lg:px-4 py-2 text-sm font-medium hover:text-primary transition-colors text-foreground"
              >
                {t("serviceRequest")}
              </button>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center gap-2 border border-primary/40 rounded-md px-3 py-1.5 text-sm font-medium cursor-pointer hover:bg-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary bg-[rgba(0,140,240,0.3079710421354874)]"
                >
                  <span className="text-lg">{currentLanguage?.flag}</span>
                  <span>{currentLanguage?.label}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isLangDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isLangDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-border/40 rounded-md shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {languageOptions.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code)
                          setIsLangDropdownOpen(false)
                        }}
                        className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                          language === lang.code ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="md:hidden relative" ref={mobileDropdownRef}>
              <button
                onClick={() => setIsMobileLangDropdownOpen(!isMobileLangDropdownOpen)}
                className="flex items-center gap-1 bg-primary/10 border border-primary/40 rounded-md px-2 py-1.5 text-sm font-medium"
              >
                <span className="text-base">{currentLanguage?.flag}</span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${isMobileLangDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isMobileLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-white border border-border/40 rounded-md shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setIsMobileLangDropdownOpen(false)
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
                        language === lang.code ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-border/40 space-y-3">
              <Link href="tel:+19027892444" className="flex items-center gap-2 text-sm text-card-foreground/80">
                <Phone className="h-4 w-4" />
                <span>902-789-2444</span>
              </Link>
              <Link
                href="mailto:contact@stonehavenhrm.ca"
                className="flex items-center gap-2 text-sm text-card-foreground/80"
              >
                <Mail className="h-4 w-4" />
                <span>contact@stonehavenhrm.ca</span>
              </Link>
              <button
                onClick={() => {
                  setIsQuoteModalOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className="block w-full text-left py-2 text-sm font-medium text-card-foreground"
              >
                {t("freeQuoteNav")}
              </button>
              <button
                onClick={() => {
                  setIsJoinModalOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className="block w-full text-left py-2 text-sm font-medium text-card-foreground"
              >
                {t("joinTeamNav")}
              </button>
              <button
                onClick={() => {
                  setIsServiceRequestModalOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className="block w-full text-left py-2 text-sm font-medium text-card-foreground"
              >
                {t("serviceRequest")}
              </button>
            </div>
          )}
        </div>
      </header>

      <FreeQuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
      <JoinTeamModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
      <ServiceRequestModal isOpen={isServiceRequestModalOpen} onClose={() => setIsServiceRequestModalOpen(false)} />
    </>
  )
}
