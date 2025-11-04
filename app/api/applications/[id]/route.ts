import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Application from '@/lib/models/Application';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

// GET /api/applications/[id] - Get single application (requires authentication)
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Authenticate user
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await connectDB();

    const { id } = await params;
    const application = await Application.findById(id);

    if (!application) {
      return createErrorResponse('NOT_FOUND', '応募が見つかりません', 404);
    }

    return createSuccessResponse({
      id: application._id,
      date: application.date,
      position: application.position,
      name: application.name,
      age: application.age,
      email: application.email,
      phone: application.phone,
      experience: application.experience,
      motivation: application.motivation,
      resumeUrl: application.resumeUrl,
      status: application.status,
      referenceNumber: application.referenceNumber,
      createdAt: application.createdAt,
      updatedAt: application.updatedAt,
    });
  } catch (error: any) {
    console.error('Get application error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

