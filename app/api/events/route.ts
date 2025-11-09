import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Event from '@/lib/models/Event';

// GET /api/events
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);

    const status = searchParams.get('status');
    const isPublic = searchParams.get('isPublic');
    const limit = parseInt(searchParams.get('limit') || '0');

    const query: any = {};
    if (status) query.status = status;
    if (isPublic === 'true') query.isPublic = true;

    let queryBuilder = Event.find(query).sort({ startDate: -1 });
    if (limit > 0) queryBuilder = queryBuilder.limit(limit);

    const events = await queryBuilder.exec();
    const total = await Event.countDocuments(query);

    return new Response(
      JSON.stringify({ success: true, data: { items: events, total } }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get events error:', error);
    return new Response(
      JSON.stringify({ success: false, error: { message: 'Failed to fetch events' } }),
      { status: 500 }
    );
  }
}

// POST /api/events
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    const event = await Event.create({
      ...body,
      youtubeUrl: body.youtubeUrl || '',
    });

    return new Response(
      JSON.stringify({ success: true, data: event }),
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create event error:', error);
    return new Response(
      JSON.stringify({ success: false, error: { message: 'Failed to create event' } }),
      { status: 500 }
    );
  }
}
