import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Child Custody Investigation Reference Questionnaire',
  description: 'Friend of the Court – Child Custody Investigation Reference Questionnaire',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  )
}
