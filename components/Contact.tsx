"use client"

import type React from "react"

import { motion } from "motion/react"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Card, CardContent } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Checkbox } from "./ui/checkbox"
import { useState } from "react"
import { toast } from "sonner"
import { useCreateInquiry } from "@/lib/hooks/useApi"

export function Contact() {
  const createInquiry = useCreateInquiry()
  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    agreedToTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.agreedToTerms) {
      toast.error("プライバシーポリシーに同意してください")
      return
    }

    await createInquiry.mutateAsync({
      companyName: formData.companyName,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
    })

    setFormData({
      companyName: "",
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      agreedToTerms: false,
    })
  }

  const contactMethods = [
    {
      icon: Phone,
      title: "お電話でのお問い合わせ",
      value: "03-XXXX-XXXX",
      description: "平日 8:00 - 17:00",
      link: "tel:03-XXXX-XXXX",
    },
    {
      icon: Mail,
      title: "メールでのお問い合わせ",
      value: "info@washidu-mekki.com",
      description: "24時間受付",
      link: "mailto:info@washidu-mekki.com",
    },
    {
      icon: MapPin,
      title: "ご来社でのお問い合わせ",
      value: "東京都XX区XXXX-XX-XX",
      description: "要事前予約",
      link: null,
    },
  ]

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full mb-6">
            お問い合わせ / INQUIRY
          </span>
          <h2 className="text-slate-900 dark:text-white mb-4">お気軽にご相談ください</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            メッキ加工に関するご質問、お見積りのご依頼など、 どんなことでもお気軽にお問い合わせください。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-xl h-full">
                <CardContent className="p-8 text-center">
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <method.icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="text-slate-900 dark:text-white mb-3">{method.title}</h4>
                  {method.link ? (
                    <a href={method.link} className="text-blue-600 dark:text-blue-400 hover:underline block mb-2">
                      {method.value}
                    </a>
                  ) : (
                    <p className="text-slate-900 dark:text-white mb-2">{method.value}</p>
                  )}
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{method.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h3 className="text-slate-900 dark:text-white mb-6">お問い合わせフォーム</h3>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p>
                下記のフォームに必要事項をご記入の上、送信してください。 担当者より折り返しご連絡させていただきます。
              </p>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-900 dark:text-white mb-1">お問い合わせ受付時間</div>
                    <p className="text-sm">
                      24時間受付
                      <br />
                      （回答は営業時間内となります）
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <p className="text-sm">
                  ※ お急ぎの場合は、お電話にてお問い合わせください。
                  <br />※ 営業時間：平日 8:00 - 17:00
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="border-slate-200 dark:border-slate-800">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="companyName" className="block text-slate-700 dark:text-slate-300 mb-2">
                        会社名・団体名
                      </label>
                      <Input
                        id="companyName"
                        type="text"
                        placeholder="株式会社○○"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="name" className="block text-slate-700 dark:text-slate-300 mb-2">
                        お名前 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="山田 太郎"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-slate-700 dark:text-slate-300 mb-2">
                        メールアドレス <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-slate-700 dark:text-slate-300 mb-2">
                        電話番号 <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="03-1234-5678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-slate-700 dark:text-slate-300 mb-2">
                      お問い合わせ内容 <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => setFormData({ ...formData, service: value })}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="見積り依頼">見積り依頼</SelectItem>
                        <SelectItem value="技術相談">技術相談</SelectItem>
                        <SelectItem value="納期確認">納期確認</SelectItem>
                        <SelectItem value="サンプル依頼">サンプル依頼</SelectItem>
                        <SelectItem value="工場見学">工場見学</SelectItem>
                        <SelectItem value="採用について">採用について</SelectItem>
                        <SelectItem value="その他">その他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-slate-700 dark:text-slate-300 mb-2">
                      お問い合わせ詳細 <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      placeholder="メッキの種類、数量、納期、その他ご要望などをご記入ください"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="w-full resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={formData.agreedToTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreedToTerms: checked as boolean })}
                      className="mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400">
                      <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                        プライバシーポリシー
                      </a>
                      に同意します <span className="text-red-500">*</span>
                    </label>
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Send className="mr-2 h-5 w-5" />
                    送信する
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
