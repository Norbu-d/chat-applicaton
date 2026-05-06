# Assignment 3 Implementation Checklist

## Overview
This checklist will help you complete Assignment 3: GitHub Actions CI/CD Pipeline. Follow each step and mark it as complete as you progress.

---

## Phase 1: GitHub Repository Setup

- [ ] **Verify Repository is Public**
  - Go to: https://github.com/Norbu-d/chat-applicaton/settings
  - Check visibility setting is "Public"
  - Click Save if changed

- [ ] **Verify package.json Files**
  - Backend: `npm start`, `npm test` scripts present ✅ (Already verified)
  - Frontend: `npm build`, `npm test` scripts present ✅ (Already verified)

- [ ] **Verify Dockerfiles**
  - Backend Dockerfile exists at `backend/Dockerfile` ✅ (Already created)
  - Frontend Dockerfile exists at `frontend/Dockerfile` ✅ (Already created)
  - Both Dockerfiles follow best practices ✅ (Already verified)

---

## Phase 2: GitHub Actions Workflow

- [ ] **Workflow File Created**
  - File: `.github/workflows/deploy.yml` ✅ (Already created)
  - Location verified in repository root
  - Syntax validated

- [ ] **Test Workflow Locally** (Optional)
  - Run: `act push` (if act tool installed)
  - Or wait for first push to GitHub

---

## Phase 3: GitHub Secrets Configuration

- [ ] **Get Docker Hub Credentials**
  - Go to: https://hub.docker.com/settings/security
  - Username: Write down your Docker Hub username
  - Create new Personal Access Token (PAT)
  - Select "Read & Write" permissions
  - Copy token immediately (shown only once)

- [ ] **Add GitHub Secret: DOCKERHUB_USERNAME**
  - Go to: https://github.com/Norbu-d/chat-applicaton/settings/secrets/actions
  - Click "New repository secret"
  - Name: `DOCKERHUB_USERNAME`
  - Value: Your Docker Hub username (e.g., `norbu`)
  - Click "Add secret"

- [ ] **Add GitHub Secret: DOCKERHUB_TOKEN**
  - Go to: https://github.com/Norbu-d/chat-applicaton/settings/secrets/actions
  - Click "New repository secret"
  - Name: `DOCKERHUB_TOKEN`
  - Value: Your Docker Hub PAT (the token you copied)
  - Click "Add secret"

- [ ] **Get Render Deploy Hook**
  - Log in to: https://dashboard.render.com
  - Select your web service (or create new one)
  - Go to: Service Settings → Deploy Hook
  - Copy the webhook URL
  - It looks like: `https://api.render.com/deploy/srv-...`

- [ ] **Add GitHub Secret: RENDER_DEPLOY_HOOK_URL**
  - Go to: https://github.com/Norbu-d/chat-applicaton/settings/secrets/actions
  - Click "New repository secret"
  - Name: `RENDER_DEPLOY_HOOK_URL`
  - Value: The webhook URL you copied from Render
  - Click "Add secret"

- [ ] **Verify All Secrets Added**
  - Go to: https://github.com/Norbu-d/chat-applicaton/settings/secrets/actions
  - Confirm you see all three secrets:
    - ✓ DOCKERHUB_USERNAME
    - ✓ DOCKERHUB_TOKEN
    - ✓ RENDER_DEPLOY_HOOK_URL

---

## Phase 4: Render.com Configuration

- [ ] **Create Render Account** (if needed)
  - Go to: https://render.com
  - Sign up or log in with GitHub

- [ ] **Create New Web Service**
  - Dashboard → New (+) → Web Service
  - Choose "Deploy existing image"
  - Select Docker Hub registry

- [ ] **Configure Service Settings**
  - Name: `todo-app-backend`
  - Image URL: `norbu/be-todo:latest` (replace `norbu` with your Docker Hub username)
  - Port: `5000`
  - Plan: Free (for development/testing)
  - Region: Oregon (or your preference)
  - Click "Create Web Service"

- [ ] **Copy Deploy Hook URL**
  - Once service is created, go to Settings
  - Scroll to "Deploy Hook" section
  - Copy the webhook URL
  - Add it to GitHub Secrets as `RENDER_DEPLOY_HOOK_URL`

- [ ] **Configure Health Check** (Optional)
  - Go to Service Settings
  - Add Health Check URL: `/` (or your health check endpoint)
  - This helps Render verify the app is running

---

## Phase 5: Test the Pipeline

- [ ] **Push a Test Commit**
  - Make a small change (e.g., update README.md)
  - Commit: `git add . && git commit -m "Test GitHub Actions"`
  - Push: `git push origin main`

- [ ] **Monitor GitHub Actions Workflow**
  - Go to: https://github.com/Norbu-d/chat-applicaton/actions
  - Click on the latest workflow run
  - Watch each step complete
  - Check for any failures and debug if needed

- [ ] **Verify Docker Hub Push**
  - Go to: https://hub.docker.com/r/norbu (replace with your username)
  - Verify that new images appear:
    - `be-todo:latest`
    - `be-todo:<commit-sha>`
  - Check the image tags and pull commands

- [ ] **Check Render Deployment**
  - Go to: https://dashboard.render.com
  - Select your service
  - Check the "Latest deployment" section
  - Look for "Deploy triggered by webhook" message
  - Wait for deployment to complete (green status)
  - Note the service URL (e.g., `https://todo-app-backend.render.com`)

---

## Phase 6: Documentation

- [ ] **Complete Assignment 3 Report**
  - File: `Norbu_Dhendup_02230293_DSO101_A3/assignment3.md`
  - Add actual screenshots of:
    - ✓ GitHub Actions successful workflow run
    - ✓ Docker Hub image push
    - ✓ Render deployment status
  - Fill in actual service URLs where indicated

- [ ] **Collect Screenshots**
  - GitHub Actions workflow success
  - GitHub Actions logs/console output
  - Docker Hub images pushed
  - Render dashboard showing deployment
  - Render logs showing successful deployment

- [ ] **Document Challenges and Solutions**
  - Update assignment3.md with any unique challenges you faced
  - Explain how you solved them
  - Add any additional learnings

- [ ] **Update Assignment Checklist**
  - Mark all items as complete
  - Note completion date

---

## Phase 7: Final Verification

- [ ] **Test Full Pipeline One More Time**
  - Make another commit to main branch
  - Verify GitHub Actions workflow runs
  - Verify images pushed to Docker Hub
  - Verify Render redeployment triggered
  - Test the live application URL

- [ ] **Document Final URLs**
  - GitHub Repository: https://github.com/Norbu-d/chat-applicaton
  - Docker Hub: https://hub.docker.com/r/norbu
  - Render App: https://todo-app-backend.render.com (actual URL from Render)
  - Add these to your assignment3.md

- [ ] **Code Review**
  - Check Jenkinsfile from Assignment 2 (for reference)
  - Check new .github/workflows/deploy.yml
  - Verify all files are properly committed to git

- [ ] **Final Submission**
  - Commit all assignment files: `git add . && git commit -m "Assignment 3 Submission"`
  - Push to main: `git push origin main`
  - Verify files are on GitHub
  - Create a list of files for submission:
    - `.github/workflows/deploy.yml`
    - `backend/Dockerfile` ✅
    - `frontend/Dockerfile` ✅
    - `Norbu_Dhendup_02230293_DSO101_A3/assignment3.md`

---

## Troubleshooting Guide

### GitHub Actions Workflow Fails

**Error: "authentication failed"**
- Check DOCKERHUB_USERNAME and DOCKERHUB_TOKEN are correct
- Verify Docker Hub account has push permissions
- Try logging in manually to Docker Hub to confirm credentials work

**Error: "image build failed"**
- Check Dockerfile syntax is correct
- Verify all COPY paths are correct relative to build context
- Try building locally first: `docker build -t test ./backend`

**Error: "workflow file not found"**
- Verify file is at `.github/workflows/deploy.yml`
- Check file name is exactly "deploy.yml" (case-sensitive)
- Verify YAML syntax using https://www.yamllint.com/

### Docker Hub Issues

**Images not appearing after push**
- Check GitHub Actions logs to confirm push succeeded
- Try refreshing Docker Hub page
- Verify you're logged in to the correct account
- Check DockerHub repository visibility is public

**Cannot push: "unauthorized"**
- Verify DOCKERHUB_TOKEN is not expired
- Generate a new token if needed
- Update GitHub Secret with new token

### Render Deployment Issues

**Deployment not triggered**
- Check RENDER_DEPLOY_HOOK_URL is correct
- Copy it fresh from Render Settings → Deploy Hook
- Update GitHub Secret if URL changed
- Check Render logs for webhook error messages

**App crashes after deployment**
- Check Render logs for error messages
- Verify environment variables are set in Render
- Verify the image port matches EXPOSE in Dockerfile
- Check if database/external services are configured

---

## Quick Reference Commands

```bash
# Build images locally for testing
docker build -t norbu/be-todo:test ./backend
docker build -t norbu/fe-todo:test ./frontend

# Run local testing
docker run -p 5000:5000 norbu/be-todo:test
docker run -p 80:80 norbu/fe-todo:test

# Check git status
git status

# View recent commits
git log --oneline -5

# View GitHub Actions locally (requires 'act' tool)
act push

# Check Docker Hub images from CLI
docker search norbu/be-todo

# View logs from local container
docker logs <container-id>
```

---

## Timeline Estimate

| Phase | Estimated Time |
|-------|-----------------|
| Phase 1: Repository Setup | 10 minutes |
| Phase 2: GitHub Actions Workflow | 5 minutes (already created) |
| Phase 3: GitHub Secrets | 15 minutes |
| Phase 4: Render Configuration | 20 minutes |
| Phase 5: Testing | 10-15 minutes |
| Phase 6: Documentation | 30 minutes |
| Phase 7: Final Verification | 15 minutes |
| **Total** | **~2-2.5 hours** |

---

## Success Criteria

Your Assignment 3 is complete when:

✅ GitHub Actions workflow file exists at `.github/workflows/deploy.yml`  
✅ All three GitHub Secrets are configured and hidden  
✅ GitHub Actions workflow runs successfully on push to main  
✅ Docker images are built and pushed to Docker Hub  
✅ Images appear in Docker Hub with proper tags  
✅ Render deployment is triggered and successful  
✅ Application is accessible at Render URL  
✅ Complete report with screenshots is submitted  
✅ All files are committed to GitHub  

---

## Additional Resources

- **GitHub Actions Docs:** https://docs.github.com/en/actions
- **Docker Hub:** https://hub.docker.com
- **Render Docs:** https://render.com/docs
- **YAML Validator:** https://www.yamllint.com/
- **GitHub Secrets:** https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions

---

**Notes:**
- Keep your credentials secure - never commit them to git
- GitHub Secrets are automatically masked in logs
- You can revoke/regenerate credentials anytime
- Render free tier has limited resources - suitable for development
- Always test locally before pushing to production

Good luck with Assignment 3! 🚀
