import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import HomepageSection from '@/lib/models/HomepageSection';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware/auth';

// GET /api/homepage-sections - Get all homepage sections (public)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const visibleOnly = searchParams.get('visible') === 'true';

    const query: any = {};
    if (visibleOnly) {
      query.isVisible = true;
    }

    const sections = await HomepageSection.find(query).sort({ order: 1 });

    return createSuccessResponse({
      items: sections.map((section: any) => ({
        _id: section._id,
        id: section._id,
        sectionId: section.sectionId,
        title: section.title,
        order: section.order,
        isVisible: section.isVisible,
        content: section.content,
        createdAt: section.createdAt,
        updatedAt: section.updatedAt,
      })),
      total: sections.length,
    });
  } catch (error: any) {
    console.error('Get homepage sections error:', error);
    return createErrorResponse('SERVER_ERROR', 'Failed to fetch homepage sections', 500);
  }
}

// PUT /api/homepage-sections - Update all sections (admin only)
export async function PUT(request: NextRequest) {
  try {
    const auth = await authenticate(request);
    if (!auth.authenticated) {
      return auth.response;
    }

    await dbConnect();

    const body = await request.json();
    const { sections } = body;

    if (!Array.isArray(sections)) {
      return createErrorResponse('INVALID_INPUT', 'Sections must be an array', 400);
    }

    // Update each section
    const updatePromises = sections.map(async (section: any) => {
      return HomepageSection.findOneAndUpdate(
        { sectionId: section.sectionId },
        {
          title: section.title,
          order: section.order,
          isVisible: section.isVisible,
          content: section.content,
        },
        { new: true, upsert: true, runValidators: true }
      );
    });

    const updatedSections = await Promise.all(updatePromises);

    return createSuccessResponse({
      items: updatedSections,
      message: 'Homepage sections updated successfully',
    });
  } catch (error: any) {
    console.error('Update homepage sections error:', error);
    return createErrorResponse('SERVER_ERROR', 'Failed to update homepage sections', 500);
  }
}

