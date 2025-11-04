import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/lib/models/Service';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

// GET /api/services - Get all services
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const services = await Service.find().sort({ createdAt: -1 }).lean();

    const formattedServices = services.map((service: any) => ({
      _id: service._id,
      id: service._id,
      title: service.title,
      titleEn: service.titleEn,
      description: service.description,
      features: service.features,
      applications: service.applications,
      color: service.color,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    }));

    return createSuccessResponse({
      items: formattedServices,
      total: formattedServices.length,
    });
  } catch (error: any) {
    console.error('Get services error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

// POST /api/services - Create new service (requires authentication)
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await connectDB();

    const body = await request.json();
    const { title, titleEn, description, features, applications, color } = body;

    // Validate required fields
    if (!title || !titleEn || !description) {
      return createErrorResponse('VALIDATION_ERROR', '必須項目が入力されていません', 400);
    }

    // Create service
    const service = await Service.create({
      title,
      titleEn,
      description,
      features: features || [],
      applications: applications || [],
      color: color || 'from-blue-400 to-blue-600',
    });

    return createSuccessResponse(
      {
        id: service._id,
        title: service.title,
        titleEn: service.titleEn,
        description: service.description,
        features: service.features,
        applications: service.applications,
        color: service.color,
        createdAt: service.createdAt,
        updatedAt: service.updatedAt,
      },
      201
    );
  } catch (error: any) {
    console.error('Create service error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

