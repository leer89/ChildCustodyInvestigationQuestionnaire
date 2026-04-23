'use client'

import { usePDF } from '@react-pdf/renderer'
import { useEffect } from 'react'
import CustodyPDFDocument from './CustodyPDFDocument'
import type { FormData } from '@/lib/types'

export default function PDFViewerWrapper({ data }: { data: FormData }) {
  const [instance, updateInstance] = usePDF({
    document: <CustodyPDFDocument data={data} />,
  })

  useEffect(() => {
    updateInstance(<CustodyPDFDocument data={data} />)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleDownload = () => {
    if (!instance.url) return
    const a = document.createElement('a')
    a.href = instance.url
    a.download = 'custody-reference-questionnaire.pdf'
    a.click()
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white text-sm shrink-0">
        <span className="font-medium">Live PDF Preview</span>
        {instance.loading ? (
          <span className="text-xs text-gray-300">Generating…</span>
        ) : instance.error ? (
          <span className="text-xs text-red-400">PDF error</span>
        ) : (
          <button
            onClick={handleDownload}
            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs transition-colors"
          >
            Download PDF
          </button>
        )}
      </div>

      {instance.error ? (
        <div className="flex-1 flex items-center justify-center bg-gray-100 p-6">
          <div className="text-center text-red-600 text-sm">
            <p className="font-bold mb-1">PDF render error</p>
            <p className="text-xs text-gray-500 font-mono break-all">{String(instance.error)}</p>
          </div>
        </div>
      ) : instance.url ? (
        <iframe
          src={instance.url}
          className="flex-1 w-full border-none"
          title="PDF Preview"
        />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-100">
          <div className="text-gray-400 text-sm">Generating PDF…</div>
        </div>
      )}
    </div>
  )
}
