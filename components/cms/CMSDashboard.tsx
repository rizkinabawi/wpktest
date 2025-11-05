'use client'

import { motion } from "motion/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp, Newspaper, Mail, Users, Calendar, Eye } from "lucide-react";
import { useDashboardStats, useDashboardRecent } from "@/lib/hooks/useApi";

interface CMSDashboardProps {
  navigate: (path: string) => void;
}

export default function CMSDashboard({ navigate }: CMSDashboardProps) {
  const { data: statsData, isLoading: statsLoading } = useDashboardStats();
  const { data: recentData, isLoading: recentLoading } = useDashboardRecent();

  const stats = [
    {
      icon: Newspaper,
      label: "お知らせ",
      value: statsData?.newsCount?.toString() || "0",
      change: `${statsData?.newsThisMonth || 0} 今月`,
      color: "bg-blue-600",
      path: "/cms/news",
    },
    {
      icon: Mail,
      label: "お問い合わせ",
      value: statsData?.inquiriesCount?.toString() || "0",
      change: `${statsData?.unreadInquiries || 0} 未読`,
      color: "bg-green-600",
      path: "/cms/inquiries",
    },
    {
      icon: Users,
      label: "採用応募",
      value: statsData?.applicationsCount?.toString() || "0",
      change: `${statsData?.newApplications || 0} 新規`,
      color: "bg-purple-600",
      path: "/cms/applications",
    },
    {
      icon: Eye,
      label: "サイト訪問者",
      value: statsData?.totalViews?.toString() || "0",
      change: "総閲覧数",
      color: "bg-orange-600",
      path: "/cms/dashboard",
    },
  ];

  const recentInquiries = recentData?.inquiries || [];
  const recentNews = recentData?.news || [];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-white text-3xl mb-2">ダッシュボード</h1>
        <p className="text-slate-400">
          システム概要と最新の活動状況
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <Card className="border-slate-800 bg-slate-900">
                <CardContent className="p-6">
                  <div className="h-12 bg-slate-800 rounded mb-4"></div>
                  <div className="h-8 bg-slate-800 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                </CardContent>
              </Card>
            </div>
          ))
        ) : (
          stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                className="border-slate-800 bg-slate-900 hover:border-blue-700 transition-colors cursor-pointer"
                onClick={() => navigate(stat.path)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 ${stat.color} rounded-xl`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="text-3xl text-white mb-1">{stat.value}</div>
                  <div className="text-slate-400 mb-2">{stat.label}</div>
                  <div className="text-sm text-slate-500">{stat.change}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="border-slate-800 bg-slate-900">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-white">最新のお問い合わせ</h3>
                <button
                  onClick={() => navigate("/cms/inquiries")}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  すべて表示 →
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLoading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="animate-pulse p-4 bg-slate-800/50 rounded-lg">
                      <div className="h-4 bg-slate-700 rounded w-1/3 mb-2"></div>
                      <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                    </div>
                  ))
                ) : recentInquiries.length > 0 ? (
                  recentInquiries.map((inquiry: any,index: number) => (
                    <div
                      key={inquiry._id || index}
                      className="flex items-start justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                      onClick={() => navigate("/cms/inquiries")}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-white">{inquiry.name}</h4>
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              inquiry.status === "未読"
                                ? "bg-red-600/20 text-red-400"
                                : inquiry.status === "対応中"
                                ? "bg-yellow-600/20 text-yellow-400"
                                : "bg-green-600/20 text-green-400"
                            }`}
                          >
                            {inquiry.status}
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm mb-1">{inquiry.companyName}</p>
                        <p className="text-slate-500 text-sm">{inquiry.service}</p>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Calendar className="h-4 w-4" />
                        {new Date(inquiry.createdAt).toLocaleDateString('ja-JP')}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-center py-4">お問い合わせはまだありません</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent News */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Card className="border-slate-800 bg-slate-900">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-white">最新のお知らせ</h3>
                <button
                  onClick={() => navigate("/cms/news")}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  すべて表示 →
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLoading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="animate-pulse p-4 bg-slate-800/50 rounded-lg">
                      <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-slate-700 rounded w-1/3"></div>
                    </div>
                  ))
                ) : recentNews.length > 0 ? (
                  recentNews.map((news: any ,index: number) => (
                    <div
                      key={news._id || index}
                      className="p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                      onClick={() => navigate("/cms/news")}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white flex-1">{news.title}</h4>
                        <div className="flex items-center gap-1 text-slate-500 text-sm">
                          <Eye className="h-4 w-4" />
                          {news.views || 0}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Calendar className="h-4 w-4" />
                        {news.date || new Date(news.createdAt).toLocaleDateString('ja-JP')}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-center py-4">お知らせはまだありません</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
