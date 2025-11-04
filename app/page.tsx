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

export default function Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Services />
        <Technology />
        <News />
        <Company />
        <Recruit />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
