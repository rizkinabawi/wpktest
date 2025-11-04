'use client'

import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { useHomepageSections } from "@/lib/hooks/useApi";
import { Skeleton } from "./ui/skeleton";

export function Hero() {
  const { data: sectionsData, isLoading } = useHomepageSections({ visible: true });

  const heroSection = sectionsData?.items?.find(
    (section: any) => section.sectionId === "hero"
  );

  const heroContent = heroSection?.content || {};

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <section id="hero" className="relative min-h-screen flex items-center justify-center">
        <Skeleton className="absolute inset-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <Skeleton className="h-10 w-48 mb-8" />
                    <Skeleton className="h-16 w-full mb-6" />
                    <Skeleton className="h-16 w-3/4 mb-6" />
                    <Skeleton className="h-8 w-full mb-8" />
                    <div className="flex flex-wrap items-center gap-4 mb-10">
                        <Skeleton className="h-12 w-48" />
                        <Skeleton className="h-12 w-36" />
                    </div>
                </div>
                <div className="relative hidden lg:block">
                    <Skeleton className="w-full h-[550px] rounded-2xl" />
                </div>
            </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ backgroundImage: `url(${heroContent.image || '/placeholder.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-blue-900/80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {heroContent.badge?.text && (
                <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8"
                >
                <Shield className="h-5 w-5 text-blue-400" />
                <span className="text-white">
                    {heroContent.badge.text}
                </span>
                </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white mb-6 text-4xl lg:text-5xl xl:text-6xl"
            >
              {heroContent.heading || "Default Heading"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-slate-200 mb-8 text-lg"
            >
              {heroContent.subheading || "Default subheading."}
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-slate-200 mb-8 text-lg"
            >
              {heroContent.description || "Default description."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              {(heroContent.buttons || []).map((button: any, index: number) => (
                <Button
                    key={index}
                    size="lg"
                    onClick={() => scrollToSection(button.link.replace("#", ""))}
                    className={`${                        button.variant === 'primary'                            ? 'bg-blue-600 hover:bg-blue-700 text-white'                            : 'bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm'                        } group`}
                >
                    {button.text}
                    {button.variant === 'primary' && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                </Button>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Image removed as it is now background */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-sm">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-white/60 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
