import { useEffect, useRef, type ReactNode } from 'react'

interface LightboxImage {
  url: string
  alt?: string
  downloadUrl?: string
}

interface LightboxProps {
  open: boolean
  images: LightboxImage[]
  currentIndex: number
  onClose: () => void
  onIndexChange: (index: number) => void
  title?: ReactNode
}

export function Lightbox({ open, images, currentIndex, onClose, onIndexChange, title }: LightboxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) ref.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowLeft') {
        onIndexChange(currentIndex > 0 ? currentIndex - 1 : images.length - 1)
      }
      if (e.key === 'ArrowRight') {
        onIndexChange(currentIndex < images.length - 1 ? currentIndex + 1 : 0)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, currentIndex, images.length, onClose, onIndexChange])

  if (!open || images.length === 0) return null

  const img = images[currentIndex]

  const handleDownload = () => {
    const url = img.downloadUrl || img.url
    const a = document.createElement('a')
    a.href = url
    a.download = url.split('/').pop() || 'image'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex flex-col"
      onClick={onClose}
      onKeyDown={() => {}}
      tabIndex={-1}
      ref={ref}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 shrink-0" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 min-w-0">
          {title && (
            <div className="text-sm text-white/70 truncate">{title}</div>
          )}
          <span className="text-white/40 text-xs shrink-0">{currentIndex + 1} / {images.length}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={handleDownload}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            title="Download"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </button>
          <button onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            title="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 min-h-0 relative" onClick={e => e.stopPropagation()}>
        {images.length > 1 && (
          <>
            <button onClick={e => { e.stopPropagation(); onIndexChange(currentIndex > 0 ? currentIndex - 1 : images.length - 1) }}
              className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer z-10"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button onClick={e => { e.stopPropagation(); onIndexChange(currentIndex < images.length - 1 ? currentIndex + 1 : 0) }}
              className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer z-10"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </>
        )}
        <img
          key={currentIndex}
          src={img.url}
          alt={img.alt || `Image ${currentIndex + 1}`}
          className="max-h-full max-w-full object-contain rounded-lg"
          width="1200" height="800" decoding="async"
        />
      </div>
    </div>
  )
}
