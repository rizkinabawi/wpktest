import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/lib/models/News';
import Inquiry from '@/lib/models/Inquiry';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

// GET /api/dashboard/recent - Get recent activities (requires authentication)
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await connectDB();

    // Get recent inquiries (last 5)
    const recentInquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(5).lean();

    // Get recent news (last 5)
    const recentNews = await News.find().sort({ createdAt: -1 }).limit(5).lean();

    return createSuccessResponse({
      inquiries: recentInquiries.map((inquiry: any) => ({
        id: inquiry._id,
        name: inquiry.name,
        company: inquiry.companyName,
        service: inquiry.service,
        date: inquiry.date,
        status: inquiry.status,
      })),
      news: recentNews.map((news: any) => ({
        id: news._id,
        title: news.title,
        date: news.date,
        views: news.views,
      })),
    });
  } catch (error: any) {
    console.error('Get recent activities error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

