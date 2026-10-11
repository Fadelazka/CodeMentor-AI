import { Hero } from "@/components/landing/hero";
import { HeroMarquee } from "@/components/sections/HeroMarquee";
import { ProblemSolution } from "@/components/landing/problem-solution";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Metrics } from "@/components/landing/metrics";
import { Languages } from "@/components/landing/languages";
import { Testimonials } from "@/components/landing/testimonials";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HeroMarquee />
      <Metrics />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <Languages />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}