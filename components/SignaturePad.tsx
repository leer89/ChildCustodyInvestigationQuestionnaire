'use client'

import { useRef, useEffect } from 'react'
import SignatureCanvas from 'react-signature-canvas'

interface Props {
  value: string
  onChange: (base64: string) => void
}

export default function SignaturePad({ value, onChange }: Props) {
  const canvasRef = useRef<SignatureCanvas>(null)

  // Restore existing signature when component mounts or value is externally reset to ''
  useEffect(() => {
    if (!value && canvasRef.current) {
      canvasRef.current.clear()
    }
  }, [value])

  const handleEnd = () => {
    if (canvasRef.current && !canvasRef.current.isEmpty()) {
      onChange(canvasRef.current.toDataURL('image/png'))
    }
  }

  const handleClear = () => {
    canvasRef.current?.clear()
    onChange('')
  }

  return (
    <div className="space-y-2">
      <div className="border-2 border-gray-300 rounded-lg bg-white overflow-hidden cursor-crosshair">
        <SignatureCanvas
          ref={canvasRef}
          onEnd={handleEnd}
          penColor="#000080"
          canvasProps={{
            style: { width: '100%', height: 130, display: 'block' },
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400 italic">Draw your signature above</p>
        <button
          type="button"
          onClick={handleClear}
          className="text-xs text-red-500 hover:text-red-700 underline"
        >
          Clear
        </button>
      </div>
      {value && (
        <p className="text-xs text-green-600">✓ Signature captured</p>
      )}
    </div>
  )
}
