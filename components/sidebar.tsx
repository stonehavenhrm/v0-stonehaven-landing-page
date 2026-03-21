"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Quote, MessageSquare, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { useState } from "react"
import { SimpleToast } from "@/components/simple-toast"
import { buildMailtoUrl } from "@/lib/email"

interface SidebarProps {
  onOpenQuoteModal: () => void
  onOpenJoinModal: () => void
}

export function Sidebar({ onOpenQuoteModal, onOpenJoinModal }: SidebarProps) {
  const { t, language } = useLanguage()
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })
  const [showToast, setShowToast] = useState(false)

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const message = formData.get("message") as string

    const subjectMap: Record<string, string> = {
      en: `Contact from ${name}`,
      fr: `Message de ${name}`,
      ar: `رسالة من ${name}`,
      es: `Mensaje de ${name}`,
      zh: `来自 ${name} 的消息`,
    }

    const body = `
Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
    `.trim()

    const mailtoUrl = buildMailtoUrl({
      to: "contact@stonehavenhrm.ca",
      replyTo: email,
      subject: subjectMap[language] || subjectMap.en,
      body: body,
    })

    window.open(mailtoUrl, "_blank")
    setShowToast(true)
    form.reset()
  }

  return (
    <>
      <div
        ref={ref}
        className={`space-y-0 transition-all duration-700 delay-100 mt-2 overflow-hidden ${
          isIntersecting ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
        }`}
      >
        {/* Free Quote Section */}
        <div className="border-primary/60 bg-primary/10 p-4 sm:p-6 border-2 my-0 mb-2 rounded-lg">
          <div className="mb-4 flex items-center gap-2">
            <Quote className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-bold text-primary">{t("freeQuote")}</h3>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">{t("freeQuoteDesc")}</p>
          <Button onClick={onOpenQuoteModal} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            {t("requestFreeQuote")}
          </Button>
        </div>

        {/* Contact Us Section */}
        <div className="border border-border/40 bg-muted/50 p-4 sm:p-6 mb-2 rounded-lg">
          <div className="mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h3 className="text-lg sm:text-xl font-bold text-card-foreground">{t("contactUs")}</h3>
          </div>
          <form className="space-y-3 sm:space-y-4" onSubmit={handleContactSubmit}>
            <Input name="name" placeholder={t("name")} className="bg-background text-foreground" required />
            <Input
              name="email"
              type="email"
              placeholder={t("emailPlaceholder")}
              className="bg-background text-foreground"
              required
            />
            <Input
              name="phone"
              type="tel"
              placeholder={t("phonePlaceholder")}
              className="bg-background text-foreground"
              required
            />
            <Textarea
              name="message"
              placeholder={t("message")}
              rows={4}
              className="bg-background text-foreground"
              required
            />
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              {t("sendMessage")}
            </Button>
          </form>
        </div>

        {/* Join The Team Section */}
        <div className="border border-border/40 p-4 sm:p-6 bg-primary-foreground rounded-lg">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="text-lg sm:text-xl font-bold text-primary">{t("joinTheTeam")}</h3>
          </div>
          <p className="mb-4 text-sm text-muted">{t("joinTeamDesc")}</p>
          <Button
            onClick={onOpenJoinModal}
            variant="outline"
            className="w-full border-primary/40 text-card-foreground bg-chart-5/80 hover:bg-chart-5"
          >
            {t("viewOpportunities")}
          </Button>
        </div>
      </div>

      {showToast && (
        <SimpleToast message={t("mailSent") || "Mail sent successfully!"} onClose={() => setShowToast(false)} />
      )}
    </>
  )
}
