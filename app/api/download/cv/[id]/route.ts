// app/api/download/cv/[id]/route.ts
import { NextResponse } from "next/server";
import  connectToDatabase  from "@/lib/mongodb";
import Application from "@/lib/models/Application";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = await params.id;

  try {
    await connectToDatabase();

    const app = await Application.findById(id).lean();

    if (!app || !app.resumeUrl) {
      return NextResponse.json(
        { error: "ファイルが見つかりません。" },
        { status: 404 }
      );
    }

    // Redirect langsung ke Cloudinary file URL
    return NextResponse.redirect(app.resumeUrl);
  } catch (error: any) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました。" },
      { status: 500 }
    );
  }
}
