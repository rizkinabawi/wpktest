import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import HomepageSection from "@/lib/models/HomepageSection";

export async function GET() {
  try {
    await dbConnect();

    const sections = [
      // {
      //   sectionId: "hero",
      //   title: "Hero Section",
      //   order: 0,
      //   isVisible: true,
      //   content: {
      //     heading: "高品質なメッキ加工を提供",
      //     description: "創業50年以上の経験で信頼を築く。",
      //     backgroundImage: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      //     buttons: [
      //       { text: "お問い合わせ", link: "#contact", variant: "primary" },
      //       { text: "会社概要", link: "#company", variant: "secondary" },
      //     ],
      //   },
      // },
      // {
      //   sectionId: "about",
      //   title: "About Section",
      //   order: 1,
      //   isVisible: true,
      //   content: {
      //     heading: "テクノロジーとエコロジーの融合を実現する",
      //     description:
      //       "鷲津メッキ工業所は、創業以来メッキ加工一筋で培った確かな技術と豊富な経験を活かし、高品質な表面処理サービスを提供しています。",
      //     image: "https://images.unsplash.com/photo-1513828583688-c52646db42da",
      //     features: [
      //       { title: "確かな技術", description: "長年培った高度なメッキ技術" },
      //       { title: "品質保証", description: "安定した高品質を実現" },
      //     ],
      //   },
      // },
      // {
      //   sectionId: "technology",
      //   title: "Technology Section",
      //   order: 2,
      //   isVisible: true,
      //   content: {
      //     heading: "環境に配慮した最新技術",
      //     description: "持続可能な製造を目指しています。",
      //     image: "https://images.unsplash.com/photo-1581091215367-59ab6c74b0c6",
      //     ecoInitiatives: [
      //       {
      //         title: "廃液処理の徹底",
      //         description: "環境負荷を最小限に抑えます。",
      //       },
      //       {
      //         title: "省エネルギー設備",
      //         description: "エコで効率的な生産ライン。",
      //       },
      //     ],
      //   },
      // },
      {
        sectionId: "company",
        title: "Company Section",
        order: 3,
        isVisible: true,
        content: {
          companyInfo: {
            name: "有限会社 鷲津メッキ工業所",
            address: "〒123-4567 東京都中央区1-2-3",
            phone: "03-1234-5678",
            email: "info@washidu-mekki.com",
            logo: "https://res.cloudinary.com/demo/image/upload/company_logo.png",
            founded: "1961年12月",       // baru ditambahkan
            employees: "正規 49名 / 非正規 約32名", // baru ditambahkan
            capital: "500万円",           // baru ditambahkan
            products: [                   // baru ditambahkan
              "自動車金属部品メッキ",
              "亜鉛メッキ",
              "ニッケルメッキ"
            ],
          },
          mapImage: "https://images.unsplash.com/photo-1647427060118-4911c9821b82",
          access: {
            station: "XX線「XX駅」より徒歩XX分",
            car: "XXインターより車で約XX分",
            parking: "駐車場あり（X台）",
          },
        }
      }
      
    ]

    await HomepageSection.deleteMany({ sectionId: "company" });
    await HomepageSection.insertMany(sections);

    return NextResponse.json({
      success: true,
      message: "Homepage sections seeded successfully!",
      sections,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
