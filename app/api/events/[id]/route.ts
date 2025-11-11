import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/lib/models/Event";
import { authenticate } from "@/lib/middleware/auth";

// GET /api/events/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ubah menjadi Promise
) {
  try {
    const { id } = await params; // ambil id
    await dbConnect();

    const event = await Event.findById(id);
    if (!event)
      return NextResponse.json({ success: false, error: { message: "Event not found" } }, { status: 404 });

    return NextResponse.json({ success: true, data: event }, { status: 200 });
  } catch (error: any) {
    console.error("GET event error:", error);
    return NextResponse.json({ success: false, error: { message: "Failed to fetch event" } }, { status: 500 });
  }
}

// PUT /api/events/[id] - Update event (admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authenticate(request);
    if (!auth.authenticated) return auth.response;

    const { id } = await params; // ambil id
    await dbConnect();
    const body = await request.json();

    const event = await Event.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!event)
      return NextResponse.json({ success: false, error: { message: "Event not found" } }, { status: 404 });

    return NextResponse.json({ success: true, data: event }, { status: 200 });
  } catch (error: any) {
    console.error("PUT event error:", error);
    return NextResponse.json({ success: false, error: { message: "Failed to update event" } }, { status: 500 });
  }
}

// DELETE /api/events/[id] - Delete event (admin)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await authenticate(_request);
    if (!auth.authenticated) return auth.response;

    const { id } = await params; // ambil id
    await dbConnect();

    const event = await Event.findByIdAndDelete(id);
    if (!event)
      return NextResponse.json({ success: false, error: { message: "Event not found" } }, { status: 404 });

    return NextResponse.json({ success: true, data: { message: "Event deleted successfully" } }, { status: 200 });
  } catch (error: any) {
    console.error("DELETE event error:", error);
    return NextResponse.json({ success: false, error: { message: "Failed to delete event" } }, { status: 500 });
  }
}
