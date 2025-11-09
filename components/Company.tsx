'use client'

import { useHomepageSections } from "@/lib/hooks/useApi";
import { motion } from "motion/react";
import { MapPin, Phone } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Company() {
  const { data, isLoading } = useHomepageSections({ visible: true });
  const section = data?.items?.find((s: any) => s.sectionId === "company");
  const content = section?.content || {};
  const info = content.companyInfo || {};

  if (isLoading)
    return <div className="h-[400px] bg-slate-200 animate-pulse rounded-xl"></div>;

  if (!section)
    return (
      <section className="py-24 text-center text-slate-500">
        データが見つかりません
      </section>
    );

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50" id="company">
      <div className="max-w-6xl mx-auto flex flex-col gap-10 items-center">
        {/* Small title span */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full mb-6"
        >
          会社 / COMPANY
        </motion.span>

        {/* Two child columns */}
        <div className="w-full grid lg:grid-cols-2 gap-10 items-start">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 text-center lg:text-left">
              {info.name || "有限会社 鷲津メッキ工業所"}
            </h2>

            <div className="flex flex-col gap-2 mb-4 text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="text-blue-500 w-5 h-5" />
                <span>{info.phone || "053-595-3456"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-blue-500 w-5 h-5" />
                <span>{info.address || "静岡県湖西市新居町内山1214-2"}</span>
              </div>
              <span>創業: 1961年12月</span>
              <span>従業員: {info.employees || "正規 49名 / 非正規 約32名"}</span>
              <span>資本金: 500万円</span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center lg:justify-start">
              <span className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                自動車金属部品メッキ
              </span>
              <span className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                亜鉛メッキ
              </span>
              <span className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                ニッケルメッキ
              </span>
            </div>
          </motion.div>

          {/* Right logo/image */}
          {info.logo ? (
            <ImageWithFallback
              src={info.logo}
              alt="Company"
              className="w-full h-[300px] lg:h-[400px] object-cover rounded-xl shadow-md"
            />
          ) : (
            <div className="w-full h-[300px] lg:h-[400px] bg-slate-200 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-500">
              画像未設定
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
