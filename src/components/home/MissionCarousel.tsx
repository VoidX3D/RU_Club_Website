import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { getMissionList } from '@/lib/supabase'
import { handleImgError } from '@/lib/utils'
import { useSiteData } from '@/hooks/useSiteData'
import { missionSectionContent } from '@/data'
import type { MissionEntry } from '@/types'

const ms = missionSectionContent

export default function MissionCarousel() {
  const { data: missions, loading, error } = useSiteData<MissionEntry[]>(getMissionList)
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)

  const activeMissions = useMemo(() => missions?.filter(m => m.show !== false) || [], [missions])

  return (
    <section className="py-20 bg-surface-secondary dark:bg-dark-surface-secondary overflow-hidden">
      <div className="w-full px-4 sm:px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          {loading ? (
            <>
              <div className="h-3 w-24 bg-surface-tertiary dark:bg-dark-surface-tertiary rounded animate-pulse mx-auto mb-4" />
              <div className="h-10 w-96 max-w-full bg-surface-tertiary dark:bg-dark-surface-tertiary rounded animate-pulse mx-auto mb-3" />
              <div className="h-5 w-72 max-w-full bg-surface-tertiary dark:bg-dark-surface-tertiary rounded animate-pulse mx-auto" />
            </>
          ) : (
            <>
              <p className="text-brand-700 dark:text-brand-400 font-semibold text-xs tracking-[0.2em] uppercase mb-4">
                {ms.label}
              </p>
              <h2 className="text-[clamp(2.75rem,6vw,4.25rem)] font-display font-extrabold tracking-tight text-text-primary dark:text-dark-text-primary">
                {ms.title}
              </h2>
              {ms.subtitle && (
                <p className="mt-4 text-base text-text-secondary dark:text-dark-text-secondary max-w-xl mx-auto">
                  {ms.subtitle}
                </p>
              )}
            </>
          )}
          <Link to="/missions" className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-full bg-brand-700 text-white font-semibold text-sm uppercase tracking-wider hover:bg-brand-800 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-700/30">
            View All Missions
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </Link>
        </div>

        {loading ? (
          <div className="max-w-5xl mx-auto">
            <div className="aspect-video bg-surface-tertiary dark:bg-dark-surface-tertiary animate-pulse" />
          </div>
        ) : error ? (
          <div className="max-w-5xl mx-auto text-center py-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          </div>
        ) : activeMissions.length > 0 ? (
          <div data-aos="fade-up" data-aos-delay="100">
            <div className="mission-arrows">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  centeredSlides={false}
                  slidesPerView={1}
                  spaceBetween={12}
                  autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                  speed={600}
                  navigation={{ prevEl, nextEl }}
                  pagination={{ clickable: true }}
                  grabCursor
                  loop={activeMissions.length > 1}
                  watchOverflow
                  breakpoints={{
                    640: { slidesPerView: 'auto', centeredSlides: true, spaceBetween: 24 }
                  }}
                  className="mission-carousel !pb-14"
                >
                {activeMissions.map((m) => (
                  <SwiperSlide key={m.id}>
                    <Link to={`/mission/${m.slug}`} className="group block w-full h-full overflow-hidden relative bg-surface-tertiary dark:bg-dark-surface-tertiary border border-border dark:border-dark-border hover:border-brand-500/40 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                      {m.featured ? (
                        <img src={m.featured} alt={m.title} width="1600" height="900" className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async"
                          onError={handleImgError} />
                      ) : null}
                      <div className={`w-full h-full bg-surface-tertiary dark:bg-dark-surface-tertiary flex items-center justify-center ${m.featured ? 'hidden' : ''}`}>
                        <span className="text-text-secondary dark:text-dark-text-muted text-sm">{m.featured ? 'Failed to load' : 'No image'}</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6 md:p-8">
                        {m.tag && (
                          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.1em] text-white bg-brand-700 px-3 py-1 rounded-full mb-2">{m.tag}</span>
                        )}
                        <h3 className="text-white font-display font-bold text-lg sm:text-xl md:text-2xl leading-tight">{m.title}</h3>
                        <p className="text-white/80 text-sm mt-1 line-clamp-1 max-w-xl">{m.description}</p>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button ref={setPrevEl} className="mission-arrow mission-arrow-prev" aria-label="Previous slide">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button ref={setNextEl} className="mission-arrow mission-arrow-next" aria-label="Next slide">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-tertiary dark:bg-dark-surface-tertiary flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted dark:text-dark-text-muted"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <p className="text-text-muted dark:text-dark-text-muted text-lg font-medium">No missions yet</p>
            <p className="text-text-muted dark:text-dark-text-muted text-sm mt-1">Check back soon for upcoming missions.</p>
          </div>
        )}
      </div>
    </section>
  )
}
