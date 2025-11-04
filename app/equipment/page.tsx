import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Wrench } from "lucide-react";
import Image from "next/image";

async function getEquipment() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/equipment`, {
      cache: 'no-store',
    });
    if (!res.ok) return { items: [] };
    const data = await res.json();
    return data.data || { items: [] };
  } catch (error) {
    console.error('Failed to fetch equipment:', error);
    return { items: [] };
  }
}

export default async function EquipmentPage() {
  const data = await getEquipment();
  const equipment = data.items || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Wrench className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Equipment</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              設備紹介
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              最新鋭の設備で高品質なメッキ加工を実現
            </p>
          </div>

          {/* Equipment Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipment.map((item: any) => (
              <div
                key={item._id}
                className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all"
              >
                {item.image && (
                  <div className="relative w-full h-48 bg-slate-900">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                      <p className="text-slate-400 text-sm">{item.nameEn}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === '稼働中' ? 'bg-green-500/10 text-green-400' :
                      item.status === 'メンテナンス中' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-slate-500/10 text-slate-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <p className="text-slate-300 mb-4">{item.description}</p>

                <div className="space-y-2">
                  <p className="text-slate-400 text-sm font-medium">カテゴリー</p>
                  <p className="text-white">{item.category}</p>
                </div>

                {item.specifications && item.specifications.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-slate-400 text-sm font-medium">仕様</p>
                    <ul className="space-y-1">
                      {item.specifications.map((spec: string, idx: number) => (
                        <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(item.manufacturer || item.model || item.yearInstalled) && (
                  <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-2 gap-2 text-sm">
                    {item.manufacturer && (
                      <div>
                        <p className="text-slate-400">メーカー</p>
                        <p className="text-white">{item.manufacturer}</p>
                      </div>
                    )}
                    {item.model && (
                      <div>
                        <p className="text-slate-400">型番</p>
                        <p className="text-white">{item.model}</p>
                      </div>
                    )}
                    {item.yearInstalled && (
                      <div>
                        <p className="text-slate-400">導入年</p>
                        <p className="text-white">{item.yearInstalled}年</p>
                      </div>
                    )}
                  </div>
                )}
                </div>
              </div>
            ))}
          </div>

          {equipment.length === 0 && (
            <div className="text-center py-16">
              <Wrench className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">設備情報はまだ登録されていません</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

