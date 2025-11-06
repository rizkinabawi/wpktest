"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CMSDashboard from "@/components/cms/CMSDashboard";
import CMSSidebar from "@/components/cms/CMSSidebar";
import { useAuthStore } from "@/lib/stores/authStore";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, logout, checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth(); // cek token di localStorage
      setLoading(false);
    };
    initAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/cms/login");
    }
  }, [isAuthenticated, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/cms/login");
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-950">
      <CMSSidebar
        currentRoute="/cms/dashboard"
        navigate={(path) => router.push(path)}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-auto">
        <CMSDashboard navigate={(path) => router.push(path)} />
      </main>
    </div>
  );
}
