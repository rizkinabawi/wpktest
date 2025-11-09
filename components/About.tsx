'use client'

import { motion } from "motion/react";
import { useHomepageSections } from "@/lib/hooks/useApi";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Award, Zap, Shield, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function About() {
  const { data: sectionsData, isLoading } = useHomepageSections({ visible: true });

  const aboutSection = sectionsData?.items?.find(
    (section: any) => section.sectionId === "about"
  );

  const aboutContent = aboutSection?.content || {};

  const features = [
    {
      icon: Award,
      title: "確かな技術",
      description: "長年培った高度なメッキ技術により、様々な素材・形状に対応",
    },
    {
      icon: Shield,
      title: "品質保証",
      description: "徹底した品質管理体制で、安定した高品質を実現",
    },
    {
      icon: Zap,
      title: "迅速納品",
      description: "効率的な生産体制により、短納期でのご納品が可能",
    },
    {
      icon: Users,
      title: "丁寧な対応",
      description: "お客様のご要望に応じた、きめ細やかなサービスを提供",
    },
  ];

  if (isLoading) {
    return <div className="text-center text-slate-500 py-10">Loading...</div>;
  }

  if (!aboutContent) {
    return <div className="text-center text-red-500 py-10">Tidak ada data.</div>;
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Teks */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full mb-6">
              {aboutContent.tagline || "鷲津メッキ工業所について"}
            </span>
            <h2 className="text-slate-900 dark:text-white mb-6 text-3xl font-bold leading-snug">
              {aboutContent.title || "テクノロジーとエコロジーの融合を実現する"}
            </h2>

            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              {Array.isArray(aboutContent.description)
                ? aboutContent.description.map((text: string, index: number) => (
                    <p key={index}>{text}</p>
                  ))
                : <p>{aboutContent.description}</p>}
            </div>
          </motion.div>

          {/* Gambar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={aboutContent.image || "https://images.unsplash.com/photo-1513828583688-c52646db42da?crop=entropy&cs=tinysrgb&fit=max&w=1080"}
                alt="About image"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-blue-600/10 rounded-2xl -z-10" />
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-green-600/10 rounded-2xl -z-10" />
          </motion.div>
        </div>

        {/* Fitur statis */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-xl h-full group">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-slate-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
