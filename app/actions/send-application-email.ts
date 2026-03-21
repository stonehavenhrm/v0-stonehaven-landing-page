"use server"

export async function sendApplicationEmail(formData: {
  name: string
  age: string
  hasSIN: string
  experience: string
  availability: string
  languageSpoken: string
  employmentType: string
  language: string
}) {
  const { name, age, hasSIN, experience, availability, languageSpoken, employmentType, language } = formData

  const subjectMap: Record<string, string> = {
    en: `New Job Application - ${employmentType}`,
    fr: `Nouvelle candidature - ${employmentType}`,
    ar: `طلب وظيفة جديد - ${employmentType}`,
    es: `Nueva solicitud de empleo - ${employmentType}`,
    zh: `新工作申请 - ${employmentType}`,
  }

  const subject = subjectMap[language] || `New Job Application - ${employmentType}`

  const emailBody = `
New Job Application Received

Employment Type: ${employmentType}
Name: ${name}
Age: ${age}
Has SIN: ${hasSIN}
Language Spoken: ${languageSpoken}

Experience:
${experience}

Availability:
${availability}

Application Language: ${language}
  `.trim()

  const mailtoLink = `mailto:contact@stonehavenhrm.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`

  return { success: true, mailtoLink }
}
