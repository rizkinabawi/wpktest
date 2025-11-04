Write-Host "Testing API..." -ForegroundColor Cyan

$body = @{
    email = "admin@washidu-mekki.com"
    password = "admin123"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:3000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
Write-Host $response.Content

