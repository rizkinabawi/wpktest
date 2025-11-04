import { LayoutDashboard, Newspaper, Briefcase, Mail, Users, LogOut, Settings, Home, Layout, Wrench, Package, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CMSSidebarProps {
  currentRoute: string;
  navigate: (path: string) => void;
  onLogout: () => void;
}

export default function CMSSidebar({ currentRoute, navigate, onLogout }: CMSSidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: "ダッシュボード", path: "/cms/dashboard" },
    { icon: Layout, label: "ホームページ", path: "/cms/homepage" },
    { icon: Newspaper, label: "お知らせ管理", path: "/cms/news" },
    { icon: Briefcase, label: "サービス管理", path: "/cms/services" },
    { icon: Wrench, label: "設備管理", path: "/cms/equipment" },
    { icon: Package, label: "サンプル製品", path: "/cms/sample-products" },
    { icon: Calendar, label: "イベント管理", path: "/cms/events" },
    { icon: Users, label: "求人管理", path: "/cms/job-positions" },
    { icon: Mail, label: "お問い合わせ", path: "/cms/inquiries" },
    { icon: Users, label: "採用応募", path: "/cms/applications" },
    { icon: Settings, label: "設定", path: "/cms/settings" },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <Link
          href="/"
          className="text-white hover:text-blue-400 transition-colors text-left w-full block"
        >
          <div className="flex items-center gap-2 mb-1">
            <Home className="h-4 w-4" />
            <span className="text-xs opacity-70">サイトに戻る</span>
          </div>
          <h2 className="text-lg">鷲津メッキ工業所</h2>
          <p className="text-xs text-slate-400">CMS管理システム</p>
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = currentRoute === item.path;
            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <Button
          onClick={onLogout}
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-red-600/20"
        >
          <LogOut className="mr-3 h-5 w-5" />
          ログアウト
        </Button>
      </div>
    </div>
  );
}
