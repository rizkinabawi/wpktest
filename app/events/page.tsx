"use client";

import { useState, useEffect, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Calendar, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Image from "next/image";

interface Event {
  _id: string;
  title: string;
  titleEn: string;
  description: string;
  eventType: string;
  status: string;
  startDate: string;
  endDate: string;
  location: string;
  organizer?: string;
  registrationUrl?: string;
  youtubeUrl?: string;
  images?: string[];
}

async function fetchEvents(): Promise<Event[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/events?isPublic=true`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data?.items || [];
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  const filteredEvents = useMemo(() => {
    const list = events || [];
    return list
      .filter((e) =>
        search
          ? e.title.toLowerCase().includes(search.toLowerCase()) ||
            e.description.toLowerCase().includes(search.toLowerCase()) ||
            (e.organizer?.toLowerCase().includes(search.toLowerCase()) ?? false)
          : true
      )
      .filter((e) => (filterStatus ? e.status === filterStatus : true))
      .filter((e) => (filterType ? e.eventType === filterType : true))
      .filter((e) => (filterYear ? new Date(e.startDate).getFullYear() === Number(filterYear) : true));
  }, [events, search, filterStatus, filterType, filterYear]);

  const visibleEvents = filteredEvents.slice(0, visibleCount);

  // Generate year options dynamically
  const years = Array.from(new Set(events.map((e) => new Date(e.startDate).getFullYear()))).sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
              <Calendar className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Events</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">イベント情報</h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              展示会・セミナー・工場見学などのイベント情報
            </p>
          </div>

          {/* Filter + Search Card */}
          <div className="max-w-4xl mx-auto mb-8 p-4 border border-white rounded-xl flex flex-col md:flex-row gap-4 text-white">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-3 py-2 border border-white rounded-lg bg-transparent text-white placeholder-white focus:outline-none"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-white rounded-lg bg-transparent text-white focus:outline-none"
            >
              <option value="">All Status</option>
              <option value="予定">予定</option>
              <option value="開催中">開催中</option>
              <option value="終了">終了</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-white rounded-lg bg-transparent text-white focus:outline-none"
            >
              <option value="">All Type</option>
              {Array.from(new Set(events.map((e) => e.eventType))).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="px-3 py-2 border border-white rounded-lg bg-transparent text-white focus:outline-none"
            >
              <option value="">All Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Events List */}
          <div className="max-w-4xl mx-auto space-y-6">
            {visibleEvents.map((event) => (
              <div
                key={event._id}
                className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all"
              >
                {/* Image or YouTube */}
                {event.images && event.images.length > 0 ? (
                  <div className="relative w-full h-56 bg-slate-900">
                    <Image src={event.images[0]} alt={event.title} fill className="object-cover" />
                    {event.images.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        +{event.images.length - 1} 枚
                      </div>
                    )}
                  </div>
                ) : event.youtubeUrl ? (
                  <div className="relative w-full h-56 bg-black rounded-xl overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src={event.youtubeUrl.replace("watch?v=", "embed/")}
                      title={event.title}
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : null}

                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            event.status === "予定"
                              ? "bg-blue-500/10 text-blue-400"
                              : event.status === "開催中"
                              ? "bg-green-500/10 text-green-400"
                              : event.status === "終了"
                              ? "bg-slate-500/10 text-slate-400"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {event.status}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400">
                          {event.eventType}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-1">{event.title}</h3>
                      <p className="text-slate-400 text-sm">{event.titleEn}</p>
                    </div>

                    <div className="text-right text-slate-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">
                          {format(new Date(event.startDate), "yyyy年MM月dd日", { locale: ja })}
                        </span>
                      </div>
                      {event.startDate !== event.endDate && (
                        <div className="text-slate-400 text-sm mt-1">
                          〜 {format(new Date(event.endDate), "yyyy年MM月dd日", { locale: ja })}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-slate-300 mb-4">{event.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400 mb-1">開催場所</p>
                      <p className="text-white">{event.location}</p>
                    </div>

                    {event.organizer && (
                      <div>
                        <p className="text-slate-400 mb-1">主催者</p>
                        <p className="text-white">{event.organizer}</p>
                      </div>
                    )}
                  </div>

                  {event.registrationUrl && (
                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <a
                        href={event.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <span>詳細・申込</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length > visibleCount && (
            <div className="text-center mt-6">
              <button
                onClick={() => setVisibleCount(visibleCount + 10)}
                className="px-6 py-2 border border-white rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                Load More
              </button>
            </div>
          )}

          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <Calendar className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">現在、公開中のイベントはありません</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
