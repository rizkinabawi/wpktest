import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS管理システム | 鷲津メッキ工業所",
  description: "鷲津メッキ工業所 CMS管理システム",
};

export default function CMSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
