import { CampusSection } from '@/components/campus/campus-section';
import { CompaniesCarousel } from '@/components/companies/companies-carousel';
import { CtaBand } from '@/components/cta/cta-band';
import { EcosystemJourney } from '@/components/ecosystem/ecosystem-journey';
import { HealthAreas } from '@/components/health/health-areas';
import { HeroSlider } from '@/components/hero/hero-slider';
import { NewsEvents } from '@/components/news/news-events';
import { StatsBar } from '@/components/stats/stats-bar';
import { WhyThamen } from '@/components/why/why-thamen';

/**
 * Homepage narrative: SCIENCE → INNOVATION → BUSINESS → HEALTH → IMPACT.
 */
export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <StatsBar />
      <WhyThamen />
      <EcosystemJourney />
      <CampusSection />
      <HealthAreas />
      <NewsEvents />
      <CompaniesCarousel />
      <CtaBand />
    </>
  );
}
