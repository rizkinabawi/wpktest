import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Inquiry from '@/lib/models/Inquiry';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

// PATCH /api/inquiries/[id]/status - Update inquiry status (requires authentication)
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
    const inquiry = await Inquiry.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });

    if (!inquiry) {
      return createErrorResponse('NOT_FOUND', 'お問い合わせが見つかりません', 404);
    }

    return createSuccessResponse({
      message: 'ステータスを更新しました',
      status: inquiry.status,
    });
  } catch (error: any) {
    console.error('Update inquiry status error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

