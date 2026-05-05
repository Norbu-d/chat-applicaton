# Assignment 2 - Quick Setup Guide

## Prerequisites Checklist
- ✓ Jenkins running in Docker (you have this)
- ✓ GitHub account with access to chat-applicaton repo
- ✓ Docker Hub account
- ✓ Node.js v20 LTS installed locally (for testing)

---

## Step 1: Jenkins Initial Configuration (5 min)

### 1.1 Access Jenkins
```
http://localhost:8080
```

### 1.2 Install Plugins
1. **Manage Jenkins** → **Manage Plugins** → **Available**
2. Search and install:
   - [ ] NodeJS Plugin
   - [ ] Pipeline
   - [ ] GitHub Integration
   - [ ] Docker Pipeline
   - [ ] JUnit Plugin

After installing, restart Jenkins: **Manage Jenkins** → **Restart Jenkins**

### 1.3 Configure Node.js Tool
1. **Manage Jenkins** → **Tools** → **NodeJS installations**
2. Click **Add NodeJS**
   - Name: `NodeJS`
   - Version: `v20.13.0 LTS` (or latest)
3. Save

---

## Step 2: Add Credentials (5 min)

### 2.1 GitHub Credentials
1. Go to GitHub → Settings → Developer Settings → Personal Access Tokens
2. Create new token:
   - Name: `Jenkins-CI-CD`
   - Scopes: ✓ repo, ✓ admin:repo_hook
   - Copy token

3. In Jenkins: **Manage Jenkins** → **Credentials** → **Global credentials** → **Add Credentials**
   - Kind: Username with password
   - Username: Your GitHub username
   - Password: Your GitHub PAT
   - ID: `github-creds`

### 2.2 Docker Hub Credentials
1. In Jenkins: **Manage Jenkins** → **Credentials** → **Global credentials** → **Add Credentials**
   - Kind: Username with password
   - Username: Your Docker Hub username
   - Password: Your Docker Hub access token
   - ID: `dockerhub-creds`

---

## Step 3: Create Jenkins Job (5 min)

1. Jenkins Dashboard → **New Item**
2. Name: `todo-app-pipeline`
3. Select: **Pipeline**
4. Configure Pipeline:
   - Definition: **Pipeline script from SCM**
   - SCM: **Git**
   - Repository URL: `https://github.com/Norbu-d/chat-applicaton.git`
   - Credentials: Select `github-creds`
   - Branch: `*/main`
   - Script Path: `Jenkinsfile`
5. **Save**

---

## Step 4: Test the Pipeline (5 min)

1. Open job: `todo-app-pipeline`
2. Click **Build with Parameters**
3. Select DEPLOY_TARGET: `docker-hub`
4. Click **Build**

### Monitor the build:
- Click on the build number
- View **Console Output** to watch progress

### Expected stages:
```
✓ Checkout
✓ Install Backend
✓ Test Backend
✓ Install Frontend
✓ Lint Frontend
✓ Build Frontend
✓ Test Frontend
✓ Build Docker Images
✓ Push to Docker Hub
✓ Summary
```

---

## Step 5: Verify Results (5 min)

### Check Test Results
- In Jenkins: **Test Result Trend** graph shows pass/fail

### Check Docker Images
- Docker Hub: https://hub.docker.com/r/norbu
- Should see:
  - `be-todo:02230293`
  - `fe-todo:02230293`

### Check Console Output
- Build completed successfully
- All stages showing green checkmarks
- No errors in logs

---

## Troubleshooting

### Jenkins Won't Start
```bash
docker ps  # Check if container is running
docker logs jenkins  # Check logs
```

### Build Fails on Node Installation
```bash
# SSH into Jenkins container
docker exec -it jenkins bash

# Inside container:
npm install -g npm@latest  # Update npm
```

### Docker Images Not Pushing
- Verify Docker Hub credentials in Jenkins
- Check Docker daemon access: `docker ps`
- Ensure credentials ID matches in Jenkinsfile

### Tests Failing
```bash
# Run locally first
cd backend
npm test

cd ../frontend
npm test
```

---

## Quick Commands

```bash
# View Jenkins logs
docker logs -f jenkins

# Stop Jenkins
docker stop jenkins

# Start Jenkins
docker start jenkins

# Rebuild without cache
docker exec jenkins curl -X POST http://localhost:8080/job/todo-app-pipeline/build \
  --user admin:your-token
```

---

## Next Steps After Setup

1. ✓ Create GitHub webhook for automatic builds
2. ✓ Add more test cases to improve coverage
3. ✓ Configure Render deployment stage
4. ✓ Set up build notifications (Slack, email)
5. ✓ Monitor and optimize pipeline performance

---

For full details, see: **Assignment2.md**
