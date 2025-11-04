"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Lock, Mail, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { toast } from "sonner"
import { useAuthStore } from "@/lib/stores/authStore"

export default function CMSLoginPage() {
  const router = useRouter()
  const { login, isLoading } = useAuthStore()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await login(email, password)

    if (result.success) {
      toast.success("ログインに成功しました")
      router.push("/cms/dashboard")
    } else {
      toast.error(result.error || "ログインに失敗しました")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
          <CardHeader className="space-y-4 text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-white text-2xl mb-2">CMS ログイン</h1>
              <p className="text-slate-400">
                有限会社 鷲津メッキ工業所
                <br />
                管理システム
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-slate-300 mb-2">
                  <Mail className="inline h-4 w-4 mr-2" />
                  メールアドレス
                </label>
                <Input
                  type="email"
                  placeholder="admin@washidu-mekki.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">
                  <Lock className="inline h-4 w-4 mr-2" />
                  パスワード
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg" disabled={isLoading}>
                {isLoading ? (
                  "ログイン中..."
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    ログイン
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-950/30 border border-blue-800/30 rounded-lg">
              <p className="text-slate-400 text-sm mb-2">デモ用ログイン情報:</p>
              <p className="text-slate-300 text-sm">
                Email: <code className="bg-slate-900 px-2 py-1 rounded">admin@washidu-mekki.com</code>
              </p>
              <p className="text-slate-300 text-sm">
                Password: <code className="bg-slate-900 px-2 py-1 rounded">admin123</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
