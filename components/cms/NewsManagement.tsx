"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "motion/react"
import { Plus, Edit, Trash2, Eye, Calendar, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useNews, useCreateNews, useUpdateNews, useDeleteNews } from "@/lib/hooks/useApi"
import { format } from "date-fns"
import { ja } from "date-fns/locale/ja"

interface NewsItem {
  _id: string
  date: string
  category: string
  title: string
  description: string
  content: string
  status: "公開" | "下書き"
  views: number
  createdAt: string
  updatedAt: string
}

export default function NewsManagement() {
  const { data, isLoading } = useNews()
  const createNews = useCreateNews()
  const updateNews = useUpdateNews()
  const deleteNews = useDeleteNews()

  const newsItems = (data?.items || []) as NewsItem[]
  const [filter, setFilter] = useState<"all" | "公開" | "下書き">("all")
  const filteredNews = filter === "all" ? newsItems : newsItems.filter(item => item.status === filter)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [formData, setFormData] = useState({
    date: "",
    category: "",
    title: "",
    description: "",
    content: "",
    status: "公開" as "公開" | "下書き",
  })

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "yyyy.MM.dd", { locale: ja })
    } catch {
      return dateString
    }
  }

  const handleAdd = () => {
    setEditingNews(null)
    setFormData({
      date: new Date().toISOString().split("T")[0].replace(/-/g, "."),
      category: "",
      title: "",
      description: "",
      content: "",
      status: "公開",
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (item: NewsItem) => {
    setEditingNews(item)
    setFormData({
      date: item.date,
      category: item.category,
      title: item.title,
      description: item.description,
      content: item.content,
      status: item.status,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("このお知らせを削除してもよろしいですか？")) {
      try {
        await deleteNews.mutateAsync(id)
        toast.success("お知らせを削除しました")
      } catch (error) {
        toast.error("削除に失敗しました")
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newsData = {
      date: formData.date,
      category: formData.category,
      title: formData.title,
      description: formData.description,
      content: formData.content,
      status: formData.status,
    }

    try {
      if (editingNews) {
        await updateNews.mutateAsync({ id: editingNews._id, data: newsData })
        toast.success("お知らせを更新しました")
      } else {
        await createNews.mutateAsync(newsData)
        toast.success("お知らせを追加しました")
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
          <h1 className="text-white text-3xl mb-2">お知らせ管理</h1>
          <p className="text-slate-400">ニュースとお知らせの投稿・編集</p>
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
                {editingNews ? "お知らせを編集" : "新しいお知らせを追加"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-2">日付</label>
                  <Input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="2025.10.15"
                    required
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">カテゴリー</label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="お知らせ">お知らせ</SelectItem>
                      <SelectItem value="設備導入">設備導入</SelectItem>
                      <SelectItem value="認証取得">認証取得</SelectItem>
                      <SelectItem value="イベント">イベント</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-2">タイトル</label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">概要</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                  className="bg-slate-800 border-slate-700 text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">本文</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={6}
                  className="bg-slate-800 border-slate-700 text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">ステータス</label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "公開" | "下書き") => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="公開">公開</SelectItem>
                    <SelectItem value="下書き">下書き</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={createNews.isPending || updateNews.isPending}
                >
                  {createNews.isPending || updateNews.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      処理中...
                    </>
                  ) : (
                    editingNews ? "更新" : "追加"
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

      <div className="mb-4 flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className={filter === "all" ? "bg-blue-600" : "border-slate-700 text-slate-300"}
        >
          すべて
        </Button>
        <Button
          variant={filter === "公開" ? "default" : "outline"}
          onClick={() => setFilter("公開")}
          className={filter === "公開" ? "bg-blue-600" : "border-slate-700 text-slate-300"}
        >
          公開
        </Button>
        <Button
          variant={filter === "下書き" ? "default" : "outline"}
          onClick={() => setFilter("下書き")}
          className={filter === "下書き" ? "bg-blue-600" : "border-slate-700 text-slate-300"}
        >
          下書き
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Card className="border-slate-800 bg-slate-900">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : filteredNews.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                お知らせがありません
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-800 hover:bg-slate-800/50">
                    <TableHead className="text-slate-300">日付</TableHead>
                    <TableHead className="text-slate-300">カテゴリー</TableHead>
                    <TableHead className="text-slate-300">タイトル</TableHead>
                    <TableHead className="text-slate-300">ステータス</TableHead>
                    <TableHead className="text-slate-300 text-center">閲覧数</TableHead>
                    <TableHead className="text-slate-300 text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNews.map((item) => (
                    <TableRow key={item._id} className="border-slate-800 hover:bg-slate-800/50">
                      <TableCell className="text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {formatDate(item.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-blue-600/20 text-blue-400">
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white max-w-md">
                        <div className="mb-1">{item.title}</div>
                        <div className="text-sm text-slate-400 line-clamp-1">{item.description}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                        variant={item.status === "公開" ? "default" : "secondary"}
                        className={
                          item.status === "公開" ? "bg-green-600/20 text-green-400" : "bg-slate-700 text-slate-400"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-400 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Eye className="h-4 w-4" />
                        {item.views}
                      </div>
                    </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(item)}
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-600/20"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(item._id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-600/20"
                            disabled={deleteNews.isPending}
                          >
                            {deleteNews.isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
