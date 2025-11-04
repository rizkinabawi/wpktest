import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Application from '@/lib/models/Application';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

// PATCH /api/applications/[id]/status - Update application status (requires authentication)
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Authenticate user
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await connectDB();

    const body = await request.json();
    const { status } = body;

    if (!status) {
      return createErrorResponse('VALIDATION_ERROR', 'ステータスは必須です', 400);
    }

    const { id } = await params;
    const application = await Application.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });

    if (!application) {
      return createErrorResponse('NOT_FOUND', '応募が見つかりません', 404);
    }

    return createSuccessResponse({
      message: 'ステータスを更新しました',
      status: application.status,
    });
  } catch (error: any) {
    console.error('Update application status error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

