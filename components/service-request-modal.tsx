"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { SimpleToast } from "@/components/simple-toast"
import { buildMailtoUrl } from "@/lib/email"

interface ServiceRequestModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ServiceRequestModal({ isOpen, onClose }: ServiceRequestModalProps) {
  const { t, language } = useLanguage()
  const [showToast, setShowToast] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedService, setSelectedService] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const services = [
    { value: "snow_removal", label: t("snowRemoval") },
    { value: "lawncare", label: t("lawncare") },
    { value: "garbage_removal", label: t("garbageRemovalService") },
    { value: "pressure_washing", label: t("pressureWashing") },
    { value: "hedge_trimming", label: t("hedgeTrimming") },
    { value: "leaf_collection", label: t("leafCollection") },
    { value: "lawn_aeration", label: t("lawnAeration") },
    { value: "garden_mulching", label: t("gardenMulching") },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleClose = () => {
    setSelectedService("")
    onClose()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const address = formData.get("address") as string
    const details = formData.get("details") as string

    const selectedServiceLabel = services.find((s) => s.value === selectedService)?.label || selectedService

    const subjectMap: Record<string, string> = {
      en: `Service Request - ${selectedServiceLabel}`,
      fr: `Demande de service - ${selectedServiceLabel}`,
      ar: `طلب خدمة - ${selectedServiceLabel}`,
      es: `Solicitud de servicio - ${selectedServiceLabel}`,
      zh: `服务请求 - ${selectedServiceLabel}`,
    }

    const body = `
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Service: ${selectedServiceLabel}
Address: ${address}

Details:
${details}
    `.trim()

    const mailtoUrl = buildMailtoUrl({
      to: "contact@stonehavenhrm.ca",
      replyTo: email,
      subject: subjectMap[language] || subjectMap.en,
      body: body,
    })

    window.open(mailtoUrl, "_blank")
    setShowToast(true)
    setTimeout(() => {
      handleClose()
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4">
        <div className="relative w-full max-w-lg max-h-[95vh] overflow-y-auto bg-card rounded-lg shadow-xl">
          <button
            onClick={handleClose}
            className="absolute right-3 top-3 sm:right-4 sm:top-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">{t("serviceRequest")}</h2>

            <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">{t("firstName")}</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={t("firstName")}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">{t("lastName")}</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={t("lastName")}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">{t("emailPlaceholder")}</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t("emailPlaceholder")}
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">{t("phonePlaceholder")}</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t("phonePlaceholder")}
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">{t("selectService")}</label>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <span className={selectedService ? "text-foreground" : "text-muted-foreground"}>
                      {selectedService
                        ? services.find((s) => s.value === selectedService)?.label
                        : t("selectServicePlaceholder")}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-40 overflow-y-auto">
                      {services.map((service) => (
                        <button
                          key={service.value}
                          type="button"
                          onClick={() => {
                            setSelectedService(service.value)
                            setIsDropdownOpen(false)
                          }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-primary/10 transition-colors ${
                            selectedService === service.value ? "bg-primary/10 text-primary" : ""
                          }`}
                        >
                          {service.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">{t("addressOfService")}</label>
                <input
                  type="text"
                  name="address"
                  required
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={t("addressOfService")}
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">{t("describeDetails")}</label>
                <textarea
                  name="details"
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder={t("describeDetails")}
                />
              </div>

              <button
                type="submit"
                disabled={!selectedService}
                className="w-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("submit")}
              </button>
            </form>
          </div>
        </div>
      </div>
      {showToast && (
        <SimpleToast message={t("mailSent") || "Mail sent successfully!"} onClose={() => setShowToast(false)} />
      )}
    </>
  )
}
