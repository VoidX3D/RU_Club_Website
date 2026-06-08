import SEOHead from '@/components/SEOHead'

export default function License() {
  return (
    <>
      <SEOHead title="License" description="License information for RU Club Motherland." url="https://ru.motherland.edu.np/license" />

      <div className="pt-16 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-display font-bold text-text-primary dark:text-dark-text-primary mb-8">License</h1>
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-4 text-text-secondary dark:text-dark-text-secondary">
            <p>&copy; {new Date().getFullYear()} RU Club Motherland. All rights reserved.</p>
            <p>All content, images, and materials on this website are the property of RU Club Motherland unless otherwise credited.</p>
            <p>Partner logos are used with permission from their respective organizations.</p>
            <p>This website is maintained by the students and staff of Motherland Secondary School, Pokhara, Nepal.</p>
          </div>
        </div>
      </div>
    </>
  )
}
