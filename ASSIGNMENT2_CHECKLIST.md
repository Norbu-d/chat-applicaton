# Assignment 2 - Implementation Checklist

## Completed Items ✓

### Code Updates
- [x] Updated backend package.json with jest-junit reporter
- [x] Updated frontend package.json with vitest junit reporter
- [x] Created/Updated Jenkinsfile with complete pipeline stages
- [x] Pipeline stages: Checkout, Install, Test, Build, Docker, Push, Summary

### Documentation
- [x] Created Assignment2.md with comprehensive guide
- [x] Created ASSIGNMENT2_SETUP_GUIDE.md with quick steps
- [x] Documented all challenges and solutions
- [x] Added troubleshooting section

### Jenkins Configuration (TODO - Complete these in Jenkins UI)

#### Phase 1: Initial Setup (15 minutes)
- [ ] Access Jenkins at http://localhost:8080
- [ ] Install NodeJS Plugin
- [ ] Install Pipeline Plugin
- [ ] Install GitHub Integration Plugin
- [ ] Install Docker Pipeline Plugin
- [ ] Install JUnit Plugin
- [ ] **Restart Jenkins**
- [ ] Configure NodeJS tool (v20 LTS)

#### Phase 2: Credentials (10 minutes)
- [ ] Generate GitHub Personal Access Token
- [ ] Add GitHub credentials in Jenkins (ID: `github-creds`)
- [ ] Add Docker Hub credentials in Jenkins (ID: `dockerhub-creds`)

#### Phase 3: Pipeline Job (5 minutes)
- [ ] Create new Pipeline job: `todo-app-pipeline`
- [ ] Configure Pipeline script from SCM (Git)
- [ ] Set repository URL to: https://github.com/Norbu-d/chat-applicaton.git
- [ ] Select GitHub credentials
- [ ] Set branch to: `*/main`
- [ ] Set script path to: `Jenkinsfile`
- [ ] **Save job**

#### Phase 4: Test Execution (10 minutes)
- [ ] Click "Build with Parameters"
- [ ] Select DEPLOY_TARGET: `docker-hub`
- [ ] Click **Build**
- [ ] Monitor console output
- [ ] Wait for all stages to complete

### Verification (TODO - After running pipeline)

#### Build Verification
- [ ] All 10 pipeline stages completed successfully
- [ ] No errors in console output
- [ ] Build shows "SUCCESS"
- [ ] Build took < 5 minutes

#### Test Results
- [ ] Backend tests passed
- [ ] Frontend tests passed
- [ ] junit.xml files generated
- [ ] Test reports visible in Jenkins

#### Docker Verification
- [ ] Docker images built successfully
- [ ] Images tagged with student ID: 02230293
- [ ] Images pushed to Docker Hub
- [ ] Images visible at: https://hub.docker.com/r/norbu

#### Documentation Verification
- [ ] Screenshots taken of:
  - [ ] Jenkins job configuration
  - [ ] Successful build execution
  - [ ] Test results in Jenkins
  - [ ] Pipeline stage view
  - [ ] Docker Hub image listing

---

## Deliverables Checklist

### Code & Configuration
- [x] Jenkinsfile in repository root
- [x] Updated package.json files (frontend & backend)
- [x] All test scripts configured for JUnit output

### Documentation
- [x] Assignment2.md with full implementation guide
- [x] ASSIGNMENT2_SETUP_GUIDE.md with quick steps
- [ ] Screenshots in `/assets/` folder (TODO - capture after running)
- [ ] README.md updated with pipeline info (TODO)

### Screenshots to Capture (after running pipeline)

1. **Jenkins Dashboard**
   - Location: Jenkins home page
   - Shows: Job list with todo-app-pipeline

2. **Job Configuration**
   - Location: todo-app-pipeline > Configure
   - Shows: Pipeline SCM configuration

3. **Build Execution**
   - Location: Build console output
   - Shows: All stages completing successfully

4. **Pipeline Stage View**
   - Location: Build page > Stage View
   - Shows: Each stage with timing and status

5. **Test Results**
   - Location: Build > Test Result
   - Shows: Backend and Frontend test results

6. **Docker Hub**
   - Location: https://hub.docker.com/r/norbu
   - Shows: be-todo and fe-todo images with 02230293 tag

7. **Build Success**
   - Location: Jenkins Dashboard > Build History
   - Shows: Multiple successful builds in history

---

## Timeline Estimate

| Phase | Task | Time | Status |
|-------|------|------|--------|
| 1 | Jenkins Plugin Installation | 5 min | ⏳ TODO |
| 2 | Configure Credentials | 5 min | ⏳ TODO |
| 3 | Create Pipeline Job | 5 min | ⏳ TODO |
| 4 | Run First Build | 10 min | ⏳ TODO |
| 5 | Capture Screenshots | 10 min | ⏳ TODO |
| 6 | Update README/Docs | 10 min | ⏳ TODO |
| **TOTAL** | | **45 min** | |

---

## Notes

- Jenkins plugins may require a restart after installation
- Docker daemon must be accessible from Jenkins container
- GitHub webhook is optional but enables automatic builds
- All builds generate artifacts in Docker Hub

---

## Support

For detailed instructions, see:
1. **ASSIGNMENT2_SETUP_GUIDE.md** - Step-by-step walkthrough
2. **Assignment2.md** - Complete documentation
3. **Jenkinsfile** - Pipeline source code

---

**Start with Phase 1 of Jenkins Configuration above ⬆️**
