"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Save, User, Bell, Globe } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

export default function SettingsManagement() {
  const [settings, setSettings] = useState({
    companyName: "有限会社 鷲津メッキ工業所",
    email: "info@washidu-mekki.com",
    phone: "03-XXXX-XXXX",
    address: "東京都XX区XXXX-XX-XX",
    notifications: {
      newInquiry: true,
      newApplication: true,
      weeklyReport: false,
    },
  })

  const handleSave = () => {
    toast.success("設定を保存しました")
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-white text-3xl mb-2">設定</h1>
        <p className="text-slate-400">システム設定と管理</p>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Company Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card className="border-slate-800 bg-slate-900">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Globe className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-white">会社情報</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-slate-300 mb-2">会社名</label>
                <Input
                  type="text"
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2">メールアドレス</label>
                <Input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-2">電話番号</label>
                  <Input
                    type="tel"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">所在地</label>
                  <Input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Account Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="border-slate-800 bg-slate-900">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-600/20 rounded-lg">
                  <User className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="text-white">アカウント設定</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-slate-300 mb-2">管理者名</label>
                <Input type="text" defaultValue="管理者" className="bg-slate-800 border-slate-700 text-white" />
              </div>
              <div>
                <label className="block text-slate-300 mb-2">管理者メール</label>
                <Input
                  type="email"
                  defaultValue="admin@washidu-mekki.com"
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <Separator className="bg-slate-800" />
              <div>
                <label className="block text-slate-300 mb-2">現在のパスワード</label>
                <Input type="password" placeholder="••••••••" className="bg-slate-800 border-slate-700 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-2">新しいパスワード</label>
                  <Input type="password" placeholder="••••••••" className="bg-slate-800 border-slate-700 text-white" />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">パスワード確認</label>
                  <Input type="password" placeholder="••••••••" className="bg-slate-800 border-slate-700 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="border-slate-800 bg-slate-900">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-600/20 rounded-lg">
                  <Bell className="h-5 w-5 text-yellow-400" />
                </div>
                <h3 className="text-white">通知設定</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                <div>
                  <div className="text-white mb-1">新規お問い合わせ通知</div>
                  <div className="text-slate-400 text-sm">お問い合わせが届いた時に通知を受け取る</div>
                </div>
                <Switch
                  checked={settings.notifications.newInquiry}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, newInquiry: checked },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                <div>
                  <div className="text-white mb-1">新規応募通知</div>
                  <div className="text-slate-400 text-sm">採用応募が届いた時に通知を受け取る</div>
                </div>
                <Switch
                  checked={settings.notifications.newApplication}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, newApplication: checked },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                <div>
                  <div className="text-white mb-1">週次レポート</div>
                  <div className="text-slate-400 text-sm">毎週月曜日にアクティビティレポートを受け取る</div>
                </div>
                <Switch
                  checked={settings.notifications.weeklyReport}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, weeklyReport: checked },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
            <Save className="mr-2 h-5 w-5" />
            設定を保存
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
