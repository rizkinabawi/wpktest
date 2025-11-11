import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Application from "@/lib/models/Application";

// Handler GET untuk download CV berdasarkan ID
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ubah context menjadi Promise params
) {
  try {
    const id = (await params).id; // ambil id dari Promise

    await connectToDatabase();

    const app = await Application.findById(id).lean();

    if (!app || !app.resumeUrl) {
      return NextResponse.json({ message: "CV not found" }, { status: 404 });
    }

    return NextResponse.redirect(app.resumeUrl);
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
