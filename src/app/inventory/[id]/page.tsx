import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllCars, getCarById, getPriceAnalysis, formatPrice, formatMileage } from '@/lib/cars'
import { ImageGallery } from '@/components/car-detail/ImageGallery'
import { PriceAnalysis } from '@/components/price-analysis/PriceAnalysis'
import { Gauge, Fuel, Settings2, Calendar, Palette, Zap, DoorOpen, Car, ChevronLeft, Phone, MessageCircle } from 'lucide-react'

export async function generateStaticParams() {
  return getAllCars().map((car) => ({ id: car.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const car = getCarById(id)
  if (!car) return {}
  return {
    title: `${car.year} ${car.make} ${car.model} | Mokas Motors`,
    description: `${formatPrice(car.price)} · ${formatMileage(car.mileage)} · ${car.fuelType} · ${car.transmission}. ${car.description.slice(0, 150)}...`,
  }
}

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const car = getCarById(id)
  if (!car) notFound()

  const analysis = getPriceAnalysis(car)

  const specs = [
    { icon: Calendar, label: 'Year', value: car.year.toString() },
    { icon: Gauge, label: 'Mileage', value: formatMileage(car.mileage) },
    { icon: Fuel, label: 'Fuel Type', value: car.fuelType },
    { icon: Settings2, label: 'Transmission', value: car.transmission },
    { icon: Palette, label: 'Colour', value: car.colour },
    { icon: Zap, label: 'Power', value: car.power },
    { icon: Car, label: 'Engine', value: car.engine },
    { icon: DoorOpen, label: 'Body Type', value: car.bodyType },
  ]

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Link
          href="/inventory"
          className="inline-flex items-center gap-2 text-sm text-[#666] hover:text-[#c9a96e] transition-colors mb-8"
        >
          <ChevronLeft size={14} /> Back to stock
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          <div>
            <ImageGallery images={car.images} alt={`${car.year} ${car.make} ${car.model}`} />
          </div>

          <div className="flex flex-col">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e] font-medium mb-2">{car.make}</p>
            <h1
              className="text-3xl md:text-4xl font-bold text-[#f0ede8] leading-tight mb-2"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {car.model}
            </h1>
            <p className="text-[#666] mb-6">{car.year} · {formatMileage(car.mileage)} · {car.fuelType}</p>

            <div className="text-4xl font-bold text-[#f0ede8] mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
              {formatPrice(car.price)}
            </div>
            <p className="text-sm text-[#555] mb-8">OTR price — no hidden fees</p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {specs.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 bg-[#111114] border border-white/5 rounded-sm px-4 py-3">
                  <Icon size={14} className="text-[#c9a96e] shrink-0" />
                  <div>
                    <p className="text-[9px] tracking-widest uppercase text-[#555]">{label}</p>
                    <p className="text-sm text-[#ccc] font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <a
                href="tel:+441637000000"
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#c9a96e] text-[#0a0a0b] text-sm font-semibold tracking-widest uppercase hover:bg-[#e0c28a] transition-colors"
              >
                <Phone size={14} /> Call Now
              </a>
              <a
                href={`https://wa.me/441637000000?text=Hi, I'm interested in the ${car.year} ${car.make} ${car.model} (${formatPrice(car.price)})`}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-sm font-semibold tracking-widest uppercase hover:bg-[#25D366]/20 transition-colors"
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#111114] border border-white/5 rounded-sm p-6 md:p-8">
              <h2 className="text-lg font-semibold text-[#f0ede8] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
                About This Car
              </h2>
              <p className="text-[#777] leading-relaxed text-sm">{car.description}</p>
            </div>

            {car.features.length > 0 && (
              <div className="bg-[#111114] border border-white/5 rounded-sm p-6 md:p-8">
                <h2 className="text-lg font-semibold text-[#f0ede8] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Key Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {car.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-[#777]">
                      <span className="w-1 h-1 rounded-full bg-[#c9a96e] shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <PriceAnalysis car={car} analysis={analysis} />
          </div>
        </div>
      </div>
    </div>
  )
}
