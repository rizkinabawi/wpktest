// app/api/company/route.ts
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import CompanyModel from "@/lib/models/Company";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectToDatabase();

    // Type casting biar TS gak complain
    const Company = CompanyModel as mongoose.Model<any>;

    const company = await Company.findOne().lean();

    if (!company) {
      return NextResponse.json({ message: "No company found" }, { status: 404 });
    }

    return NextResponse.json(company, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Server error" }, { status: 500 });
  }
}
