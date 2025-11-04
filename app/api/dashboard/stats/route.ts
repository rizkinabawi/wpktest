import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/lib/models/News';
import Inquiry from '@/lib/models/Inquiry';
import Application from '@/lib/models/Application';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

// GET /api/dashboard/stats - Get dashboard statistics (requires authentication)
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await connectDB();

    // Get counts
    const [totalNews, publishedNews, totalInquiries, unreadInquiries, totalApplications, newApplications] =
      await Promise.all([
        News.countDocuments(),
        News.countDocuments({ status: '公開' }),
        Inquiry.countDocuments(),
        Inquiry.countDocuments({ status: '未読' }),
        Application.countDocuments(),
        Application.countDocuments({ status: '新規' }),
      ]);

    // Get total views
    const newsWithViews = await News.find().select('views');
    const totalViews = newsWithViews.reduce((sum, news) => sum + news.views, 0);

    return createSuccessResponse({
      news: {
        total: totalNews,
        published: publishedNews,
        draft: totalNews - publishedNews,
        totalViews,
      },
      inquiries: {
        total: totalInquiries,
        unread: unreadInquiries,
        inProgress: await Inquiry.countDocuments({ status: '対応中' }),
        completed: await Inquiry.countDocuments({ status: '対応済' }),
      },
      applications: {
        total: totalApplications,
        new: newApplications,
        screening: await Application.countDocuments({ status: '書類選考中' }),
        interview: await Application.countDocuments({ status: '面接予定' }),
      },
    });
  } catch (error: any) {
    console.error('Get dashboard stats error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

