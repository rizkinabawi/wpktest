# API Specification - 鷲津メッキ工業所 CMS

## 📋 Overview
REST API specification untuk backend CMS website 鷲津メッキ工業所 (Washizu Plating).
Base URL: `https://api.washidu-mekki.com/v1`

---

## 🔐 Authentication

### Login
\`\`\`http
POST /auth/login
\`\`\`

**Request Body:**
\`\`\`json
{
  "email": "admin@washidu-mekki.com",
  "password": "admin123"
}
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "管理者",
      "email": "admin@washidu-mekki.com",
      "role": "admin"
    }
  }
}
\`\`\`

**Error Response (401 Unauthorized):**
\`\`\`json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "メールアドレスまたはパスワードが正しくありません"
  }
}
\`\`\`

### Logout
\`\`\`http
POST /auth/logout
\`\`\`

**Headers:**
\`\`\`
Authorization: Bearer {token}
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "message": "ログアウトしました"
}
\`\`\`

---

## 📰 News Management (お知らせ管理)

### Get All News
\`\`\`http
GET /news?page=1&limit=10&status=公開&category=お知らせ
\`\`\`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by status (公開|下書き)
- `category` (optional): Filter by category

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "date": "2025.10.15",
        "category": "お知らせ",
        "title": "年末年始休業のお知らせ",
        "description": "誠に勝手ながら、年末年始の休業期間についてお知らせいたします。",
        "content": "詳細な内容...",
        "status": "公開",
        "views": 234,
        "createdAt": "2025-10-15T09:00:00Z",
        "updatedAt": "2025-10-15T09:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 12,
      "totalPages": 2
    }
  }
}
\`\`\`

### Get Single News
\`\`\`http
GET /news/:id
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "data": {
    "id": 1,
    "date": "2025.10.15",
    "category": "お知らせ",
    "title": "年末年始休業のお知らせ",
    "description": "誠に勝手ながら、年末年始の休業期間についてお知らせいたします。",
    "content": "詳細な内容...",
    "status": "公開",
    "views": 234,
    "createdAt": "2025-10-15T09:00:00Z",
    "updatedAt": "2025-10-15T09:00:00Z"
  }
}
\`\`\`

### Create News
\`\`\`http
POST /news
\`\`\`

**Request Body:**
\`\`\`json
{
  "date": "2025.11.03",
  "category": "お知らせ",
  "title": "新しいお知らせ",
  "description": "概要テキスト",
  "content": "本文テキスト",
  "status": "公開"
}
\`\`\`

**Response (201 Created):**
\`\`\`json
{
  "success": true,
  "data": {
    "id": 13,
    "date": "2025.11.03",
    "category": "お知らせ",
    "title": "新しいお知らせ",
    "description": "概要テキスト",
    "content": "本文テキスト",
    "status": "公開",
    "views": 0,
    "createdAt": "2025-11-03T10:30:00Z",
    "updatedAt": "2025-11-03T10:30:00Z"
  }
}
\`\`\`

### Update News
\`\`\`http
PUT /news/:id
\`\`\`

**Request Body:**
\`\`\`json
{
  "date": "2025.11.03",
  "category": "お知らせ",
  "title": "更新されたお知らせ",
  "description": "更新された概要",
  "content": "更新された本文",
  "status": "公開"
}
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "data": {
    "id": 1,
    "date": "2025.11.03",
    "category": "お知らせ",
    "title": "更新されたお知らせ",
    "description": "更新された概要",
    "content": "更新された本文",
    "status": "公開",
    "views": 234,
    "createdAt": "2025-10-15T09:00:00Z",
    "updatedAt": "2025-11-03T11:00:00Z"
  }
}
\`\`\`

### Delete News
\`\`\`http
DELETE /news/:id
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "message": "お知らせを削除しました"
}
\`\`\`

### Increment News Views
\`\`\`http
POST /news/:id/views
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "data": {
    "views": 235
  }
}
\`\`\`

---

## ⚙️ Services Management (サービス管理)

### Get All Services
\`\`\`http
GET /services
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "亜鉛メッキ",
      "titleEn": "Zinc Plating",
      "description": "防錆性に優れ、コストパフォーマンスの高い表面処理。",
      "features": ["耐食性向上", "低コスト", "幅広い用途", "短納期対応"],
      "applications": ["自動車部品", "建築金物", "家電部品"],
      "color": "from-slate-400 to-slate-600",
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-01T00:00:00Z"
    }
  ]
}
\`\`\`

### Get Single Service
\`\`\`http
GET /services/:id
\`\`\`

### Create Service
\`\`\`http
POST /services
\`\`\`

**Request Body:**
\`\`\`json
{
  "title": "金メッキ",
  "titleEn": "Gold Plating",
  "description": "高級感と優れた導電性を兼ね備えた表面処理。",
  "features": ["高級感", "優れた導電性", "耐食性"],
  "applications": ["電子部品", "装飾品", "コネクタ"],
  "color": "from-yellow-400 to-yellow-600"
}
\`\`\`

**Response (201 Created):**
\`\`\`json
{
  "success": true,
  "data": {
    "id": 7,
    "title": "金メッキ",
    "titleEn": "Gold Plating",
    "description": "高級感と優れた導電性を兼ね備えた表面処理。",
    "features": ["高級感", "優れた導電性", "耐食性"],
    "applications": ["電子部品", "装飾品", "コネクタ"],
    "color": "from-yellow-400 to-yellow-600",
    "createdAt": "2025-11-03T10:30:00Z",
    "updatedAt": "2025-11-03T10:30:00Z"
  }
}
\`\`\`

### Update Service
\`\`\`http
PUT /services/:id
\`\`\`

### Delete Service
\`\`\`http
DELETE /services/:id
\`\`\`

---

## 📧 Inquiry Management (お問い合わせ管理)

### Get All Inquiries
\`\`\`http
GET /inquiries?status=未読&page=1&limit=20
\`\`\`

**Query Parameters:**
- `status` (optional): Filter by status (未読|対応中|対応済)
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "date": "2025.11.01 14:30",
        "companyName": "株式会社ABC",
        "name": "山田太郎",
        "email": "yamada@abc.co.jp",
        "phone": "03-1234-5678",
        "service": "見積り依頼",
        "message": "クロムメッキの見積りをお願いしたいです。",
        "status": "未読",
        "createdAt": "2025-11-01T14:30:00Z",
        "updatedAt": "2025-11-01T14:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 28,
      "totalPages": 2
    }
  }
}
\`\`\`

### Get Single Inquiry
\`\`\`http
GET /inquiries/:id
\`\`\`

### Create Inquiry (Public Form)
\`\`\`http
POST /inquiries
\`\`\`

**Request Body:**
\`\`\`json
{
  "companyName": "株式会社XYZ",
  "name": "田中花子",
  "email": "tanaka@xyz.co.jp",
  "phone": "03-9876-5432",
  "service": "技術相談",
  "message": "ニッケルメッキについて相談したいです。"
}
\`\`\`

**Response (201 Created):**
\`\`\`json
{
  "success": true,
  "message": "お問い合わせを受け付けました",
  "data": {
    "id": 29,
    "referenceNumber": "INQ-2025110300001"
  }
}
\`\`\`

### Update Inquiry Status
\`\`\`http
PATCH /inquiries/:id/status
\`\`\`

**Request Body:**
\`\`\`json
{
  "status": "対応済"
}
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "data": {
    "id": 1,
    "status": "対応済",
    "updatedAt": "2025-11-03T15:00:00Z"
  }
}
\`\`\`

### Get Inquiry Statistics
\`\`\`http
GET /inquiries/stats
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "data": {
    "total": 28,
    "unread": 5,
    "inProgress": 8,
    "completed": 15,
    "byService": {
      "見積り依頼": 12,
      "技術相談": 8,
      "工場見学": 5,
      "その他": 3
    }
  }
}
\`\`\`

---

## 👥 Application Management (採用応募管理)

### Get All Applications
\`\`\`http
GET /applications?status=新規&position=メッキ技術者
\`\`\`

**Query Parameters:**
- `status` (optional): Filter by status
- `position` (optional): Filter by position
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "date": "2025.11.02 09:30",
        "position": "メッキ技術者",
        "name": "田中健一",
        "age": 28,
        "email": "tanaka@example.com",
        "phone": "090-1234-5678",
        "experience": "製造業3年",
        "motivation": "メッキ技術を学び、技術者として成長したいです。",
        "resumeUrl": "https://storage.washidu-mekki.com/resumes/resume-001.pdf",
        "status": "新規",
        "createdAt": "2025-11-02T09:30:00Z",
        "updatedAt": "2025-11-02T09:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 15,
      "totalPages": 1
    }
  }
}
\`\`\`

### Get Single Application
\`\`\`http
GET /applications/:id
\`\`\`

### Create Application (Public Form)
\`\`\`http
POST /applications
\`\`\`

**Request Body (multipart/form-data):**
\`\`\`
position: メッキ技術者
name: 田中健一
age: 28
email: tanaka@example.com
phone: 090-1234-5678
experience: 製造業3年
motivation: メッキ技術を学び...
resume: [File Upload]
\`\`\`

**Response (201 Created):**
\`\`\`json
{
  "success": true,
  "message": "ご応募ありがとうございます",
  "data": {
    "id": 16,
    "referenceNumber": "APP-2025110300001"
  }
}
\`\`\`

### Update Application Status
\`\`\`http
PATCH /applications/:id/status
\`\`\`

**Request Body:**
\`\`\`json
{
  "status": "面接予定"
}
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "data": {
    "id": 1,
    "status": "面接予定",
    "updatedAt": "2025-11-03T16:00:00Z"
  }
}
\`\`\`

### Get Application Statistics
\`\`\`http
GET /applications/stats
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "data": {
    "total": 15,
    "new": 3,
    "screening": 5,
    "interview": 4,
    "hired": 2,
    "rejected": 1,
    "byPosition": {
      "メッキ技術者": 8,
      "品質管理スタッフ": 4,
      "製造補助スタッフ": 3
    }
  }
}
\`\`\`

---

## 📊 Dashboard Statistics

### Get Dashboard Stats
\`\`\`http
GET /dashboard/stats
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "data": {
    "news": {
      "total": 12,
      "thisMonth": 2,
      "published": 10,
      "draft": 2
    },
    "inquiries": {
      "total": 28,
      "unread": 5,
      "inProgress": 8,
      "completed": 15
    },
    "applications": {
      "total": 15,
      "new": 3,
      "screening": 5,
      "interview": 4
    },
    "visitors": {
      "total": 1234,
      "thisWeek": 156,
      "changePercent": 12
    }
  }
}
\`\`\`

### Get Recent Activities
\`\`\`http
GET /dashboard/recent
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "data": {
    "inquiries": [
      {
        "id": 1,
        "name": "山田太郎",
        "company": "株式会社ABC",
        "service": "見積り依頼",
        "date": "2025.11.01",
        "status": "未読"
      }
    ],
    "news": [
      {
        "id": 1,
        "title": "年末年始休業のお知らせ",
        "date": "2025.10.15",
        "views": 234
      }
    ]
  }
}
\`\`\`

---

## ⚙️ Settings Management

### Get Settings
\`\`\`http
GET /settings
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "data": {
    "company": {
      "name": "有限会社 鷲津メッキ工業所",
      "email": "info@washidu-mekki.com",
      "phone": "03-XXXX-XXXX",
      "address": "東京都XX区XXXX-XX-XX"
    },
    "notifications": {
      "newInquiry": true,
      "newApplication": true,
      "weeklyReport": false
    }
  }
}
\`\`\`

### Update Settings
\`\`\`http
PUT /settings
\`\`\`

**Request Body:**
\`\`\`json
{
  "company": {
    "name": "有限会社 鷲津メッキ工業所",
    "email": "info@washidu-mekki.com",
    "phone": "03-1234-5678",
    "address": "東京都渋谷区XXXX-XX-XX"
  },
  "notifications": {
    "newInquiry": true,
    "newApplication": true,
    "weeklyReport": true
  }
}
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "message": "設定を更新しました",
  "data": {
    "company": {
      "name": "有限会社 鷲津メッキ工業所",
      "email": "info@washidu-mekki.com",
      "phone": "03-1234-5678",
      "address": "東京都渋谷区XXXX-XX-XX"
    },
    "notifications": {
      "newInquiry": true,
      "newApplication": true,
      "weeklyReport": true
    }
  }
}
\`\`\`

### Update Password
\`\`\`http
POST /settings/password
\`\`\`

**Request Body:**
\`\`\`json
{
  "currentPassword": "admin123",
  "newPassword": "newpassword456",
  "confirmPassword": "newpassword456"
}
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "message": "パスワードを更新しました"
}
\`\`\`

---

## 📁 File Upload

### Upload File
\`\`\`http
POST /upload
\`\`\`

**Request (multipart/form-data):**
\`\`\`
file: [File]
type: resume|image|document
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "data": {
    "url": "https://storage.washidu-mekki.com/uploads/file-12345.pdf",
    "filename": "resume.pdf",
    "size": 1024000,
    "mimeType": "application/pdf"
  }
}
\`\`\`

---

## 🚨 Error Responses

### Standard Error Format
\`\`\`json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "エラーメッセージ",
    "details": {}
  }
}
\`\`\`

### Common Error Codes
- `INVALID_CREDENTIALS` - 認証情報が無効
- `UNAUTHORIZED` - 認証が必要
- `FORBIDDEN` - アクセス権限がありません
- `NOT_FOUND` - リソースが見つかりません
- `VALIDATION_ERROR` - 入力検証エラー
- `SERVER_ERROR` - サーバーエラー

### HTTP Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

---

## 📝 Data Models

### News Model
\`\`\`typescript
interface News {
  id: number;
  date: string; // Format: YYYY.MM.DD
  category: string; // お知らせ | 設備導入 | 認証取得 | イベント
  title: string;
  description: string;
  content: string;
  status: "公開" | "下書き";
  views: number;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}
\`\`\`

### Service Model
\`\`\`typescript
interface Service {
  id: number;
  title: string; // Japanese name
  titleEn: string; // English name
  description: string;
  features: string[]; // Array of features
  applications: string[]; // Array of applications
  color: string; // Tailwind gradient classes
  createdAt: string;
  updatedAt: string;
}
\`\`\`

### Inquiry Model
\`\`\`typescript
interface Inquiry {
  id: number;
  date: string; // Format: YYYY.MM.DD HH:mm
  companyName: string;
  name: string;
  email: string;
  phone: string;
  service: string; // 見積り依頼 | 技術相談 | 工場見学 | その他
  message: string;
  status: "未読" | "対応中" | "対応済";
  createdAt: string;
  updatedAt: string;
}
\`\`\`

### Application Model
\`\`\`typescript
interface Application {
  id: number;
  date: string; // Format: YYYY.MM.DD HH:mm
  position: string; // メッキ技術者 | 品質管理スタッフ | 製造補助スタッフ
  name: string;
  age: number;
  email: string;
  phone: string;
  experience: string;
  motivation: string;
  resumeUrl?: string;
  status: "新規" | "書類選考中" | "面接予定" | "採用" | "不採用";
  createdAt: string;
  updatedAt: string;
}
\`\`\`

---

## 🔒 Security Notes

1. **Authentication**: All CMS endpoints require JWT token in Authorization header
2. **CORS**: Configure allowed origins for production
3. **Rate Limiting**: Implement rate limiting for public endpoints
4. **File Upload**: Validate file types and sizes
5. **Input Validation**: Sanitize all user inputs
6. **SQL Injection**: Use parameterized queries
7. **XSS Protection**: Escape output data

---

## 📌 Notes

- All dates use Japanese format: `YYYY.MM.DD` for display
- ISO 8601 format for database storage
- All text content in Japanese
- Pagination default: 10 items per page
- Maximum file upload size: 10MB
- Supported resume formats: PDF, DOC, DOCX
- Image formats: JPG, PNG, WebP

---

**Version**: 1.0.0  
**Last Updated**: 2025.11.03  
**Maintained by**: Development Team
