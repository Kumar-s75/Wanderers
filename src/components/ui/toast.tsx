// src/components/ui/toast.tsx
'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { hideToast } from '@/store/slices/uiSlice'
import { CheckCircle, XCircle, Info } from 'lucide-react'

export function Toast() {
  const dispatch = useAppDispatch()
  const { toast } = useAppSelector((state) => state.ui)

  useEffect(() => {
    if (toast.isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideToast())
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [toast.isVisible, dispatch])

  if (!toast.isVisible) return null

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center space-x-2 rounded-lg bg-white p-4 shadow-lg">
        {icons[toast.type]}
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
    </div>
  )
}