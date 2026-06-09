'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Gauge, Fuel, Settings2, Calendar } from 'lucide-react'
import type { Car } from '@/lib/types'
import { formatPrice, formatMileage, getPriceAnalysis } from '@/lib/cars'

const verdictColors = {
  great: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  fair: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  above: 'bg-red-500/20 text-red-400 border-red-500/30',
}

export function CarCard({ car, index }: { car: Car; index: number }) {
  const analysis = getPriceAnalysis(car)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
    >
      <Link href={`/inventory/${car.id}`} className="group block">
        <div className="bg-[#111114] border border-white/5 rounded-sm overflow-hidden hover:border-[#c9a96e]/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="relative aspect-[16/10] overflow-hidden bg-[#0d0d10]">
            <Image
              src={car.images[0]}
              alt={`${car.year} ${car.make} ${car.model}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase border ${verdictColors[analysis.verdict]}`}>
              {analysis.verdictLabel}
            </div>
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full text-[10px] font-medium tracking-wider text-[#ccc] border border-white/10">
              {car.year}
            </div>
          </div>

          <div className="p-5">
            <div className="mb-3">
              <p className="text-[10px] tracking-widest uppercase text-[#c9a96e] font-medium mb-1">{car.make}</p>
              <h3 className="text-lg font-semibold text-[#f0ede8] leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                {car.model}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { icon: Gauge, label: formatMileage(car.mileage) },
                { icon: Fuel, label: car.fuelType },
                { icon: Settings2, label: car.transmission },
                { icon: Calendar, label: `${car.year}` },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-[#666]">
                  <Icon size={11} className="text-[#c9a96e] shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className="flex items-end justify-between pt-4 border-t border-white/5">
              <div>
                <p className="text-2xl font-bold text-[#f0ede8]">{formatPrice(car.price)}</p>
                {analysis.percentageDiff !== 0 && (
                  <p className={`text-[10px] font-medium mt-0.5 ${analysis.percentageDiff < 0 ? 'text-emerald-400' : 'text-[#888]'}`}>
                    {analysis.percentageDiff < 0 ? `${Math.abs(analysis.percentageDiff)}% below avg` : `${analysis.percentageDiff}% above avg`}
                  </p>
                )}
              </div>
              <span className="text-[10px] tracking-widest uppercase text-[#c9a96e] group-hover:gap-2 transition-all">
                View →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
