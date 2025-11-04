'use client'

import { motion } from "motion/react";
import { Briefcase, GraduationCap, Heart, TrendingUp, Users, Award, Loader2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ApplicationForm } from "./ApplicationForm";
import { useJobPositions } from "@/lib/hooks/useApi";

export function Recruit() {
  const { data: jobPositionsData, isLoading } = useJobPositions({ status: '公開' });
  const apiPositions = jobPositionsData?.items || [];
  const benefits = [
    {
      icon: TrendingUp,
      title: "キャリアアップ",
      description: "技術習得支援制度で、着実にスキルアップできます",
    },
    {
      icon: Heart,
      title: "働きやすい環境",
      description: "社員一人ひとりを大切にする職場づくりを目指しています",
    },
    {
      icon: Award,
      title: "資格取得支援",
      description: "各種資格取得のための費用補助制度があります",
    },
    {
      icon: Users,
      title: "チームワーク",
      description: "先輩社員がしっかりサポートする風通しの良い職場です",
    },
  ];

  return (
    <section id="recruit" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full mb-6">
            採用情報 / RECRUIT
          </span>
          <h2 className="text-slate-900 dark:text-white mb-4">
            一緒に働く仲間を募集しています
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            私たちと一緒に、ものづくりの現場で活躍しませんか。
            未経験の方も大歓迎です。
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1574184383650-5f859b6793c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWN0b3J5JTIwd29ya2VyJTIwcXVhbGl0eXxlbnwxfHx8fDE3NjIwMDM1MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Factory Worker"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
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
              鷲津メッキ工業所で働く魅力
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              当社では、社員一人ひとりが成長できる環境づくりに力を入れています。
              未経験からスタートした先輩社員も多数活躍中です。
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                  <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-slate-900 dark:text-white mb-1">
                    充実した研修制度
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    入社後の基礎研修から、継続的なスキルアップ研修まで、充実した教育体制を整えています。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                  <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-slate-900 dark:text-white mb-1">
                    安定した待遇
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    各種社会保険完備、退職金制度、昇給・賞与年2回など、安心して働ける環境です。
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-xl h-full group">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <benefit.icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="text-slate-900 dark:text-white mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {benefit.description}
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
          className="mb-12"
        >
          <h3 className="text-slate-900 dark:text-white text-center mb-8">
            募集職種
          </h3>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : apiPositions.length === 0 ? (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              現在募集中の職種はありません
            </div>
          ) : (
            <div className="space-y-6">
              {apiPositions.map((position: any, index: number) => (
                <motion.div
                  key={position._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-xl">
                    <CardContent className="p-8">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <h4 className="text-slate-900 dark:text-white mb-2">
                            {position.title}
                          </h4>
                          <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                            {position.employmentType}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-slate-500 dark:text-slate-400 text-sm mb-1">
                            給与
                          </div>
                          <div className="text-slate-900 dark:text-white">
                            {position.salary}
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-6">
                        {position.description}
                      </p>
                      {position.requirements && position.requirements.length > 0 && (
                        <div className="mb-4">
                          <div className="text-slate-700 dark:text-slate-300 mb-3">
                            応募資格
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {position.requirements.map((req: string, reqIndex: number) => (
                              <Badge
                                key={reqIndex}
                                variant="outline"
                                className="border-slate-300 dark:border-slate-600"
                              >
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {position.responsibilities && position.responsibilities.length > 0 && (
                        <div className="mb-4">
                          <div className="text-slate-700 dark:text-slate-300 mb-3">
                            業務内容
                          </div>
                          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
                            {position.responsibilities.map((resp: string, respIndex: number) => (
                              <li key={respIndex}>{resp}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {position.benefits && position.benefits.length > 0 && (
                        <div>
                          <div className="text-slate-700 dark:text-slate-300 mb-3">
                            福利厚生
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {position.benefits.map((benefit: string, benefitIndex: number) => (
                              <Badge
                                key={benefitIndex}
                                variant="outline"
                                className="border-green-300 dark:border-green-600 text-green-700 dark:text-green-300"
                              >
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Application Form */}
        <ApplicationForm />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="border-slate-200 dark:border-slate-800 bg-gradient-to-br from-blue-600 to-indigo-600">
            <CardContent className="p-12 text-center">
              <h3 className="text-white mb-4">
                採用に関するお問い合わせ
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                採用についてのご質問や、工場見学のご希望など、
                お気軽にお問い合わせください。
              </p>
              <button
                onClick={() => {
                  const element = document.getElementById("contact");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-3 bg-white text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                採用についてお問い合わせ
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
