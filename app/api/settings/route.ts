import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Settings from '@/lib/models/Settings';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

// GET /api/settings - Get settings (requires authentication)
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await connectDB();

    // Get or create settings
    let settings = await Settings.findOne();

    if (!settings) {
      // Create default settings if none exist
      settings = await Settings.create({
        company: {
          name: '有限会社 鷲津メッキ工業所',
          email: 'info@washidu-mekki.com',
          phone: '03-XXXX-XXXX',
          address: '東京都XX区XXXX-XX-XX',
        },
        notifications: {
          newInquiry: true,
          newApplication: true,
          weeklyReport: false,
        },
      });
    }

    return createSuccessResponse({
      company: settings.company,
      notifications: settings.notifications,
    });
  } catch (error: any) {
    console.error('Get settings error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

// PUT /api/settings - Update settings (requires authentication)
export async function PUT(request: NextRequest) {
  try {
    // Authenticate user
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await connectDB();

    const body = await request.json();
    const { company, notifications } = body;

    // Get or create settings
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({ company, notifications });
    } else {
      settings.company = company;
      settings.notifications = notifications;
      await settings.save();
    }

    return createSuccessResponse({
      message: '設定を更新しました',
      company: settings.company,
      notifications: settings.notifications,
    });
  } catch (error: any) {
    console.error('Update settings error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

