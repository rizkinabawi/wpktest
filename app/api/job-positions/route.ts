import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import JobPosition from '@/lib/models/JobPosition';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

// GET /api/job-positions - Get all job positions (public or filtered)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '0');
    const page = parseInt(searchParams.get('page') || '1');

    const query: any = {};
    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * (limit || 0);

    let queryBuilder = JobPosition.find(query).sort({ createdAt: -1 });

    if (limit > 0) {
      queryBuilder = queryBuilder.limit(limit).skip(skip);
    }

    const jobPositions = await queryBuilder.exec();
    const total = await JobPosition.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: {
        items: jobPositions,
        total,
        page,
        limit: limit || total,
        totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
      },
    });
  } catch (error: any) {
    console.error('Get job positions error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          message: 'Failed to fetch job positions',
          details: error.message,
        },
      },
      { status: 500 }
    );
  }
}

// POST /api/job-positions - Create new job position (admin only)
export async function POST(request: NextRequest) {
  try {
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await dbConnect();

    const body = await request.json();
    const {
      title,
      department,
      location,
      employmentType,
      salary,
      description,
      requirements,
      responsibilities,
      benefits,
      status,
      applicationDeadline,
    } = body;

    // Validation
    if (!title || !department || !salary || !description) {
      return NextResponse.json(
        {
          success: false,
          error: { message: 'Missing required fields' },
        },
        { status: 400 }
      );
    }

    const jobPosition = await JobPosition.create({
      title,
      department,
      location: location || '東京都',
      employmentType: employmentType || '正社員',
      salary,
      description,
      requirements: requirements || [],
      responsibilities: responsibilities || [],
      benefits: benefits || [],
      status: status || '公開',
      applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : undefined,
    });

    return NextResponse.json({
      success: true,
      data: jobPosition,
    });
  } catch (error: any) {
    console.error('Create job position error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          message: 'Failed to create job position',
          details: error.message,
        },
      },
      { status: 500 }
    );
  }
}

