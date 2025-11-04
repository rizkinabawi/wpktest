import { NextRequest } from 'next/server';
import { createSuccessResponse } from '@/lib/middleware/auth';

export async function POST(request: NextRequest) {
  // In a stateless JWT system, logout is handled client-side by removing the token
  // This endpoint exists for consistency with the API spec
  return createSuccessResponse({
    message: 'ログアウトしました',
  });
}

