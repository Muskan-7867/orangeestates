import Features from '#/components/Features'
import HeroSection from '#/features/home/components/HeroSection'
import Images from '#/features/home/components/Images'

import Navbar from '#/components/Navbar'

import { Footer } from '#/components/ui/Footer'
import { createFileRoute } from '@tanstack/react-router'
import Spotlight from '#/features/home/components/SpotLight'
import ScrollImages from '#/features/home/components/ScrollImages'
import PropertyGrid from '#/features/home/components/PropertyGrid'
import WhyChooseUs from '#/features/home/components/WhyChooseUs'
import Demo from '#/components/ui/demo'
import CTA from '#/features/home/components/CTA'
export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <Navbar />

      <HeroSection />

      <Images />
      <Features />


      <ScrollImages />
      <Spotlight />
      <PropertyGrid />
      <WhyChooseUs />
      <Demo />
      <CTA />
      {/* <Hero /> */}
      <Footer />
    </>
  )
}
