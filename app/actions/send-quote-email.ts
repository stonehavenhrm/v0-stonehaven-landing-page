"use server"

export async function sendQuoteEmail(formData: {
  firstName: string
  address: string
  contact: string
  details: string
  serviceType: string
  service: string
  language: string
}) {
  const { firstName, address, contact, details, serviceType, service, language } = formData

  const subjectMap: Record<string, string> = {
    en: `New Quote Request - ${service}`,
    fr: `Nouvelle demande de soumission - ${service}`,
    ar: `طلب عرض سعر جديد - ${service}`,
    es: `Nueva solicitud de cotización - ${service}`,
    zh: `新报价请求 - ${service}`,
  }

  const subject = subjectMap[language] || `New Quote Request - ${service}`

  const emailBody = `
New Quote Request Received

Service Type: ${serviceType}
Service: ${service}
Name: ${firstName}
Address: ${address}
Contact: ${contact}
Details: ${details}

Language: ${language}
  `.trim()

  // In a real application, you would use a service like Resend, SendGrid, or nodemailer
  // For now, we'll create a mailto link
  const mailtoLink = `mailto:contact@stonehavenhrm.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`

  return { success: true, mailtoLink }
}
