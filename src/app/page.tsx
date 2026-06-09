import { Hero } from '@/components/hero/Hero'
import { FeaturedStock } from '@/components/inventory/FeaturedStock'
import { AboutSection } from '@/components/about/AboutSection'
import { ContactSection } from '@/components/contact/ContactSection'
import { getAllCars } from '@/lib/cars'

export default function HomePage() {
  const cars = getAllCars()
  return (
    <>
      <Hero />
      <FeaturedStock cars={cars} />
      <AboutSection />
      <ContactSection />
    </>
  )
}
