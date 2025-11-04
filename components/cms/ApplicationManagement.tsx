"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Users, Mail, Phone, Calendar, FileText, Eye, Download, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useApplications, useUpdateApplicationStatus } from "@/lib/hooks/useApi"
import { format } from "date-fns"
import { ja } from "date-fns/locale/ja"

interface Application {
  _id: string
  position: string
  name: string
  age: number
  email: string
  phone: string
  experience: string
  motivation: string
  resumeUrl?: string
  referenceNumber: string
  status: "新規" | "書類選考中" | "面接予定" | "採用" | "不採用"
  createdAt: string
  updatedAt: string
}

export default function ApplicationManagement() {
  const [filter, setFilter] = useState<"all" | Application["status"]>("all")
  const { data, isLoading } = useApplications({ status: filter === "all" ? undefined : filter })
  const updateStatus = useUpdateApplicationStatus()

  const applications = (data?.items || []) as Application[]
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleView = (application: Application) => {
    setSelectedApplication(application)
    setIsDialogOpen(true)
  }

  const handleStatusChange = (id: string, newStatus: Application["status"]) => {
    updateStatus.mutate({ id, status: newStatus })
    if (selectedApplication && selectedApplication._id === id) {
      setSelectedApplication({ ...selectedApplication, status: newStatus })
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "yyyy.MM.dd HH:mm", { locale: ja })
    } catch {
      return dateString
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "新規":
        return "bg-blue-600/20 text-blue-400"
      case "書類選考中":
        return "bg-yellow-600/20 text-yellow-400"
      case "面接予定":
        return "bg-purple-600/20 text-purple-400"
      case "採用":
        return "bg-green-600/20 text-green-400"
      case "不採用":
        return "bg-red-600/20 text-red-400"
      default:
        return "bg-slate-600/20 text-slate-400"
    }
  }

  const statusCounts = {
    新規: applications.filter((a) => a.status === "新規").length,
    書類選考中: applications.filter((a) => a.status === "書類選考中").length,
    面接予定: applications.filter((a) => a.status === "面接予定").length,
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-white text-3xl mb-2">採用応募管理</h1>
        <p className="text-slate-400">求職者からの応募を確認・管理</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="border-slate-800 bg-slate-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">新規応募</span>
              <div className="p-2 bg-blue-600/20 rounded-lg">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
            </div>
            <div className="text-3xl text-white">{statusCounts.新規}</div>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">書類選考中</span>
              <div className="p-2 bg-yellow-600/20 rounded-lg">
                <FileText className="h-5 w-5 text-yellow-400" />
              </div>
            </div>
            <div className="text-3xl text-white">{statusCounts.書類選考中}</div>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">面接予定</span>
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-400" />
              </div>
            </div>
            <div className="text-3xl text-white">{statusCounts.面接予定}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="mb-6">
        <TabsList className="bg-slate-900 border border-slate-800">
          <TabsTrigger value="all" className="data-[state=active]:bg-blue-600">
            すべて ({applications.length})
          </TabsTrigger>
          <TabsTrigger value="新規" className="data-[state=active]:bg-blue-600">
            新規 ({statusCounts.新規})
          </TabsTrigger>
          <TabsTrigger value="書類選考中" className="data-[state=active]:bg-yellow-600">
            書類選考中 ({statusCounts.書類選考中})
          </TabsTrigger>
          <TabsTrigger value="面接予定" className="data-[state=active]:bg-purple-600">
            面接予定 ({statusCounts.面接予定})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Card className="border-slate-800 bg-slate-900">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                応募がありません
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-800 hover:bg-slate-800/50">
                    <TableHead className="text-slate-300">応募日時</TableHead>
                    <TableHead className="text-slate-300">応募職種</TableHead>
                    <TableHead className="text-slate-300">氏名</TableHead>
                    <TableHead className="text-slate-300">年齢</TableHead>
                    <TableHead className="text-slate-300">経験</TableHead>
                    <TableHead className="text-slate-300">ステータス</TableHead>
                    <TableHead className="text-slate-300 text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={application._id} className="border-slate-800 hover:bg-slate-800/50">
                      <TableCell className="text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {formatDate(application.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-blue-600/20 text-blue-400">
                          {application.position}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white">{application.name}</TableCell>
                      <TableCell className="text-slate-400">{application.age}歳</TableCell>
                      <TableCell className="text-slate-400">{application.experience}</TableCell>
                      <TableCell>
                        <select
                          value={application.status}
                          onChange={(e) => handleStatusChange(application._id, e.target.value as Application["status"])}
                          className={`px-3 py-1 rounded text-sm border-0 ${getStatusColor(application.status)}`}
                          disabled={updateStatus.isPending}
                        >
                          <option value="新規">新規</option>
                          <option value="書類選考中">書類選考中</option>
                          <option value="面接予定">面接予定</option>
                          <option value="採用">採用</option>
                          <option value="不採用">不採用</option>
                        </select>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleView(application)}
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-600/20"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          詳細
                      </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-slate-900 border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">応募者詳細</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-800 rounded-lg">
                  <div className="text-slate-400 text-sm mb-2">応募職種</div>
                  <Badge variant="secondary" className="bg-blue-600/20 text-blue-400">
                    {selectedApplication.position}
                  </Badge>
                </div>
                <div className="p-4 bg-slate-800 rounded-lg">
                  <div className="text-slate-400 text-sm mb-2">応募日時</div>
                  <div className="text-white">{formatDate(selectedApplication.createdAt)}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-800 rounded-lg">
                  <div className="text-slate-400 text-sm mb-2">氏名</div>
                  <div className="text-white">{selectedApplication.name}</div>
                </div>
                <div className="p-4 bg-slate-800 rounded-lg">
                  <div className="text-slate-400 text-sm mb-2">年齢</div>
                  <div className="text-white">{selectedApplication.age}歳</div>
                </div>
                <div className="p-4 bg-slate-800 rounded-lg">
                  <div className="text-slate-400 text-sm mb-2">経験</div>
                  <div className="text-white">{selectedApplication.experience}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">メールアドレス</span>
                  </div>
                  <a href={`mailto:${selectedApplication.email}`} className="text-blue-400 hover:underline">
                    {selectedApplication.email}
                  </a>
                </div>
                <div className="p-4 bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">電話番号</span>
                  </div>
                  <a href={`tel:${selectedApplication.phone}`} className="text-blue-400 hover:underline">
                    {selectedApplication.phone}
                  </a>
                </div>
              </div>

              <div className="p-4 bg-slate-800 rounded-lg">
                <div className="text-slate-400 text-sm mb-2">志望動機</div>
                <div className="text-white whitespace-pre-wrap">{selectedApplication.motivation}</div>
              </div>

              {selectedApplication.resumeUrl && (
                <div className="p-4 bg-slate-800 rounded-lg">
                  <div className="text-slate-400 text-sm mb-2">履歴書</div>
                  <Button
                    variant="outline"
                    className="border-slate-700 text-blue-400 hover:bg-blue-600/20 bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    履歴書をダウンロード
                  </Button>
                </div>
              )}

              <div className="p-4 bg-slate-800 rounded-lg">
                <div className="text-slate-400 text-sm mb-2">ステータス</div>
                <Badge className={getStatusColor(selectedApplication.status)}>{selectedApplication.status}</Badge>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => handleStatusChange(selectedApplication._id, "面接予定")}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                  disabled={updateStatus.isPending}
                >
                  面接予定にする
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1 border-slate-700 text-white hover:bg-slate-800"
                >
                  閉じる
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
