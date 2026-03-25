# redeploy-frontend.ps1
Write-Host "=== Redeploying Frontend on Render ===" -ForegroundColor Green

cd D:\DSO101

# Check git status
Write-Host "`n1. Checking git status..." -ForegroundColor Yellow
git status

# Push if there are changes
Write-Host "`n2. Pushing to GitHub..." -ForegroundColor Yellow
git push

Write-Host "`n3. Now on Render.com:" -ForegroundColor Yellow
Write-Host "   - Go to https://dashboard.render.com" -ForegroundColor Cyan
Write-Host "   - Delete the failed fe-todo service" -ForegroundColor Cyan
Write-Host "   - Click 'New +' → 'Web Service'" -ForegroundColor Cyan
Write-Host "   - Select your GitHub repository" -ForegroundColor Cyan
Write-Host "   - Configure:" -ForegroundColor Cyan
Write-Host "     • Name: fe-todo" -ForegroundColor Gray
Write-Host "     • Language: Docker" -ForegroundColor Gray
Write-Host "     • Branch: main" -ForegroundColor Gray
Write-Host "     • Root Directory: frontend" -ForegroundColor Gray
Write-Host "     • Plan: Free" -ForegroundColor Gray
Write-Host "   - Add Environment Variable:" -ForegroundColor Cyan
Write-Host "     • VITE_API_URL = https://be-todo.onrender.com" -ForegroundColor Gray
Write-Host "   - Click 'Create Web Service'" -ForegroundColor Cyan

Write-Host "`n=== Ready ===" -ForegroundColor Green