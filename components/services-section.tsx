"use client"

import { useLanguage } from "@/contexts/language-context"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export function ServicesSection() {
  const { t } = useLanguage()
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <div 
      ref={ref}
      className={`border-primary/30 p-4 sm:p-6 lg:p-8 border-0 min-h-[600px] flex flex-col transition-all duration-700 overflow-hidden rounded-lg bg-[rgba(52,59,69,1)] ${
        isIntersecting 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 -translate-x-12'
      }`}
    >
      <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold text-primary">{t("ourServices")}</h2>
      <div className="space-y-4 sm:space-y-6 text-card-foreground flex-1">
        <p className="text-pretty leading-relaxed text-base sm:text-lg text-card-foreground">
          {t("servicesIntro1")}
        </p>
        <p className="text-pretty leading-relaxed text-base sm:text-lg text-card-foreground">
          {t("servicesIntro2")}
        </p>
        <p className="text-pretty leading-relaxed text-base sm:text-lg text-card-foreground">
          {t("servicesIntro3")}
        </p>
        
        <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 pt-4 sm:pt-6 border-t border-border/30">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-3">{t("summerServices")}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-neutral-500 mt-1">•</span>
                <span className="text-card-foreground">{t("summerService1")}</span>
              </li>
              <li className="flex items-start gap-2 text-card-foreground">
                <span className="text-neutral-500 mt-1">•</span>
                <span className="text-card-foreground">{t("summerService2")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-500 mt-1">•</span>
                <span className="text-card-foreground">{t("summerService3")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-500 mt-1">•</span>
                <span className="bg-transparent text-card-foreground">{t("summerService4")}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-primary mb-3">{t("fallServices")}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="bg-transparent text-card-foreground">{t("fallService1")}</span>
              </li>
              <li className="flex items-start gap-2 text-neutral-500">
                <span className="text-primary mt-1">•</span>
                <span className="text-card-foreground">{t("fallService2")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-card-foreground">{t("fallService3")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-card-foreground">{t("fallService4")}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-primary mb-3">{t("winterServices")}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2 text-card-foreground">
                <span className="text-primary mt-1">•</span>
                <span className="text-card-foreground">{t("winterService1")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-card-foreground">{t("winterService2")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-card-foreground">{t("winterService3")}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-primary mb-3">{t("additionalServices")}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-card-foreground">{t("additionalService1")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-card-foreground">{t("additionalService2")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-card-foreground">{t("additionalService3")}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
