
interface ErrorProps {
    message?: string
    onRetry?: () => void
  }
  
  export function Error({ message = 'Something went wrong', onRetry }: ErrorProps) {
    return (
      <div className="flex h-[200px] flex-col items-center justify-center">
        <p className="mb-4 text-red-500">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
          >
            Try Again
          </button>
        )}
      </div>
    )
  }