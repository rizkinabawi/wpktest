import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Equipment from '@/lib/models/Equipment';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

// GET /api/equipment/[id]
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  
  try {
    await dbConnect();
    const { id } = await params;
    if (!Equipment || !Equipment.findOne) {
      throw new Error("Equipment model not initialized correctly");
    }
    const equipment = await Equipment.findById(id).lean();

    if (!equipment) {
      return createErrorResponse('NOT_FOUND', 'Equipment not found', 404);
    }

    return createSuccessResponse(equipment);
  } catch (error: any) {
    return createErrorResponse('SERVER_ERROR', 'Failed to fetch equipment', 500);
  }
}

// PUT /api/equipment/[id] - Update equipment (admin only)
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    const equipment = await Equipment.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!equipment) {
      return createErrorResponse('NOT_FOUND', 'Equipment not found', 404);
    }

    return createSuccessResponse(equipment);
  } catch (error: any) {
    return createErrorResponse('SERVER_ERROR', 'Failed to update equipment', 500);
  }
}

// DELETE /api/equipment/[id] - Delete equipment (admin only)
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await dbConnect();
    const { id } = await params;
    const equipment = await Equipment.findByIdAndDelete(id);

    if (!equipment) {
      return createErrorResponse('NOT_FOUND', 'Equipment not found', 404);
    }

    return createSuccessResponse({ message: 'Equipment deleted successfully' });
  } catch (error: any) {
    return createErrorResponse('SERVER_ERROR', 'Failed to delete equipment', 500);
  }
}

