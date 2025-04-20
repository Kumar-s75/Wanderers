// src/hooks/use-optimistic-update.ts
import { useOptimistic, useTransition } from 'react'

export function useOptimisticUpdate<T>(
  currentData: T,
  updateFn: (data: T) => Promise<void>
) {
  const [isPending, startTransition] = useTransition()
  const [optimisticData, updateOptimisticData] = useOptimistic(
    currentData,
    (state, newData: T) => newData
  )

  const update = async (newData: T) => {
    updateOptimisticData(newData)
    
    startTransition(async () => {
      try {
        await updateFn(newData)
      updateOptimisticData(newData)
      return { success: true }
      } catch (error) {
        updateOptimisticData(currentData)
        return { success: false, error }
      }
    })
  }

  return {
    data: optimisticData,
    update,
    isPending,
  }
}