import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import HomepageSection from '@/lib/models/HomepageSection';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

// GET /api/homepage-sections/[sectionId] - Get single section
export async function GET(request: NextRequest, { params }: { params: Promise<{ sectionId: string }> }) {
  try {
    await dbConnect();

    const { sectionId } = await params;
    const section = await HomepageSection.findOne({ sectionId });

    if (!section) {
      return createErrorResponse('NOT_FOUND', 'Section not found', 404);
    }

    return createSuccessResponse({
      _id: section._id,
      id: section._id,
      sectionId: section.sectionId,
      title: section.title,
      order: section.order,
      isVisible: section.isVisible,
      content: section.content,
      createdAt: section.createdAt,
      updatedAt: section.updatedAt,
    });
  } catch (error: any) {
    console.error('Get homepage section error:', error);
    return createErrorResponse('SERVER_ERROR', 'Failed to fetch homepage section', 500);
  }
}

// PUT /api/homepage-sections/[sectionId] - Update single section (admin only)
export async function PUT(request: NextRequest, { params }: { params: Promise<{ sectionId: string }> }) {
  try {
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await dbConnect();

    const { sectionId } = await params;
    const body = await request.json();
    const { title, order, isVisible, content } = body;

    const section = await HomepageSection.findOneAndUpdate(
      { sectionId },
      {
        title,
        order,
        isVisible,
        content,
      },
      { new: true, upsert: true, runValidators: true }
    );

    return createSuccessResponse({
      _id: section._id,
      id: section._id,
      sectionId: section.sectionId,
      title: section.title,
      order: section.order,
      isVisible: section.isVisible,
      content: section.content,
      createdAt: section.createdAt,
      updatedAt: section.updatedAt,
    });
  } catch (error: any) {
    console.error('Update homepage section error:', error);
    return createErrorResponse('SERVER_ERROR', 'Failed to update homepage section', 500);
  }
}

