import Features from '#/components/Features'
import Hero from '#/components/Hero'
import Images from '#/components/Images'
import Navbar from '#/components/Navbar'
import { Footer } from '#/components/ui/Footer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Images />
      <Features />
      <Footer />
    </>
  )
}
