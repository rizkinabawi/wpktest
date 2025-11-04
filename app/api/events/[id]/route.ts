import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Event from '@/lib/models/Event';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

// GET /api/events/[id]
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const event = await Event.findById(id);

    if (!event) {
      return createErrorResponse('NOT_FOUND', 'Event not found', 404);
    }

    return createSuccessResponse(event);
  } catch (error: any) {
    return createErrorResponse('SERVER_ERROR', 'Failed to fetch event', 500);
  }
}

// PUT /api/events/[id] - Update event (admin only)
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    const event = await Event.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!event) {
      return createErrorResponse('NOT_FOUND', 'Event not found', 404);
    }

    return createSuccessResponse(event);
  } catch (error: any) {
    return createErrorResponse('SERVER_ERROR', 'Failed to update event', 500);
  }
}

// DELETE /api/events/[id] - Delete event (admin only)
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await dbConnect();
    const { id } = await params;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return createErrorResponse('NOT_FOUND', 'Event not found', 404);
    }

    return createSuccessResponse({ message: 'Event deleted successfully' });
  } catch (error: any) {
    return createErrorResponse('SERVER_ERROR', 'Failed to delete event', 500);
  }
}

