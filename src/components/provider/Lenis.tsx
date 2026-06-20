
import { ReactLenis } from "lenis/react"

function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisOptions = {
    lerp: 0.1,
    duration: 0.6,
    smoothTouch: false,
    wheelMultiplier: 2,
    smooth: true
  }

  return (
    <ReactLenis root options={lenisOptions}>
      {children as any} 
    </ReactLenis>
  )
}

export default LenisProvider