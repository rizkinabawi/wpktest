# Component Migration Checklist

## ✅ Already Migrated to `/components/cms/`

- [x] CMSDashboard.tsx
- [x] CMSSidebar.tsx

## 📋 Need to Copy & Update Imports

The following files need to be copied from `/cms/` to `/components/cms/` with updated imports:

### 1. NewsManagement.tsx
**Location**: `/cms/NewsManagement.tsx` → `/components/cms/NewsManagement.tsx`

**Update imports from:**
\`\`\`tsx
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
\`\`\`

**To:**
\`\`\`tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
\`\`\`

### 2. ServicesManagement.tsx
**Location**: `/cms/ServicesManagement.tsx` → `/components/cms/ServicesManagement.tsx`

**Update imports** (same pattern as above)

### 3. InquiryManagement.tsx
**Location**: `/cms/InquiryManagement.tsx` → `/components/cms/InquiryManagement.tsx`

**Update imports** (same pattern as above)

### 4. ApplicationManagement.tsx
**Location**: `/cms/ApplicationManagement.tsx` → `/components/cms/ApplicationManagement.tsx`

**Update imports** (same pattern as above)

### 5. SettingsManagement.tsx
**Location**: `/cms/SettingsManagement.tsx` → `/components/cms/SettingsManagement.tsx`

**Update imports** (same pattern as above)

## 🔧 Quick Find & Replace

For each file, do a global find & replace:

### Find:
\`\`\`
from "../components/
\`\`\`

### Replace with:
\`\`\`
from "@/components/
\`\`\`

### Also find:
\`\`\`
from "./components/
\`\`\`

### Replace with:
\`\`\`
from "@/components/
\`\`\`

## 📝 Manual Steps

1. **Copy** each file from `/cms/*.tsx` to `/components/cms/*.tsx`
2. **Open** the copied file
3. **Find & Replace** all relative imports with `@/` imports
4. **Save** the file
5. **Check** no errors in IDE

## 🧪 Verification

After copying all files, verify:

\`\`\`bash
# Check component imports
ls -la components/cms/

# Should show:
# - CMSDashboard.tsx ✅
# - CMSSidebar.tsx ✅
# - NewsManagement.tsx
# - ServicesManagement.tsx
# - InquiryManagement.tsx
# - ApplicationManagement.tsx
# - SettingsManagement.tsx
\`\`\`

## 🗑️ Cleanup

After successful migration:

\`\`\`bash
# Remove old cms directory
rm -rf cms/

# Remove old App files
rm App.tsx
rm AppRouter.tsx  
rm main.tsx
\`\`\`

## ✨ Final Structure

\`\`\`
components/
└── cms/
    ├── CMSDashboard.tsx ✅
    ├── CMSSidebar.tsx ✅
    ├── NewsManagement.tsx
    ├── ServicesManagement.tsx
    ├── InquiryManagement.tsx
    ├── ApplicationManagement.tsx
    └── SettingsManagement.tsx
\`\`\`

## 🔍 Import Pattern Reference

### ❌ Old (Relative Imports)
\`\`\`tsx
import { Button } from "../components/ui/button";
import { Card } from "../../components/ui/card";
import { Dialog } from "../components/ui/dialog";
\`\`\`

### ✅ New (Absolute Imports with @/)
\`\`\`tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
\`\`\`

## 📌 Notes

- All CMS page components in `/app/cms/*/page.tsx` already import from `@/components/cms/`
- Public website components in `/components/*.tsx` keep their existing structure
- No need to update `/components/ui/*` files - they're already correct
- The `@/` alias is configured in `tsconfig.json`

---

**Status**: In Progress  
**Completed**: 2/7 components  
**Remaining**: 5 components to copy & update
