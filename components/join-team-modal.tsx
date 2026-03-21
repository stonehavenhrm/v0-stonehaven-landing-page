"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { SimpleToast } from "@/components/simple-toast"
import { buildMailtoUrl } from "@/lib/email"

interface JoinTeamModalProps {
  isOpen: boolean
  onClose: () => void
}

export function JoinTeamModal({ isOpen, onClose }: JoinTeamModalProps) {
  const { t, language } = useLanguage()
  const [step, setStep] = useState<"type" | "form">("type")
  const [employmentType, setEmploymentType] = useState<string>("")
  const [selectedLanguage, setSelectedLanguage] = useState<string>("")
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const employmentTypes = [t("fullTime"), t("partTime"), t("summer"), t("winter")]

  const languageOptions = [
    { value: "en", label: t("english"), flag: "🇺🇸" },
    { value: "fr", label: t("french"), flag: "🇫🇷" },
    { value: "ar", label: t("arabic"), flag: "🇸🇦" },
    { value: "es", label: t("spanish"), flag: "🇪🇸" },
    { value: "zh", label: t("chinese"), flag: "🇨🇳" },
  ]

  const handleTypeSelect = (type: string) => {
    setEmploymentType(type)
    setStep("form")
  }

  const handleBack = () => {
    setStep("type")
    setEmploymentType("")
    setSelectedLanguage("")
    setIsLanguageDropdownOpen(false)
  }

  const handleClose = () => {
    setStep("type")
    setEmploymentType("")
    setSelectedLanguage("")
    setIsLanguageDropdownOpen(false)
    onClose()
  }

  const handleLanguageSelect = (value: string) => {
    setSelectedLanguage(value)
    setIsLanguageDropdownOpen(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const age = formData.get("age") as string
    const hasSIN = formData.get("sin") as string
    const experience = formData.get("experience") as string
    const availability = formData.get("availability") as string

    const selectedLang = languageOptions.find((l) => l.value === selectedLanguage)

    const subjectMap: Record<string, string> = {
      en: `Job Application - ${employmentType}`,
      fr: `Candidature - ${employmentType}`,
      ar: `طلب وظيفة - ${employmentType}`,
      es: `Solicitud de empleo - ${employmentType}`,
      zh: `求职申请 - ${employmentType}`,
    }

    const body = `
Name: ${name}
Email: ${email}
Age: ${age}
Employment Type: ${employmentType}
Has SIN: ${hasSIN === "yes" ? "Yes" : "No"}
Language Spoken: ${selectedLang?.label || "Not specified"}

Experience:
${experience}

Availability:
${availability}
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
        <div className="relative w-full max-w-2xl max-h-[95vh] overflow-y-auto bg-card rounded-lg shadow-xl">
          <button
            onClick={handleClose}
            className="absolute right-3 top-3 sm:right-4 sm:top-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <div className="p-4 sm:p-6 border-0">
            {step === "type" && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">{t("chooseEmploymentType")}</h2>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  {employmentTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleTypeSelect(type)}
                      className="p-3 sm:p-6 border-2 border-border hover:border-primary rounded-lg transition-all hover:shadow-lg"
                    >
                      <p className="font-semibold text-sm sm:text-lg">{type}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === "form" && (
              <div>
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4 text-center mt-4 sm:mt-6">
                  <p className="text-xs sm:text-sm font-medium">{t("payRangeBanner")}</p>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-center mb-1">{t("applicationForm")}</h2>
                <p className="text-center text-muted-foreground text-sm mb-4 sm:mb-6">{employmentType}</p>

                <form className="space-y-2 sm:space-y-3" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">{t("name")}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t("name")}
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">{t("emailPlaceholder")}</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t("emailPlaceholder")}
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">{t("age")}</label>
                    <input
                      type="text"
                      name="age"
                      required
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t("age")}
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">{t("doYouHaveSIN")}</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input type="radio" name="sin" value="yes" required className="w-4 h-4" />
                        <span>{t("yes")}</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input type="radio" name="sin" value="no" required className="w-4 h-4" />
                        <span>{t("no")}</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">{t("languageSpoken")}</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                        className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent text-left flex items-center justify-between"
                      >
                        {selectedLanguage ? (
                          <span className="flex items-center gap-2">
                            <span>{languageOptions.find((l) => l.value === selectedLanguage)?.flag}</span>
                            <span>{languageOptions.find((l) => l.value === selectedLanguage)?.label}</span>
                          </span>
                        ) : (
                          <span className="text-muted-foreground">{t("selectLanguage")}</span>
                        )}
                        <span className="text-muted-foreground">▼</span>
                      </button>
                      {isLanguageDropdownOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-lg shadow-lg max-h-40 overflow-y-auto">
                          {languageOptions.map((lang) => (
                            <button
                              key={lang.value}
                              type="button"
                              onClick={() => handleLanguageSelect(lang.value)}
                              className={`w-full px-3 sm:px-4 py-2 text-sm text-left flex items-center gap-2 hover:bg-muted transition-colors ${
                                selectedLanguage === lang.value ? "bg-primary/10" : ""
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

                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">{t("experience")}</label>
                    <textarea
                      name="experience"
                      rows={2}
                      required
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder={t("experiencePlaceholder")}
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">{t("availability")}</label>
                    <textarea
                      name="availability"
                      rows={2}
                      required
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder={t("availabilityPlaceholder")}
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
                      className="flex-1 px-4 sm:px-6 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50"
                      disabled={!selectedLanguage}
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
