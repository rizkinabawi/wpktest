import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Equipment from '@/lib/models/Equipment';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

// GET /api/equipment - Get all equipment
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '0');

    const query: any = {};
    if (category) query.category = category;
    if (status) query.status = status;

    let queryBuilder = Equipment.find(query).sort({ order: 1, createdAt: -1 });
    if (limit > 0) queryBuilder = queryBuilder.limit(limit);

    const equipment = await queryBuilder.exec();
    const total = await Equipment.countDocuments(query);

    return createSuccessResponse({
      items: equipment.map((item: any) => ({
        _id: item._id,
        id: item._id,
        name: item.name,
        nameEn: item.nameEn,
        category: item.category,
        description: item.description,
        specifications: item.specifications,
        manufacturer: item.manufacturer,
        model: item.model,
        yearInstalled: item.yearInstalled,
        image: item.image,
        status: item.status,
        order: item.order,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
      total,
    });
  } catch (error: any) {
    console.error('Get equipment error:', error);
    return createErrorResponse('SERVER_ERROR', 'Failed to fetch equipment', 500);
  }
}

// POST /api/equipment - Create new equipment (admin only)
export async function POST(request: NextRequest) {
  try {
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await dbConnect();

    const body = await request.json();
    const equipment = await Equipment.create(body);

    return createSuccessResponse(equipment, 201);
  } catch (error: any) {
    console.error('Create equipment error:', error);
    return createErrorResponse('SERVER_ERROR', 'Failed to create equipment', 500);
  }
}

