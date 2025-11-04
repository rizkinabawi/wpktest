# Complete API Testing Script
$baseUrl = "http://localhost:3000/api"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  API Testing - Washizu Plating" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Login first
Write-Host "1. Testing Login..." -ForegroundColor Yellow
$loginBody = '{"email":"admin@washidu-mekki.com","password":"admin123"}'
try {
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
    if ($loginResponse.success) {
        Write-Host "  PASSED - Login successful" -ForegroundColor Green
        $token = $loginResponse.data.token
        $headers = @{"Authorization" = "Bearer $token"}
    } else {
        Write-Host "  FAILED - Login failed" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "  FAILED - $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test News
Write-Host ""
Write-Host "2. Testing News API..." -ForegroundColor Yellow
try {
    $news = Invoke-RestMethod -Uri "$baseUrl/news" -Method GET
    Write-Host "  PASSED - Get news ($($news.data.total) items)" -ForegroundColor Green
} catch {
    Write-Host "  FAILED - $($_.Exception.Message)" -ForegroundColor Red
}

# Test Services
Write-Host ""
Write-Host "3. Testing Services API..." -ForegroundColor Yellow
try {
    $services = Invoke-RestMethod -Uri "$baseUrl/services" -Method GET
    Write-Host "  PASSED - Get services ($($services.data.total) items)" -ForegroundColor Green
} catch {
    Write-Host "  FAILED - $($_.Exception.Message)" -ForegroundColor Red
}

# Test Job Positions
Write-Host ""
Write-Host "4. Testing Job Positions API..." -ForegroundColor Yellow
try {
    $jobs = Invoke-RestMethod -Uri "$baseUrl/job-positions" -Method GET
    Write-Host "  PASSED - Get job positions ($($jobs.data.total) items)" -ForegroundColor Green
} catch {
    Write-Host "  FAILED - $($_.Exception.Message)" -ForegroundColor Red
}

# Test Create Inquiry
Write-Host ""
Write-Host "5. Testing Create Inquiry (Public Form)..." -ForegroundColor Yellow
$inquiryJson = @{
    companyName = "Test Co"
    name = "Test User"
    email = "test@test.com"
    phone = "123-456"
    service = [System.Text.Encoding]::UTF8.GetString([byte[]]@(232,166,139,231,169,141,227,130,138,228,190,157,233,160,188))
    message = "Test message"
} | ConvertTo-Json
try {
    $inquiry = Invoke-RestMethod -Uri "$baseUrl/inquiries" -Method POST -Body $inquiryJson -ContentType "application/json; charset=utf-8"
    if ($inquiry.success) {
        Write-Host "  PASSED - Inquiry created" -ForegroundColor Green
    } else {
        Write-Host "  FAILED - $($inquiry.error.message)" -ForegroundColor Red
    }
} catch {
    Write-Host "  FAILED - $($_.Exception.Message)" -ForegroundColor Red
}

# Test Get Inquiries (Admin)
Write-Host ""
Write-Host "6. Testing Get Inquiries (Admin)..." -ForegroundColor Yellow
try {
    $inquiries = Invoke-RestMethod -Uri "$baseUrl/inquiries" -Method GET -Headers $headers
    Write-Host "  PASSED - Get inquiries ($($inquiries.data.total) items)" -ForegroundColor Green
} catch {
    Write-Host "  FAILED - $($_.Exception.Message)" -ForegroundColor Red
}

# Test Get Applications (Admin)
Write-Host ""
Write-Host "7. Testing Get Applications (Admin)..." -ForegroundColor Yellow
try {
    $applications = Invoke-RestMethod -Uri "$baseUrl/applications" -Method GET -Headers $headers
    Write-Host "  PASSED - Get applications ($($applications.data.total) items)" -ForegroundColor Green
} catch {
    Write-Host "  FAILED - $($_.Exception.Message)" -ForegroundColor Red
}

# Test Dashboard Stats
Write-Host ""
Write-Host "8. Testing Dashboard Stats..." -ForegroundColor Yellow
try {
    $stats = Invoke-RestMethod -Uri "$baseUrl/dashboard/stats" -Method GET -Headers $headers
    Write-Host "  PASSED - Dashboard stats retrieved" -ForegroundColor Green
    Write-Host "    News: $($stats.data.newsCount)" -ForegroundColor Gray
    Write-Host "    Services: $($stats.data.servicesCount)" -ForegroundColor Gray
    Write-Host "    Inquiries: $($stats.data.inquiriesCount)" -ForegroundColor Gray
    Write-Host "    Applications: $($stats.data.applicationsCount)" -ForegroundColor Gray
} catch {
    Write-Host "  FAILED - $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Testing Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Open http://localhost:3000 - Public website" -ForegroundColor White
Write-Host "2. Open http://localhost:3000/cms/login - CMS login" -ForegroundColor White
Write-Host "3. Login: admin@washidu-mekki.com / admin123" -ForegroundColor White
Write-Host ""

