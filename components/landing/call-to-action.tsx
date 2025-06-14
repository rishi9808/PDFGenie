import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

export function CallToAction() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  })

  const translateY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <div
      className="bg-black py-[72px] md:px-80 text-center text-white sm:py-24"
      ref={containerRef}
    >
      <div className="container relative max-w-lg">
        <motion.div style={{ translateY }}>
          <Image
            src="/helix2.svg"
            alt=""
            width={300}
            height={100}
            className="absolute left-[calc(100%+36px)] top-6"
          />
        </motion.div>
        <motion.div style={{ translateY }}>
          <Image
            src="/emojistar.svg"
            alt=""
            width={300}
            height={100}
            className="absolute -top-[120px] right-[calc(100%+24px)]"
          />
        </motion.div>
        <h2 className="text-5xl font-bold tracking-tighter sm:text-6xl">
          Ready to Transform Your PDFs?
        </h2>
        <p className="mt-5 text-xl text-white/70">
          Join thousands of users who are already using PDFGenie to unlock the potential of their documents. Start your free account today.
        </p>
        <form className="mx-auto mt-10 flex max-w-sm flex-col gap-2.5 sm:flex-row">
          <input
            type="email"
            placeholder="your@email.com"
            className="h-12 rounded-lg bg-white/20 px-5 placeholder:text-white/30 sm:flex-1"
          />
          <button
            className="h-12 rounded-lg bg-white px-5 font-medium text-black"
            type="submit"
          >
            Start Free Trial
          </button>
        </form>
      </div>
    </div>
  )
}
