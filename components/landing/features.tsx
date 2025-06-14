import { featuresList } from "@/lib/utils/features-list"
import { FeatureCard } from './feature-card'

export function Features() {
  return (
    <div className="bg-black py-[72px] text-white sm:py-24">
      <div className="container">
        <h2 className="text-center text-5xl font-bold tracking-tighter sm:text-6xl">
          Transform Your PDFs with AI
        </h2>
        <div className="mx-auto max-w-xl">
          <p className="mt-5 text-center text-xl text-white/70">
            Experience the future of document interaction with PDFGenie&apos;s advanced AI technology. Upload, analyze, and chat with your PDFs like never before.
          </p>
        </div>
        <div className="mt-16 flex flex-col gap-4 sm:flex-row">
          {featuresList.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  )
}
