import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#050506] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="mb-4">
              <span
                className="text-2xl font-bold tracking-[0.15em] text-[#f0ede8]"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                MOKAS
              </span>
              <span className="block text-[9px] tracking-[0.35em] text-[#c9a96e] uppercase font-medium mt-0.5">
                Motors · Newquay
              </span>
            </div>
            <p className="text-sm text-[#666] leading-relaxed max-w-xs">
              Hand-picked, meticulously inspected used cars in the heart of Cornwall.
              Transparent pricing, no pressure, and a personal service you can trust.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#666] hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#666] hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase text-[#c9a96e] mb-5 font-medium">Navigation</h4>
            <ul className="space-y-3">
              {[['/', 'Home'], ['/inventory', 'Browse Stock'], ['/#about', 'About Us'], ['/#contact', 'Contact']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[#666] hover:text-[#f0ede8] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase text-[#c9a96e] mb-5 font-medium">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-[#666]">
                <MapPin size={14} className="mt-0.5 shrink-0 text-[#c9a96e]" />
                <span>123 Fore Street, Newquay, Cornwall, TR7 1AA</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#666]">
                <Phone size={14} className="shrink-0 text-[#c9a96e]" />
                <a href="tel:+441637000000" className="hover:text-[#f0ede8] transition-colors">01637 000 000</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#666]">
                <Mail size={14} className="shrink-0 text-[#c9a96e]" />
                <a href="mailto:hello@mokasmotors.co.uk" className="hover:text-[#f0ede8] transition-colors">hello@mokasmotors.co.uk</a>
              </li>
            </ul>
            <div className="mt-4 text-sm text-[#555]">
              <p>Mon–Fri: 9am – 6pm</p>
              <p>Sat: 10am – 4pm</p>
              <p>Sun: By appointment</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#444]">
          <p>© {new Date().getFullYear()} Mokas Motors Ltd. All rights reserved.</p>
          <p>Registered in England & Wales · FCA Authorised</p>
        </div>
      </div>
    </footer>
  )
}
