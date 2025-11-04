"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "./button";
import { toast } from "sonner";
import Image from "next/image";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  folder?: string;
  disabled?: boolean;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  folder = "washizu-mekki",
  disabled = false,
  className = "",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const storage = localStorage.getItem("auth-storage");
    if (storage) {
      const token = JSON.parse(storage).state.token;
      setAuthToken(token);
    }
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("画像ファイルを選択してください");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("ファイルサイズは5MB以下にしてください");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/upload/image", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error?.message || "アップロードに失敗しました");
      }

      onChange(data.data.url);
      toast.success("画像をアップロードしました");
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "アップロードに失敗しました");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    } else {
      onChange("");
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled || uploading}
        className="hidden"
      />

      {value ? (
        <div className="relative group">
          <div className="relative w-full h-64 bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
            <Image
              src={value}
              alt="Uploaded image"
              fill
              className="object-contain"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleRemove}
            disabled={disabled || uploading}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          onClick={() => !disabled && !uploading && fileInputRef.current?.click()}
          className={`
            w-full h-64 border-2 border-dashed border-slate-700 rounded-lg
            flex flex-col items-center justify-center gap-4
            cursor-pointer hover:border-blue-500 hover:bg-slate-800/50 transition-all
            ${disabled || uploading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {uploading ? (
            <>
              <Loader2 className="h-12 w-12 text-blue-400 animate-spin" />
              <p className="text-slate-400">アップロード中...</p>
            </>
          ) : (
            <>
              <ImageIcon className="h-12 w-12 text-slate-500" />
              <div className="text-center">
                <p className="text-slate-300 mb-1">クリックして画像を選択</p>
                <p className="text-slate-500 text-sm">PNG, JPG, WEBP (最大5MB)</p>
              </div>
              <Button type="button" variant="outline" size="sm" disabled={disabled}>
                <Upload className="h-4 w-4 mr-2" />
                画像を選択
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

interface MultipleImageUploadProps {
  values?: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
  disabled?: boolean;
  maxImages?: number;
  className?: string;
}

export function MultipleImageUpload({
  values = [],
  onChange,
  folder = "washizu-mekki",
  disabled = false,
  maxImages = 5,
  className = "",
}: MultipleImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const storage = localStorage.getItem("auth-storage");
    if (storage) {
      const token = JSON.parse(storage).state.token;
      setAuthToken(token);
    }
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Check max images
    if (values.length + files.length > maxImages) {
      toast.error(`最大${maxImages}枚まで選択できます`);
      return;
    }

    // Validate files
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toast.error("画像ファイルのみ選択してください");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("ファイルサイズは5MB以下にしてください");
        return;
      }
    }

    setUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const response = await fetch("/api/upload/image", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error?.message || "アップロードに失敗しました");
        }

        return data.data.url;
      });

      const urls = await Promise.all(uploadPromises);
      onChange([...values, ...urls]);
      toast.success(`${urls.length}枚の画像をアップロードしました`);
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "アップロードに失敗しました");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        disabled={disabled || uploading || values.length >= maxImages}
        className="hidden"
      />

      {values.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {values.map((url, index) => (
            <div key={index} className="relative group">
              <div className="relative w-full h-40 bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                <Image
                  src={url}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => handleRemove(index)}
                disabled={disabled || uploading}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {values.length < maxImages && (
        <div
          onClick={() => !disabled && !uploading && fileInputRef.current?.click()}
          className={`
            w-full h-40 border-2 border-dashed border-slate-700 rounded-lg
            flex flex-col items-center justify-center gap-2
            cursor-pointer hover:border-blue-500 hover:bg-slate-800/50 transition-all
            ${disabled || uploading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {uploading ? (
            <>
              <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
              <p className="text-slate-400 text-sm">アップロード中...</p>
            </>
          ) : (
            <>
              <Upload className="h-8 w-8 text-slate-500" />
              <p className="text-slate-300 text-sm">画像を追加 ({values.length}/{maxImages})</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
