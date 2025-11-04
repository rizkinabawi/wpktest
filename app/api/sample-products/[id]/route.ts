import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SampleProduct from '@/lib/models/SampleProduct';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

// GET /api/sample-products/[id]
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const product = await SampleProduct.findById(id);

    if (!product) {
      return createErrorResponse('NOT_FOUND', 'Sample product not found', 404);
    }

    return createSuccessResponse(product);
  } catch (error: any) {
    return createErrorResponse('SERVER_ERROR', 'Failed to fetch sample product', 500);
  }
}

// PUT /api/sample-products/[id] - Update sample product (admin only)
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    const product = await SampleProduct.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!product) {
      return createErrorResponse('NOT_FOUND', 'Sample product not found', 404);
    }

    return createSuccessResponse(product);
  } catch (error: any) {
    return createErrorResponse('SERVER_ERROR', 'Failed to update sample product', 500);
  }
}

// DELETE /api/sample-products/[id] - Delete sample product (admin only)
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await dbConnect();
    const { id } = await params;
    const product = await SampleProduct.findByIdAndDelete(id);

    if (!product) {
      return createErrorResponse('NOT_FOUND', 'Sample product not found', 404);
    }

    return createSuccessResponse({ message: 'Sample product deleted successfully' });
  } catch (error: any) {
    return createErrorResponse('SERVER_ERROR', 'Failed to delete sample product', 500);
  }
}

