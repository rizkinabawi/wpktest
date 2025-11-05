import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Package } from "lucide-react";
import Image from "next/image";
import dbConnect from "@/lib/mongodb";
import SampleProduct from "@/lib/models/SampleProduct";

// Fetch sample products dari MongoDB (Server Component)
async function getSampleProducts() {
  try {
    await dbConnect();
    const products = await SampleProduct.find({ status: "公開" })
      .sort({ order: 1, createdAt: -1 })
      .lean();
    return products;
  } catch (error) {
    console.error("Failed to fetch sample products:", error);
    return [];
  }
}

export default async function SampleProductsPage() {
  const products = await getSampleProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Package className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Sample Products</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              サンプル製品
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              当社のメッキ技術を活かした製品サンプル
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any) => (
              <div
                key={product._id}
                className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all"
              >
                {product.images && product.images.length > 0 && (
                  <div className="relative w-full h-48 bg-slate-900">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                    {product.images.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        +{product.images.length - 1} 枚
                      </div>
                    )}
                  </div>
                )}

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1">{product.title}</h3>
                    <p className="text-slate-400 text-sm">{product.titleEn}</p>
                    <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400">
                      {product.category}
                    </span>
                  </div>

                  <p className="text-slate-300 mb-4">{product.description}</p>

                  {product.process?.length > 0 && (
                    <div className="mb-4 space-y-2">
                      <p className="text-slate-400 text-sm font-medium">メッキ工程</p>
                      <ul className="space-y-1">
                        {product.process.map((step: string, idx: number) => (
                          <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {product.materials?.length > 0 && (
                    <div className="mb-4 space-y-2">
                      <p className="text-slate-400 text-sm font-medium">使用材料</p>
                      <ul className="space-y-1">
                        {product.materials.map((material: string, idx: number) => (
                          <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{material}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {product.features?.length > 0 && (
                    <div className="mb-4 space-y-2">
                      <p className="text-slate-400 text-sm font-medium">特徴</p>
                      <ul className="space-y-1">
                        {product.features.map((feature: string, idx: number) => (
                          <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {product.applications?.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-slate-400 text-sm font-medium">用途</p>
                      <ul className="space-y-1">
                        {product.applications.map((app: string, idx: number) => (
                          <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{app}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-16">
              <Package className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">サンプル製品はまだ登録されていません</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
