import Features from '#/components/Features'
import Gsap from '#/components/Gsap'
import Images from '#/components/Images'

import Navbar from '#/components/Navbar'
import ScrollImages from '#/components/ScrollImages'
import { Footer } from '#/components/ui/Footer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
    <Navbar />
    <Gsap />
    <Images />
    
    <ScrollImages />
    <div className='h-[30vh]'>
        <h1>hiiiiiiii</h1>
    </div>
      {/* <Hero /> */}
      <Features />
      <Footer /> 
    </>
  )
}
