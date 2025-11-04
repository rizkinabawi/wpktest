"use client";

import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import {
  useSampleProducts,
  useCreateSampleProduct,
  useUpdateSampleProduct,
  useDeleteSampleProduct,
} from "@/lib/hooks/useApi";
import { MultipleImageUpload } from "@/components/ui/image-upload";
import Image from "next/image";

export default function SampleProductManagement() {
  const { data, isLoading } = useSampleProducts();
  const createProduct = useCreateSampleProduct();
  const updateProduct = useUpdateSampleProduct();
  const deleteProduct = useDeleteSampleProduct();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    titleEn: "",
    category: "",
    description: "",
    process: "",
    materials: "",
    features: "",
    applications: "",
    images: [] as string[],
    status: "公開",
    order: 0,
  });

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      titleEn: product.titleEn,
      category: product.category,
      description: product.description,
      process: product.process.join("\n"),
      materials: product.materials.join("\n"),
      features: product.features.join("\n"),
      applications: product.applications.join("\n"),
      images: product.images || [],
      status: product.status,
      order: product.order,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      title: formData.title,
      titleEn: formData.titleEn,
      category: formData.category,
      description: formData.description,
      process: formData.process.split("\n").filter((s) => s.trim()),
      materials: formData.materials.split("\n").filter((s) => s.trim()),
      features: formData.features.split("\n").filter((s) => s.trim()),
      applications: formData.applications.split("\n").filter((s) => s.trim()),
      images: formData.images,
      status: formData.status,
      order: formData.order,
    };

    if (editingProduct) {
      await updateProduct.mutateAsync({ id: editingProduct._id, data: productData });
    } else {
      await createProduct.mutateAsync(productData);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (confirm("本当に削除しますか？")) {
      await deleteProduct.mutateAsync(id);
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      title: "",
      titleEn: "",
      category: "",
      description: "",
      process: "",
      materials: "",
      features: "",
      applications: "",
      images: [],
      status: "公開",
      order: 0,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-3xl mb-2">サンプル製品管理</h1>
          <p className="text-slate-400">製品サンプルの管理</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          新規追加
        </Button>
      </div>

      <div className="grid gap-4">
        {data?.items?.map((product: any) => (
          <Card key={product._id} className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-start gap-4">
                {product.images && product.images.length > 0 && (
                  <div className="flex gap-2">
                    {product.images.slice(0, 2).map((img: string, idx: number) => (
                      <div key={idx} className="relative w-20 h-20 flex-shrink-0 bg-slate-900 rounded-lg overflow-hidden">
                        <Image
                          src={img}
                          alt={`${product.title} ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                    {product.images.length > 2 && (
                      <div className="w-20 h-20 flex-shrink-0 bg-slate-900 rounded-lg flex items-center justify-center text-slate-400 text-sm">
                        +{product.images.length - 2}
                      </div>
                    )}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white text-lg">{product.title}</h3>
                      <p className="text-slate-400 text-sm">{product.titleEn}</p>
                      <p className="text-slate-500 text-sm mt-1">
                        {product.category} | {product.status}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(product)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(product._id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "製品編集" : "製品追加"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 mb-2">製品名（日本語）</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2">製品名（英語）</label>
                <Input
                  value={formData.titleEn}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                  required
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-2">カテゴリー</label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="bg-slate-900 border-slate-600 text-white"
                placeholder="例: 自動車部品、電子部品"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">説明</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="bg-slate-900 border-slate-600 text-white"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">メッキ工程（1行1項目）</label>
              <Textarea
                value={formData.process}
                onChange={(e) => setFormData({ ...formData, process: e.target.value })}
                className="bg-slate-900 border-slate-600 text-white"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">使用材料（1行1項目）</label>
              <Textarea
                value={formData.materials}
                onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                className="bg-slate-900 border-slate-600 text-white"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">特徴（1行1項目）</label>
              <Textarea
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                className="bg-slate-900 border-slate-600 text-white"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">用途（1行1項目）</label>
              <Textarea
                value={formData.applications}
                onChange={(e) => setFormData({ ...formData, applications: e.target.value })}
                className="bg-slate-900 border-slate-600 text-white"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">画像（最大5枚）</label>
              <MultipleImageUpload
                values={formData.images}
                onChange={(urls) => setFormData({ ...formData, images: urls })}
                folder="sample-products"
                maxImages={5}
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">ステータス</label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="公開">公開</SelectItem>
                  <SelectItem value="非公開">非公開</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsDialogOpen(false)}
                className="text-slate-300"
              >
                キャンセル
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={createProduct.isPending || updateProduct.isPending}
              >
                {createProduct.isPending || updateProduct.isPending ? "保存中..." : "保存"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

