"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import EventManagement from "@/components/cms/EventManagement";
import CMSSidebar from "@/components/cms/CMSSidebar";
import { useAuthStore } from "@/lib/stores/authStore";

export default function EventsPage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/cms/login");
    }
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/cms/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <CMSSidebar
        currentRoute="/cms/events"
        navigate={(path) => router.push(path)}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-auto">
        <EventManagement />
      </main>
    </div>
  );
}

