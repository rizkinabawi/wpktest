import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SampleProduct from '@/lib/models/SampleProduct';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

// GET /api/sample-products
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

    let queryBuilder = SampleProduct.find(query).sort({ order: 1, createdAt: -1 });
    if (limit > 0) queryBuilder = queryBuilder.limit(limit);

    const products = await queryBuilder.exec();
    const total = await SampleProduct.countDocuments(query);

    return createSuccessResponse({
      items: products.map((item: any) => ({
        _id: item._id,
        id: item._id,
        title: item.title,
        titleEn: item.titleEn,
        category: item.category,
        description: item.description,
        process: item.process,
        materials: item.materials,
        specifications: item.specifications,
        images: item.images,
        features: item.features,
        applications: item.applications,
        status: item.status,
        order: item.order,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
      total,
    });
  } catch (error: any) {
    console.error('Get sample products error:', error);
    return createErrorResponse('SERVER_ERROR', 'Failed to fetch sample products', 500);
  }
}

// POST /api/sample-products - Create new sample product (admin only)
export async function POST(request: NextRequest) {
  try {
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await dbConnect();

    const body = await request.json();
    const product = await SampleProduct.create(body);

    return createSuccessResponse(product, 201);
  } catch (error: any) {
    console.error('Create sample product error:', error);
    return createErrorResponse('SERVER_ERROR', 'Failed to create sample product', 500);
  }
}

