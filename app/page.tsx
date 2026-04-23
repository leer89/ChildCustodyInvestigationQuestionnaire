'use client'

import { useState, useEffect } from 'react'
import CustodyForm from '@/components/CustodyForm'
import PDFPreview from '@/components/PDFPreview'
import { initialFormData } from '@/lib/types'
import type { FormData } from '@/lib/types'

const DEBOUNCE_MS = 350

export default function Home() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [debouncedData, setDebouncedData] = useState<FormData>(initialFormData)
  const [isMobile, setIsMobile] = useState(false)

  // Debounce form data before sending to PDF renderer
  useEffect(() => {
    const t = setTimeout(() => setDebouncedData(formData), DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [formData])

  // Mobile detection — hide PDF panel on touch/small screens
  useEffect(() => {
    const check = () => {
      const mobile =
        /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent) ||
        window.matchMedia('(pointer:coarse)').matches
      setIsMobile(mobile)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Left panel — scrollable form */}
      <div
        className={`${isMobile ? 'w-full' : 'w-1/2'} h-full overflow-y-auto border-r border-gray-300 bg-gray-100`}
      >
        <CustodyForm formData={formData} setFormData={setFormData} />
      </div>

      {/* Right panel — live PDF preview (desktop only) */}
      {!isMobile && (
        <div className="w-1/2 h-full overflow-hidden bg-gray-200">
          <PDFPreview data={debouncedData} />
        </div>
      )}
    </div>
  )
}
