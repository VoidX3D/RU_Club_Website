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
      <SEOHead title="Home" description="RU Club Motherland — Environmental Sustainability Club at Motherland Secondary School, Pokhara, Nepal. Join us in creating a zero-waste ecosystem." />
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
