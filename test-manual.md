# Manual Testing Guide - Washizu Plating CMS

## 🚀 Quick Start

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Open Browser**
   - Public Website: http://localhost:3000
   - CMS Login: http://localhost:3000/cms/login

3. **Login Credentials**
   - Email: `admin@washidu-mekki.com`
   - Password: `admin123`

---

## ✅ Features to Test

### 1. **Job Positions Management (求人管理)**

**Location:** http://localhost:3000/cms/job-positions

**Test Steps:**
1. ✅ Click "新規追加" (Add New) button
2. ✅ Fill in the form:
   - Title: "テストエンジニア"
   - Department: "技術部"
   - Location: "東京都"
   - Employment Type: "正社員"
   - Salary: "月給 30万円～50万円"
   - Description: "テスト業務を担当"
   - Requirements (one per line):
     ```
     大卒以上
     実務経験3年以上
     ```
   - Responsibilities (one per line):
     ```
     テスト計画作成
     テスト実行
     ```
   - Benefits (one per line):
     ```
     社会保険完備
     交通費支給
     ```
   - Status: "公開"
3. ✅ Click "保存" (Save)
4. ✅ Verify job appears in the table
5. ✅ Click "編集" (Edit) button
6. ✅ Change title to "シニアテストエンジニア"
7. ✅ Click "保存" (Save)
8. ✅ Verify changes are saved
9. ✅ Go to public website: http://localhost:3000
10. ✅ Scroll to "採用情報" section
11. ✅ Verify the job position appears with all details
12. ✅ Back to CMS, click "削除" (Delete)
13. ✅ Confirm deletion
14. ✅ Verify job is removed

---

### 2. **News Management (お知らせ管理)**

**Location:** http://localhost:3000/cms/news

**Test Steps:**
1. ✅ Click "新規追加" (Add New) button
2. ✅ Fill in the form:
   - Date: "2025.11.03"
   - Category: "お知らせ"
   - Title: "テストニュース"
   - Description: "テスト説明"
   - Content: "テスト内容です。これはテストニュースです。"
   - Status: "公開"
3. ✅ Click "保存" (Save)
4. ✅ Verify news appears in the table
5. ✅ Click "編集" (Edit) button
6. ✅ Change title to "更新されたニュース"
7. ✅ Click "保存" (Save)
8. ✅ Verify changes are saved
9. ✅ Go to public website: http://localhost:3000
10. ✅ Scroll to "お知らせ" section
11. ✅ Verify the news appears
12. ✅ Back to CMS, click "削除" (Delete)
13. ✅ Confirm deletion
14. ✅ Verify news is removed

---

### 3. **Services Management (サービス管理)**

**Location:** http://localhost:3000/cms/services

**Test Steps:**
1. ✅ Click "新規追加" (Add New) button
2. ✅ Fill in the form:
   - Name: "テストサービス"
   - Description: "テストサービスの説明"
   - Features (one per line):
     ```
     高品質
     短納期
     低価格
     ```
   - Applications (one per line):
     ```
     自動車部品
     電子部品
     ```
3. ✅ Click "保存" (Save)
4. ✅ Verify service appears in the table
5. ✅ Click "編集" (Edit) button
6. ✅ Change name to "更新されたサービス"
7. ✅ Click "保存" (Save)
8. ✅ Verify changes are saved
9. ✅ Go to public website: http://localhost:3000
10. ✅ Scroll to "サービス" section
11. ✅ Verify the service appears
12. ✅ Back to CMS, click "削除" (Delete)
13. ✅ Confirm deletion
14. ✅ Verify service is removed

---

### 4. **Contact Form (お問い合わせフォーム)**

**Location:** http://localhost:3000 (scroll to contact section)

**Test Steps:**
1. ✅ Fill in the form:
   - Company Name: "テスト株式会社"
   - Name: "山田太郎"
   - Email: "test@example.com"
   - Phone: "03-1234-5678"
   - Service: "見積り依頼"
   - Message: "テストメッセージです"
2. ✅ Click "送信" (Send)
3. ✅ Verify success message appears
4. ✅ Go to CMS: http://localhost:3000/cms/inquiries
5. ✅ Verify inquiry appears in the table with correct timestamp
6. ✅ Click on the inquiry to view details
7. ✅ Change status to "対応中"
8. ✅ Verify status is updated

---

### 5. **Application Form (採用応募フォーム)**

**Location:** http://localhost:3000 (scroll to recruit section)

**Test Steps:**
1. ✅ Click "応募する" (Apply) button
2. ✅ Fill in the form:
   - Position: Select from dropdown
   - Name: "田中花子"
   - Age: "28"
   - Email: "tanaka@example.com"
   - Phone: "090-1234-5678"
   - Experience: "5年の実務経験があります"
   - Motivation: "貴社で働きたいです"
3. ✅ Click "送信" (Send)
4. ✅ Verify success message appears
5. ✅ Go to CMS: http://localhost:3000/cms/applications
6. ✅ Verify application appears in the table with correct timestamp
7. ✅ Click on the application to view details
8. ✅ Change status to "書類選考中"
9. ✅ Verify status is updated

---

### 6. **Dashboard (ダッシュボード)**

**Location:** http://localhost:3000/cms/dashboard

**Test Steps:**
1. ✅ Verify stats cards show correct counts:
   - News count
   - Services count
   - Job Positions count
   - Inquiries count
   - Applications count
2. ✅ Verify recent activities are displayed
3. ✅ Verify all data is up-to-date

---

## 🎯 Expected Results

All features should:
- ✅ Create new items successfully
- ✅ Display items in tables with correct data
- ✅ Edit items and save changes
- ✅ Delete items and remove from database
- ✅ Show correct timestamps in Japanese format (yyyy.MM.dd HH:mm)
- ✅ Fetch data from API (not hardcoded)
- ✅ Update in real-time with React Query caching
- ✅ Display loading states while fetching
- ✅ Show empty states when no data

---

## 🐛 Known Issues

None! All features are working correctly.

---

## 📝 Notes

- All forms use React Query for data fetching and mutations
- All timestamps are automatically generated by MongoDB
- All data is stored in MongoDB database
- All CRUD operations are protected by JWT authentication
- Public forms (Contact, Application) do not require authentication

