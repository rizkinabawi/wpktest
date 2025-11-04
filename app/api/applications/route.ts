import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Application from '@/lib/models/Application';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

// GET /api/applications - Get all applications with pagination and filters (requires authentication)
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
    const total = await Application.countDocuments(query);

    // Get applications
    const items = await Application.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();

    // Format response
    const formattedItems = items.map((item: any) => ({
      id: item._id,
      date: item.date,
      position: item.position,
      name: item.name,
      age: item.age,
      email: item.email,
      phone: item.phone,
      experience: item.experience,
      motivation: item.motivation,
      resumeUrl: item.resumeUrl,
      status: item.status,
      referenceNumber: item.referenceNumber,
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
    console.error('Get applications error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

// POST /api/applications - Create new application (public endpoint with file upload)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const position = formData.get('position') as string;
    const name = formData.get('name') as string;
    const age = parseInt(formData.get('age') as string);
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const experience = formData.get('experience') as string;
    const motivation = formData.get('motivation') as string;
    const resume = formData.get('resume') as File | null;

    // Validate required fields
    if (!position || !name || !age || !email || !phone || !experience || !motivation) {
      return createErrorResponse('VALIDATION_ERROR', '必須項目が入力されていません', 400);
    }

    // Upload resume if provided
    let resumeUrl: string | undefined;
    if (resume) {
      try {
        const bytes = await resume.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = `data:${resume.type};base64,${buffer.toString('base64')}`;
        const uploadResult = await uploadToCloudinary(base64, 'washizu-mekki/resumes', 'raw');
        resumeUrl = uploadResult.url;
      } catch (uploadError) {
        console.error('Resume upload error:', uploadError);
        // Continue without resume if upload fails
      }
    }

    // Create date string
    const now = new Date();
    const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Create application
    const application = await Application.create({
      date: dateStr,
      position,
      name,
      age,
      email,
      phone,
      experience,
      motivation,
      resumeUrl,
      status: '新規',
    });

    return createSuccessResponse(
      {
        message: 'ご応募ありがとうございます',
        id: application._id,
        referenceNumber: application.referenceNumber,
      },
      201
    );
  } catch (error: any) {
    console.error('Create application error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

