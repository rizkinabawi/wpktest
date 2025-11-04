"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "motion/react"
import { Plus, Edit, Trash2, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useServices, useCreateService, useUpdateService, useDeleteService } from "@/lib/hooks/useApi"

interface Service {
  _id: string
  title: string
  titleEn: string
  description: string
  features: string[]
  applications: string[]
  color?: string
  createdAt: string
  updatedAt: string
}

export default function ServicesManagement() {
  const { data, isLoading } = useServices()
  const createService = useCreateService()
  const updateService = useUpdateService()
  const deleteService = useDeleteService()

  const services = (data?.items || []) as Service[]

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    titleEn: "",
    description: "",
    features: "",
    applications: "",
    color: "from-blue-400 to-blue-600",
  })

  const handleAdd = () => {
    setEditingService(null)
    setFormData({
      title: "",
      titleEn: "",
      description: "",
      features: "",
      applications: "",
      color: "from-blue-400 to-blue-600",
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      title: service.title,
      titleEn: service.titleEn,
      description: service.description,
      features: service.features.join("\n"),
      applications: service.applications.join("\n"),
      color: service.color || "from-blue-400 to-blue-600",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("このサービスを削除してもよろしいですか？")) {
      try {
        await deleteService.mutateAsync(id)
        toast.success("サービスを削除しました")
      } catch (error) {
        toast.error("削除に失敗しました")
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const serviceData = {
      title: formData.title,
      titleEn: formData.titleEn,
      description: formData.description,
      features: formData.features.split("\n").filter(f => f.trim()),
      applications: formData.applications.split("\n").filter(a => a.trim()),
      color: formData.color || "from-blue-400 to-blue-600",
    }

    try {
      if (editingService) {
        await updateService.mutateAsync({ id: editingService._id, data: serviceData })
        toast.success("サービスを更新しました")
      } else {
        await createService.mutateAsync(serviceData)
        toast.success("サービスを追加しました")
      }
      setIsDialogOpen(false)
    } catch (error) {
      toast.error("エラーが発生しました")
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-3xl mb-2">サービス管理</h1>
          <p className="text-slate-400">メッキ加工サービスの管理</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-5 w-5" />
              新規追加
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-slate-900 border-slate-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingService ? "サービスを編集" : "新しいサービスを追加"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-300 mb-2">サービス名（日本語）</label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="例: 亜鉛メッキ"
                  required
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">サービス名（英語）</label>
                <Input
                  type="text"
                  value={formData.titleEn}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                  placeholder="例: Zinc Plating"
                  required
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">説明</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="サービスの詳細説明"
                  required
                  rows={3}
                  className="bg-slate-800 border-slate-700 text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">特徴（1行に1つ）</label>
                <Textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="耐食性向上&#10;低コスト&#10;幅広い用途"
                  required
                  rows={4}
                  className="bg-slate-800 border-slate-700 text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">主な用途（1行に1つ）</label>
                <Textarea
                  value={formData.applications}
                  onChange={(e) => setFormData({ ...formData, applications: e.target.value })}
                  placeholder="自動車部品&#10;建築金物&#10;家電部品"
                  required
                  rows={4}
                  className="bg-slate-800 border-slate-700 text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">カラー（Tailwind gradient）</label>
                <Input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="from-blue-400 to-blue-600"
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={createService.isPending || updateService.isPending}
                >
                  {createService.isPending || updateService.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      処理中...
                    </>
                  ) : (
                    editingService ? "更新" : "追加"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1 border-slate-700 text-white hover:bg-slate-800"
                >
                  キャンセル
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          サービスがありません
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="border-slate-800 bg-slate-900 hover:border-blue-700 transition-all h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-white text-xl mb-1">{service.title}</h3>
                      <p className="text-slate-500 text-sm">{service.titleEn}</p>
                    </div>
                    <Sparkles className="h-6 w-6 text-blue-400 flex-shrink-0" />
                  </div>

                  <p className="text-slate-400 mb-4">{service.description}</p>

                  <div className="mb-4">
                    <div className="text-slate-300 mb-2">特徴</div>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, i) => (
                        <Badge key={i} variant="secondary" className="bg-slate-800 text-slate-300">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-slate-300 mb-2">主な用途</div>
                    <ul className="space-y-1">
                      {service.applications.map((app, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-400 text-sm">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(service)}
                      className="flex-1 border-slate-700 text-blue-400 hover:bg-blue-600/20"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      編集
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(service._id)}
                      className="border-slate-700 text-red-400 hover:bg-red-600/20"
                      disabled={deleteService.isPending}
                    >
                      {deleteService.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
