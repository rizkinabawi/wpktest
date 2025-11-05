import { NextRequest } from 'next/server';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

// Helper: Convert File ke base64 lengkap dengan prefix
async function fileToBase64(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString('base64');
  return `data:${file.type};base64,${base64}`;
}

// POST /api/upload/image - Upload image to Cloudinary (admin only)
export async function POST(request: NextRequest) {
  try {
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'washizu-mekki';

    if (!file) {
      return createErrorResponse('VALIDATION_ERROR', 'No file provided', 400);
    }

    const base64 = await fileToBase64(file);

    console.log("Uploading to Cloudinary:", {
      folder,
      type: typeof base64,
      startsWith: base64.substring(0, 30),
    });

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
