"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Briefcase, Plus, Edit, Trash2, Loader2, Calendar, MapPin, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useJobPositions, useCreateJobPosition, useUpdateJobPosition, useDeleteJobPosition } from "@/lib/hooks/useApi"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

interface JobPosition {
  _id: string
  title: string
  department: string
  location: string
  employmentType: '正社員' | '契約社員' | 'パート・アルバイト' | '派遣社員'
  salary: string
  description: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  status: '公開' | '非公開' | '募集終了'
  applicationDeadline?: string
  createdAt: string
  updatedAt: string
}

export default function JobPositionManagement() {
  const { data, isLoading } = useJobPositions()
  const createJobPosition = useCreateJobPosition()
  const updateJobPosition = useUpdateJobPosition()
  const deleteJobPosition = useDeleteJobPosition()
  
  const jobPositions = (data?.items || []) as JobPosition[]
  
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPosition, setEditingPosition] = useState<JobPosition | null>(null)
 const [formData, setFormData] = useState<{
  title: string
  department: string
  location: string
  employmentType: '正社員' | '契約社員' | 'パート・アルバイト' | '派遣社員'
  salary: string
  description: string
  requirements: string
  responsibilities: string
  benefits: string
  status: '公開' | '非公開' | '募集終了'
  applicationDeadline: string
}>({
  title: "",
  department: "",
  location: "東京都",
  employmentType: "正社員",
  salary: "",
  description: "",
  requirements: "",
  responsibilities: "",
  benefits: "",
  status: "公開",
  applicationDeadline: "",
})


  const handleCreate = () => {
    setEditingPosition(null)
    setFormData({
      title: "",
      department: "",
      location: "東京都",
      employmentType: "正社員",
      salary: "",
      description: "",
      requirements: "",
      responsibilities: "",
      benefits: "",
      status: "公開",
      applicationDeadline: "",
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (position: JobPosition) => {
    setEditingPosition(position)
    setFormData({
      title: position.title,
      department: position.department,
      location: position.location,
      employmentType: position.employmentType,
      salary: position.salary,
      description: position.description,
      requirements: position.requirements.join("\n"),
      responsibilities: position.responsibilities.join("\n"),
      benefits: position.benefits.join("\n"),
      status: position.status,
      applicationDeadline: position.applicationDeadline 
        ? format(new Date(position.applicationDeadline), "yyyy-MM-dd") 
        : "",
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const data = {
      title: formData.title,
      department: formData.department,
      location: formData.location,
      employmentType: formData.employmentType,
      salary: formData.salary,
      description: formData.description,
      requirements: formData.requirements.split("\n").filter(r => r.trim()),
      responsibilities: formData.responsibilities.split("\n").filter(r => r.trim()),
      benefits: formData.benefits.split("\n").filter(r => r.trim()),
      status: formData.status,
      applicationDeadline: formData.applicationDeadline || undefined,
    }

    if (editingPosition) {
      await updateJobPosition.mutateAsync({ id: editingPosition._id, data })
    } else {
      await createJobPosition.mutateAsync(data)
    }
    
    setIsDialogOpen(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm("この求人情報を削除してもよろしいですか？")) {
      await deleteJobPosition.mutateAsync(id)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "公開":
        return "bg-green-600/20 text-green-400"
      case "非公開":
        return "bg-slate-600/20 text-slate-400"
      case "募集終了":
        return "bg-red-600/20 text-red-400"
      default:
        return "bg-slate-600/20 text-slate-400"
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "yyyy.MM.dd", { locale: ja })
    } catch {
      return dateString
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">求人管理</h2>
          <p className="text-slate-400">募集中の求人情報を管理します</p>
        </div>
        <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          新規作成
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-slate-800 bg-slate-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">公開中</span>
              <div className="p-2 bg-green-600/20 rounded-lg">
                <Briefcase className="h-5 w-5 text-green-400" />
              </div>
            </div>
            <div className="text-3xl text-white">{jobPositions.filter((p) => p.status === "公開").length}</div>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">非公開</span>
              <div className="p-2 bg-slate-600/20 rounded-lg">
                <Briefcase className="h-5 w-5 text-slate-400" />
              </div>
            </div>
            <div className="text-3xl text-white">{jobPositions.filter((p) => p.status === "非公開").length}</div>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">募集終了</span>
              <div className="p-2 bg-red-600/20 rounded-lg">
                <Briefcase className="h-5 w-5 text-red-400" />
              </div>
            </div>
            <div className="text-3xl text-white">{jobPositions.filter((p) => p.status === "募集終了").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Card className="border-slate-800 bg-slate-900">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : jobPositions.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                求人情報がありません
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-800 hover:bg-slate-800/50">
                    <TableHead className="text-slate-300">職種</TableHead>
                    <TableHead className="text-slate-300">部署</TableHead>
                    <TableHead className="text-slate-300">雇用形態</TableHead>
                    <TableHead className="text-slate-300">給与</TableHead>
                    <TableHead className="text-slate-300">ステータス</TableHead>
                    <TableHead className="text-slate-300 text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobPositions.map((position) => (
                    <TableRow key={position._id} className="border-slate-800 hover:bg-slate-800/50">
                      <TableCell>
                        <div className="text-white font-medium">{position.title}</div>
                        <div className="text-slate-400 text-sm flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {position.location}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300">{position.department}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-blue-600/20 text-blue-400">
                          {position.employmentType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300 text-sm">{position.salary}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(position.status)}>{position.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(position)}
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-600/20"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(position._id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-600/20"
                            disabled={deleteJobPosition.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
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

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingPosition ? "求人情報を編集" : "新規求人情報を作成"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title" className="text-slate-300">
                  職種名 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="department" className="text-slate-300">
                  部署 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location" className="text-slate-300">
                  勤務地 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="employmentType" className="text-slate-300">
                  雇用形態 <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.employmentType}
                  onValueChange={(value: any) => setFormData({ ...formData, employmentType: value })}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="正社員">正社員</SelectItem>
                    <SelectItem value="契約社員">契約社員</SelectItem>
                    <SelectItem value="パート・アルバイト">パート・アルバイト</SelectItem>
                    <SelectItem value="派遣社員">派遣社員</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="salary" className="text-slate-300">
                給与 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="salary"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="例: 月給 25万円〜40万円（経験・能力による）"
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-slate-300">
                仕事内容 <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white min-h-[100px]"
                required
              />
            </div>

            <div>
              <Label htmlFor="requirements" className="text-slate-300">
                応募資格（1行に1つずつ）
              </Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white min-h-[100px]"
                placeholder="高卒以上&#10;メッキ加工の経験（優遇）&#10;製造業での勤務経験"
              />
            </div>

            <div>
              <Label htmlFor="responsibilities" className="text-slate-300">
                業務内容（1行に1つずつ）
              </Label>
              <Textarea
                id="responsibilities"
                value={formData.responsibilities}
                onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white min-h-[100px]"
                placeholder="メッキ加工作業&#10;品質管理&#10;設備メンテナンス"
              />
            </div>

            <div>
              <Label htmlFor="benefits" className="text-slate-300">
                福利厚生（1行に1つずつ）
              </Label>
              <Textarea
                id="benefits"
                value={formData.benefits}
                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                className="bg-slate-800 border-slate-700 text-white min-h-[100px]"
                placeholder="社会保険完備&#10;交通費支給&#10;昇給年1回"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status" className="text-slate-300">
                  ステータス <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="公開">公開</SelectItem>
                    <SelectItem value="非公開">非公開</SelectItem>
                    <SelectItem value="募集終了">募集終了</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="applicationDeadline" className="text-slate-300">
                  応募締切日
                </Label>
                <Input
                  id="applicationDeadline"
                  type="date"
                  value={formData.applicationDeadline}
                  onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={createJobPosition.isPending || updateJobPosition.isPending}
              >
                {createJobPosition.isPending || updateJobPosition.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    保存中...
                  </>
                ) : (
                  editingPosition ? "更新" : "作成"
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
  )
}

