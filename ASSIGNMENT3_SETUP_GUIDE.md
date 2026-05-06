# Assignment 3: GitHub Actions Setup Guide

## GitHub Secrets Configuration

To make the CI/CD pipeline work, you need to add the following secrets to your GitHub repository:

### Steps to Add GitHub Secrets:

1. Go to your GitHub repository: `https://github.com/Norbu-d/chat-applicaton`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add each of the following:

### Required Secrets:

#### 1. **DOCKERHUB_USERNAME**
- **Value**: Your Docker Hub username (e.g., `norbu`)
- **Purpose**: Used to authenticate with Docker Hub during image push

#### 2. **DOCKERHUB_TOKEN**
- **Value**: Your Docker Hub Personal Access Token (NOT your password)
- **How to get it**:
  - Go to Docker Hub: https://hub.docker.com
  - Click your profile icon → **Account Settings** → **Security**
  - Click **New Access Token**
  - Name it (e.g., `github-actions`)
  - Select **Read & Write** permissions
  - Copy the token immediately (you can only view it once)
- **Purpose**: Used to authenticate and push images to Docker Hub

#### 3. **RENDER_DEPLOY_HOOK_URL**
- **Value**: Your Render.com deployment webhook URL
- **How to get it**:
  - Log in to Render.com: https://dashboard.render.com
  - Go to your service/deployment
  - Click **Settings** → **Deploy Hook**
  - Copy the webhook URL (looks like: `https://api.render.com/deploy/srv-...`)
- **Purpose**: Automatically triggers a redeploy on Render when new images are pushed to Docker Hub

### Example Secret Values (DO NOT USE - these are fake):
```
DOCKERHUB_USERNAME = norbu
DOCKERHUB_TOKEN = dckr_pat_aBcDeFgHiJkLmNoPqRsT
RENDER_DEPLOY_HOOK_URL = https://api.render.com/deploy/srv-abc123def456
```

### Security Notes:
- ⚠️ **NEVER** commit secrets to your repository
- ⚠️ **NEVER** hardcode credentials in your code
- ⚠️ Treat these secrets like passwords - keep them private
- ✅ GitHub encrypts secrets and only exposes them to GitHub Actions workflows
- ✅ Each time you rotate your credentials, update the corresponding secret

### Verification:
Once you've added all three secrets:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. You should see all three secrets listed (values are hidden)
3. Make a test commit to trigger the workflow
4. Go to **Actions** tab to see the workflow run

---

## Workflow File: `.github/workflows/deploy.yml`

The workflow file has been created with the following stages:

1. **Checkout Repository** - Pulls your latest code
2. **Set up Docker Buildx** - Prepares Docker for building images
3. **Login to DockerHub** - Authenticates using your secrets
4. **Build and Push Backend Image** - Builds and pushes backend Docker image
5. **Build and Push Frontend Image** - Builds and pushes frontend Docker image (continues on error if frontend missing)
6. **Trigger Render Deployment** - Calls the Render webhook to redeploy
7. **Job Summary** - Displays build information

---

## Testing the Workflow:

1. Make a small change to your code (e.g., update README.md)
2. Commit and push to main branch: `git push origin main`
3. Go to your GitHub repository → **Actions** tab
4. You should see the workflow running
5. Wait for it to complete (usually 5-10 minutes)
6. Once complete, check:
   - Docker Hub for your pushed images
   - Render.com for the deployment status

---

## Troubleshooting:

### Workflow fails with "authentication failed"
- Check that your DOCKERHUB_TOKEN and DOCKERHUB_USERNAME are correct
- Ensure your Docker Hub credentials have push permissions

### Render deployment doesn't trigger
- Verify your RENDER_DEPLOY_HOOK_URL is correct
- Check Render logs for any errors

### Frontend build fails
- The workflow continues on error for frontend, so this won't block backend deployment
- Make sure your frontend/Dockerfile exists and is correct

---
