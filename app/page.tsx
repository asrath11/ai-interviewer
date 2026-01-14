import { Navbar } from '@/components/marketing/Navbar';
import { Hero } from '@/components/marketing/Hero';
import { Features } from '@/components/marketing/Features';
import { DetailedFeatures } from '@/components/marketing/DetailedFeatures';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { CTA } from '@/components/marketing/CTA';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <DetailedFeatures />
      <HowItWorks />
      <CTA />
    </>
  );
}
