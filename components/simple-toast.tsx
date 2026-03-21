"use client"

import { X } from "lucide-react"
import { useEffect } from "react"

interface SimpleToastProps {
  message: string
  onClose: () => void
  duration?: number
}

export function SimpleToast({ message, onClose, duration = 3000 }: SimpleToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <div className="bg-primary text-primary-foreground px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]">
        <div className="flex-1">
          <p className="font-semibold">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
