"use client"

import { useState, useEffect } from "react"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigateToSection } from "@/hooks/useNavigateToSection"
import { useRouter } from "next/navigation"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNewsHover, setIsNewsHover] = useState(false)
  const { navigateToSection } = useNavigateToSection()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "TOP", id: "hero", labelJa: "トップ" },
    { label: "SERVICE", id: "services", labelJa: "サービス" },
    { label: "COMPANY", id: "company", labelJa: "会社概要" },
    { label: "RECRUIT", id: "recruit", labelJa: "採用情報" },
    { label: "INQUIRY", id: "contact", labelJa: "お問い合わせ" },
  ]

  const newsLinks = [
    { label: "NEWS", id : "news", labelJa: "ニュース" },
    { label: "EVENTS", href: "/events", labelJa: "イベント" },
    { label: "PRODUCTS", href: "/products", labelJa: "製品" },
  ]

  const scrollOrPush = (id?: string, href?: string) => {
    if (href && id !== "news") {
      router.push(href)
    } else if (id) {
      navigateToSection("/", id)
    }
    else {
    navigateToSection("/", "news")
    }
    setIsMobileMenuOpen(false)
    setIsNewsHover(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-lg"
          : "bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.button
            onClick={() => navigateToSection("/", "hero")}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center text-left">
              <div className="text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                有限会社
              </div>
              <div className="text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                鷲津メッキ工業所
              </div>
            </div>
          </motion.button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollOrPush(link.id)}
                className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group"
              >
                <div className="text-center">
                  <div className="text-xs opacity-70">{link.labelJa}</div>
                  <div>{link.label}</div>
                </div>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full" />
              </button>
            ))}

            {/* News with hover dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsNewsHover(true)}
              onMouseLeave={() => setIsNewsHover(false)}
            >
              <button className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group">
                <div className="text-center">
                  <div className="text-xs opacity-70">{newsLinks[0].labelJa}</div>
                  <div>{newsLinks[0].label}</div>
                </div>
              </button>

              <AnimatePresence>
                {isNewsHover && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute mt-2 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-50"
                  >
                    {newsLinks.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => scrollOrPush(undefined, item.href)}
                        className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                      >
                        <div className="text-xs opacity-70">{item.labelJa}</div>
                        <div>{item.label}</div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Phone */}
            <a
              href="tel:+81-XXX-XXXX-XXXX"
              className="ml-4 flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>お電話でのお問い合わせ</span>
            </a>
          </div>

          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800"
          >
            <div className="px-4 py-6 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollOrPush(link.id)}
                  className="block w-full text-left px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors"
                >
                  <div>
                    <div className="text-xs opacity-70">{link.labelJa}</div>
                    <div>{link.label}</div>
                  </div>
                </button>
              ))}

              {newsLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollOrPush(undefined, item.href)}
                  className="block w-full text-left px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors"
                >
                  <div>
                    <div className="text-xs opacity-70">{item.labelJa}</div>
                    <div>{item.label}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
