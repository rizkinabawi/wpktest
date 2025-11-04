import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

// POST /api/settings/password - Update password (requires authentication)
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const auth = await authenticate(request);
    if (!auth.authenticated || !auth.user) {
      return auth.response;
    }

    await connectDB();

    const body = await request.json();
    const { currentPassword, newPassword, confirmPassword } = body;

    // Validate input
    if (!currentPassword || !newPassword || !confirmPassword) {
      return createErrorResponse('VALIDATION_ERROR', '全ての項目を入力してください', 400);
    }

    if (newPassword !== confirmPassword) {
      return createErrorResponse('VALIDATION_ERROR', '新しいパスワードが一致しません', 400);
    }

    if (newPassword.length < 6) {
      return createErrorResponse('VALIDATION_ERROR', 'パスワードは6文字以上である必要があります', 400);
    }

    // Find user with password
    const user = await User.findById(auth.user.userId).select('+password');

    if (!user) {
      return createErrorResponse('NOT_FOUND', 'ユーザーが見つかりません', 404);
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return createErrorResponse('INVALID_CREDENTIALS', '現在のパスワードが正しくありません', 401);
    }

    // Update password
    user.password = newPassword;
    await user.save();

    return createSuccessResponse({
      message: 'パスワードを更新しました',
    });
  } catch (error: any) {
    console.error('Update password error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

