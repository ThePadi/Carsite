'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/inventory', label: 'Stock' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsub = scrollY.on('change', (y) => setScrolled(y > 60))
    return unsub
  }, [scrollY])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(10,10,11,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
        <Link href="/" className="flex flex-col leading-none group">
          <span
            className="text-xl font-bold tracking-[0.15em] text-[#f0ede8] group-hover:text-[#c9a96e] transition-colors"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            OC MOTORS
          </span>
          <span className="text-[9px] tracking-[0.35em] text-[#c9a96e] uppercase font-medium">
            Newquay · Cornwall
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-widest uppercase text-[#888] hover:text-[#f0ede8] transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#c9a96e] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="tel:+441637000000"
            className="hidden md:flex items-center gap-2 text-sm text-[#c9a96e] hover:text-[#e0c28a] transition-colors tracking-wide"
          >
            <Phone size={14} />
            01637 000 000
          </a>
          <Link
            href="/inventory"
            className="hidden md:inline-flex items-center px-5 py-2.5 bg-[#c9a96e] text-[#0a0a0b] text-xs font-semibold tracking-widest uppercase rounded-sm hover:bg-[#e0c28a] transition-colors duration-300"
          >
            Browse Stock
          </Link>
          <button
            className="md:hidden text-[#f0ede8]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-[#0a0a0b] border-t border-white/5"
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm tracking-widest uppercase text-[#888] hover:text-[#f0ede8] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a href="tel:+441637000000" className="text-sm text-[#c9a96e] flex items-center gap-2">
            <Phone size={14} /> 01637 000 000
          </a>
        </div>
      </motion.div>
    </motion.header>
  )
}
