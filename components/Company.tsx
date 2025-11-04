'use client'

import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Building2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Company() {
  const companyInfo = [
    {
      label: "会社名",
      value: "有限会社 鷲津メッキ工業所",
      valueEn: "Washidu Mekki Kogyo-sho Co., Ltd.",
    },
    {
      label: "設立",
      value: "昭和XX年XX月",
    },
    {
      label: "代表者",
      value: "代表取締役 鷲津 XX",
    },
    {
      label: "資本金",
      value: "300万円",
    },
    {
      label: "従業員数",
      value: "XX名",
    },
    {
      label: "事業内容",
      value: "各種金属表面処理（メッキ加工）",
      valueEn: "Metal Surface Treatment (Plating)",
    },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      label: "所在地",
      value: "〒XXX-XXXX",
      value2: "東京都XX区XXXX-XX-XX",
    },
    {
      icon: Phone,
      label: "電話",
      value: "03-XXXX-XXXX",
      link: "tel:03-XXXX-XXXX",
    },
    {
      icon: Mail,
      label: "メール",
      value: "info@washidu-mekki.com",
      link: "mailto:info@washidu-mekki.com",
    },
    {
      icon: Clock,
      label: "営業時間",
      value: "平日 8:00 - 17:00",
      value2: "（土日祝日休業）",
    },
  ];

  return (
    <section id="company" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full mb-6">
            会社概要 / COMPANY
          </span>
          <h2 className="text-slate-900 dark:text-white mb-4">
            会社情報
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            鷲津メッキ工業所の企業情報をご紹介します。
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-slate-200 dark:border-slate-800 h-full">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-slate-900 dark:text-white">
                    企業情報
                  </h3>
                </div>
                <div className="space-y-6">
                  {companyInfo.map((info, index) => (
                    <div key={index} className="border-b border-slate-200 dark:border-slate-700 pb-4 last:border-0 last:pb-0">
                      <div className="text-slate-500 dark:text-slate-400 mb-2">
                        {info.label}
                      </div>
                      <div className="text-slate-900 dark:text-white">
                        {info.value}
                      </div>
                      {info.valueEn && (
                        <div className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                          {info.valueEn}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-slate-200 dark:border-slate-800 h-full">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-slate-900 dark:text-white">
                    お問い合わせ先
                  </h3>
                </div>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex-shrink-0">
                        <info.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-slate-500 dark:text-slate-400 mb-1">
                          {info.label}
                        </div>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <>
                            <div className="text-slate-900 dark:text-white">
                              {info.value}
                            </div>
                            {info.value2 && (
                              <div className="text-slate-900 dark:text-white">
                                {info.value2}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <h3 className="text-slate-900 dark:text-white mb-4">
                    アクセス
                  </h3>
                  <div className="space-y-4 text-slate-600 dark:text-slate-400">
                    <p>
                      <strong className="text-slate-900 dark:text-white">最寄り駅：</strong>
                      <br />
                      XX線「XX駅」より徒歩XX分
                    </p>
                    <p>
                      <strong className="text-slate-900 dark:text-white">お車でお越しの場合：</strong>
                      <br />
                      XX高速道路「XXインター」より車で約XX分
                      <br />
                      駐車場あり（X台）
                    </p>
                  </div>
                </div>
                <div className="relative h-[400px] lg:h-auto">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1647427060118-4911c9821b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjIwMDM1MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Company Location"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
                  {/* Google Maps placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
                    <div className="text-center text-white">
                      <MapPin className="h-12 w-12 mx-auto mb-3" />
                      <p>Google Maps</p>
                      <p className="text-sm opacity-80">（実装時に埋め込み）</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
