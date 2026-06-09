'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react'

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.4em] uppercase text-[#c9a96e] font-medium mb-4"
          >
            Get In Touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#f0ede8]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Come and see us
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              {[
                { icon: MapPin, label: 'Address', value: '123 Fore Street, Newquay, Cornwall, TR7 1AA', href: 'https://maps.google.com/?q=Newquay+Cornwall' },
                { icon: Phone, label: 'Phone', value: '01637 000 000', href: 'tel:+441637000000' },
                { icon: Mail, label: 'Email', value: 'hello@ocmotorsnewquay.co.uk', href: 'mailto:hello@ocmotorsnewquay.co.uk' },
              ].map(({ icon: Icon, label, value, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-sm bg-[#111114] border border-white/5 flex items-center justify-center shrink-0 group-hover:border-[#c9a96e]/30 transition-colors">
                    <Icon size={15} className="text-[#c9a96e]" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-[#555] mb-0.5">{label}</p>
                    <p className="text-sm text-[#ccc] group-hover:text-[#f0ede8] transition-colors">{value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.a
              href="https://wa.me/441637000000"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 px-5 py-3.5 bg-[#25D366]/10 border border-[#25D366]/30 rounded-sm text-[#25D366] hover:bg-[#25D366]/20 transition-colors w-fit"
            >
              <MessageCircle size={18} />
              <span className="text-sm font-medium">Chat on WhatsApp</span>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-sm overflow-hidden border border-white/5 h-52"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10504.88!2d-5.0811!3d50.4119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486b6fb8e62b5e9b%3A0x77a92f0cfb1b7bc4!2sNewquay%2C+Cornwall!5e0!3m2!1sen!2suk!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) brightness(0.7)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            <div className="text-sm text-[#555]">
              <p className="font-medium text-[#888] mb-1">Opening Hours</p>
              <p>Monday – Friday: 9:00am – 6:00pm</p>
              <p>Saturday: 10:00am – 4:00pm</p>
              <p>Sunday: By appointment only</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#111114] border border-white/5 rounded-sm p-8"
          >
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-12 h-12 rounded-full bg-[#c9a96e]/20 flex items-center justify-center mb-4">
                  <Send size={20} className="text-[#c9a96e]" />
                </div>
                <h3 className="text-lg font-semibold text-[#f0ede8] mb-2">Message Sent!</h3>
                <p className="text-sm text-[#666]">We&apos;ll be in touch within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-[#f0ede8] mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Send an Enquiry
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { id: 'name', label: 'Your Name', type: 'text', required: true },
                    { id: 'email', label: 'Email Address', type: 'email', required: true },
                    { id: 'phone', label: 'Phone Number', type: 'tel', required: false },
                  ].map(({ id, label, type, required }) => (
                    <div key={id}>
                      <label className="text-[10px] tracking-widest uppercase text-[#555] block mb-1.5">{label}</label>
                      <input
                        type={type}
                        required={required}
                        value={form[id as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                        className="w-full bg-[#0a0a0b] border border-white/10 text-sm text-[#f0ede8] px-4 py-3 rounded-sm focus:outline-none focus:border-[#c9a96e]/50 transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-[#555] block mb-1.5">Message</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#0a0a0b] border border-white/10 text-sm text-[#f0ede8] px-4 py-3 rounded-sm focus:outline-none focus:border-[#c9a96e]/50 transition-colors resize-none"
                      placeholder="Tell us which car you're interested in..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#c9a96e] text-[#0a0a0b] text-sm font-semibold tracking-widest uppercase hover:bg-[#e0c28a] transition-colors"
                  >
                    Send Enquiry
                  </button>
                  <p className="text-xs text-[#555] text-center">No spam, ever. We reply within 24 hours.</p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
