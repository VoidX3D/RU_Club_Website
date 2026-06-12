import { Link } from 'react-router-dom'
import SEOHead from '@/components/SEOHead'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <>
      <SEOHead title="404 - Page Not Found" description="The page you're looking for doesn't exist." />
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center px-4 sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="text-8xl sm:text-9xl font-display font-bold gradient-text mb-4"
          >
            404
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl font-display font-bold text-text-primary dark:text-dark-text-primary mb-3"
          >
            Page Not Found
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
            className="text-lg text-text-secondary dark:text-dark-text-secondary mb-8 max-w-md mx-auto"
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.55, ease: 'easeOut' }}
          >
            <Link to="/" className="inline-flex items-center px-8 py-3 rounded-full bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-all">
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
