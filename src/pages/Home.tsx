import SEOHead from '@/components/SEOHead'
import HeroSection from '@/components/home/HeroSection'
import StatsSection from '@/components/home/StatsSection'
import MissionCarousel from '@/components/home/MissionCarousel'
import PartnersSection from '@/components/home/PartnersSection'
import IntroSection from '@/components/home/IntroSection'
import FeaturesSection from '@/components/home/FeaturesSection'
import CTASection from '@/components/home/CTASection'

export default function Home() {
  return (
    <>
      <SEOHead title="Home" description="RU Club Motherland — Environmental sustainability, recycling and upcycling club at Motherland Secondary School, Pokhara, Nepal. Join us in tree plantation, waste management, and community awareness campaigns for a zero-waste ecosystem." keywords="RU Club, RU Club Motherland, Recycle Upcycle Club, recycling club Nepal, environmental club Pokhara, Motherland Secondary School, sustainability club Nepal, tree plantation Pokhara, waste management Nepal, zero-waste community, upcycling club, green initiative school" />
      <HeroSection />
      <StatsSection />
      <MissionCarousel />
      <PartnersSection />
      <IntroSection />
      <FeaturesSection />
      <CTASection />
    </>
  )
}
