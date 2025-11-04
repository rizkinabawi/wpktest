"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  useEquipment,
  useCreateEquipment,
  useUpdateEquipment,
  useDeleteEquipment,
} from "@/lib/hooks/useApi";
import { ImageUpload } from "@/components/ui/image-upload";
import Image from "next/image";

export default function EquipmentManagement() {
  const { data, isLoading } = useEquipment();
  const createEquipment = useCreateEquipment();
  const updateEquipment = useUpdateEquipment();
  const deleteEquipment = useDeleteEquipment();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    nameEn: "",
    category: "",
    description: "",
    specifications: "",
    manufacturer: "",
    model: "",
    yearInstalled: "",
    image: "",
    status: "稼働中",
    order: 0,
  });

  const handleEdit = (equipment: any) => {
    setEditingEquipment(equipment);
    setFormData({
      name: equipment.name,
      nameEn: equipment.nameEn,
      category: equipment.category,
      description: equipment.description,
      specifications: equipment.specifications.join("\n"),
      manufacturer: equipment.manufacturer || "",
      model: equipment.model || "",
      yearInstalled: equipment.yearInstalled?.toString() || "",
      image: equipment.image || "",
      status: equipment.status,
      order: equipment.order,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const equipmentData = {
      name: formData.name,
      nameEn: formData.nameEn,
      category: formData.category,
      description: formData.description,
      specifications: formData.specifications.split("\n").filter((s) => s.trim()),
      manufacturer: formData.manufacturer,
      model: formData.model,
      yearInstalled: formData.yearInstalled ? parseInt(formData.yearInstalled) : undefined,
      image: formData.image,
      status: formData.status,
      order: formData.order,
    };

    if (editingEquipment) {
      await updateEquipment.mutateAsync({ id: editingEquipment._id, data: equipmentData });
    } else {
      await createEquipment.mutateAsync(equipmentData);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (confirm("本当に削除しますか？")) {
      await deleteEquipment.mutateAsync(id);
    }
  };

  const resetForm = () => {
    setEditingEquipment(null);
    setFormData({
      name: "",
      nameEn: "",
      category: "",
      description: "",
      specifications: "",
      manufacturer: "",
      model: "",
      yearInstalled: "",
      image: "",
      status: "稼働中",
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
          <h1 className="text-white text-3xl mb-2">設備管理</h1>
          <p className="text-slate-400">設備・機械の管理</p>
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
        {data?.items?.map((equipment: any) => (
          <Card key={equipment._id} className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-start gap-4">
                {equipment.image && (
                  <div className="relative w-24 h-24 flex-shrink-0 bg-slate-900 rounded-lg overflow-hidden">
                    <Image
                      src={equipment.image}
                      alt={equipment.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white text-lg">{equipment.name}</h3>
                      <p className="text-slate-400 text-sm">{equipment.nameEn}</p>
                      <p className="text-slate-500 text-sm mt-1">
                        {equipment.category} | {equipment.status}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(equipment)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(equipment._id)}
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
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingEquipment ? "設備編集" : "設備追加"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 mb-2">設備名（日本語）</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2">設備名（英語）</label>
                <Input
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
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
                placeholder="例: メッキ設備、検査装置"
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
              <label className="block text-slate-300 mb-2">仕様（1行1項目）</label>
              <Textarea
                value={formData.specifications}
                onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                className="bg-slate-900 border-slate-600 text-white"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">画像</label>
              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                folder="equipment"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 mb-2">メーカー</label>
                <Input
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2">型番</label>
                <Input
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 mb-2">導入年</label>
                <Input
                  type="number"
                  value={formData.yearInstalled}
                  onChange={(e) => setFormData({ ...formData, yearInstalled: e.target.value })}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2">ステータス</label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="稼働中">稼働中</SelectItem>
                    <SelectItem value="メンテナンス中">メンテナンス中</SelectItem>
                    <SelectItem value="停止中">停止中</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                disabled={createEquipment.isPending || updateEquipment.isPending}
              >
                {createEquipment.isPending || updateEquipment.isPending ? "保存中..." : "保存"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

