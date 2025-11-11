import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Inquiry from '@/lib/models/Inquiry';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

// GET /api/inquiries/[id] - Get single inquiry (requires authentication)
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Authenticate user
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await connectDB();

    const { id } = await params;
    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      return createErrorResponse('NOT_FOUND', 'お問い合わせが見つかりません', 404);
    }

    return createSuccessResponse({
      id: inquiry._id,
      date: inquiry.createdAt,
      companyName: inquiry.companyName,
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      service: inquiry.service,
      message: inquiry.message,
      status: inquiry.status,
      createdAt: inquiry.createdAt,
      updatedAt: inquiry.updatedAt,
    });

  } catch (error: any) {
    console.error('Get inquiry error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

