import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/lib/models/News';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

// GET /api/news/[id] - Get single news
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;
    const news = await News.findById(id);

    if (!news) {
      return createErrorResponse('NOT_FOUND', 'ニュースが見つかりません', 404);
    }

    // Increment views
    news.views += 1;
    await news.save();

    return createSuccessResponse({
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
    });
  } catch (error: any) {
    console.error('Get news error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

// PUT /api/news/[id] - Update news (requires authentication)
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Authenticate user
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await connectDB();

    const body = await request.json();
    const { date, category, title, description, content, status } = body;

    const { id } = await params;
    const news = await News.findByIdAndUpdate(
      id,
      {
        date,
        category,
        title,
        description,
        content,
        status,
      },
      { new: true, runValidators: true }
    );

    if (!news) {
      return createErrorResponse('NOT_FOUND', 'ニュースが見つかりません', 404);
    }

    return createSuccessResponse({
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
    });
  } catch (error: any) {
    console.error('Update news error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

// DELETE /api/news/[id] - Delete news (requires authentication)
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Authenticate user
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await connectDB();

    const { id } = await params;
    const news = await News.findByIdAndDelete(id);

    if (!news) {
      return createErrorResponse('NOT_FOUND', 'ニュースが見つかりません', 404);
    }

    return createSuccessResponse({
      message: 'ニュースを削除しました',
    });
  } catch (error: any) {
    console.error('Delete news error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

