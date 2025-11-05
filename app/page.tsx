'use client'

import { Navigation } from "@/components/Navigation"
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Services } from "@/components/Services"
import { Technology } from "@/components/Technology"
import { News } from "@/components/News"
import { Company } from "@/components/Company"
import { Recruit } from "@/components/Recruit"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"
import { Toaster } from "@/components/ui/sonner"
import { useHomepageSections } from "@/lib/hooks/useApi"
import { Loader2 } from "lucide-react"
import SampleProduct from "@/lib/models/SampleProduct"

export default function Page() {
  const { data, isLoading } = useHomepageSections()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950 text-white">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  // Mapping antara sectionId dan komponen yang akan ditampilkan
  const sectionMap: Record<string, JSX.Element> = {
    hero: <Hero />,
    about: <About />,
    services: <Services />,
    technology: <Technology />,
    SampleProduct : <SampleProduct />,
    news: <News />,
    company: <Company />,
    recruit: <Recruit />,
    contact: <Contact />,
  }

  // Section default (kalau CMS belum ada datanya)
  const defaultSections = [
    "hero",
    "about",
    "services",
    "technology",
    "news",
    "company",
    "recruit",
    "contact",
  ]

  // Kalau CMS sudah punya data, pakai urutan + visibility dari sana
  const cmsSections =
    data?.items
      ?.sort((a: any, b: any) => a.order - b.order)
      ?.filter((s: any) => s.isVisible) || []

  // Gabungkan CMS section dan default (biar tidak ada yang hilang)
  const mergedSections = [
    ...cmsSections.map((s: any) => s.sectionId),
    ...defaultSections.filter(
      (d) => !cmsSections.some((s: any) => s.sectionId === d)
    ),
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navigation />
      <main>
        {mergedSections.map((sectionId) => (
          <div key={sectionId}>{sectionMap[sectionId] || null}</div>
        ))}
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
