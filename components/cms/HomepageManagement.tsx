"use client";

import { useState, useEffect } from "react";
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
    newSections.forEach((s, i) => (s.order = i));
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
    newSections.forEach((s, i) => (s.order = i));
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
                  {/* {section.sectionId === "hero" && (
                    <>
                      <label className="block text-slate-300 mb-2">見出し</label>
                      <Input
                        value={section.content?.heading || ""}
                        onChange={(e) =>
                          handleContentChange(section.sectionId, "heading", e.target.value)
                        }
                        className="bg-slate-900 border-slate-600 text-white"
                      />
                      <label className="block text-slate-300 mb-2">説明</label>
                      <Textarea
                        value={section.content?.description || ""}
                        onChange={(e) =>
                          handleContentChange(section.sectionId, "description", e.target.value)
                        }
                        className="bg-slate-900 border-slate-600 text-white"
                      />
                      <label className="block text-slate-300 mb-2">背景画像</label>
                      <SingleImageUpload
                        value={section.content?.backgroundImage || ""}
                        onChange={(url) =>
                          handleContentChange(section.sectionId, "backgroundImage", url)
                        }
                        folder="homepage/hero"
                      />
                    </>
                  )} */}

                  {/* Hero Section */}
                  {section.sectionId === "hero" && (
                    <>
                      <label className="block text-slate-300 mb-2">見出し（Heading）</label>
                      <Input
                        value={section.content?.heading || ""}
                        onChange={(e) =>
                          handleContentChange(section.sectionId, "heading", e.target.value)
                        }
                        className="bg-slate-900 border-slate-600 text-white"
                      />

                      <label className="block text-slate-300 mb-2">サブ見出し（Subheading）</label>
                      <Input
                        value={section.content?.subheading || ""}
                        onChange={(e) =>
                          handleContentChange(section.sectionId, "subheading", e.target.value)
                        }
                        className="bg-slate-900 border-slate-600 text-white"
                      />

                      <label className="block text-slate-300 mb-2">説明（Description）</label>
                      <Textarea
                        value={section.content?.description || ""}
                        onChange={(e) =>
                          handleContentChange(section.sectionId, "description", e.target.value)
                        }
                        className="bg-slate-900 border-slate-600 text-white"
                        rows={3}
                      />

                      <label className="block text-slate-300 mb-2">背景画像（Background Image）</label>
                      <SingleImageUpload
                        value={section.content?.image || ""}
                        onChange={(url) =>
                          handleContentChange(section.sectionId, "image", url)
                        }
                        folder="homepage/hero"
                      />

                      <label className="block text-slate-300 mb-2">バッジテキスト（Badge Text）</label>
                      <Input
                        value={section.content?.badge?.text || ""}
                        onChange={(e) =>
                          handleContentChange(section.sectionId, "badge", {
                            ...section.content?.badge,
                            text: e.target.value,
                          })
                        }
                        className="bg-slate-900 border-slate-600 text-white"
                      />

                      <div className="space-y-2">
                        <label className="block text-slate-300 mb-2">ボタン（Buttons）</label>
                        {(section.content?.buttons || []).map((btn: any, i: number) => (
                          <div key={i} className="flex gap-2">
                            <Input
                              placeholder="Button text"
                              value={btn.text}
                              onChange={(e) => {
                                const newBtns = [...(section.content?.buttons || [])];
                                newBtns[i].text = e.target.value;
                                handleContentChange(section.sectionId, "buttons", newBtns);
                              }}
                              className="bg-slate-900 border-slate-600 text-white"
                            />
                            <Input
                              placeholder="#link"
                              value={btn.link}
                              onChange={(e) => {
                                const newBtns = [...(section.content?.buttons || [])];
                                newBtns[i].link = e.target.value;
                                handleContentChange(section.sectionId, "buttons", newBtns);
                              }}
                              className="bg-slate-900 border-slate-600 text-white"
                            />
                          </div>
                        ))}

                        <Button
                          variant="outline"
                          onClick={() =>
                            handleContentChange(section.sectionId, "buttons", [
                              ...(section.content?.buttons || []),
                              { text: "新しいボタン", link: "#", variant: "primary" },
                            ])
                          }
                        >
                          ボタンを追加
                        </Button>
                      </div>
                    </>
                  )}

                  {/* About Section */}
                  {section.sectionId === "about" && (
                    <>
                      <label className="block text-slate-300 mb-2">説明</label>
                      <Textarea
                        value={section.content?.description || ""}
                        onChange={(e) =>
                          handleContentChange(section.sectionId, "description", e.target.value)
                        }
                        className="bg-slate-900 border-slate-600 text-white"
                      />
                      <label className="block text-slate-300 mb-2">画像</label>
                      <SingleImageUpload
                        value={section.content?.image || ""}
                        onChange={(url) =>
                          handleContentChange(section.sectionId, "image", url)
                        }
                        folder="homepage/about"
                      />
                    </>
                  )}

                  {/* Technology Section */}
                  {section.sectionId === "technology" && (
                    <>
                      <label className="block text-slate-300 mb-2">見出し</label>
                      <Input
                        value={section.content?.heading || ""}
                        onChange={(e) =>
                          handleContentChange(section.sectionId, "heading", e.target.value)
                        }
                        className="bg-slate-900 border-slate-600 text-white"
                      />
                      <label className="block text-slate-300 mb-2">説明</label>
                      <Textarea
                        value={section.content?.description || ""}
                        onChange={(e) =>
                          handleContentChange(section.sectionId, "description", e.target.value)
                        }
                        className="bg-slate-900 border-slate-600 text-white"
                        rows={4}
                      />
                      <label className="block text-slate-300 mb-2">背景画像</label>
                      <SingleImageUpload
                        value={section.content?.image || ""}
                        onChange={(url) =>
                          handleContentChange(section.sectionId, "image", url)
                        }
                        folder="homepage/technology"
                      />
                    </>
                  )}

                  {/* Company Section */}
                  {section.sectionId === "company" && (
                    <>
                      <label className="block text-slate-300 mb-2">会社名</label>
                      <Input
                        value={section.content?.companyInfo?.name || "有限会社 鷲津メッキ工業所"}
                        onChange={(e) =>
                          handleContentChange(section.sectionId, "companyInfo", {
                            ...section.content?.companyInfo,
                            name: e.target.value,
                          })
                        }
                        className="bg-slate-900 border-slate-600 text-white"
                      />

                      <label className="block text-slate-300 mb-2">住所</label>
                      <Input
                        value={section.content?.companyInfo?.address || "静岡県湖西市新居町内山1214-2"}
                        onChange={(e) =>
                          handleContentChange(section.sectionId, "companyInfo", {
                            ...section.content?.companyInfo,
                            address: e.target.value,
                          })
                        }
                        className="bg-slate-900 border-slate-600 text-white"
                      />

                      <label className="block text-slate-300 mb-2">電話番号</label>
                      <Input
                        value={section.content?.companyInfo?.phone || "053-595-3456"}
                        onChange={(e) =>
                          handleContentChange(section.sectionId, "companyInfo", {
                            ...section.content?.companyInfo,
                            phone: e.target.value,
                          })
                        }
                        className="bg-slate-900 border-slate-600 text-white"
                      />

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

                      <label className="block text-slate-300 mb-2">創業</label>
                      <Input
                        value={section.content?.companyInfo?.founded || "1961年12月"}
                        onChange={(e) =>
                          handleContentChange(section.sectionId, "companyInfo", {
                            ...section.content?.companyInfo,
                            founded: e.target.value,
                          })
                        }
                        className="bg-slate-900 border-slate-600 text-white"
                      />

                      <label className="block text-slate-300 mb-2">従業員</label>
                      <Input
                        value={section.content?.companyInfo?.employees || "正規 49名 / 非正規 約32名"}
                        onChange={(e) =>
                          handleContentChange(section.sectionId, "companyInfo", {
                            ...section.content?.companyInfo,
                            employees: e.target.value,
                          })
                        }
                        className="bg-slate-900 border-slate-600 text-white"
                      />

                      <label className="block text-slate-300 mb-2">資本金</label>
                      <Input
                        value={section.content?.companyInfo?.capital || "500万円"}
                        onChange={(e) =>
                          handleContentChange(section.sectionId, "companyInfo", {
                            ...section.content?.companyInfo,
                            capital: e.target.value,
                          })
                        }
                        className="bg-slate-900 border-slate-600 text-white"
                      />

                      <label className="block text-slate-300 mb-2">製品</label>
                      <div className="space-y-2">
                        {(section.content?.companyInfo?.products || ["自動車金属部品メッキ", "亜鉛メッキ", "ニッケルメッキ"]).map(
                          (product, index) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                value={product}
                                onChange={(e) => {
                                  const newProducts = [...(section.content?.companyInfo?.products || [])];
                                  newProducts[index] = e.target.value;
                                  handleContentChange(section.sectionId, "companyInfo", {
                                    ...section.content?.companyInfo,
                                    products: newProducts,
                                  });
                                }}
                                className="bg-slate-900 border-slate-600 text-white flex-1"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newProducts = [...(section.content?.companyInfo?.products || [])];
                                  newProducts.splice(index, 1);
                                  handleContentChange(section.sectionId, "companyInfo", {
                                    ...section.content?.companyInfo,
                                    products: newProducts,
                                  });
                                }}
                                className="bg-red-600 px-2 rounded text-white"
                              >
                                削除
                              </button>
                            </div>
                          )
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            const newProducts = [...(section.content?.companyInfo?.products || [])];
                            newProducts.push("");
                            handleContentChange(section.sectionId, "companyInfo", {
                              ...section.content?.companyInfo,
                              products: newProducts,
                            });
                          }}
                          className="bg-blue-600 px-4 py-1 rounded text-white"
                        >
                          追加
                        </button>
                      </div>
                    </>
                  )}



                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
