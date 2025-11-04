import { NextRequest } from 'next/server';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

// POST /api/upload/image - Upload image to Cloudinary (admin only)
export async function POST(request: NextRequest) {
  try {
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'washizu-mekki';

    if (!file) {
      return createErrorResponse('VALIDATION_ERROR', 'No file provided', 400);
    }

    // Convert file to base64
    const base64 = await fileToBase64(file);

    // Upload to Cloudinary
    const result = await uploadToCloudinary(base64, folder, 'image');

    return createSuccessResponse({
      url: result.url,
      publicId: result.publicId,
      width: result.width,
      height: result.height,
      format: result.format,
    }, 201);
  } catch (error: any) {
    console.error('Image upload error:', error);
    return createErrorResponse('SERVER_ERROR', error.message || 'Failed to upload image', 500);
  }
}

