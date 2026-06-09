'use client'

import { useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { Car, PriceAnalysis as PriceAnalysisType } from '@/lib/types'
import { formatPrice } from '@/lib/cars'

function AnimatedNumber({ value, prefix = '' }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1200
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, value])

  return <span ref={ref}>{prefix}{display.toLocaleString('en-GB')}</span>
}

const verdictConfig = {
  great: {
    label: 'Great Deal',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.3)',
    description: 'This car is priced significantly below the local market average.',
  },
  fair: {
    label: 'Fair Price',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
    border: 'rgba(245,158,11,0.3)',
    description: 'This car is priced in line with the local market average.',
  },
  above: {
    label: 'Above Market',
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.1)',
    border: 'rgba(239,68,68,0.3)',
    description: 'This car is priced above the local market average.',
  },
}

export function PriceAnalysis({ car, analysis }: { car: Car; analysis: PriceAnalysisType }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const config = verdictConfig[analysis.verdict]

  const range = analysis.max - analysis.min || 1
  const carPos = Math.max(0, Math.min(100, ((car.price - analysis.min) / range) * 100))
  const avgPos = Math.max(0, Math.min(100, ((analysis.average - analysis.min) / range) * 100))

  return (
    <div ref={ref} className="bg-[#111114] border border-white/5 rounded-sm p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-[#f0ede8]" style={{ fontFamily: 'var(--font-playfair)' }}>
            Market Position
          </h3>
          <p className="text-sm text-[#666] mt-1">Based on {car.comparables.length} comparable listings in Cornwall</p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="px-4 py-2 rounded-full text-sm font-semibold border"
          style={{ background: config.bg, borderColor: config.border, color: config.color }}
        >
          {config.label}
        </motion.div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Market Min', value: analysis.min, highlight: false },
          { label: 'Local Average', value: analysis.average, highlight: true },
          { label: 'Market Max', value: analysis.max, highlight: false },
        ].map(({ label, value, highlight }) => (
          <div key={label} className="text-center">
            <p className={`text-xl font-bold mb-1 ${highlight ? 'text-[#c9a96e]' : 'text-[#f0ede8]'}`}>
              £<AnimatedNumber value={value} />
            </p>
            <p className="text-[10px] tracking-widest uppercase text-[#555]">{label}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <div className="relative h-12 mb-2">
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-2 bg-white/5 rounded-full" />

          <motion.div
            className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full"
            style={{ background: 'linear-gradient(90deg, rgba(201,169,110,0.2), rgba(201,169,110,0.6))' }}
            initial={{ left: '0%', right: '100%' }}
            animate={inView ? { left: '0%', right: '0%' } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          />

          <motion.div
            className="absolute top-0 bottom-0 flex flex-col items-center"
            style={{ left: `${avgPos}%`, transform: 'translateX(-50%)' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <div className="text-[9px] text-[#666] tracking-wider mb-0.5">avg</div>
            <div className="w-0.5 h-3 bg-[#666]" />
            <div className="w-0.5 h-5 bg-[#666] opacity-50" />
          </motion.div>

          <motion.div
            className="absolute top-0 bottom-0 flex flex-col items-center"
            style={{ left: `${carPos}%`, transform: 'translateX(-50%)' }}
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.1, type: 'spring' }}
          >
            <div
              className="text-[9px] font-semibold tracking-wider mb-0.5 whitespace-nowrap"
              style={{ color: config.color }}
            >
              This car
            </div>
            <div className="w-0.5 h-3" style={{ background: config.color }} />
            <div className="w-3 h-3 rounded-full border-2 mt-0.5" style={{ background: config.bg, borderColor: config.color }} />
          </motion.div>
        </div>

        <div className="flex justify-between text-[10px] text-[#555] mt-1">
          <span>£{analysis.min.toLocaleString()}</span>
          <span>£{analysis.max.toLocaleString()}</span>
        </div>
      </div>

      <div className="p-4 rounded-sm border" style={{ background: config.bg, borderColor: config.border }}>
        <p className="text-sm" style={{ color: config.color }}>
          <span className="font-semibold">
            {analysis.percentageDiff < 0
              ? `${Math.abs(analysis.percentageDiff)}% below the local average`
              : analysis.percentageDiff > 0
              ? `${analysis.percentageDiff}% above the local average`
              : 'At the local average'}
          </span>
          {' — '}{config.description}
        </p>
      </div>

      <div className="mt-6">
        <h4 className="text-xs tracking-widest uppercase text-[#555] mb-3">Comparable Listings</h4>
        <div className="space-y-2">
          {car.comparables.map((comp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
              className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
            >
              <div>
                <p className="text-sm text-[#888]">{comp.source}</p>
                <p className="text-xs text-[#555]">{comp.mileage.toLocaleString()} miles</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm font-medium text-[#ccc]">£{comp.price.toLocaleString()}</p>
                <span
                  className={`text-[10px] font-medium ${comp.price > car.price ? 'text-emerald-400' : comp.price < car.price ? 'text-red-400' : 'text-[#666]'}`}
                >
                  {comp.price > car.price ? `+£${(comp.price - car.price).toLocaleString()}` : comp.price < car.price ? `-£${(car.price - comp.price).toLocaleString()}` : '='}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
