'use client'

import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Leaf, Droplets, Recycle, Battery } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function Technology() {
  const ecoInitiatives = [
    {
      icon: Droplets,
      title: "廃液処理の徹底",
      description: "適切な廃液処理システムにより、環境負荷を最小限に抑えています。",
    },
    {
      icon: Battery,
      title: "省エネルギー設備",
      description: "最新の省エネルギー設備を導入し、CO2排出量の削減に努めています。",
    },
    {
      icon: Recycle,
      title: "資源のリサイクル",
      description: "メッキ液や金属の回収・再利用により、資源の有効活用を推進しています。",
    },
    {
      icon: Leaf,
      title: "環境配慮型薬品",
      description: "環境負荷の少ない薬品を選択し、持続可能な製造を実現しています。",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full mb-6">
            テクノロジー & エコロジー
          </span>
          <h2 className="text-slate-900 dark:text-white mb-4">
            環境に配慮した最新技術
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            私たちは、最先端のメッキ技術と環境保護を両立させることで、
            持続可能な製造を実現しています。
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1761124331539-6e6f4ec937f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHRlY2hub2xvZ3klMjBlY29sb2d5fGVufDF8fHx8MTc2MjAwMzUwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Green Technology"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-blue-600/20" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-slate-900 dark:text-white">
              最先端の設備と技術力
            </h3>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p>
                当社では、常に最新の技術動向を把握し、設備の更新と技術革新に取り組んでいます。
                自動化された生産ラインにより、安定した品質と高い生産効率を実現しています。
              </p>
              <p>
                また、熟練した技術者による細やかな品質管理により、
                お客様に満足いただける製品を提供し続けています。
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-3xl text-blue-600 dark:text-blue-400 mb-2">
                  99.5%
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  品質合格率
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-3xl text-green-600 dark:text-green-400 mb-2">
                  -30%
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  CO2削減実績
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecoInitiatives.map((initiative, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-slate-200 dark:border-slate-800 hover:border-green-500 dark:hover:border-green-500 transition-all hover:shadow-xl h-full group">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <initiative.icon className="h-7 w-7 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="text-slate-900 dark:text-white mb-3">
                    {initiative.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    {initiative.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="border-slate-200 dark:border-slate-800 bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-900 dark:to-green-950/20">
            <CardContent className="p-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
                <h3 className="text-slate-900 dark:text-white">
                  SDGsへの取り組み
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                持続可能な開発目標（SDGs）の達成に向けて、
                環境負荷の低減と資源の有効活用に継続的に取り組んでいます。
                私たちは、次世代に美しい地球を残すための責任を果たします。
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
