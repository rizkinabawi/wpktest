import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import JobPosition from '@/lib/models/JobPosition';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

// GET /api/job-positions/[id] - Get single job position
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();

    const { id } = await params;
    const jobPosition = await JobPosition.findById(id);

    if (!jobPosition) {
      return NextResponse.json(
        {
          success: false,
          error: { message: 'Job position not found' },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: jobPosition,
    });
  } catch (error: any) {
    console.error('Get job position error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          message: 'Failed to fetch job position',
          details: error.message,
        },
      },
      { status: 500 }
    );
  }
}

// PUT /api/job-positions/[id] - Update job position (admin only)
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

    const { id } = await params;
    const jobPosition = await JobPosition.findByIdAndUpdate(
      id,
      {
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
        applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : undefined,
      },
      { new: true, runValidators: true }
    );

    if (!jobPosition) {
      return NextResponse.json(
        {
          success: false,
          error: { message: 'Job position not found' },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: jobPosition,
    });
  } catch (error: any) {
    console.error('Update job position error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          message: 'Failed to update job position',
          details: error.message,
        },
      },
      { status: 500 }
    );
  }
}

// DELETE /api/job-positions/[id] - Delete job position (admin only)
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await dbConnect();

    const { id } = await params;
    const jobPosition = await JobPosition.findByIdAndDelete(id);

    if (!jobPosition) {
      return NextResponse.json(
        {
          success: false,
          error: { message: 'Job position not found' },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { message: 'Job position deleted successfully' },
    });
  } catch (error: any) {
    console.error('Delete job position error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          message: 'Failed to delete job position',
          details: error.message,
        },
      },
      { status: 500 }
    );
  }
}

