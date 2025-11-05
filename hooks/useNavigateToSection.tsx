"use client"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export function useNavigateToSection() {
  const router = useRouter()
  const pathname = usePathname()

  const navigateToSection = (path: string, sectionId?: string) => {
    if (pathname !== path) {
      // Pindah ke halaman root dulu tanpa hash
      router.push(path)
      // Delay supaya DOM render dulu
      setTimeout(() => {
        if (sectionId) {
          const element = document.getElementById(sectionId)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }
      }, 100)
    } else {
      // Sudah di halaman yang sama, langsung scroll
      if (sectionId) {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    }
  }

  return { navigateToSection }
}
