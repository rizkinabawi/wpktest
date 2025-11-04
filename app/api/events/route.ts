import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Event from '@/lib/models/Event';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

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

    return createSuccessResponse({
      items: events.map((item: any) => ({
        _id: item._id,
        id: item._id,
        title: item.title,
        titleEn: item.titleEn,
        description: item.description,
        eventType: item.eventType,
        startDate: item.startDate,
        endDate: item.endDate,
        location: item.location,
        organizer: item.organizer,
        registrationUrl: item.registrationUrl,
        images: item.images,
        status: item.status,
        isPublic: item.isPublic,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
      total,
    });
  } catch (error: any) {
    console.error('Get events error:', error);
    return createErrorResponse('SERVER_ERROR', 'Failed to fetch events', 500);
  }
}

// POST /api/events - Create new event (admin only)
export async function POST(request: NextRequest) {
  try {
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await dbConnect();

    const body = await request.json();
    const event = await Event.create(body);

    return createSuccessResponse(event, 201);
  } catch (error: any) {
    console.error('Create event error:', error);
    return createErrorResponse('SERVER_ERROR', 'Failed to create event', 500);
  }
}

