/* eslint-disable react-hooks/exhaustive-deps */
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { useEffect } from 'react'

import { ArrowRight as IconArroRight } from './icons'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

export function Hero() {
  const cursoImageAnimateControls = useAnimation()
  const messageImageAnimateControls = useAnimation()

  const { isSignedIn,} = useUser();
  const router = useRouter();

  const handleDashboardRedirect = () => {
    router.push("/dashboard");
  };

  const handleSignUpRedirect = () => {
    router.push("/sign-up");
  };

  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  }

  const startFloating = (controls: ReturnType<typeof useAnimation>) => {
    controls.start(floatAnimation)
  }

  useEffect(() => {
    startFloating(cursoImageAnimateControls)
    startFloating(messageImageAnimateControls)
  }, [cursoImageAnimateControls, messageImageAnimateControls])

  async function handleDragEnd(controls: ReturnType<typeof useAnimation>) {
    await controls.start({
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: 'easeInOut' },
    })
    startFloating(controls)
  }

  return (
    <div className="gradient-secondary relative overflow-clip bg-gradient-to-b py-[72px] text-white sm:py-24">
      <div className="absolute left-1/2 top-[calc(100%-96px)] h-[375px] w-[750px] -translate-x-1/2 rounded-[100%] border border-[#B48CDE] bg-black bg-[radial-gradient(closest-side,#000_82%,#9560EB)] sm:top-[calc(100%-120px)] sm:h-[728px] sm:w-[1536px] lg:h-[700px] lg:w-[2380px]" />
      <div className="container relative">
        <div className="flex items-center justify-center">
          <a
            href="#"
            className="inline-flex gap-3 rounded-lg border border-zinc-800 px-2 py-1"
          >
            <span className="text-white/50">AI-Powered PDF Intelligence</span>
            <span className="inline-flex items-center gap-1">
              <span>Learn More</span>
              <IconArroRight />
            </span>
          </a>
        </div>
        <div className="mt-8 flex justify-center">
          <div className="relative inline-flex">
            <h1 className="inline-flex text-center text-7xl font-bold tracking-tighter sm:text-[150px]">
              PDFGenie <br /> Your AI Assistant
            </h1>
            <motion.div
              className="absolute right-[900px] top-[280px] hidden sm:inline"
              drag
              dragSnapToOrigin
              initial={{ y: 0 }}
              animate={cursoImageAnimateControls}
              onDragStart={() => cursoImageAnimateControls.stop()}
              onDragEnd={() => handleDragEnd(cursoImageAnimateControls)}
            >
              <Image
                src="/cursor.svg"
                alt=""
                height={200}
                width={200}
                className="max-w-none"
                draggable="false"
              />
            </motion.div>
            <motion.div
              className="absolute right-[5px]  hidden sm:inline"
              drag
              dragSnapToOrigin
              initial={{ y: 0 }}
              animate={messageImageAnimateControls}
              onDragStart={() => messageImageAnimateControls.stop()}
              onDragEnd={() => handleDragEnd(messageImageAnimateControls)}
            >
              <Image
                src="/message.svg"
                alt=""
                height={200}
                width={200}
                className="max-w-none"
                draggable="false"
              />
            </motion.div>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="mt-8 max-w-md text-center text-xl">
            Unlock the power of your PDF documents with AI-driven conversations. Upload any PDF and get instant, intelligent answers to your questions. Transform static documents into dynamic knowledge sources.
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          {/* {<button className="rounded-lg bg-white px-5 py-3 font-medium text-black">
            Start with PDFGenie Free
          </button>} */}
          {
            isSignedIn ? 
            (
              <Button
                className="rounded-lg bg-white px-5 py-3 font-medium text-black"
                onClick={handleDashboardRedirect}
              >
                Go to Dashboard
              </Button>
            ) : (
              <Button
                className="rounded-lg bg-white px-5 py-3 font-medium text-black"
                onClick={handleSignUpRedirect}
              >
                Start with PDFGenie Free
              </Button>
            )
          }
        </div>
      </div>
    </div>
  )
}
