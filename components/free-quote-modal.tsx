"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { SimpleToast } from "@/components/simple-toast"
import { buildMailtoUrl } from "@/lib/email"

// GTM Data Layer helper
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

const pushDataLayer = (data: Record<string, unknown>) => {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(data)
}

interface FreeQuoteModalProps {
  isOpen: boolean
  onClose: () => void
}

export function FreeQuoteModal({ isOpen, onClose }: FreeQuoteModalProps) {
  const { t, language } = useLanguage()
  const [step, setStep] = useState<"type" | "service" | "form">("type")
  const [serviceType, setServiceType] = useState<"residential" | "commercial" | null>(null)
  const [selectedService, setSelectedService] = useState<string>("")
  const [showToast, setShowToast] = useState(false)

  const residentialServices = [t("snowRemoval"), t("lawncare"), t("garbageRemovalService"), t("pressureWashing")]
  const commercialServices = [t("snowServices"), t("grassServices")]

  const handleServiceTypeSelect = (type: "residential" | "commercial") => {
    setServiceType(type)
    setStep("service")

    // GTM Event: user selected service type
    pushDataLayer({
      event: "quote_service_type_selected",
      quote_service_type: type,
      quote_language: language,
    })
  }

  const handleServiceSelect = (service: string) => {
    setSelectedService(service)
    setStep("form")

    // GTM Event: user selected a specific service → form is now shown
    pushDataLayer({
      event: "quote_service_selected",
      quote_service_type: serviceType,
      quote_service_name: service,
      quote_language: language,
    })
  }

  const handleBack = () => {
    if (step === "form") {
      setStep("service")

      // GTM Event: user went back from form
      pushDataLayer({
        event: "quote_form_back",
        quote_step_from: "form",
        quote_step_to: "service",
      })
    } else if (step === "service") {
      setStep("type")
      setServiceType(null)

      // GTM Event: user went back from service selection
      pushDataLayer({
        event: "quote_form_back",
        quote_step_from: "service",
        quote_step_to: "type",
      })
    }
  }

  const handleClose = () => {
    // GTM Event: user dismissed the modal
    pushDataLayer({
      event: "quote_modal_closed",
      quote_step_at_close: step,
      quote_service_type: serviceType ?? "not_selected",
      quote_service_name: selectedService || "not_selected",
    })

    setStep("type")
    setServiceType(null)
    setSelectedService("")
    onClose()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const firstName = formData.get("firstName") as string
    const address = formData.get("address") as string
    const contact = formData.get("contact") as string
    const details = formData.get("details") as string

    const subjectMap: Record<string, string> = {
      en: `Quote Request - ${selectedService}`,
      fr: `Demande de soumission - ${selectedService}`,
      ar: `طلب عرض أسعار - ${selectedService}`,
      es: `Solicitud de cotización - ${selectedService}`,
      zh: `报价请求 - ${selectedService}`,
    }

    const body = `
Name: ${firstName}
Service Type: ${serviceType === "residential" ? t("residential") : t("commercial")}
Service: ${selectedService}
Address: ${address}
Contact: ${contact}

Details:
${details}
    `.trim()

    const mailtoUrl = buildMailtoUrl({
      to: "contact@stonehavenhrm.ca",
      replyTo: contact,
      subject: subjectMap[language] || subjectMap.en,
      body: body,
    })

    // GTM Event: form submitted successfully
    pushDataLayer({
      event: "quote_form_submitted",
      quote_service_type: serviceType,
      quote_service_name: selectedService,
      quote_language: language,
      quote_has_details: details.trim().length > 0,
      quote_contact_type: contact.includes("@") ? "email" : "phone",
    })

    window.open(mailtoUrl, "_blank")
    setShowToast(true)
    setTimeout(() => {
      handleClose()
    }, 2000)
  }

  // GTM Event: modal opened
  const handleModalOpen = () => {
    pushDataLayer({
      event: "quote_modal_opened",
      quote_language: language,
    })
  }

  if (!isOpen) return null

  // Fire modal opened once when it becomes visible
  if (isOpen) handleModalOpen()

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4">
        <div className="relative w-full max-w-2xl max-h-[95vh] overflow-y-auto bg-card rounded-lg shadow-xl">
          <button
            onClick={handleClose}
            className="absolute right-3 top-3 sm:right-4 sm:top-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <div className="p-4 sm:p-6">
            <div className="mb-3 sm:mb-4 text-center">
              <p className="text-sm sm:text-base text-muted-foreground mb-1">{t("callUsNow")}</p>
              
                href="tel:+19027892444"
                onClick={() =>
                  pushDataLayer({
                    event: "quote_phone_click",
                    quote_step: step,
                    quote_language: language,
                  })
                }
                className="text-xl sm:text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
              >
                902-789-2444
              </a>
            </div>

            {step === "type" && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">{t("chooseServiceType")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                  <button
                    onClick={() => handleServiceTypeSelect("residential")}
                    className="p-4 sm:p-8 border-2 border-border hover:border-primary rounded-lg transition-all hover:shadow-lg"
                  >
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{t("residential")}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{t("residentialServices")}</p>
                  </button>
                  <button
                    onClick={() => handleServiceTypeSelect("commercial")}
                    className="p-4 sm:p-8 border-2 border-border hover:border-primary rounded-lg transition-all hover:shadow-lg"
                  >
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{t("commercial")}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{t("commercialServices")}</p>
                  </button>
                </div>
              </div>
            )}

            {step === "service" && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
                  {serviceType === "residential" ? t("residentialServices") : t("commercialServices")}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {(serviceType === "residential" ? residentialServices : commercialServices).map((service) => (
                    <button
                      key={service}
                      onClick={() => handleServiceSelect(service)}
                      className="p-4 sm:p-6 border-2 border-border hover:border-primary rounded-lg transition-all hover:shadow-lg text-left"
                    >
                      <p className="font-semibold text-sm sm:text-base">{service}</p>
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleBack}
                  className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 text-sm sm:text-base border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  {t("back")}
                </button>
              </div>
            )}

            {step === "form" && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-center mb-1 sm:mb-2">{t("requestQuote")}</h2>
                <p className="text-center text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">{selectedService}</p>
                <form className="space-y-2 sm:space-y-3" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">{t("firstName")}</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      onFocus={() =>
                        pushDataLayer({
                          event: "quote_form_field_focus",
                          quote_field_name: "firstName",
                          quote_service_name: selectedService,
                        })
                      }
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t("firstName")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">{t("addressOfService")}</label>
                    <input
                      type="text"
                      name="address"
                      required
                      onFocus={() =>
                        pushDataLayer({
                          event: "quote_form_field_focus",
                          quote_field_name: "address",
                          quote_service_name: selectedService,
                        })
                      }
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t("addressOfService")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">{t("phoneOrEmail")}</label>
                    <input
                      type="text"
                      name="contact"
                      required
                      onFocus={() =>
                        pushDataLayer({
                          event: "quote_form_field_focus",
                          quote_field_name: "contact",
                          quote_service_name: selectedService,
                        })
                      }
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t("phoneOrEmail")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">{t("describeDetails")}</label>
                    <textarea
                      name="details"
                      rows={3}
                      required
                      onFocus={() =>
                        pushDataLayer({
                          event: "quote_form_field_focus",
                          quote_field_name: "details",
                          quote_service_name: selectedService,
                        })
                      }
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder={t("describeDetails")}
                    />
                  </div>
                  <div className="flex gap-3 sm:gap-4 pt-2">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-4 sm:px-6 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      {t("back")}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 sm:px-6 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                    >
                      {t("submit")}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      {showToast && (
        <SimpleToast message={t("mailSent") || "Mail sent successfully!"} onClose={() => setShowToast(false)} />
      )}
    </>
  )
}
