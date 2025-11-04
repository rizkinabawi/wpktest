import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const auth = await authenticate(request);
    if (!auth.authenticated || !auth.user) {
      return auth.response;
    }

    await connectDB();

    // Find user
    const user = await User.findById(auth.user.userId);

    if (!user) {
      return createErrorResponse('NOT_FOUND', 'ユーザーが見つかりません', 404);
    }

    return createSuccessResponse({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error: any) {
    console.error('Get user error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

