'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Car } from '@/lib/types'
import { CarCard } from './CarCard'

export function FeaturedStock({ cars }: { cars: Car[] }) {
  return (
    <section className="py-24 md:py-32 bg-[#0a0a0b]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e] font-medium mb-4"
            >
              Current Stock
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-[#f0ede8]"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Handpicked Cars
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/inventory"
              className="text-sm text-[#c9a96e] hover:text-[#e0c28a] transition-colors flex items-center gap-2 group"
            >
              View all stock
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.slice(0, 3).map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
