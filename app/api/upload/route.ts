import { NextRequest } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

// POST /api/upload - Upload file to Cloudinary (requires authentication)
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const type = (formData.get('type') as string) || 'image';

    if (!file) {
      return createErrorResponse('VALIDATION_ERROR', 'ファイルが選択されていません', 400);
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return createErrorResponse('VALIDATION_ERROR', 'ファイルサイズは10MB以下である必要があります', 400);
    }

    // Validate file type
    const allowedTypes: { [key: string]: string[] } = {
      image: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
      resume: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    };

    const validTypes = allowedTypes[type] || allowedTypes.image;
    if (!validTypes.includes(file.type)) {
      return createErrorResponse('VALIDATION_ERROR', 'サポートされていないファイル形式です', 400);
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Determine folder and resource type
    const folder = type === 'resume' ? 'washizu-mekki/resumes' : type === 'document' ? 'washizu-mekki/documents' : 'washizu-mekki/images';
    const resourceType = type === 'image' ? 'image' : 'raw';

    // Upload to Cloudinary
    const result = await uploadToCloudinary(base64, folder, resourceType);

    return createSuccessResponse({
      url: result.url,
      filename: file.name,
      size: file.size,
      mimeType: file.type,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return createErrorResponse('SERVER_ERROR', `アップロードに失敗しました: ${error.message}`, 500);
  }
}

