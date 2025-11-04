'use client'

import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Sparkles } from "lucide-react";
import { useServices } from "@/lib/hooks/useApi";

export function Services() {
  const { data, isLoading } = useServices();
  const services = data?.items || [];

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full mb-6">
            サービス / SERVICE
          </span>
          <h2 className="text-slate-900 dark:text-white mb-4">
            各種メッキ加工サービス
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            お客様のニーズに合わせた多様なメッキ加工サービスを提供しています。
            用途や素材に応じて最適な表面処理をご提案いたします。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <Card className="border-slate-200 dark:border-slate-800 h-full overflow-hidden">
                  <div className="h-2 bg-slate-200 dark:bg-slate-700" />
                  <CardContent className="p-8">
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mb-6"></div>
                    <div className="flex gap-2 mb-6">
                      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
                      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-20"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          ) : services.length > 0 ? (
            services.map((service: any, index: number) => (
              <motion.div
                key={service.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-2xl h-full overflow-hidden group">
                  <div className={`h-2 bg-gradient-to-r ${service.color || 'from-blue-400 to-blue-600'}`} />
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-slate-900 dark:text-white mb-1">
                          {service.title}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                          {service.titleEn}
                        </p>
                      </div>
                      <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      {service.description}
                    </p>

                    <div className="mb-6">
                      <div className="text-slate-700 dark:text-slate-300 mb-3">
                        特徴
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {service.features?.map((feature: string, featureIndex: number) => (
                          <Badge
                            key={featureIndex}
                            variant="secondary"
                            className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-slate-700 dark:text-slate-300 mb-3">
                        主な用途
                      </div>
                      <ul className="space-y-2">
                        {service.applications?.map((app: string, appIndex: number) => (
                          <li
                            key={appIndex}
                            className="flex items-center gap-2 text-slate-600 dark:text-slate-400"
                          >
                            <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full flex-shrink-0" />
                          {app}
                        </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-slate-500 dark:text-slate-400">サービスはまだありません</p>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="border-slate-200 dark:border-slate-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/30">
            <CardContent className="p-12">
              <h3 className="text-slate-900 dark:text-white mb-4">
                その他のメッキ加工もご相談ください
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                上記以外のメッキ加工や特殊表面処理についても対応可能です。
                お気軽にお問い合わせください。専門スタッフが最適なソリューションをご提案いたします。
              </p>
              <button
                onClick={() => {
                  const element = document.getElementById("contact");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                お問い合わせはこちら
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
