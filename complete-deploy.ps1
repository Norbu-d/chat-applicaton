# complete-deploy.ps1
Write-Host "=== Complete Deployment to Render ===" -ForegroundColor Green

cd D:\DSO101

# Add all files
Write-Host "`n1. Adding all files to git..." -ForegroundColor Yellow
git add backend/
git add frontend/
git add render.yaml
git add .

# Show what's being committed
Write-Host "`n2. Files to be committed:" -ForegroundColor Yellow
git status

# Commit
Write-Host "`n3. Committing..." -ForegroundColor Yellow
git commit -m "Complete todo app with backend and frontend for Render deployment"

# Push
Write-Host "`n4. Pushing to GitHub..." -ForegroundColor Yellow
git push

Write-Host "`n✅ Files pushed to GitHub!" -ForegroundColor Green

Write-Host "`n5. Now on Render.com:" -ForegroundColor Yellow
Write-Host "   A. Create PostgreSQL Database first:" -ForegroundColor Cyan
Write-Host "      - Click 'New +' → 'PostgreSQL'" -ForegroundColor Gray
Write-Host "      - Name: todo-db" -ForegroundColor Gray
Write-Host "      - Database: todo_db" -ForegroundColor Gray
Write-Host "      - User: todo_user" -ForegroundColor Gray
Write-Host "      - Plan: Free" -ForegroundColor Gray
Write-Host "      - Wait for it to be 'Available'" -ForegroundColor Gray

Write-Host "`n   B. Create Backend Service:" -ForegroundColor Cyan
Write-Host "      - Click 'New +' → 'Web Service'" -ForegroundColor Gray
Write-Host "      - Connect GitHub, select your repo" -ForegroundColor Gray
Write-Host "      - Name: be-todo" -ForegroundColor Gray
Write-Host "      - Language: Docker" -ForegroundColor Gray
Write-Host "      - Branch: main" -ForegroundColor Gray
Write-Host "      - Root Directory: backend" -ForegroundColor Gray
Write-Host "      - Plan: Free" -ForegroundColor Gray
Write-Host "      - Environment Variables:" -ForegroundColor Gray
Write-Host "        • PORT=5000" -ForegroundColor Gray
Write-Host "        • DB_HOST=[from PostgreSQL]" -ForegroundColor Gray
Write-Host "        • DB_USER=todo_user" -ForegroundColor Gray
Write-Host "        • DB_PASSWORD=[from PostgreSQL]" -ForegroundColor Gray
Write-Host "        • DB_NAME=todo_db" -ForegroundColor Gray
Write-Host "        • DB_PORT=5432" -ForegroundColor Gray

Write-Host "`n   C. Create Frontend Service (after backend is live):" -ForegroundColor Cyan
Write-Host "      - Click 'New +' → 'Web Service'" -ForegroundColor Gray
Write-Host "      - Name: fe-todo" -ForegroundColor Gray
Write-Host "      - Language: Docker" -ForegroundColor Gray
Write-Host "      - Root Directory: frontend" -ForegroundColor Gray
Write-Host "      - Environment Variable:" -ForegroundColor Gray
Write-Host "        • VITE_API_URL=https://be-todo.onrender.com" -ForegroundColor Gray

Write-Host "`n=== Ready! ===" -ForegroundColor Green