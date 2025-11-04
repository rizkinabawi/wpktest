"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Eye,
  EyeOff,
  GripVertical,
  Save,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useHomepageSections, useUpdateAllHomepageSections } from "@/lib/hooks/useApi";
import { toast } from "sonner";
import { SingleImageUpload } from "@/components/ui/image-upload";
import Image from "next/image";

interface Section {
  _id: string;
  sectionId: string;
  title: string;
  order: number;
  isVisible: boolean;
  content: any;
}

export default function HomepageManagement() {
  const { data, isLoading } = useHomepageSections();
  const updateSections = useUpdateAllHomepageSections();
  const [sections, setSections] = useState<Section[]>([]);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize sections when data loads
  useEffect(() => {
    if (data?.items) {
      setSections(data.items);
    }
  }, [data]);

  const handleToggleVisibility = (sectionId: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.sectionId === sectionId ? { ...s, isVisible: !s.isVisible } : s
      )
    );
    setHasChanges(true);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newSections = [...sections];
    [newSections[index - 1], newSections[index]] = [
      newSections[index],
      newSections[index - 1],
    ];
    // Update order
    newSections.forEach((s, i) => {
      s.order = i;
    });
    setSections(newSections);
    setHasChanges(true);
  };

  const handleMoveDown = (index: number) => {
    if (index === sections.length - 1) return;
    const newSections = [...sections];
    [newSections[index], newSections[index + 1]] = [
      newSections[index + 1],
      newSections[index],
    ];
    // Update order
    newSections.forEach((s, i) => {
      s.order = i;
    });
    setSections(newSections);
    setHasChanges(true);
  };

  const handleContentChange = (sectionId: string, field: string, value: any) => {
    setSections((prev) =>
      prev.map((s) =>
        s.sectionId === sectionId
          ? { ...s, content: { ...s.content, [field]: value } }
          : s
      )
    );
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      await updateSections.mutateAsync({ sections });
      setHasChanges(false);
      toast.success("ホームページを更新しました");
    } catch (error) {
      toast.error("更新に失敗しました");
    }
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
          <h1 className="text-white text-3xl mb-2">ホームページ管理</h1>
          <p className="text-slate-400">
            セクションの順序、表示/非表示、コンテンツを管理
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={!hasChanges || updateSections.isPending}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {updateSections.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              保存中...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              変更を保存
            </>
          )}
        </Button>
      </div>

      <div className="space-y-4">
        {sections.map((section, index) => (
          <Card key={section.sectionId} className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="h-6 px-2 text-slate-400 hover:text-white"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === sections.length - 1}
                      className="h-6 px-2 text-slate-400 hover:text-white"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <GripVertical className="h-5 w-5 text-slate-500" />
                  <div>
                    <h3 className="text-white text-lg">{section.title}</h3>
                    <p className="text-slate-400 text-sm">
                      順序: {section.order + 1} | ID: {section.sectionId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={section.isVisible}
                      onCheckedChange={() => handleToggleVisibility(section.sectionId)}
                    />
                    {section.isVisible ? (
                      <Eye className="h-5 w-5 text-green-400" />
                    ) : (
                      <EyeOff className="h-5 w-5 text-slate-500" />
                    )}
                    <span className="text-slate-300">
                      {section.isVisible ? "表示" : "非表示"}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setExpandedSection(
                        expandedSection === section.sectionId ? null : section.sectionId
                      )
                    }
                    className="text-slate-400 hover:text-white"
                  >
                    {expandedSection === section.sectionId ? "閉じる" : "編集"}
                  </Button>
                </div>
              </div>
            </CardHeader>

            {expandedSection === section.sectionId && (
              <CardContent className="pt-0">
                <div className="space-y-4 border-t border-slate-700 pt-4">
                  {/* Hero Section */}
                  {section.sectionId === "hero" && (
                    <>
                      <div>
                        <label className="block text-slate-300 mb-2">見出し</label>
                        <Input
                          value={section.content?.heading || ""}
                          onChange={(e) =>
                            handleContentChange(section.sectionId, "heading", e.target.value)
                          }
                          className="bg-slate-900 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-2">説明</label>
                        <Textarea
                          value={section.content?.description || ""}
                          onChange={(e) =>
                            handleContentChange(section.sectionId, "description", e.target.value)
                          }
                          className="bg-slate-900 border-slate-600 text-white"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-2">背景画像</label>
                        <SingleImageUpload
                          value={section.content?.backgroundImage || ""}
                          onChange={(url) =>
                            handleContentChange(section.sectionId, "backgroundImage", url)
                          }
                          folder="homepage/hero"
                        />
                      </div>
                    </>
                  )}

                  {/* About Section */}
                  {section.sectionId === "about" && (
                    <>
                      <div>
                        <label className="block text-slate-300 mb-2">説明</label>
                        <Textarea
                          value={section.content?.description || ""}
                          onChange={(e) =>
                            handleContentChange(section.sectionId, "description", e.target.value)
                          }
                          className="bg-slate-900 border-slate-600 text-white"
                          rows={4}
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-2">画像</label>
                        <SingleImageUpload
                          value={section.content?.image || ""}
                          onChange={(url) =>
                            handleContentChange(section.sectionId, "image", url)
                          }
                          folder="homepage/about"
                        />
                      </div>
                    </>
                  )}

                  {/* Company Section */}
                  {section.sectionId === "company" && (
                    <>
                      <div>
                        <label className="block text-slate-300 mb-2">会社名</label>
                        <Input
                          value={section.content?.companyInfo?.name || ""}
                          onChange={(e) =>
                            handleContentChange(section.sectionId, "companyInfo", {
                              ...section.content?.companyInfo,
                              name: e.target.value,
                            })
                          }
                          className="bg-slate-900 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-2">住所</label>
                        <Input
                          value={section.content?.companyInfo?.address || ""}
                          onChange={(e) =>
                            handleContentChange(section.sectionId, "companyInfo", {
                              ...section.content?.companyInfo,
                              address: e.target.value,
                            })
                          }
                          className="bg-slate-900 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-2">電話番号</label>
                        <Input
                          value={section.content?.companyInfo?.phone || ""}
                          onChange={(e) =>
                            handleContentChange(section.sectionId, "companyInfo", {
                              ...section.content?.companyInfo,
                              phone: e.target.value,
                            })
                          }
                          className="bg-slate-900 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-2">メール</label>
                        <Input
                          value={section.content?.companyInfo?.email || ""}
                          onChange={(e) =>
                            handleContentChange(section.sectionId, "companyInfo", {
                              ...section.content?.companyInfo,
                              email: e.target.value,
                            })
                          }
                          className="bg-slate-900 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-2">会社ロゴ</label>
                        <SingleImageUpload
                          value={section.content?.companyInfo?.logo || ""}
                          onChange={(url) =>
                            handleContentChange(section.sectionId, "companyInfo", {
                              ...section.content?.companyInfo,
                              logo: url,
                            })
                          }
                          folder="homepage/company"
                        />
                      </div>
                    </>
                  )}

                  <p className="text-slate-500 text-sm">
                    ※ その他のコンテンツは各管理画面で編集してください
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

