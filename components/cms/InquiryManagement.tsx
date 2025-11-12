"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Mail, Phone, Calendar, Building, User, MessageSquare, Eye, Check, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useInquiries, useUpdateInquiryStatus } from "@/lib/hooks/useApi"
import { format } from "date-fns"
import { ja } from "date-fns/locale/ja"

interface Inquiry {
  _id: string
  companyName: string
  name: string
  email: string
  phone: string
  service: string
  message: string
  status: "未読" | "対応中" | "対応済"
  createdAt: string
  updatedAt: string
}

export default function InquiryManagement() {
  const [filter, setFilter] = useState<"all" | "未読" | "対応中" | "対応済">("all")
  const { data, isLoading } = useInquiries({ status: filter === "all" ? undefined : filter })
  const updateStatus = useUpdateInquiryStatus()

  const inquiries = (data?.items || []) as Inquiry[]
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleView = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry)
    setIsDialogOpen(true)

    // Mark as read if it was unread
    if (inquiry.status === "未読") {
      updateStatus.mutate({ id: inquiry._id, status: "対応中" })
    }
  }

  const handleStatusChange = (id: string, newStatus: "未読" | "対応中" | "対応済") => {
    updateStatus.mutate({ id, status: newStatus })
    if (selectedInquiry && selectedInquiry._id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus })
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
      case "未読":
        return "bg-red-600/20 text-red-400"
      case "対応中":
        return "bg-yellow-600/20 text-yellow-400"
      case "対応済":
        return "bg-green-600/20 text-green-400"
      default:
        return "bg-slate-600/20 text-slate-400"
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-white text-3xl mb-2">お問い合わせ管理</h1>
        <p className="text-slate-400">顧客からのお問い合わせを確認・管理</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="border-slate-800 bg-slate-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">未読</span>
              <div className="p-2 bg-red-600/20 rounded-lg">
                <Mail className="h-5 w-5 text-red-400" />
              </div>
            </div>
            <div className="text-3xl text-white">{inquiries.filter((i) => i.status === "未読").length}</div>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">対応中</span>
              <div className="p-2 bg-yellow-600/20 rounded-lg">
                <MessageSquare className="h-5 w-5 text-yellow-400" />
              </div>
            </div>
            <div className="text-3xl text-white">{inquiries.filter((i) => i.status === "対応中").length}</div>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">対応済</span>
              <div className="p-2 bg-green-600/20 rounded-lg">
                <Check className="h-5 w-5 text-green-400" />
              </div>
            </div>
            <div className="text-3xl text-white">{inquiries.filter((i) => i.status === "対応済").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="mb-6">
        <TabsList className="bg-slate-900 border border-slate-800">
          <TabsTrigger value="all" className="data-[state=active]:bg-blue-600">
            すべて ({inquiries.length})
          </TabsTrigger>
          <TabsTrigger value="未読" className="data-[state=active]:bg-red-600">
            未読 ({inquiries.filter((i) => i.status === "未読").length})
          </TabsTrigger>
          <TabsTrigger value="対応中" className="data-[state=active]:bg-yellow-600">
            対応中 ({inquiries.filter((i) => i.status === "対応中").length})
          </TabsTrigger>
          <TabsTrigger value="対応済" className="data-[state=active]:bg-green-600">
            対応済 ({inquiries.filter((i) => i.status === "対応済").length})
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
            ) : inquiries.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                お問い合わせがありません
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-800 hover:bg-slate-800/50">
                    <TableHead className="text-slate-300">日時</TableHead>
                    <TableHead className="text-slate-300">会社名 / 氏名</TableHead>
                    <TableHead className="text-slate-300">お問い合わせ内容</TableHead>
                    <TableHead className="text-slate-300">ステータス</TableHead>
                    <TableHead className="text-slate-300 text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiries.map((inquiry,index:number) => (
                    <TableRow key={index} className="border-slate-800 hover:bg-slate-800/50">
                      <TableCell className="text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {formatDate(inquiry.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-white mb-1">{inquiry.companyName}</div>
                        <div className="text-slate-400 text-sm">{inquiry.name}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-blue-600/20 text-blue-400">
                          {inquiry.service}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <select
                          value={inquiry.status}
                          onChange={(e) => handleStatusChange(inquiry._id, e.target.value as "未読" | "対応中" | "対応済")}
                          className={`px-3 py-1 rounded text-sm border-0 ${getStatusColor(inquiry.status)}`}
                          disabled={updateStatus.isPending}
                        >
                          <option value="未読">未読</option>
                          <option value="対応中">対応中</option>
                          <option value="対応済">対応済</option>
                        </select>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleView(inquiry)}
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
            <DialogTitle className="text-white">お問い合わせ詳細</DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <Building className="h-4 w-4" />
                    <span className="text-sm">会社名</span>
                  </div>
                  <div className="text-white">{selectedInquiry.companyName}</div>
                </div>
                <div className="p-4 bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">お名前</span>
                  </div>
                  <div className="text-white">{selectedInquiry.name}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">メールアドレス</span>
                  </div>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-blue-400 hover:underline">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div className="p-4 bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">電話番号</span>
                  </div>
                  <a href={`tel:${selectedInquiry.phone}`} className="text-blue-400 hover:underline">
                    {selectedInquiry.phone}
                  </a>
                </div>
              </div>

              <div className="p-4 bg-slate-800 rounded-lg">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm">お問い合わせ内容</span>
                </div>
                <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 mb-3">
                  {selectedInquiry.service}
                </Badge>
                <div className="text-white whitespace-pre-wrap">{selectedInquiry.message}</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                <div>
                  <div className="text-slate-400 text-sm mb-1">受信日時</div>
                  <div className="text-white">{formatDate(selectedInquiry.createdAt)}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-sm mb-1">ステータス</div>
                  <Badge className={getStatusColor(selectedInquiry.status)}>{selectedInquiry.status}</Badge>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => handleStatusChange(selectedInquiry._id, "対応済")}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={updateStatus.isPending}
                >
                  対応済にする
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
