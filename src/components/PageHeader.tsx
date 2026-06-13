import { motion } from 'framer-motion'

interface PageHeaderProps {
  badge: string
  title: string
  description?: string
  className?: string
}

export function PageHeader({ badge, title, description, className = '' }: PageHeaderProps) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="text-brand-600 dark:text-brand-400 font-semibold text-xs tracking-wider uppercase"
      >{badge}</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="mt-1 text-3xl sm:text-4xl font-display font-bold text-text-primary dark:text-dark-text-primary"
      >{title}</motion.h1>
      {description && (
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mt-2 text-base text-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto"
        >{description}</motion.p>
      )}
    </div>
  )
}
