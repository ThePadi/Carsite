'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, TrendingDown, MapPin, Star } from 'lucide-react'

function StatCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = (ts: number) => {
      if (!start) start = ts
      const prog = Math.min((ts - start) / 1500, 1)
      const eased = 1 - Math.pow(1 - prog, 3)
      setDisplay(Math.round(eased * value))
      if (prog < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, value])

  return (
    <div ref={ref} className="text-4xl font-bold text-[#c9a96e] mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
      {display}{suffix}
    </div>
  )
}

const stats = [
  { value: 50, suffix: '+', label: 'Cars Sold' },
  { value: 10, suffix: '+', label: 'Years in Cornwall' },
  { value: 5, suffix: '★', label: 'Google Rating' },
  { value: 100, suffix: '%', label: 'No-Pressure Promise' },
]

const pillars = [
  {
    icon: TrendingDown,
    title: 'Transparent Pricing',
    body: "Every car comes with a full local market analysis showing exactly how our price compares to similar cars in Cornwall and the South West.",
  },
  {
    icon: Shield,
    title: 'Pre-Sale Inspection',
    body: "Each vehicle is independently inspected before listing. We share the full report so you know exactly what you're buying.",
  },
  {
    icon: MapPin,
    title: 'Based in Newquay',
    body: "We're a local business, not a faceless group. Walk in, meet us, and drive your next car away the same day.",
  },
  {
    icon: Star,
    title: 'After-Sales Support',
    body: "Our relationship doesn't end at handover. We're always on the end of the phone for any questions or needs post-purchase.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#050506]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e] font-medium mb-4"
          >
            About Mokas Motors
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#f0ede8] leading-tight"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            A different kind of car dealer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-[#666] leading-relaxed"
          >
            We started Mokas Motors because we were frustrated with the used car buying experience —
            hidden fees, inflated prices, and high-pressure sales tactics. We do things differently:
            complete transparency, fair prices backed by real local data, and a relaxed showroom
            in the heart of Newquay.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map(({ value, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[#111114] border border-white/5 rounded-sm p-6 text-center"
            >
              <StatCounter value={value} suffix={suffix} />
              <div className="text-xs tracking-widest uppercase text-[#555]">{label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
            >
              <div className="w-10 h-10 rounded-sm bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center mb-4 group-hover:bg-[#c9a96e]/20 transition-colors">
                <Icon size={18} className="text-[#c9a96e]" />
              </div>
              <h3 className="font-semibold text-[#f0ede8] mb-2">{title}</h3>
              <p className="text-sm text-[#666] leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
