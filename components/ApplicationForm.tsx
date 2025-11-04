'use client'

import { useState } from "react"
import { motion } from "motion/react"
import { Upload, Send, FileText } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Card, CardContent } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label"
import { useCreateApplication, useJobPositions } from "@/lib/hooks/useApi"

export function ApplicationForm() {
  const createApplication = useCreateApplication()
  const { data: jobPositionsData, isLoading: jobPositionsLoading } = useJobPositions({ status: '公開' })
  const jobPositions = jobPositionsData?.items || []

  const [formData, setFormData] = useState({
    position: "",
    name: "",
    age: "",
    email: "",
    phone: "",
    experience: "",
    motivation: "",
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formDataToSend = new FormData()
    formDataToSend.append('position', formData.position)
    formDataToSend.append('name', formData.name)
    formDataToSend.append('age', formData.age)
    formDataToSend.append('email', formData.email)
    formDataToSend.append('phone', formData.phone)
    formDataToSend.append('experience', formData.experience)
    formDataToSend.append('motivation', formData.motivation)
    
    if (resumeFile) {
      formDataToSend.append('resume', resumeFile)
    }

    await createApplication.mutateAsync(formDataToSend)

    // Reset form
    setFormData({
      position: "",
      name: "",
      age: "",
      email: "",
      phone: "",
      experience: "",
      motivation: "",
    })
    setResumeFile(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      id="application-form"
    >
      <Card className="border-slate-200 dark:border-slate-800">
        <CardContent className="p-8">
          <div className="mb-6">
            <h3 className="text-slate-900 dark:text-white mb-2">応募フォーム</h3>
            <p className="text-slate-600 dark:text-slate-400">
              下記のフォームに必要事項をご記入の上、送信してください。
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="position" className="text-slate-700 dark:text-slate-300">
                  応募職種 <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.position}
                  onValueChange={(value) => setFormData({ ...formData, position: value })}
                  required
                  disabled={jobPositionsLoading}
                >
                  <SelectTrigger id="position" className="w-full">
                    <SelectValue placeholder={jobPositionsLoading ? "読み込み中..." : "職種を選択してください"} />
                  </SelectTrigger>
                  <SelectContent>
                    {jobPositions.length > 0 ? (
                      jobPositions.map((job: any) => (
                        <SelectItem key={job._id} value={job.title}>
                          {job.title}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-positions" disabled>
                        現在募集中の職種はありません
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">
                  お名前 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="山田太郎"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="age" className="text-slate-700 dark:text-slate-300">
                  年齢 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="28"
                  min="18"
                  max="100"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
                  メールアドレス <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300">
                電話番号 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="090-1234-5678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="experience" className="text-slate-700 dark:text-slate-300">
                職務経歴 <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="experience"
                placeholder="これまでの職務経歴をご記入ください"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                required
                rows={4}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="motivation" className="text-slate-700 dark:text-slate-300">
                志望動機 <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="motivation"
                placeholder="志望動機をご記入ください"
                value={formData.motivation}
                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                required
                rows={4}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="resume" className="text-slate-700 dark:text-slate-300">
                履歴書 (PDF, DOC, DOCX)
              </Label>
              <div className="mt-2">
                <label
                  htmlFor="resume"
                  className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                >
                  <div className="text-center">
                    {resumeFile ? (
                      <>
                        <FileText className="mx-auto h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
                        <p className="text-sm text-slate-600 dark:text-slate-400">{resumeFile.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                          {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </>
                    ) : (
                      <>
                        <Upload className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          クリックしてファイルを選択
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                          PDF, DOC, DOCX (最大10MB)
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
              disabled={createApplication.isPending}
            >
              {createApplication.isPending ? (
                "送信中..."
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  応募する
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

