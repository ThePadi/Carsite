'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X } from 'lucide-react'
import type { Car } from '@/lib/types'
import { CarCard } from './CarCard'

type SortKey = 'price-asc' | 'price-desc' | 'mileage-asc' | 'year-desc'

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'mileage-asc', label: 'Lowest Mileage' },
  { value: 'year-desc', label: 'Newest First' },
]

export function InventoryGrid({ cars }: { cars: Car[] }) {
  const [make, setMake] = useState('all')
  const [fuel, setFuel] = useState('all')
  const [transmission, setTransmission] = useState('all')
  const [maxPrice, setMaxPrice] = useState(200000)
  const [sort, setSort] = useState<SortKey>('year-desc')
  const [showFilters, setShowFilters] = useState(false)

  const makes = useMemo(() => ['all', ...Array.from(new Set(cars.map((c) => c.make)))], [cars])
  const fuels = useMemo(() => ['all', ...Array.from(new Set(cars.map((c) => c.fuelType)))], [cars])
  const transmissions = useMemo(() => ['all', ...Array.from(new Set(cars.map((c) => c.transmission)))], [cars])

  const filtered = useMemo(() => {
    let result = cars.filter((c) => {
      if (make !== 'all' && c.make !== make) return false
      if (fuel !== 'all' && c.fuelType !== fuel) return false
      if (transmission !== 'all' && c.transmission !== transmission) return false
      if (c.price > maxPrice) return false
      return true
    })
    result = [...result].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'mileage-asc') return a.mileage - b.mileage
      if (sort === 'year-desc') return b.year - a.year
      return 0
    })
    return result
  }, [cars, make, fuel, transmission, maxPrice, sort])

  const hasActiveFilters = make !== 'all' || fuel !== 'all' || transmission !== 'all' || maxPrice !== 200000

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 border border-white/10 text-sm text-[#888] hover:text-[#f0ede8] hover:border-white/20 transition-all rounded-sm"
          >
            <SlidersHorizontal size={14} />
            Filters
            {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]" />}
          </button>
          {hasActiveFilters && (
            <button
              onClick={() => { setMake('all'); setFuel('all'); setTransmission('all'); setMaxPrice(200000) }}
              className="flex items-center gap-1.5 text-xs text-[#c9a96e] hover:text-[#e0c28a] transition-colors"
            >
              <X size={12} /> Clear filters
            </button>
          )}
          <span className="text-sm text-[#555]">{filtered.length} {filtered.length === 1 ? 'car' : 'cars'}</span>
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="bg-[#111114] border border-white/10 text-sm text-[#888] px-4 py-2.5 rounded-sm focus:outline-none focus:border-[#c9a96e]/50 hover:border-white/20 transition-colors cursor-pointer"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-8"
          >
            <div className="bg-[#111114] border border-white/5 rounded-sm p-5 grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { label: 'Make', value: make, setter: setMake, options: makes },
                { label: 'Fuel', value: fuel, setter: setFuel, options: fuels },
                { label: 'Transmission', value: transmission, setter: setTransmission, options: transmissions },
              ].map(({ label, value, setter, options }) => (
                <div key={label}>
                  <label className="text-[10px] tracking-widest uppercase text-[#666] block mb-2">{label}</label>
                  <select
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    className="w-full bg-[#0a0a0b] border border-white/10 text-sm text-[#ccc] px-3 py-2 rounded-sm focus:outline-none focus:border-[#c9a96e]/50"
                  >
                    {options.map((o) => (
                      <option key={o} value={o}>{o === 'all' ? `All ${label}s` : o}</option>
                    ))}
                  </select>
                </div>
              ))}
              <div>
                <label className="text-[10px] tracking-widest uppercase text-[#666] block mb-2">
                  Max Price: £{maxPrice.toLocaleString()}
                </label>
                <input
                  type="range"
                  min={0}
                  max={200000}
                  step={5000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#c9a96e]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-[#555]"
          >
            <p className="text-lg mb-2">No cars match your filters</p>
            <p className="text-sm">Try adjusting your search criteria</p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
