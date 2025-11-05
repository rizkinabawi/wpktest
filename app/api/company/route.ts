import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Company from "@/lib/models/Company";

export async function GET() {
  try {
    await connectToDatabase();
    const company = await Company.findOne();

    if (!company) {
      return NextResponse.json({ message: "No company found" }, { status: 404 });
    }

    return NextResponse.json(company);
  } catch (error) {
    console.error("Failed to fetch company data:", error);
    return NextResponse.json(
      { message: "Failed to fetch company data" },
      { status: 500 }
    );
  }
}
