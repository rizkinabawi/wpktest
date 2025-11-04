import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Inquiry from '@/lib/models/Inquiry';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

// GET /api/inquiries - Get all inquiries with pagination and filters (requires authentication)
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');

    // Build query
    const query: any = {};
    if (status) query.status = status;

    // Calculate skip
    const skip = (page - 1) * limit;

    // Get total count
    const total = await Inquiry.countDocuments(query);

    // Get inquiries
    const items = await Inquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();

    // Format response
    const formattedItems = items.map((item: any) => ({
      id: item._id,
      date: item.date,
      companyName: item.companyName,
      name: item.name,
      email: item.email,
      phone: item.phone,
      service: item.service,
      message: item.message,
      status: item.status,
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
    console.error('Get inquiries error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

// POST /api/inquiries - Create new inquiry (public endpoint)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { companyName, name, email, phone, service, message } = body;

    // Validate required fields
    if (!companyName || !name || !email || !phone || !service || !message) {
      return createErrorResponse('VALIDATION_ERROR', '必須項目が入力されていません', 400);
    }

    // Create date string
    const now = new Date();
    const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Create inquiry
    const inquiry = await Inquiry.create({
      date: dateStr,
      companyName,
      name,
      email,
      phone,
      service,
      message,
      status: '未読',
    });

    return createSuccessResponse(
      {
        message: 'お問い合わせを受け付けました',
        id: inquiry._id,
      },
      201
    );
  } catch (error: any) {
    console.error('Create inquiry error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

