Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CRUD Operations Test - Washizu Plating" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$baseUrl = "http://localhost:3000/api"
$testsPassed = 0
$testsFailed = 0

# Test 1: Login
Write-Host "`n[1/5] Testing Login..." -ForegroundColor Yellow
try {
    $loginBody = '{"email":"admin@washidu-mekki.com","password":"admin123"}'
    $response = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
    $token = $response.data.token
    $headers = @{
        "Authorization" = "Bearer $token"
        "Content-Type" = "application/json"
    }
    Write-Host "  PASSED - Login successful" -ForegroundColor Green
    $testsPassed++
} catch {
    Write-Host "  FAILED - Login failed: $_" -ForegroundColor Red
    $testsFailed++
    exit 1
}

# Test 2: News CRUD
Write-Host "`n[2/5] Testing News CRUD..." -ForegroundColor Yellow
try {
    # CREATE
    $newsData = @{
        date = "2025.11.03"
        category = "Test"
        title = "Test News"
        description = "Test description"
        content = "Test content"
        status = [System.Text.Encoding]::UTF8.GetString([System.Text.Encoding]::UTF8.GetBytes("公開"))
    } | ConvertTo-Json -Compress
    $response = Invoke-RestMethod -Uri "$baseUrl/news" -Method POST -Body $newsData -ContentType "application/json; charset=utf-8" -Headers $headers
    $newsId = $response.data._id
    Write-Host "  CREATE - News created (ID: $newsId)" -ForegroundColor Green

    # READ
    $response = Invoke-RestMethod -Uri "$baseUrl/news/$newsId" -Method GET
    Write-Host "  READ - News retrieved" -ForegroundColor Green

    # UPDATE
    $updateData = @{
        date = "2025.11.03"
        category = "Updated"
        title = "Updated News"
        description = "Updated description"
        content = "Updated content"
        status = [System.Text.Encoding]::UTF8.GetString([System.Text.Encoding]::UTF8.GetBytes("公開"))
    } | ConvertTo-Json -Compress
    $response = Invoke-RestMethod -Uri "$baseUrl/news/$newsId" -Method PUT -Body $updateData -ContentType "application/json; charset=utf-8" -Headers $headers
    Write-Host "  UPDATE - News updated" -ForegroundColor Green

    # DELETE
    $response = Invoke-RestMethod -Uri "$baseUrl/news/$newsId" -Method DELETE -Headers $headers
    Write-Host "  DELETE - News deleted" -ForegroundColor Green

    Write-Host "  PASSED - News CRUD complete" -ForegroundColor Green
    $testsPassed++
} catch {
    Write-Host "  FAILED - News CRUD failed: $_" -ForegroundColor Red
    $testsFailed++
}

# Test 3: Services CRUD
Write-Host "`n[3/5] Testing Services CRUD..." -ForegroundColor Yellow
try {
    # CREATE
    $serviceBody = '{"name":"Test Service","description":"Test description","features":["Feature 1","Feature 2"],"applications":["App 1","App 2"]}'
    $response = Invoke-RestMethod -Uri "$baseUrl/services" -Method POST -Body $serviceBody -ContentType "application/json" -Headers $headers
    $serviceId = $response.data._id
    Write-Host "  CREATE - Service created (ID: $serviceId)" -ForegroundColor Green
    
    # READ
    $response = Invoke-RestMethod -Uri "$baseUrl/services/$serviceId" -Method GET
    Write-Host "  READ - Service retrieved" -ForegroundColor Green
    
    # UPDATE
    $updateBody = '{"name":"Updated Service","description":"Updated description","features":["Updated Feature"],"applications":["Updated App"]}'
    $response = Invoke-RestMethod -Uri "$baseUrl/services/$serviceId" -Method PUT -Body $updateBody -ContentType "application/json" -Headers $headers
    Write-Host "  UPDATE - Service updated" -ForegroundColor Green
    
    # DELETE
    $response = Invoke-RestMethod -Uri "$baseUrl/services/$serviceId" -Method DELETE -Headers $headers
    Write-Host "  DELETE - Service deleted" -ForegroundColor Green
    
    Write-Host "  PASSED - Services CRUD complete" -ForegroundColor Green
    $testsPassed++
} catch {
    Write-Host "  FAILED - Services CRUD failed: $_" -ForegroundColor Red
    $testsFailed++
}

# Test 4: Job Positions CRUD
Write-Host "`n[4/5] Testing Job Positions CRUD..." -ForegroundColor Yellow
try {
    # CREATE
    $jobBody = '{"title":"Test Position","department":"Test Dept","location":"Tokyo","employmentType":"正社員","salary":"300000 yen/month","description":"Test description","requirements":["Req 1","Req 2"],"responsibilities":["Resp 1","Resp 2"],"benefits":["Benefit 1","Benefit 2"],"status":"公開"}'
    $response = Invoke-RestMethod -Uri "$baseUrl/job-positions" -Method POST -Body $jobBody -ContentType "application/json" -Headers $headers
    $jobId = $response.data._id
    Write-Host "  CREATE - Job Position created (ID: $jobId)" -ForegroundColor Green
    
    # READ
    $response = Invoke-RestMethod -Uri "$baseUrl/job-positions/$jobId" -Method GET
    Write-Host "  READ - Job Position retrieved" -ForegroundColor Green
    
    # UPDATE
    $updateBody = '{"title":"Updated Position","department":"Updated Dept","location":"Osaka","employmentType":"契約社員","salary":"350000 yen/month","description":"Updated description","requirements":["Updated Req"],"responsibilities":["Updated Resp"],"benefits":["Updated Benefit"],"status":"公開"}'
    $response = Invoke-RestMethod -Uri "$baseUrl/job-positions/$jobId" -Method PUT -Body $updateBody -ContentType "application/json" -Headers $headers
    Write-Host "  UPDATE - Job Position updated" -ForegroundColor Green
    
    # DELETE
    $response = Invoke-RestMethod -Uri "$baseUrl/job-positions/$jobId" -Method DELETE -Headers $headers
    Write-Host "  DELETE - Job Position deleted" -ForegroundColor Green
    
    Write-Host "  PASSED - Job Positions CRUD complete" -ForegroundColor Green
    $testsPassed++
} catch {
    Write-Host "  FAILED - Job Positions CRUD failed: $_" -ForegroundColor Red
    $testsFailed++
}

# Test 5: Status Updates
Write-Host "`n[5/5] Testing Status Updates..." -ForegroundColor Yellow
try {
    # Create Inquiry
    $inquiryBody = '{"companyName":"Test Company","name":"Test User","email":"test@example.com","phone":"03-1234-5678","service":"Test Service","message":"Test message"}'
    $response = Invoke-RestMethod -Uri "$baseUrl/inquiries" -Method POST -Body $inquiryBody -ContentType "application/json"
    $inquiryId = $response.data._id
    Write-Host "  CREATE - Inquiry created" -ForegroundColor Green
    
    # Update Inquiry Status
    $statusBody = '{"status":"対応中"}'
    $response = Invoke-RestMethod -Uri "$baseUrl/inquiries/$inquiryId/status" -Method PATCH -Body $statusBody -ContentType "application/json" -Headers $headers
    Write-Host "  UPDATE - Inquiry status updated" -ForegroundColor Green
    
    Write-Host "  PASSED - Status updates complete" -ForegroundColor Green
    $testsPassed++
} catch {
    Write-Host "  FAILED - Status updates failed: $_" -ForegroundColor Red
    $testsFailed++
}

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  TEST RESULTS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PASSED: $testsPassed/5" -ForegroundColor Green
Write-Host "FAILED: $testsFailed/5" -ForegroundColor Red
Write-Host "========================================`n" -ForegroundColor Cyan

if ($testsFailed -eq 0) {
    Write-Host "ALL CRUD OPERATIONS WORKING!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "SOME TESTS FAILED" -ForegroundColor Yellow
    exit 1
}

