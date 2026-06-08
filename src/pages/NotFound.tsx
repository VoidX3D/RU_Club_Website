import { Link } from 'react-router-dom'
import SEOHead from '@/components/SEOHead'

export default function NotFound() {
  return (
    <>
      <SEOHead title="404 - Page Not Found" description="The page you're looking for doesn't exist." />

      <div className="min-h-screen flex items-center justify-center pt-[70px] md:pt-[100px]">
        <div className="text-center px-4 sm:px-6">
          <div className="text-8xl sm:text-9xl font-display font-bold gradient-text mb-4">404</div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-text-primary dark:text-dark-text-primary mb-3">
            Page Not Found
          </h1>
          <p className="text-lg text-text-secondary dark:text-dark-text-secondary mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-8 py-3 rounded-full bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  )
}
