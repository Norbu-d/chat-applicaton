# Assignment 4 Setup Guide: Complete CI/CD Pipeline with Testing

This guide will walk you through setting up, testing, and deploying Assignment 4.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Setup](#local-setup)
3. [Running the Application](#running-the-application)
4. [Running Tests](#running-tests)
5. [Docker Setup](#docker-setup)
6. [GitHub Configuration](#github-configuration)
7. [Render Deployment](#render-deployment)
8. [Triggering CI/CD Pipeline](#triggering-cicd-pipeline)
9. [Verification & Monitoring](#verification--monitoring)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Make sure you have these installed:

- **Node.js v20+** - [Download here](https://nodejs.org/)
  - Verify: `node --version` (should show v20.x.x)
  - Verify: `npm --version` (should show 10.x.x)

- **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop)
  - Verify: `docker --version`
  - Verify: `docker run hello-world` (pulls and runs test image)

- **Git** - [Download here](https://git-scm.com/)
  - Verify: `git --version`

- **Docker Hub Account** - [Create here](https://hub.docker.com/)
  - Username: `norbu07` (or your own)
  - Already logged in? Verify: `docker login`

- **Render Account** - [Create here](https://render.com/)
  - Free tier is fine for this assignment

---

## Local Setup

### Step 1: Navigate to Assignment 4 folder

```bash
cd d:\DSO101\Norbu_Dhendup_02230293_DSO101_A4
```

### Step 2: Install dependencies

```bash
npm install
```

**Expected output:**
```
added 150+ packages in X seconds
```

### Step 3: Verify installation

```bash
npm list express jest supertest
```

**Should see:**
```
├── express@4.18.2
├── jest@29.7.0
└── supertest@6.3.3
```

---

## Running the Application

### Option A: Development Mode (with auto-reload)

```bash
npm run dev
```

**Expected output:**
```
[nodemon] starting `node app.js`
Server running on port 3000
```

Then in another terminal, test it:
```bash
curl http://localhost:3000/health
```

**Should return:**
```json
{"status":"ok","timestamp":"2026-05-07T..."}
```

### Option B: Production Mode

```bash
npm start
```

**Expected output:**
```
Server running on port 3000
```

### Testing the API endpoints

Open PowerShell in another terminal and try these commands:

```bash
# Get all todos (empty initially)
curl http://localhost:3000/todos

# Create a todo
curl -X POST http://localhost:3000/todos `
  -H "Content-Type: application/json" `
  -d '{"title":"Learn CI/CD","description":"Master GitHub Actions"}'

# Get specific todo
curl http://localhost:3000/todos/1

# Get statistics
curl http://localhost:3000/stats

# Update a todo
curl -X PUT http://localhost:3000/todos/1 `
  -H "Content-Type: application/json" `
  -d '{"completed":true}'

# Delete a todo
curl -X DELETE http://localhost:3000/todos/1
```

---

## Running Tests

### Step 1: Run all tests

```bash
npm test
```

**Expected output:**
```
PASS  ./app.test.js
  ✓ should return health status (XX ms)
  ✓ should return empty todos array (X ms)
  ✓ should create a new todo (X ms)
  ✓ should retrieve a todo by ID (X ms)
  ✓ should retrieve 404 for non-existent todo (X ms)
  ✓ should update a todo (X ms)
  ✓ should delete a todo (X ms)
  ✓ should return statistics (X ms)
  ✓ should handle validation errors (X ms)
  ✓ should handle missing required fields (X ms)

Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        X.XXX s

Coverage summary:
Statements   : 95.2% ( XX/XX )
Branches     : 92.5% ( XX/XX )
Functions    : 100% ( XX/XX )
Lines        : 95.2% ( XX/XX )
```

### Step 2: Run tests with verbose output

```bash
npm test -- --verbose
```

### Step 3: Run specific test

```bash
npm test -- --testNamePattern="health"
```

### Step 4: Coverage report

Coverage is already generated in `coverage/` folder. Open it:

```bash
start coverage/lcov-report/index.html
```

---

## Docker Setup

### Step 1: Build Docker image locally

```bash
docker build -t assignment4-app:local .
```

**Expected output:**
```
[1/5] FROM node:20-alpine
[2/5] WORKDIR /app
[3/5] COPY package*.json ./
[4/5] RUN npm install
[5/5] RUN npm ci --omit=dev
=> exporting to image
=> => writing image sha256:abc123...
```

### Step 2: Run container locally

```bash
docker run -p 3000:3000 assignment4-app:local
```

**Expected output:**
```
Server running on port 3000
```

Test it:
```bash
curl http://localhost:3000/health
```

### Step 3: Stop container

Press `Ctrl+C` in the terminal

---

## GitHub Configuration

### Step 1: Set GitHub Secrets

1. Go to: https://github.com/Norbu-d/chat-applicaton/settings/secrets/actions
2. Click **"New repository secret"**

**Add 3 secrets:**

| Name | Value | Where to get |
|------|-------|-------------|
| `DOCKERHUB_USERNAME` | `norbu07` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | `dckr_pat_...` | [Docker Hub Settings](https://hub.docker.com/settings/security) |
| `RENDER_DEPLOY_HOOK_URL_A4` | `https://api.render.com/deploy/srv-...` | Will get from Render (see below) |

**To get Docker Hub Token:**
1. Go to https://hub.docker.com/settings/security
2. Click "New Access Token"
3. Name: `github-actions`
4. Copy the token
5. Paste in GitHub secrets as `DOCKERHUB_TOKEN`

### Step 2: Verify secrets are added

In GitHub:
- ✅ `DOCKERHUB_USERNAME` (green checkmark)
- ✅ `DOCKERHUB_TOKEN` (green checkmark)  
- ⏳ `RENDER_DEPLOY_HOOK_URL_A4` (will add after creating Render service)

---

## Render Deployment

### Step 1: Create Render service

1. Go to https://dashboard.render.com/
2. Click **"New +"** → **"Web Service"**
3. Select **"Deploy existing image"**

### Step 2: Configure service

| Setting | Value |
|---------|-------|
| **Image URL** | `norbu07/assignment4-app:latest` |
| **Name** | `assignment4-app` |
| **Region** | `Singapore` (or nearest) |
| **Plan** | `Free` |
| **Port** | `3000` |
| **Environment** | Leave default |

Click **"Create Web Service"**

**⏳ Wait ~3-5 minutes for deployment**

### Step 3: Get Deploy Hook URL

1. In Render dashboard, click your service: `assignment4-app`
2. Go to **Settings** tab
3. Scroll to **Deploy Hook**
4. Copy the URL (looks like: `https://api.render.com/deploy/srv-abc123...`)

### Step 4: Add Deploy Hook to GitHub Secrets

1. Go to: https://github.com/Norbu-d/chat-applicaton/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `RENDER_DEPLOY_HOOK_URL_A4`
4. Value: Paste the Deploy Hook URL
5. Click **"Add secret"**

### Step 5: Test Render service

Once deployment is complete, go to your Render service URL (found at top of service page):

```
https://assignment4-app.render.com/health
```

Should return:
```json
{"status":"ok","timestamp":"..."}
```

---

## Triggering CI/CD Pipeline

### Step 1: Commit Assignment 4 files to GitHub

```bash
git add Norbu_Dhendup_02230293_DSO101_A4/
git commit -m "Assignment 4: Complete CI/CD pipeline with testing"
git push origin main
```

**Expected output:**
```
remote: Resolving deltas: 100% (X/X)
remote: *** GitHub Copilot Suggestion: ...
To github.com:Norbu-d/chat-applicaton.git
   abc1234..def5678  main -> main
```

### Step 2: Watch GitHub Actions

1. Go to: https://github.com/Norbu-d/chat-applicaton/actions
2. Should see **1 workflow running**: "Build, Test, and Deploy"

**Pipeline stages:**
```
✅ build-test (2-3 min)
   ├─ Checkout code
   ├─ Setup Node.js 20
   ├─ npm install
   └─ npm test (with coverage)

✅ build-push (depends on build-test)
   ├─ Setup Docker Buildx
   ├─ Login to Docker Hub
   └─ Build and push images

✅ deploy (depends on build-push)
   ├─ Trigger Render webhook
   └─ Auto-deploy to Render
```

### Step 3: Monitor logs

Click the workflow run to see detailed logs:
- Yellow indicator = Running
- Green checkmark = Success
- Red X = Failed

---

## Verification & Monitoring

### Check 1: GitHub Actions Workflow

1. Go to https://github.com/Norbu-d/chat-applicaton/actions
2. Look for workflow: **"Build, Test, and Deploy"**
3. All 3 jobs should have **green checkmarks ✅**

### Check 2: Docker Hub Images

1. Go to https://hub.docker.com/r/norbu07/assignment4-app
2. Should see **2 tags**:
   - `latest` (most recent)
   - `<commit-sha>` (specific version)

### Check 3: Render Deployment

1. Go to https://dashboard.render.com/
2. Click service: `assignment4-app`
3. Status should be: **"Live"** (green)
4. Last deploy: Should be recent

### Check 4: Live Application

```bash
# Health check
curl https://assignment4-app.render.com/health

# Get todos (empty)
curl https://assignment4-app.render.com/todos

# Create a todo
curl -X POST https://assignment4-app.render.com/todos `
  -H "Content-Type: application/json" `
  -d '{"title":"My Task"}'

# Get statistics
curl https://assignment4-app.render.com/stats
```

---

## Troubleshooting

### Problem: `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Try again
npm install
```

---

### Problem: Tests fail locally

**Solution:**
```bash
# Make sure you're in the right directory
cd Norbu_Dhendup_02230293_DSO101_A4

# Try running tests with verbose output
npm test -- --verbose

# Check if app.js and app.test.js exist
Get-ChildItem *.js
```

---

### Problem: Docker build fails

**Solution:**
```bash
# Make sure Docker is running
docker ps

# Try rebuilding with no cache
docker build -t assignment4-app:local . --no-cache

# Check if all files exist
Get-ChildItem
```

---

### Problem: Docker Hub login fails

**Solution:**
```bash
# Login to Docker Hub
docker login

# Enter username: norbu07
# Enter password: (your Docker Hub password or token)

# Verify login
docker ps
```

---

### Problem: GitHub Actions workflow fails

**Check:**

1. **Missing secrets?**
   - Go to: https://github.com/Norbu-d/chat-applicaton/settings/secrets/actions
   - Verify all 3 secrets exist: DOCKERHUB_USERNAME, DOCKERHUB_TOKEN, RENDER_DEPLOY_HOOK_URL_A4

2. **Wrong Docker Hub credentials?**
   - Verify on https://hub.docker.com/settings/security
   - Regenerate token if needed
   - Update GitHub secret

3. **Render webhook invalid?**
   - Go to https://dashboard.render.com/
   - Copy fresh deploy hook URL
   - Update RENDER_DEPLOY_HOOK_URL_A4 secret in GitHub

4. **Tests failing?**
   - Check workflow logs for error details
   - Run tests locally: `npm test`
   - Fix any failing tests in `app.test.js`

---

### Problem: Render deployment fails

**Solution:**

1. Check Render logs:
   - https://dashboard.render.com/ → Click `assignment4-app` → **"Logs"** tab
   - Look for errors (red text)

2. Common issues:
   - **Port mismatch**: Make sure Render service port is `3000`
   - **Image not found**: Verify image exists on Docker Hub
   - **Out of memory**: Render free tier has 512MB limit

3. Redeploy manually:
   - Go to Render dashboard
   - Click `assignment4-app`
   - Click **"Trigger Deploy"** → **"Deploy latest"**

---

### Problem: Application crashes after deploy

**Solution:**

1. Check Render logs for errors
2. Verify `.env` file has correct PORT:
   ```
   PORT=3000
   NODE_ENV=production
   ```
3. Check if all dependencies installed: `npm install` in Dockerfile
4. Test locally first: `npm start`

---

## Testing the Full Pipeline

### Complete End-to-End Test:

1. ✅ **Make a code change**
   ```bash
   # Edit app.js or app.test.js
   # Save file
   git add .
   git commit -m "Small update to trigger CI/CD"
   git push origin main
   ```

2. ✅ **Watch GitHub Actions**
   - https://github.com/Norbu-d/chat-applicaton/actions
   - Wait for all 3 jobs to complete (5 minutes max)

3. ✅ **Check test results**
   - Click workflow → `build-test` job → Look for "10 passed"

4. ✅ **Verify Docker Hub**
   - https://hub.docker.com/r/norbu07/assignment4-app
   - Should show new image tag

5. ✅ **Wait for Render auto-deploy**
   - https://dashboard.render.com/ → Click `assignment4-app`
   - Status should change to "Deploying" then "Live"

6. ✅ **Test live application**
   ```bash
   curl https://assignment4-app.render.com/health
   ```

---

## Success Criteria

✅ All requirements met when:

- [ ] `npm install` succeeds with no errors
- [ ] `npm test` shows **10 passing tests** with 95%+ coverage
- [ ] `npm start` runs server on port 3000
- [ ] Docker image builds successfully locally
- [ ] Docker image runs successfully locally
- [ ] All 3 GitHub secrets configured
- [ ] GitHub Actions workflow completes successfully
- [ ] Docker images pushed to Docker Hub
- [ ] Render service deployed and shows "Live"
- [ ] Live application responds to HTTP requests

---

## Quick Command Reference

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run application
npm start

# Build Docker image
docker build -t assignment4-app:local .

# Run Docker container
docker run -p 3000:3000 assignment4-app:local

# Push to GitHub (triggers CI/CD)
git add .
git commit -m "message"
git push origin main

# View GitHub Actions
# https://github.com/Norbu-d/chat-applicaton/actions

# View Docker Hub
# https://hub.docker.com/r/norbu07/assignment4-app

# View Render Dashboard
# https://dashboard.render.com/
```

---

## Next Steps

1. Complete all setup steps above
2. Commit to GitHub to trigger CI/CD
3. Monitor workflow completion
4. Verify live deployment
5. Update assignment4.md with actual screenshots and URLs
6. Submit assignment

**Good luck! 🚀**

