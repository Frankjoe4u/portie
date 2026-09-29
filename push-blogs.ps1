param(
    [string]$ApiUrl = "https://fjoe.vercel.app",
    [string]$Secret = "frankjoe_seed_2026",
    [string]$BlogsFile = "blogs.json"
)

Write-Host "Loading $BlogsFile..." -ForegroundColor Cyan
if (-not (Test-Path $BlogsFile)) { Write-Host "ERROR: $BlogsFile not found" -ForegroundColor Red; exit 1 }

$blogs = Get-Content $BlogsFile -Raw | ConvertFrom-Json
Write-Host "Loaded $($blogs.Count) posts" -ForegroundColor Green

$endpoint = "$($ApiUrl.TrimEnd('/'))/api/blogs"
$headers = @{ "x-seed-secret" = $Secret }

Write-Host "Pushing to $endpoint" -ForegroundColor Cyan

$success = 0; $failed = 0

foreach ($blog in $blogs) {
    $body = $blog | ConvertTo-Json -Depth 10
    try {
        Invoke-RestMethod -Uri $endpoint -Method POST -Body $body -ContentType "application/json" -Headers $headers -ErrorAction Stop | Out-Null
        Write-Host "OK: $($blog.title)" -ForegroundColor Green
        $success++
    } catch {
        Write-Host "FAIL: $($blog.title) - $($_.Exception.Message)" -ForegroundColor Red
        $failed++
    }
    Start-Sleep -Milliseconds 300
}

Write-Host "Done: $success pushed, $failed failed" -ForegroundColor Yellow
