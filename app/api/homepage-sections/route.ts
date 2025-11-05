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


// POST /api/homepage-sections - Seed default homepage sections (admin only)
// export async function POST(request: NextRequest) {
//   try {
//     // const auth = await authenticate(request)
//     // if (!auth.authenticated) return auth.response

//     await dbConnect()

//     const existingCount = await HomepageSection.countDocuments()
//     if (existingCount > 0) {
//       return createSuccessResponse({
//         message: 'Homepage sections already exist. No seeding performed.',
//       })
//     }

//     const defaultSections = [
//       {
//         sectionId: 'hero',
//         title: 'Hero Section',
//         order: 0,
//         isVisible: true,
//         content: {
//           heading: 'ようこそ！鷲津メッキ工業所へ',
//           description: '金属表面処理の専門技術で信頼と品質を提供します。',
//           backgroundImage: '',
//         },
//       },
//       {
//         sectionId: 'about',
//         title: '会社紹介',
//         order: 1,
//         isVisible: true,
//         content: {
//           description:
//             '私たちは静岡県を拠点に、めっき技術で産業界を支えています。長年の経験と最新の技術を融合し、お客様に最適な表面処理ソリューションを提供します。',
//           image: '',
//         },
//       },
//       {
//         sectionId: 'company',
//         title: '会社情報',
//         order: 2,
//         isVisible: true,
//         content: {
//           companyInfo: {
//             name: '有限会社鷲津メッキ工業所',
//             address: '〒431-0431 静岡県湖西市鷲津1234',
//             phone: '053-000-0000',
//             email: 'info@washizu-mekki.com',
//             logo: '',
//           },
//         },
//       },
//     ]

//     await HomepageSection.insertMany(defaultSections)

//     return createSuccessResponse({
//       message: 'Default homepage sections seeded successfully.',
//       items: defaultSections,
//     })
//   } catch (error: any) {
//     console.error('Seed homepage sections error:', error)
//     return createErrorResponse('SERVER_ERROR', 'Failed to seed homepage sections', 500)
//   }
// }