"use client";

import { useState } from "react";
import { LayoutDashboard, Newspaper, Briefcase, Mail, Users, LogOut, Settings, Home, Layout, Wrench, Package, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CMSSidebarProps {
  currentRoute: string;
  navigate: (path: string) => void;
  onLogout: () => void;
}

export default function CMSSidebar({ currentRoute, navigate, onLogout }: CMSSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

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
    <>
      {/* Floating toggle button (mobile) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 py-2 px-3 rounded-sm bg-slate-900 text-white shadow-lg backdrop-blur-sm bg-opacity-50 focus:outline-none"
      >
        ☰
      </button>

      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen  w-64 flex flex-col z-50
          bg-slate-900 border-r border-slate-800
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative
        `}
      >
        {/* Header/logo */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-2 text-white">
            <Home className="h-5 w-5" />
            {isOpen? <span className="font-bold text-sm">CMS</span> : <span className="font-bold text-sm">CMS 鷲津メッキ工業所</span>}
          </Link>
          {/* Close button mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className=" lg:hidden text-white text-2xl focus:outline-none"
          >
            ✕
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = currentRoute === item.path;
              return (
                <li key={item.path}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
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
    </>
  );
}
