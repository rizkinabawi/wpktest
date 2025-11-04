# Complete CRUD Testing Script for Washizu Plating Website
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  WASHIZU PLATING - FULL CRUD TEST" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$baseUrl = "http://localhost:3000/api"
$token = ""
$testsPassed = 0
$testsFailed = 0

# Test 1: Login
Write-Host "Test 1: Login" -ForegroundColor Yellow
$loginBody = '{"email":"admin@washidu-mekki.com","password":"admin123"}'

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
    $token = $response.data.token
    Write-Host "  PASSED - Login successful" -ForegroundColor Green
    $testsPassed++
} catch {
    Write-Host "  FAILED - Login failed: $_" -ForegroundColor Red
    $testsFailed++
    exit 1
}

$headers = @{
    "Authorization" = "Bearer $token"
}

# Test 2: News CRUD
Write-Host "`nTest 2: News CRUD" -ForegroundColor Yellow
$newsBody = '{"date":"2025.11.03","category":"Test","title":"Test News","description":"Test description","content":"Test content","status":"下書き"}'

try {
    # Create
    $response = Invoke-RestMethod -Uri "$baseUrl/news" -Method POST -Body $newsBody -ContentType "application/json; charset=utf-8" -Headers $headers
    $newsId = $response.data._id
    Write-Host "  PASSED - Create: News created - ID: $newsId" -ForegroundColor Green

    # Read
    $response = Invoke-RestMethod -Uri "$baseUrl/news/$newsId" -Method GET
    Write-Host "  PASSED - Read: News retrieved" -ForegroundColor Green

    # Update
    $updateBody = '{"date":"2025.11.03","category":"Updated","title":"Updated News","description":"Updated","content":"Updated content","status":"公開"}'
    $response = Invoke-RestMethod -Uri "$baseUrl/news/$newsId" -Method PUT -Body $updateBody -ContentType "application/json; charset=utf-8" -Headers $headers
    Write-Host "  PASSED - Update: News updated" -ForegroundColor Green

    # Delete
    Invoke-RestMethod -Uri "$baseUrl/news/$newsId" -Method DELETE -Headers $headers | Out-Null
    Write-Host "  PASSED - Delete: News deleted" -ForegroundColor Green

    $testsPassed++
} catch {
    Write-Host "  FAILED - News CRUD failed: $_" -ForegroundColor Red
    $testsFailed++
}

# Test 3: Services CRUD
Write-Host "`nTest 3: Services CRUD" -ForegroundColor Yellow
$serviceBody = '{"name":"Test Service","description":"Test description","features":["Feature 1","Feature 2"],"applications":["App 1","App 2"]}'

try {
    # Create
    $response = Invoke-RestMethod -Uri "$baseUrl/services" -Method POST -Body $serviceBody -ContentType "application/json; charset=utf-8" -Headers $headers
    $serviceId = $response.data._id
    Write-Host "  PASSED - Create: Service created - ID: $serviceId" -ForegroundColor Green

    # Read
    $response = Invoke-RestMethod -Uri "$baseUrl/services/$serviceId" -Method GET
    Write-Host "  PASSED - Read: Service retrieved" -ForegroundColor Green

    # Update
    $updateBody = '{"name":"Updated Service","description":"Updated","features":["New Feature"],"applications":["New App"]}'
    $response = Invoke-RestMethod -Uri "$baseUrl/services/$serviceId" -Method PUT -Body $updateBody -ContentType "application/json; charset=utf-8" -Headers $headers
    Write-Host "  PASSED - Update: Service updated" -ForegroundColor Green

    # Delete
    Invoke-RestMethod -Uri "$baseUrl/services/$serviceId" -Method DELETE -Headers $headers | Out-Null
    Write-Host "  PASSED - Delete: Service deleted" -ForegroundColor Green

    $testsPassed++
} catch {
    Write-Host "  FAILED - Services CRUD failed: $_" -ForegroundColor Red
    $testsFailed++
}

# Test 4: Job Positions CRUD
Write-Host "`nTest 4: Job Positions CRUD" -ForegroundColor Yellow
$jobBody = '{"title":"Test Position","department":"Manufacturing","location":"Shizuoka","employmentType":"正社員","salary":"250,000 yen/month","description":"Test description","requirements":["Req 1"],"responsibilities":["Resp 1"],"benefits":["Benefit 1"],"status":"非公開"}'

try {
    # Create
    $response = Invoke-RestMethod -Uri "$baseUrl/job-positions" -Method POST -Body $jobBody -ContentType "application/json; charset=utf-8" -Headers $headers
    $jobId = $response.data._id
    Write-Host "  PASSED - Create: Job position created - ID: $jobId" -ForegroundColor Green

    # Read
    $response = Invoke-RestMethod -Uri "$baseUrl/job-positions/$jobId" -Method GET
    Write-Host "  PASSED - Read: Job position retrieved" -ForegroundColor Green

    # Update
    $updateBody = '{"title":"Updated Position","department":"Sales","location":"Tokyo","employmentType":"契約社員","salary":"300,000 yen/month","description":"Updated","requirements":["New Req"],"responsibilities":["New Resp"],"benefits":["New Benefit"],"status":"公開"}'
    $response = Invoke-RestMethod -Uri "$baseUrl/job-positions/$jobId" -Method PUT -Body $updateBody -ContentType "application/json; charset=utf-8" -Headers $headers
    Write-Host "  PASSED - Update: Job position updated" -ForegroundColor Green

    # Delete
    Invoke-RestMethod -Uri "$baseUrl/job-positions/$jobId" -Method DELETE -Headers $headers | Out-Null
    Write-Host "  PASSED - Delete: Job position deleted" -ForegroundColor Green

    $testsPassed++
} catch {
    Write-Host "  FAILED - Job Positions CRUD failed: $_" -ForegroundColor Red
    $testsFailed++
}

# Test 5: Inquiry Management
Write-Host "`nTest 5: Inquiry Management" -ForegroundColor Yellow
$inquiryBody = '{"companyName":"Test Company","name":"Test User","email":"test@example.com","phone":"03-1234-5678","service":"見積り依頼","message":"Test message"}'

try {
    # Create (Public)
    $response = Invoke-RestMethod -Uri "$baseUrl/inquiries" -Method POST -Body $inquiryBody -ContentType "application/json; charset=utf-8"
    $inquiryId = $response.data._id
    Write-Host "  PASSED - Create: Inquiry created - ID: $inquiryId" -ForegroundColor Green

    # Get All (Admin)
    $response = Invoke-RestMethod -Uri "$baseUrl/inquiries" -Method GET -Headers $headers
    Write-Host "  PASSED - Read: Retrieved $($response.data.total) inquiries" -ForegroundColor Green

    # Update Status
    $statusBody = '{"status":"対応中"}'
    $response = Invoke-RestMethod -Uri "$baseUrl/inquiries/$inquiryId/status" -Method PATCH -Body $statusBody -ContentType "application/json" -Headers $headers
    Write-Host "  PASSED - Update: Inquiry status updated" -ForegroundColor Green

    $testsPassed++
} catch {
    Write-Host "  FAILED - Inquiry management failed: $_" -ForegroundColor Red
    $testsFailed++
}

# Test 6: Application Management
Write-Host "`nTest 6: Application Management" -ForegroundColor Yellow
try {
    # Get All (Admin)
    $response = Invoke-RestMethod -Uri "$baseUrl/applications" -Method GET -Headers $headers
    Write-Host "  PASSED - Read: Retrieved $($response.data.total) applications" -ForegroundColor Green

    $testsPassed++
} catch {
    Write-Host "  FAILED - Application management failed: $_" -ForegroundColor Red
    $testsFailed++
}

# Test 7: Dashboard Stats
Write-Host "`nTest 7: Dashboard Stats" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/dashboard/stats" -Method GET -Headers $headers
    Write-Host "  PASSED - Dashboard stats retrieved" -ForegroundColor Green
    Write-Host "     News: $($response.data.newsCount)" -ForegroundColor Gray
    Write-Host "     Services: $($response.data.servicesCount)" -ForegroundColor Gray
    Write-Host "     Job Positions: $($response.data.jobPositionsCount)" -ForegroundColor Gray
    Write-Host "     Inquiries: $($response.data.inquiriesCount)" -ForegroundColor Gray
    Write-Host "     Applications: $($response.data.applicationsCount)" -ForegroundColor Gray
    
    $testsPassed++
} catch {
    Write-Host "  FAILED - Dashboard stats failed: $_" -ForegroundColor Red
    $testsFailed++
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  TEST RESULTS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PASSED: $testsPassed" -ForegroundColor Green
Write-Host "FAILED: $testsFailed" -ForegroundColor Red
Write-Host "TOTAL: $($testsPassed + $testsFailed)" -ForegroundColor White
Write-Host "========================================`n" -ForegroundColor Cyan

if ($testsFailed -eq 0) {
    Write-Host "ALL TESTS PASSED!" -ForegroundColor Green
} else {
    Write-Host "SOME TESTS FAILED" -ForegroundColor Yellow
}

