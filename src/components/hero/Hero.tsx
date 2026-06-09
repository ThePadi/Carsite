'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,169,110,0.12) 0%, transparent 60%), radial-gradient(ellipse 100% 100% at 70% 80%, rgba(201,169,110,0.06) 0%, transparent 50%), #0a0a0b',
          }}
        />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse 60% 40% at 20% 30%, rgba(201,169,110,0.07) 0%, transparent 60%)',
              'radial-gradient(ellipse 60% 40% at 80% 70%, rgba(201,169,110,0.07) 0%, transparent 60%)',
              'radial-gradient(ellipse 60% 40% at 20% 30%, rgba(201,169,110,0.07) 0%, transparent 60%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </motion.div>

      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent"
            style={{ top: `${25 + i * 25}%`, left: 0, right: 0 }}
            animate={{ opacity: [0.3, 0.7, 0.3], scaleX: [0.7, 1, 0.7] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 1.3 }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-[#c9a96e] font-medium">
            <span className="w-8 h-px bg-[#c9a96e]" />
            Newquay, Cornwall
            <span className="w-8 h-px bg-[#c9a96e]" />
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          <span className="block text-[#f0ede8]">Premium Cars.</span>
          <span className="block gradient-text">Honest Prices.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-base md:text-lg text-[#888] max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Hand-picked performance and luxury cars, each with a transparent local market price analysis.
          No hidden fees, no pressure — just great cars at the right price.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/inventory"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[#c9a96e] text-[#0a0a0b] text-sm font-semibold tracking-widest uppercase overflow-hidden transition-all duration-300 hover:bg-[#e0c28a]"
          >
            <span className="relative z-10">Browse Stock</span>
            <motion.span
              className="relative z-10 text-lg"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
          <a
            href="tel:+441637000000"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 text-sm font-medium tracking-widest uppercase text-[#888] hover:text-[#f0ede8] hover:border-white/30 transition-all duration-300"
          >
            Call Us
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex items-center justify-center gap-8 mt-14"
        >
          {[['50+', 'Cars Sold'], ['5★', 'Google Rating'], ['10+', 'Years Experience']].map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="text-lg font-bold text-[#c9a96e]" style={{ fontFamily: 'var(--font-playfair)' }}>{num}</div>
              <div className="text-[10px] tracking-widest uppercase text-[#555] mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ opacity }}
      >
        <ChevronDown size={20} className="text-[#555]" />
      </motion.div>
    </section>
  )
}
