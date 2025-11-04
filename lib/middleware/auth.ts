import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractToken, JWTPayload } from '@/lib/jwt';

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload;
}

/**
 * Middleware to authenticate API requests
 */
export async function authenticate(request: NextRequest): Promise<{
  authenticated: boolean;
  user?: JWTPayload;
  response?: NextResponse;
}> {
  const authHeader = request.headers.get('authorization');
  const token = extractToken(authHeader);

  if (!token) {
    return {
      authenticated: false,
      response: NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: '認証が必要です',
          },
        },
        { status: 401 }
      ),
    };
  }

  const user = verifyToken(token);

  if (!user) {
    return {
      authenticated: false,
      response: NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_TOKEN',
            message: 'トークンが無効です',
          },
        },
        { status: 401 }
      ),
    };
  }

  return {
    authenticated: true,
    user,
  };
}

/**
 * Helper function to create error responses
 */
export function createErrorResponse(code: string, message: string, status: number = 400) {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
      },
    },
    { status }
  );
}

/**
 * Helper function to create success responses
 */
export function createSuccessResponse(data: any, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  );
}

