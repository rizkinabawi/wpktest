# Next.js 15 Migration Guide

## 📂 New Folder Structure

\`\`\`
washizu-mekki-website/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Homepage (public website)
│   └── cms/
│       ├── layout.tsx          # CMS layout
│       ├── login/
│       │   └── page.tsx        # CMS login page
│       ├── dashboard/
│       │   └── page.tsx        # Dashboard page
│       ├── news/
│       │   └── page.tsx        # News management
│       ├── services/
│       │   └── page.tsx        # Services management
│       ├── inquiries/
│       │   └── page.tsx        # Inquiries management
│       ├── applications/
│       │   └── page.tsx        # Applications management
│       └── settings/
│           └── page.tsx        # Settings page
├── components/
│   ├── cms/                    # CMS-specific components
│   │   ├── CMSDashboard.tsx
│   │   ├── CMSSidebar.tsx
│   │   ├── NewsManagement.tsx
│   │   ├── ServicesManagement.tsx
│   │   ├── InquiryManagement.tsx
│   │   ├── ApplicationManagement.tsx
│   │   └── SettingsManagement.tsx
│   ├── ui/                     # shadcn/ui components
│   ├── figma/
│   │   └── ImageWithFallback.tsx
│   ├── About.tsx
│   ├── Company.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navigation.tsx
│   ├── News.tsx
│   ├── Recruit.tsx
│   ├── Services.tsx
│   └── Technology.tsx
├── lib/
│   └── utils.ts                # Utility functions
├── styles/
│   └── globals.css             # Global styles
├── public/                     # Static assets
├── next.config.js              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies
├── API-SPEC.md                 # API documentation
└── tailwind.config.ts          # Tailwind configuration

\`\`\`

## 🔄 Key Changes

### 1. **App Router (Next.js 15)**
- Using `/app` directory instead of `/pages`
- File-based routing with `page.tsx` files
- Layouts with `layout.tsx` files
- Built-in SEO with metadata

### 2. **Import Path Changes**
**Before:**
\`\`\`tsx
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
\`\`\`

**After:**
\`\`\`tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
\`\`\`

### 3. **Client Components**
All interactive components need `"use client"` directive:
\`\`\`tsx
"use client";

export default function Component() {
  // component code
}
\`\`\`

### 4. **Navigation**
**Before (React Router):**
\`\`\`tsx
const navigate = useNavigate();
navigate("/cms/dashboard");
\`\`\`

**After (Next.js):**
\`\`\`tsx
import { useRouter } from "next/navigation";
const router = useRouter();
router.push("/cms/dashboard");
\`\`\`

**For links:**
\`\`\`tsx
import Link from "next/link";
<Link href="/cms/login">Login</Link>
\`\`\`

### 5. **Image Optimization**
**Before:**
\`\`\`tsx
<img src="/image.jpg" alt="..." />
\`\`\`

**After:**
\`\`\`tsx
import Image from "next/image";
<Image src="/image.jpg" alt="..." width={500} height={300} />
\`\`\`

## 🚀 Setup Instructions

### 1. Install Dependencies
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

### 2. Run Development Server
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for Production
\`\`\`bash
npm run build
npm run start
\`\`\`

## 📝 Routes

### Public Routes
- `/` - Homepage (public website)

### CMS Routes (Protected)
- `/cms/login` - CMS Login
- `/cms/dashboard` - Dashboard overview
- `/cms/news` - News management
- `/cms/services` - Services management
- `/cms/inquiries` - Inquiries management
- `/cms/applications` - Applications management
- `/cms/settings` - Settings

## 🔐 Authentication

Currently using localStorage for demo purposes:
- Email: `admin@washidu-mekki.com`
- Password: `admin123`

**For production:**
1. Implement proper backend authentication
2. Use JWT tokens with httpOnly cookies
3. Add middleware for route protection
4. Implement session management

## 📦 Dependencies

### Core
- **next**: ^15.0.0
- **react**: ^19.0.0
- **react-dom**: ^19.0.0

### UI/UX
- **motion/react**: Animation library
- **lucide-react**: Icons
- **sonner**: Toast notifications
- **recharts**: Charts (if needed)

### UI Components (Radix UI)
- All shadcn/ui components powered by Radix UI primitives

### Utilities
- **clsx**: Class name utilities
- **tailwind-merge**: Merge Tailwind classes
- **tailwindcss**: v4.0

## 🎨 Styling

### Tailwind CSS v4.0
Using the new Tailwind CSS v4 with CSS-first configuration in `styles/globals.css`

**Important:** Don't add font size, font weight, or line-height classes unless specifically requested. Typography is defined in globals.css.

## 🔧 Configuration Files

### next.config.js
\`\`\`javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
\`\`\`

### tsconfig.json
Includes path aliases:
\`\`\`json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
\`\`\`

## 🌐 Environment Variables

Create `.env.local` for environment-specific variables:

\`\`\`env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.washidu-mekki.com/v1

# Authentication (if using external service)
NEXT_PUBLIC_AUTH_URL=

# Analytics
NEXT_PUBLIC_GA_ID=

# Development
NEXT_PUBLIC_DEV_MODE=true
\`\`\`

## 📱 Responsive Design

All components are responsive by default:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔒 Security Notes

### For Production:
1. Remove development CMS login button
2. Implement proper authentication (NextAuth.js recommended)
3. Add CSRF protection
4. Enable rate limiting
5. Sanitize all user inputs
6. Use environment variables for sensitive data
7. Implement proper CORS policies
8. Add middleware for route protection

Example middleware (`middleware.ts`):
\`\`\`typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  
  if (request.nextUrl.pathname.startsWith('/cms')) {
    if (request.nextUrl.pathname === '/cms/login') {
      return NextResponse.next();
    }
    
    if (!token) {
      return NextResponse.redirect(new URL('/cms/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/cms/:path*',
};
\`\`\`

## 🚧 Development Tips

### Hot Reload
Next.js has Fast Refresh built-in - changes are reflected immediately.

### Debugging
\`\`\`typescript
// Enable React DevTools
// Install: npm install -D @next/react-dev-overlay

// Console logging
console.log('Debug info', data);

// Error boundaries for better error handling
\`\`\`

### Performance
- Use `next/image` for optimized images
- Lazy load components with `dynamic`:
  \`\`\`typescript
  import dynamic from 'next/dynamic';
  
  const DynamicComponent = dynamic(() => import('@/components/Heavy'), {
    loading: () => <p>Loading...</p>,
  });
  \`\`\`

## 📚 Additional Resources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Radix UI](https://www.radix-ui.com)

## ✅ Deployment

### Vercel (Recommended)
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Other Platforms
\`\`\`bash
npm run build
# Deploy .next folder + public folder
\`\`\`

## 🐛 Common Issues

### 1. Import Errors
- Make sure to use `@/` for absolute imports
- Check tsconfig.json paths configuration

### 2. Client Component Errors
- Add `"use client"` directive for interactive components
- Server components can't use hooks or browser APIs

### 3. Image Loading
- Add domain to next.config.js remotePatterns
- Use proper width/height for next/image

### 4. CSS Not Loading
- Ensure globals.css is imported in root layout
- Check Tailwind configuration

---

**Last Updated**: 2025.11.03  
**Next.js Version**: 15.0.0  
**React Version**: 19.0.0
