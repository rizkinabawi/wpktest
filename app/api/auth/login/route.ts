import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { generateToken } from '@/lib/jwt';
import { createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return createErrorResponse('VALIDATION_ERROR', 'メールアドレスとパスワードは必須です', 400);
    }

    // Find user with password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return createErrorResponse('INVALID_CREDENTIALS', 'メールアドレスまたはパスワードが正しくありません', 401);
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return createErrorResponse('INVALID_CREDENTIALS', 'メールアドレスまたはパスワードが正しくありません', 401);
    }

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Return success response
    return createSuccessResponse({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

