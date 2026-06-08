import { motion } from 'framer-motion'

interface MissionCarouselProps {
  title?: string
  subtitle?: string
  label?: string
}

export default function MissionCarousel({ title, subtitle, label }: MissionCarouselProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-600 dark:text-brand-400 font-medium text-sm tracking-wider uppercase"
          >
            {label || 'Our Mission'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-3xl sm:text-4xl font-display font-bold text-text-primary dark:text-dark-text-primary"
          >
            {title || 'Featured Missions'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto"
          >
            {subtitle || 'Discover our environmental initiatives'}
          </motion.p>
        </div>

        <div className="swiper parkSwiper">
          <div className="swiper-wrapper" id="missions-carousel"></div>
          <div className="swiper-button-next" />
          <div className="swiper-button-prev" />
          <div className="swiper-pagination" />
        </div>
      </div>
    </section>
  )
}
