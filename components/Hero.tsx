'use client'

import { motion } from "motion/react";
import { ArrowRight, Shield, Leaf } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background with dual layout */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8"
            >
              <Shield className="h-5 w-5 text-blue-400" />
              <span className="text-white">
                創業以来、確かな技術と信頼の実績
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white mb-6 text-4xl lg:text-5xl xl:text-6xl"
            >
              有限会社 鷲津メッキ工業所は
              <br />
              <span className="text-blue-400">テクノロジー</span>と
              <span className="text-green-400">エコロジー</span>を
              <br />
              両立しています
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-slate-200 mb-8 text-lg"
            >
              最先端のメッキ加工技術と環境に配慮した製造プロセスで、
              お客様のニーズに応える高品質な表面処理を提供いたします。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="bg-blue-600 hover:bg-blue-700 text-white group"
              >
                お問い合わせはこちら
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("services")}
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm"
              >
                サービスを見る
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-blue-400" />
                  <span className="text-white">高品質</span>
                </div>
                <p className="text-slate-300 text-sm">
                  厳格な品質管理
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="h-5 w-5 text-green-400" />
                  <span className="text-white">環境配慮</span>
                </div>
                <p className="text-slate-300 text-sm">
                  エコロジー重視
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white text-2xl">⚡</span>
                  <span className="text-white">迅速対応</span>
                </div>
                <p className="text-slate-300 text-sm">
                  短納期対応可能
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white text-2xl">🏆</span>
                  <span className="text-white">実績豊富</span>
                </div>
                <p className="text-slate-300 text-sm">
                  多数の納入実績
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Factory Production Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Factory Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1651651677615-dffb63ae4d62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvcGxhdGluZyUyMGZhY3RvcnklMjBwcm9kdWN0aW9ufGVufDF8fHx8MTc2MjE2NzA4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Surface Treatment Production Facility"
                  className="w-full h-[550px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-green-600/10" />
              </div>
              
              {/* Info Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-white/20"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">
                      最新設備による
                    </p>
                    <h4 className="text-slate-900 dark:text-white text-lg">
                      表面処理生産ライン
                    </h4>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl text-blue-600 dark:text-blue-400 mb-1">
                      99.5%
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-xs">
                      品質合格率
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-12 -left-12 w-80 h-80 bg-green-600/10 rounded-full blur-3xl -z-10" />
          </motion.div>
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
