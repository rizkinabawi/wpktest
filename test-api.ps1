# Test API endpoints

Write-Host "Testing API Endpoints..." -ForegroundColor Green

# Test 1: Get News (Public)
Write-Host "`n1. Testing GET /api/news (Public)" -ForegroundColor Yellow
$newsResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/news" -Method GET
Write-Host "Status: $($newsResponse.StatusCode)" -ForegroundColor Cyan
$newsData = $newsResponse.Content | ConvertFrom-Json
Write-Host "News Count: $($newsData.data.items.Count)" -ForegroundColor Cyan

# Test 2: Login
Write-Host "`n2. Testing POST /api/auth/login" -ForegroundColor Yellow
$loginBody = @{
    email = "admin@washidu-mekki.com"
    password = "admin123"
} | ConvertTo-Json

$loginResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
Write-Host "Status: $($loginResponse.StatusCode)" -ForegroundColor Cyan
$loginData = $loginResponse.Content | ConvertFrom-Json
$token = $loginData.data.token
Write-Host "Token received: $($token.Substring(0, 20))..." -ForegroundColor Cyan
Write-Host "User: $($loginData.data.user.name)" -ForegroundColor Cyan

# Test 3: Get Dashboard Stats (Authenticated)
Write-Host "`n3. Testing GET /api/dashboard/stats (Authenticated)" -ForegroundColor Yellow
$headers = @{
    "Authorization" = "Bearer $token"
}
$statsResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/dashboard/stats" -Method GET -Headers $headers
Write-Host "Status: $($statsResponse.StatusCode)" -ForegroundColor Cyan
$statsData = $statsResponse.Content | ConvertFrom-Json
Write-Host "Total News: $($statsData.data.news.total)" -ForegroundColor Cyan
Write-Host "Total Inquiries: $($statsData.data.inquiries.total)" -ForegroundColor Cyan
Write-Host "Total Applications: $($statsData.data.applications.total)" -ForegroundColor Cyan

# Test 4: Get Services (Public)
Write-Host "`n4. Testing GET /api/services (Public)" -ForegroundColor Yellow
$servicesResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/services" -Method GET
Write-Host "Status: $($servicesResponse.StatusCode)" -ForegroundColor Cyan
$servicesData = $servicesResponse.Content | ConvertFrom-Json
Write-Host "Services Count: $($servicesData.data.items.Count)" -ForegroundColor Cyan

Write-Host "`n✅ All API tests completed successfully!" -ForegroundColor Green

