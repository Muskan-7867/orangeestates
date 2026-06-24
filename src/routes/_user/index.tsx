import { createFileRoute } from '@tanstack/react-router'
import Features from '#/features/home/components/Features'
import HeroBannerCarousel from '#/features/home/components/HeroBannerCarousel'
import Images from '#/features/home/components/Images'
import Spotlight from '#/features/home/components/SpotLight'
import ScrollImages from '#/features/home/components/ScrollImages'
import PropertyGrid from '#/features/home/components/PropertyGrid'
import WhyChooseUs from '#/features/home/components/WhyChooseUs'
import CTA from '#/features/home/components/CTA'
import ImageCarousel from '#/features/home/components/ImageCarousel'
import { FaqsSection } from '#/components/faqs-1'
import Testimonials from '#/features/home/components/Testimonials'

export const Route = createFileRoute('/_user/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <>
    
          <HeroBannerCarousel />
          {/* <HeroSection /> */}
          <Images />
          <Features />
          <ScrollImages />
          <Spotlight />
          <PropertyGrid />
          <WhyChooseUs />
          <ImageCarousel />
          <Testimonials />
          <FaqsSection />
          <CTA />
    
    
        </>
  </div>
}
