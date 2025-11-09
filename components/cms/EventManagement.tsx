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
  useEvents,
  useCreateEvent,
  useUpdateEvent,
  useDeleteEvent,
} from "@/lib/hooks/useApi";
import { format } from "date-fns";
import { MultipleImageUpload } from "@/components/ui/image-upload";
import Image from "next/image";

export default function EventManagement() {
  const { data, isLoading } = useEvents();
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    titleEn: "",
    description: "",
    eventType: "展示会",
    startDate: "",
    endDate: "",
    location: "",
    organizer: "",
    registrationUrl: "",
    images: [] as string[],
    youtubeUrl: "",
    status: "予定",
    isPublic: true,
  });

  const handleEdit = (event: any) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      titleEn: event.titleEn,
      description: event.description,
      eventType: event.eventType,
      startDate: format(new Date(event.startDate), "yyyy-MM-dd"),
      endDate: format(new Date(event.endDate), "yyyy-MM-dd"),
      location: event.location,
      organizer: event.organizer || "",
      registrationUrl: event.registrationUrl || "",
      images: event.images || [],
      youtubeUrl: event.youtubeUrl || "",
      status: event.status,
      isPublic: event.isPublic,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const eventData = {
      title: formData.title,
      titleEn: formData.titleEn,
      description: formData.description,
      eventType: formData.eventType,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      location: formData.location,
      organizer: formData.organizer,
      registrationUrl: formData.registrationUrl,
      images: formData.images,
      youtubeUrl: formData.youtubeUrl,
      status: formData.status,
      isPublic: formData.isPublic,
    };

    if (editingEvent) {
      await updateEvent.mutateAsync({ id: editingEvent._id, data: eventData });
    } else {
      await createEvent.mutateAsync(eventData);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (confirm("本当に削除しますか？")) {
      await deleteEvent.mutateAsync(id);
    }
  };

  const resetForm = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      titleEn: "",
      description: "",
      eventType: "展示会",
      startDate: "",
      endDate: "",
      location: "",
      organizer: "",
      registrationUrl: "",
      images: [],
      youtubeUrl: "",
      status: "予定",
      isPublic: true,
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
          <h1 className="text-white text-3xl mb-2">イベント管理</h1>
          <p className="text-slate-400">展示会・セミナー・イベントの管理</p>
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
        {data?.items?.map((event: any) => (
          <Card key={event._id} className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-start gap-4">
                {event.images && event.images.length > 0 && (
                  <div className="flex gap-2">
                    {event.images.slice(0, 2).map((img: string, idx: number) => (
                      <div key={idx} className="relative w-20 h-20 flex-shrink-0 bg-slate-900 rounded-lg overflow-hidden">
                        <Image
                          src={img}
                          alt={`${event.title} ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                    {event.images.length > 2 && (
                      <div className="w-20 h-20 flex-shrink-0 bg-slate-900 rounded-lg flex items-center justify-center text-slate-400 text-sm">
                        +{event.images.length - 2}
                      </div>
                    )}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white text-lg">{event.title}</h3>
                      <p className="text-slate-400 text-sm">{event.titleEn}</p>
                      <p className="text-slate-500 text-sm mt-1">
                        {event.eventType} | {format(new Date(event.startDate), "yyyy/MM/dd")} - {format(new Date(event.endDate), "yyyy/MM/dd")} | {event.status}
                      </p>
                      {event.youtubeUrl && (
                        <p className="text-blue-400 text-sm mt-1">
                          <a href={event.youtubeUrl} target="_blank" rel="noopener noreferrer">
                            YouTubeで見る
                          </a>
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(event)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(event._id)}
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
            <DialogTitle>{editingEvent ? "イベント編集" : "イベント追加"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 mb-2">イベント名（日本語）</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2">イベント名（英語）</label>
                <Input
                  value={formData.titleEn}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                  required
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
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
              <label className="block text-slate-300 mb-2">イベントタイプ</label>
              <Select value={formData.eventType} onValueChange={(value) => setFormData({ ...formData, eventType: value })}>
                <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="展示会">展示会</SelectItem>
                  <SelectItem value="セミナー">セミナー</SelectItem>
                  <SelectItem value="工場見学">工場見学</SelectItem>
                  <SelectItem value="その他">その他</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 mb-2">開始日</label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2">終了日</label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  required
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-2">場所</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                className="bg-slate-900 border-slate-600 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">主催者</label>
              <Input
                value={formData.organizer}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                className="bg-slate-900 border-slate-600 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">登録URL</label>
              <Input
                type="url"
                value={formData.registrationUrl}
                onChange={(e) => setFormData({ ...formData, registrationUrl: e.target.value })}
                className="bg-slate-900 border-slate-600 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">画像（最大5枚）</label>
              <MultipleImageUpload
                values={formData.images}
                onChange={(urls) => setFormData({ ...formData, images: urls })}
                folder="events"
                maxImages={5}
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">YouTubeリンク（任意）</label>
              <Input
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
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
                  <SelectItem value="予定">予定</SelectItem>
                  <SelectItem value="開催中">開催中</SelectItem>
                  <SelectItem value="終了">終了</SelectItem>
                  <SelectItem value="キャンセル">キャンセル</SelectItem>
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
                disabled={createEvent.isPending || updateEvent.isPending}
              >
                {createEvent.isPending || updateEvent.isPending ? "保存中..." : "保存"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
