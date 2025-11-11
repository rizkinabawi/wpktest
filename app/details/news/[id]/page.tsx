import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import dbConnect from "@/lib/mongodb";
import News from "@/lib/models/News";
import Image from "next/image";
import { Newspaper } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>; // pakai Promise supaya build Next 15 aman
};

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params; // resolve promise dulu

  await dbConnect();
  const news = await News.findById(id).lean();

  if (!news) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-center flex flex-col justify-center items-center text-slate-400">
        <Navigation />
        <p className="text-lg">ニュースが見つかりません。</p>
      </div>
    );
  }

  // Tambah views setiap kali dibuka
  await News.findByIdAndUpdate(id, { $inc: { views: 1 } });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Newspaper className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">News</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {news.title}
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              {news.description}
            </p>
          </div>

          {/* Meta Info */}
          <div className="flex justify-center gap-4 text-slate-400 text-sm mb-10">
            <span>{news.date}</span>
            <span>カテゴリー: {news.category}</span>
            <span>閲覧数: {news.views + 1}</span>
          </div>

          {/* Content */}
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8 text-slate-300 leading-relaxed prose prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: news.content }} />
          </div>

          {/* Status */}
          <div className="mt-6 text-center text-slate-500 text-sm">
            ステータス: {news.status} | 最終更新:{" "}
            {new Date(news.updatedAt).toLocaleString("ja-JP")}
          </div>

          {/* Optional image */}
          {/* <div className="relative w-full h-80 rounded-xl overflow-hidden mt-12">
            <Image
              src="/example.jpg"
              alt={news.title}
              fill
              className="object-cover opacity-80"
            />
          </div> */}
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
