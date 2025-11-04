import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/lib/models/News';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

// GET /api/news - Get all news with pagination and filters
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const category = searchParams.get('category');

    // Build query
    const query: any = {};
    if (status) query.status = status;
    if (category) query.category = category;

    // Calculate skip
    const skip = (page - 1) * limit;

    // Get total count
    const total = await News.countDocuments(query);

    // Get news items
    const items = await News.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Format response
    const formattedItems = items.map((item: any) => ({
      _id: item._id,
      id: item._id,
      date: item.date,
      category: item.category,
      title: item.title,
      description: item.description,
      content: item.content,
      status: item.status,
      views: item.views,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    return createSuccessResponse({
      items: formattedItems,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Get news error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

// POST /api/news - Create new news (requires authentication)
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await connectDB();

    const body = await request.json();
    const { date, category, title, description, content, status } = body;

    // Validate required fields
    if (!date || !category || !title || !description || !content) {
      return createErrorResponse('VALIDATION_ERROR', '必須項目が入力されていません', 400);
    }

    // Create news
    const news = await News.create({
      date,
      category,
      title,
      description,
      content,
      status: status || '下書き',
      views: 0,
    });

    return createSuccessResponse(
      {
        id: news._id,
        date: news.date,
        category: news.category,
        title: news.title,
        description: news.description,
        content: news.content,
        status: news.status,
        views: news.views,
        createdAt: news.createdAt,
        updatedAt: news.updatedAt,
      },
      201
    );
  } catch (error: any) {
    console.error('Create news error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

