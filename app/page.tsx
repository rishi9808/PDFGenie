"use client"

import { CallToAction } from "@/components/landing/call-to-action";
import { Faqs } from "@/components/landing/faqs";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Navbar } from "@/components/landing/navbar";
import { ProductShowcase } from "@/components/landing/product-showcase";


export default function Home() {
  

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <ProductShowcase />
      <Faqs />
      <CallToAction />
      <Footer />
    </div>
  )
 
}
