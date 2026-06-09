import { motion } from 'framer-motion'
import { getAllCars } from '@/lib/cars'
import { InventoryGrid } from '@/components/inventory/InventoryGrid'

export const metadata = {
  title: 'Stock | Mokas Motors — Premium Used Cars Cornwall',
  description: 'Browse our full inventory of hand-picked premium used cars in Newquay, Cornwall.',
}

export default function InventoryPage() {
  const cars = getAllCars()

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e] font-medium mb-4">
            Our Stock
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold text-[#f0ede8] mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Available Cars
          </h1>
          <p className="text-[#666] max-w-lg">
            Every car in our stock is hand-picked, independently inspected, and priced with full
            transparency against the local Cornwall market.
          </p>
        </div>

        <InventoryGrid cars={cars} />
      </div>
    </div>
  )
}
