# Test Frontend Integration

Write-Host "Testing API Integration..." -ForegroundColor Cyan

# Test Login
Write-Host "`n1. Testing Login API..." -ForegroundColor Yellow
$loginBody = @{
    email = "admin@washidu-mekki.com"
    password = "admin123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
    Write-Host "✓ Login successful!" -ForegroundColor Green
    $loginData = $loginResponse.Content | ConvertFrom-Json
    $token = $loginData.data.token
    Write-Host "Token: $($token.Substring(0, 20))..." -ForegroundColor Gray
} catch {
    Write-Host "✗ Login failed: $_" -ForegroundColor Red
    exit 1
}

# Test News API
Write-Host "`n2. Testing News API..." -ForegroundColor Yellow
try {
    $newsResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/news?limit=4" -Method GET
    $newsData = $newsResponse.Content | ConvertFrom-Json
    Write-Host "✓ News API successful! Found $($newsData.data.items.Count) news items" -ForegroundColor Green
} catch {
    Write-Host "✗ News API failed: $_" -ForegroundColor Red
}

# Test Services API
Write-Host "`n3. Testing Services API..." -ForegroundColor Yellow
try {
    $servicesResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/services" -Method GET
    $servicesData = $servicesResponse.Content | ConvertFrom-Json
    Write-Host "✓ Services API successful! Found $($servicesData.data.items.Count) services" -ForegroundColor Green
} catch {
    Write-Host "✗ Services API failed: $_" -ForegroundColor Red
}

# Test Dashboard Stats (requires auth)
Write-Host "`n4. Testing Dashboard Stats API..." -ForegroundColor Yellow
try {
    $headers = @{
        "Authorization" = "Bearer $token"
    }
    $statsResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/dashboard/stats" -Method GET -Headers $headers
    $statsData = $statsResponse.Content | ConvertFrom-Json
    Write-Host "✓ Dashboard Stats successful!" -ForegroundColor Green
    Write-Host "  - News: $($statsData.data.newsCount)" -ForegroundColor Gray
    Write-Host "  - Inquiries: $($statsData.data.inquiriesCount)" -ForegroundColor Gray
    Write-Host "  - Applications: $($statsData.data.applicationsCount)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Dashboard Stats failed: $_" -ForegroundColor Red
}

# Test Dashboard Recent (requires auth)
Write-Host "`n5. Testing Dashboard Recent API..." -ForegroundColor Yellow
try {
    $recentResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/dashboard/recent" -Method GET -Headers $headers
    $recentData = $recentResponse.Content | ConvertFrom-Json
    Write-Host "✓ Dashboard Recent successful!" -ForegroundColor Green
    Write-Host "  - Recent Inquiries: $($recentData.data.inquiries.Count)" -ForegroundColor Gray
    Write-Host "  - Recent News: $($recentData.data.news.Count)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Dashboard Recent failed: $_" -ForegroundColor Red
}

Write-Host "`n✓ All API tests completed!" -ForegroundColor Green
Write-Host "`nYou can now test the frontend at http://localhost:3000" -ForegroundColor Cyan
Write-Host "CMS Login: http://localhost:3000/cms/login" -ForegroundColor Cyan

