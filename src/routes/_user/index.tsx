import { createFileRoute } from '@tanstack/react-router'
import Features from '#/features/home/components/Features'

import Images from '#/features/home/components/Images'
import Spotlight from '#/features/home/components/SpotLight'
import ScrollImages from '#/features/home/components/ScrollImages'
import PropertyGrid from '#/features/home/components/PropertyGrid'
import WhyChooseUs from '#/features/home/components/WhyChooseUs'
import ImageCarousel from '#/features/home/components/ImageCarousel'
import { FaqsSection } from '#/features/home/components/FaqsSection'
import Testimonials from '#/features/home/components/Testimonials'
import { ArcCarousel } from '#/components/ui/ArcCarosel'
import HeroBannerCarousel from '#/features/home/components/HeroBannerCarousel'
import Bridge from '#/features/home/components/Bridge'


export const Route = createFileRoute('/_user/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='bg-bg'>
    <>

      <HeroBannerCarousel />
      {/* <HeroSection /> */}
      <Images />
      <Features />
      <ScrollImages />
      <Spotlight />
      <PropertyGrid />
      <Bridge />
      <WhyChooseUs />
      <ImageCarousel />
      <Testimonials />

      <FaqsSection />



      {/* <CTA /> */}


      <ArcCarousel items={[
        { src: '/7.jpg', alt: 'Dunes at dusk', label: 'Evening Dunes' },
        { src: '/8.jpg', alt: 'Coastline from above', label: 'Coastline' },
        { src: '/4.jpg', alt: 'Ridges at dawn', label: 'Ridgelines' },
        { src: '/7.jpg', alt: 'Dunes at dusk', label: 'Evening Dunes' },
        { src: '/8.jpg', alt: 'Coastline from above', label: 'Coastline' },
        { src: '/4.jpg', alt: 'Ridges at dawn', label: 'Ridgelines' },
        { src: '/7.jpg', alt: 'Dunes at dusk', label: 'Evening Dunes' },
        { src: '/8.jpg', alt: 'Coastline from above', label: 'Coastline' },
        { src: '/4.jpg', alt: 'Ridges at dawn', label: 'Ridgelines' },
        { src: '/8.jpg', alt: 'Coastline from above', label: 'Coastline' },
        { src: '/4.jpg', alt: 'Ridges at dawn', label: 'Ridgelines' },
        { src: '/7.jpg', alt: 'Dunes at dusk', label: 'Evening Dunes' },
        { src: '/8.jpg', alt: 'Coastline from above', label: 'Coastline' },
        { src: '/4.jpg', alt: 'Ridges at dawn', label: 'Ridgelines' },
      ]}
      />

    </>
  </div>
}
