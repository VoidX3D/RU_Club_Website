import { Info } from './Icons'

interface ErrorBannerProps {
  message: string
  className?: string
}

export function ErrorBanner({ message, className = '' }: ErrorBannerProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm mb-4">
        <Info size={16} />
        {message}
      </div>
    </div>
  )
}
