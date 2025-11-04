# Next.js 15 App Router - Complete Structure

## 📁 Final Folder Structure

\`\`\`
washizu-mekki-website/
│
├── app/                                 # Next.js 15 App Router
│   ├── layout.tsx                      # Root layout + metadata
│   ├── page.tsx                        # Homepage (/)
│   │
│   └── cms/                            # CMS Routes
│       ├── layout.tsx                  # CMS layout
│       ├── login/
│       │   └── page.tsx               # /cms/login
│       ├── dashboard/
│       │   └── page.tsx               # /cms/dashboard
│       ├── news/
│       │   └── page.tsx               # /cms/news
│       ├── services/
│       │   └── page.tsx               # /cms/services
│       ├── inquiries/
│       │   └── page.tsx               # /cms/inquiries
│       ├── applications/
│       │   └── page.tsx               # /cms/applications
│       └── settings/
│           └── page.tsx               # /cms/settings
│
├── components/                         # React Components
│   ├── cms/                           # CMS Management Components
│   │   ├── CMSDashboard.tsx
│   │   ├── CMSSidebar.tsx
│   │   ├── NewsManagement.tsx
│   │   ├── ServicesManagement.tsx
│   │   ├── InquiryManagement.tsx
│   │   ├── ApplicationManagement.tsx
│   │   └── SettingsManagement.tsx
│   │
│   ├── ui/                            # shadcn/ui Components
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── ... (all shadcn components)
│   │   └── sonner.tsx
│   │
│   ├── figma/
│   │   └── ImageWithFallback.tsx
│   │
│   └── (Public Website Components)
│       ├── Navigation.tsx
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Services.tsx
│       ├── Technology.tsx
│       ├── News.tsx
│       ├── Company.tsx
│       ├── Recruit.tsx
│       ├── Contact.tsx
│       └── Footer.tsx
│
├── lib/                                # Utilities
│   └── utils.ts                       # Helper functions (cn, etc.)
│
├── styles/                             # Stylesheets
│   └── globals.css                    # Global CSS + Tailwind v4
│
├── public/                             # Static Assets
│   ├── images/
│   ├── icons/
│   └── ...
│
├── guidelines/                         # Documentation
│   └── Guidelines.md
│
├── API-SPEC.md                         # API Documentation
├── MIGRATION-GUIDE.md                  # Migration Guide
├── NEXTJS-STRUCTURE.md                 # This file
├── Attributions.md                     # Credits
│
├── next.config.js                      # Next.js Config
├── tsconfig.json                       # TypeScript Config
├── package.json                        # Dependencies
├── tailwind.config.ts                  # Tailwind Config (if needed)
│
└── README.md                           # Project README

\`\`\`

## 🗂️ Files to DELETE (Old Structure)

These files are no longer needed with Next.js structure:

\`\`\`
❌ App.tsx                    → Moved to app/page.tsx
❌ AppRouter.tsx              → Replaced by Next.js App Router
❌ main.tsx                   → Replaced by Next.js entry point
❌ cms/CMSLogin.tsx          → Moved to app/cms/login/page.tsx
❌ cms/CMSLayout.tsx         → Logic integrated into page components
❌ cms/CMSDashboard.tsx      → Moved to components/cms/
❌ cms/CMSSidebar.tsx        → Moved to components/cms/
❌ cms/NewsManagement.tsx    → Moved to components/cms/
❌ cms/ServicesManagement.tsx → Moved to components/cms/
❌ cms/InquiryManagement.tsx → Moved to components/cms/
❌ cms/ApplicationManagement.tsx → Moved to components/cms/
❌ cms/SettingsManagement.tsx → Moved to components/cms/
\`\`\`

## ✅ What's New

### 1. **app/** Directory
- Next.js 15 App Router
- File-based routing
- Built-in layouts
- Metadata API
- Server & Client Components

### 2. **Routing System**

| Route | File | Type |
|-------|------|------|
| `/` | `app/page.tsx` | Public |
| `/cms/login` | `app/cms/login/page.tsx` | Public |
| `/cms/dashboard` | `app/cms/dashboard/page.tsx` | Protected |
| `/cms/news` | `app/cms/news/page.tsx` | Protected |
| `/cms/services` | `app/cms/services/page.tsx` | Protected |
| `/cms/inquiries` | `app/cms/inquiries/page.tsx` | Protected |
| `/cms/applications` | `app/cms/applications/page.tsx` | Protected |
| `/cms/settings` | `app/cms/settings/page.tsx` | Protected |

### 3. **Import Aliases**
\`\`\`tsx
// Old way
import { Button } from "../components/ui/button";
import { Card } from "../../components/ui/card";

// New way (Next.js)
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
\`\`\`

## 🎯 Component Organization

### Public Website Components
Location: `/components/*.tsx`
\`\`\`
Navigation.tsx  - Main navigation bar
Hero.tsx        - Hero section with factory image
About.tsx       - About company section
Services.tsx    - Plating services grid
Technology.tsx  - Technology & Ecology section
News.tsx        - Latest news section
Company.tsx     - Company information
Recruit.tsx     - Recruitment section
Contact.tsx     - Contact form
Footer.tsx      - Footer with links
\`\`\`

### CMS Components
Location: `/components/cms/*.tsx`
\`\`\`
CMSSidebar.tsx           - CMS navigation sidebar
CMSDashboard.tsx         - Dashboard statistics
NewsManagement.tsx       - News CRUD interface
ServicesManagement.tsx   - Services CRUD interface
InquiryManagement.tsx    - Inquiry management
ApplicationManagement.tsx - Job applications
SettingsManagement.tsx   - Settings management
\`\`\`

### UI Components
Location: `/components/ui/*.tsx`
- All shadcn/ui components
- Reusable across both public and CMS

## 🔄 Migration Checklist

- [x] Created `app/` directory structure
- [x] Created `app/layout.tsx` with metadata
- [x] Created `app/page.tsx` (homepage)
- [x] Created CMS route structure in `app/cms/`
- [x] Moved CMS components to `components/cms/`
- [x] Created `lib/utils.ts`
- [x] Updated all imports to use `@/` alias
- [x] Added `"use client"` to interactive components
- [x] Created `next.config.js`
- [x] Created `tsconfig.json` with path mappings
- [x] Created `package.json` with Next.js 15 deps
- [x] Created migration documentation

## 📝 Next Steps

### 1. Clean Up Old Files
\`\`\`bash
# Remove old structure files
rm App.tsx AppRouter.tsx main.tsx
rm -rf cms/
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Run Development
\`\`\`bash
npm run dev
\`\`\`

### 4. Test Routes
- [ ] Public homepage: `http://localhost:3000/`
- [ ] CMS login: `http://localhost:3000/cms/login`
- [ ] CMS dashboard: `http://localhost:3000/cms/dashboard`
- [ ] All CMS management pages

### 5. Production Build
\`\`\`bash
npm run build
npm run start
\`\`\`

## 🚀 Deployment

### Environment Variables (.env.local)
\`\`\`env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.washidu-mekki.com/v1

# CMS Settings
NEXT_PUBLIC_CMS_URL=/cms

# Development
NODE_ENV=production
\`\`\`

### Vercel Deployment
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
\`\`\`

### Other Platforms
1. Build: `npm run build`
2. Upload: `.next/` folder + `public/` folder
3. Start: `npm run start`

## 🔐 Security (Production)

### Required Updates:
1. **Remove dev CMS button** from `app/page.tsx`
2. **Add middleware** for route protection
3. **Implement real authentication** (NextAuth.js)
4. **Add CSRF tokens**
5. **Enable rate limiting**
6. **Use environment variables** for API keys

### Example Middleware (`middleware.ts`)
\`\`\`typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('cms_auth')?.value;
  
  // Protect all CMS routes except login
  if (request.nextUrl.pathname.startsWith('/cms')) {
    if (request.nextUrl.pathname === '/cms/login') {
      return NextResponse.next();
    }
    
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/cms/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/cms/:path*',
};
\`\`\`

## 📚 Documentation

- **API-SPEC.md** - Complete API documentation
- **MIGRATION-GUIDE.md** - Detailed migration guide
- **NEXTJS-STRUCTURE.md** - This file
- **Guidelines.md** - Development guidelines

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb) - Technology
- **Secondary**: Green (#10b981) - Ecology
- **Dark**: Slate (900-950) - Backgrounds
- **Accent**: Purple (#9333ea) - CMS highlights

### Typography
Defined in `styles/globals.css`:
- No need for Tailwind font classes
- Automatic heading hierarchy
- Responsive by default

### Components
- Consistent design language
- Dark mode support
- Fully accessible (Radix UI)
- Mobile-first responsive

---

**Status**: ✅ Complete  
**Version**: 1.0.0  
**Framework**: Next.js 15.0.0  
**Last Updated**: 2025.11.03
