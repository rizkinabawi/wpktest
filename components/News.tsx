'use client'

import { motion } from "motion/react";
import { Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useNews } from "@/lib/hooks/useApi";

export function News() {
  const { data, isLoading } = useNews({ limit: 4, status: '公開' });
  const news = data?.items || [];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8" id="news">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full mb-6">
            お知らせ / NEWS
          </span>
          <h2 className="text-slate-900 dark:text-white mb-4">
            最新情報
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            鷲津メッキ工業所からの最新のお知らせや情報をご覧いただけます。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <Card className="border-slate-200 dark:border-slate-800 h-full">
                  <CardContent className="p-6">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-4"></div>
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              </div>
            ))
          ) : news.length > 0 ? (
            news.map((item: any, index: number) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-xl group cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                        <Calendar className="h-4 w-4" />
                        <span>{item.date}</span>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                        {item.category}
                      </Badge>
                    </div>
                    <h3 className="text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all">
                      <span>詳しく見る</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-slate-500 dark:text-slate-400">お知らせはまだありません</p>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="inline-flex items-center gap-2 px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors">
            過去のお知らせを見る
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
