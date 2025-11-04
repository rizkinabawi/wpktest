import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/lib/models/Service';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

// GET /api/services/[id] - Get single service
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;
    const service = await Service.findById(id);

    if (!service) {
      return createErrorResponse('NOT_FOUND', 'サービスが見つかりません', 404);
    }

    return createSuccessResponse({
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
    });
  } catch (error: any) {
    console.error('Get service error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

// PUT /api/services/[id] - Update service (requires authentication)
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Authenticate user
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await connectDB();

    const body = await request.json();

    const { id } = await params;
    const service = await Service.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!service) {
      return createErrorResponse('NOT_FOUND', 'サービスが見つかりません', 404);
    }

    return createSuccessResponse({
      id: service._id,
      title: service.title,
      titleEn: service.titleEn,
      description: service.description,
      features: service.features,
      applications: service.applications,
      color: service.color,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    });
  } catch (error: any) {
    console.error('Update service error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

// DELETE /api/services/[id] - Delete service (requires authentication)
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Authenticate user
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await connectDB();

    const { id } = await params;
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return createErrorResponse('NOT_FOUND', 'サービスが見つかりません', 404);
    }

    return createSuccessResponse({
      message: 'サービスを削除しました',
    });
  } catch (error: any) {
    console.error('Delete service error:', error);
    return createErrorResponse('SERVER_ERROR', 'サーバーエラーが発生しました', 500);
  }
}

