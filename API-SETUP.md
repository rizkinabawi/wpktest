# API Setup Guide - 鷲津メッキ工業所

## 🚀 Quick Start

### 1. Environment Variables

Your `.env.local` file is already configured with:

```env
MONGODB_URI="mongodb+srv://rizkinabawi:rizart12345@cluster0.bzlyg.mongodb.net/shop-application?retryWrites=true&w=majority"
JWT_SECRET="hdyuceycbjhdcbjsdhcb"
CLOUDINARY_CLOUD_NAME="dsly4y7yf"
CLOUDINARY_API_KEY="882495113191461"
CLOUDINARY_API_SECRET="GmOC3YcCMB_Dlm9yJUu-kXXZTgE"
```

### 2. Seed the Database

Run the seed script to create initial data (admin user, sample news, services):

```bash
npm run seed
```

**Admin Credentials:**
- Email: `admin@washidu-mekki.com`
- Password: `admin123`

### 3. Start the Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3000/api`

---

## 📚 API Endpoints

### Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@washidu-mekki.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "...",
      "name": "管理者",
      "email": "admin@washidu-mekki.com",
      "role": "admin"
    }
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

---

### News Management

#### Get All News
```http
GET /api/news?page=1&limit=10&status=公開&category=お知らせ
```

#### Get Single News
```http
GET /api/news/:id
```

#### Create News (Requires Auth)
```http
POST /api/news
Authorization: Bearer <token>
Content-Type: application/json

{
  "date": "2025.11.03",
  "category": "お知らせ",
  "title": "新しいお知らせ",
  "description": "概要テキスト",
  "content": "本文テキスト",
  "status": "公開"
}
```

#### Update News (Requires Auth)
```http
PUT /api/news/:id
Authorization: Bearer <token>
Content-Type: application/json
```

#### Delete News (Requires Auth)
```http
DELETE /api/news/:id
Authorization: Bearer <token>
```

---

### Services Management

#### Get All Services
```http
GET /api/services
```

#### Create Service (Requires Auth)
```http
POST /api/services
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "金メッキ",
  "titleEn": "Gold Plating",
  "description": "高級感と優れた導電性を兼ね備えた表面処理。",
  "features": ["高級感", "優れた導電性", "耐食性"],
  "applications": ["電子部品", "装飾品", "コネクタ"],
  "color": "from-yellow-400 to-yellow-600"
}
```

---

### Inquiries Management

#### Get All Inquiries (Requires Auth)
```http
GET /api/inquiries?page=1&limit=20&status=未読
Authorization: Bearer <token>
```

#### Create Inquiry (Public)
```http
POST /api/inquiries
Content-Type: application/json

{
  "companyName": "株式会社XYZ",
  "name": "田中花子",
  "email": "tanaka@xyz.co.jp",
  "phone": "03-9876-5432",
  "service": "技術相談",
  "message": "ニッケルメッキについて相談したいです。"
}
```

#### Update Inquiry Status (Requires Auth)
```http
PATCH /api/inquiries/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "対応中"
}
```

---

### Applications Management

#### Get All Applications (Requires Auth)
```http
GET /api/applications?page=1&limit=20&status=新規
Authorization: Bearer <token>
```

#### Create Application (Public)
```http
POST /api/applications
Content-Type: multipart/form-data

position: メッキ技術者
name: 田中健一
age: 28
email: tanaka@example.com
phone: 090-1234-5678
experience: 製造業3年
motivation: メッキ技術を学び...
resume: [File Upload]
```

#### Update Application Status (Requires Auth)
```http
PATCH /api/applications/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "面接予定"
}
```

---

### Dashboard

#### Get Dashboard Stats (Requires Auth)
```http
GET /api/dashboard/stats
Authorization: Bearer <token>
```

#### Get Recent Activities (Requires Auth)
```http
GET /api/dashboard/recent
Authorization: Bearer <token>
```

---

### Settings

#### Get Settings (Requires Auth)
```http
GET /api/settings
Authorization: Bearer <token>
```

#### Update Settings (Requires Auth)
```http
PUT /api/settings
Authorization: Bearer <token>
Content-Type: application/json

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
```

#### Update Password (Requires Auth)
```http
POST /api/settings/password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "admin123",
  "newPassword": "newpassword456",
  "confirmPassword": "newpassword456"
}
```

---

### File Upload

#### Upload File (Requires Auth)
```http
POST /api/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: [File]
type: resume|image|document
```

---

## 💻 Using the API Client in Frontend

### Import the API Client

```typescript
import { apiClient } from '@/lib/api-client';
```

### Example: Login

```typescript
const handleLogin = async () => {
  const response = await apiClient.login('admin@washidu-mekki.com', 'admin123');
  
  if (response.success) {
    console.log('Logged in:', response.data.user);
    // Token is automatically stored
  } else {
    console.error('Login failed:', response.error?.message);
  }
};
```

### Example: Fetch News

```typescript
const fetchNews = async () => {
  const response = await apiClient.getNews({ page: 1, limit: 10, status: '公開' });
  
  if (response.success) {
    console.log('News:', response.data.items);
  }
};
```

### Example: Create Inquiry

```typescript
const submitInquiry = async (formData) => {
  const response = await apiClient.createInquiry(formData);
  
  if (response.success) {
    console.log('Inquiry submitted:', response.data);
  }
};
```

### Example: Upload File

```typescript
const handleFileUpload = async (file: File) => {
  const response = await apiClient.uploadFile(file, 'image');
  
  if (response.success) {
    console.log('File uploaded:', response.data.url);
  }
};
```

---

## 🗄️ Database Models

### User
- name, email, password, role

### News
- date, category, title, description, content, status, views

### Service
- title, titleEn, description, features[], applications[], color

### Inquiry
- date, companyName, name, email, phone, service, message, status

### Application
- date, position, name, age, email, phone, experience, motivation, resumeUrl, status, referenceNumber

### Settings
- company (name, email, phone, address)
- notifications (newInquiry, newApplication, weeklyReport)

---

## 🔒 Security

- All CMS endpoints require JWT authentication
- Passwords are hashed with bcrypt
- File uploads are validated for type and size
- CORS is configured for production

---

## 📝 Notes

- All dates use Japanese format: `YYYY.MM.DD`
- All text content in Japanese
- Maximum file upload size: 10MB
- Supported resume formats: PDF, DOC, DOCX
- Image formats: JPG, PNG, WebP, GIF

---

## 🐛 Troubleshooting

### MongoDB Connection Error
Make sure your MongoDB URI is correct in `.env.local`

### Authentication Error
Check that the JWT_SECRET is set in `.env.local`

### File Upload Error
Verify Cloudinary credentials in `.env.local`

---

## 📞 Support

For issues or questions, contact the development team.

