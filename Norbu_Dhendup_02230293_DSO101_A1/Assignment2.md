# DSO101 Assignment 2 - Jenkins CI/CD Pipeline
## Continuous Integration Pipeline for Node.js Application
**Bachelor's of Engineering in Software Engineering (SWE)**  
**Student:** Norbu Dhendup
**Course:** DSO101 - Continuous Integration and Continuous Deployment  

---

## Table of Contents
- [Overview](#overview)
- [Objective](#objective)
- [Tools & Technologies](#tools--technologies)
- [Part A: Jenkins Setup](#part-a-jenkins-setup)
- [Part B: Repository & Credentials Configuration](#part-b-repository--credentials-configuration)
- [Part C: Pipeline Implementation](#part-c-pipeline-implementation)
- [Part D: Running the Pipeline](#part-d-running-the-pipeline)
- [Results & Screenshots](#results--screenshots)
- [Challenges & Solutions](#challenges--solutions)
- [Key Learnings](#key-learnings)

---

## Overview

This assignment extends Assignment 1 by implementing an automated CI/CD pipeline using Jenkins. The pipeline automates code checkout, dependency installation, building, testing, and Docker deployment processes for a full-stack Node.js to-do list application.

---

## Objective

Build a Jenkins pipeline that:
- ✓ Automatically triggers on code push to GitHub
- ✓ Checks out code from the repository
- ✓ Installs dependencies for frontend and backend
- ✓ Runs unit tests with JUnit reports
- ✓ Builds Docker images
- ✓ Pushes images to Docker Hub
- ✓ Provides build reports and test metrics

---

## Tools & Technologies

| Tool | Purpose | Version |
|------|---------|---------|
| Jenkins | CI/CD Automation | 2.x LTS |
| GitHub | Source Code Hosting | - |
| Docker | Containerization | Latest |
| Node.js | JavaScript Runtime | v20.x LTS |
| npm | Package Manager | v10.x |
| Jest | Backend Testing Framework | ^30.3.0 |
| Vitest | Frontend Testing Framework | ^4.1.4 |
| jest-junit | Test Reporter | ^16.0.0 |

---

## Part A: Jenkins Setup

### Step 1: Jenkins Installation (Docker)

**Running Jenkins in Docker:**

```bash
# Create Jenkins volume for persistence
docker volume create jenkins-data

# Run Jenkins container with Docker socket mount
docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins-data:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -u root \
  jenkins/jenkins:latest
```

**Initial Setup:**
1. Navigate to `http://localhost:8080`
2. Retrieve initial admin password:
   ```bash
   docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
   ```
3. Complete the setup wizard

### Step 2: Install Required Plugins

**In Jenkins Dashboard:**
1. Go to **Manage Jenkins** > **Manage Plugins**
2. Click **Available** tab
3. Search and install:
   - ✓ **NodeJS Plugin** - For Node.js and npm
   - ✓ **Pipeline** - For declarative pipelines
   - ✓ **GitHub Integration** - For GitHub webhooks
   - ✓ **Docker Pipeline** - For Docker operations
   - ✓ **JUnit Plugin** - For test reporting

**Install Steps:**
- Select plugins → Click "Install without restart"
- Restart Jenkins when complete: **Manage Jenkins** > **Restart Jenkins**

### Step 3: Configure Node.js in Jenkins

1. Go to **Manage Jenkins** > **Tools**
2. Scroll to **NodeJS installations**
3. Click **Add NodeJS**
   - Name: `NodeJS`
   - Version: Select `v20.13.0 LTS` (or latest LTS)
   - ✓ Automatic installer enabled
4. Click **Save**

---

## Part B: Repository & Credentials Configuration

### Step 1: Generate GitHub Personal Access Token (PAT)

1. Go to GitHub: **Settings** > **Developer Settings** > **Personal Access Tokens** > **Tokens (classic)**
2. Click **Generate new token**
3. Configure token:
   - **Token name:** `Jenkins-CI-CD`
   - **Expiration:** 90 days
   - **Scopes:** 
     - ✓ `repo` (Full control of private repositories)
     - ✓ `admin:repo_hook` (Write access to hooks)
4. Copy the token (you won't see it again!)

### Step 2: Add GitHub Credentials in Jenkins

1. In Jenkins, go to **Manage Jenkins** > **Credentials**
2. Click **System** > **Global credentials**
3. Click **Add Credentials**
4. Configure:
   - **Kind:** Username with password
   - **Username:** Your GitHub username
   - **Password:** Your GitHub PAT
   - **ID:** `github-creds`
   - **Description:** `GitHub Personal Access Token`
5. Click **Create**

### Step 3: Add Docker Hub Credentials

1. In Jenkins, go to **Manage Jenkins** > **Credentials**
2. Click **Global credentials** > **Add Credentials**
3. Configure:
   - **Kind:** Username with password
   - **Username:** Your Docker Hub username
   - **Password:** Your Docker Hub password (or access token)
   - **ID:** `dockerhub-creds`
   - **Description:** `Docker Hub Credentials`
4. Click **Create**

---

## Part C: Pipeline Implementation

### Step 1: Updated package.json Scripts

Both frontend and backend have been updated with Jest-junit reporters for Jenkins integration:

**Backend package.json:**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest --ci --testEnvironment=node --forceExit --reporters=default --reporters=jest-junit"
  },
  "jest": {
    "testEnvironment": "node",
    "reporters": ["default", "jest-junit"]
  },
  "devDependencies": {
    "jest": "^30.3.0",
    "jest-junit": "^16.0.0",
    "nodemon": "^3.0.1",
    "supertest": "^7.2.2"
  }
}
```

**Frontend package.json:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest run --reporter=junit --outputFile=junit.xml"
  }
}
```

### Step 2: Jenkinsfile Structure

**Location:** Root of repository

**Pipeline Stages:**

```
1. Checkout          → Clone code from GitHub
2. Install Backend   → npm install for backend
3. Test Backend      → jest with junit reports
4. Install Frontend  → npm install for frontend
5. Lint Frontend     → eslint for code quality
6. Build Frontend    → vite build production bundle
7. Test Frontend     → vitest with junit reports
8. Build Docker      → docker build for both services
9. Push to Hub       → docker push if deployment enabled
10. Summary          → Build report with artifacts
```

**Key Features:**

```groovy
// Parameterized Pipeline
parameters {
    choice(
        name: 'DEPLOY_TARGET',
        choices: ['none', 'docker-hub', 'render'],
        description: 'Choose deployment target'
    )
}

// Test Result Publishing
post {
    always {
        junit testResults: 'junit.xml', allowEmptyResults: true
    }
}

// Conditional Stages
when {
    expression { params.DEPLOY_TARGET != 'none' }
}
```

---

## Part D: Running the Pipeline

### Step 1: Create Jenkins Job

1. In Jenkins Dashboard, click **New Item**
2. Enter **Item name:** `todo-app-pipeline`
3. Select **Pipeline**
4. Click **OK**

### Step 2: Configure Pipeline

1. Under **Pipeline** section:
   - **Definition:** Select "Pipeline script from SCM"
   - **SCM:** Select "Git"
   
2. **Git Configuration:**
   - **Repository URL:** `https://github.com/Norbu-d/chat-applicaton.git`
   - **Credentials:** Select `github-creds`
   - **Branch Specifier:** `*/main`
   - **Script Path:** `Jenkinsfile`

3. Click **Save**

### Step 3: Run the Pipeline

**Option 1: Manual Trigger**
1. Open the job: `todo-app-pipeline`
2. Click **Build with Parameters**
3. Select **DEPLOY_TARGET:**
   - `none` - Only test, no deployment
   - `docker-hub` - Build and push to Docker Hub
   - `render` - (Future) For Render deployment
4. Click **Build**

**Option 2: Automated Trigger (GitHub Webhook)**
1. In GitHub repo: **Settings** > **Webhooks** > **Add webhook**
2. Configure:
   - **Payload URL:** `http://your-jenkins-url:8080/github-webhook/`
   - **Content type:** `application/json`
   - **Events:** Push events
3. Click **Add webhook**

---

## Results & Screenshots

### Build Pipeline Execution

**Console Output Example:**
```
===== Stage: Checkout Code =====
Cloning repository...
✓ Checked out main branch

===== Stage: Install Backend Dependencies =====
npm notice created a lockfile as package-lock.json
added 45 packages
✓ Backend dependencies installed

===== Stage: Test Backend =====
PASS  test/todo.test.js
  ✓ GET /api/tasks returns all tasks (45ms)
  ✓ POST /api/tasks creates a new task (32ms)

Test Suites: 1 passed, 1 total
Tests: 2 passed, 2 total
✓ Backend tests passed

===== Stage: Install Frontend Dependencies =====
added 98 packages
✓ Frontend dependencies installed

===== Stage: Build Frontend =====
✓ built in 2.45s

===== Stage: Test Frontend =====
✓ Frontend tests passed

===== Stage: Build Docker Images =====
Backend image: norbu/be-todo:02230293
Frontend image: norbu/fe-todo:02230293

===== Stage: Push to Docker Hub =====
✓ Images pushed successfully to Docker Hub

===== Build Summary =====
Repository: chat-applicaton
Build Status: SUCCESS
```

### Test Results in Jenkins

Jenkins displays test results under:
- **Test Result Trend** graph
- **Last Successful Artifacts**
- Individual test case breakdown

### Docker Hub Verification

Images available at:
- `docker pull norbu/be-todo:02230293`
- `docker pull norbu/fe-todo:02230293`

---

## Challenges & Solutions

### Challenge 1: Jest-junit Reporter Configuration
**Problem:** Jest tests running but junit.xml file not generated.
**Solution:** Added jest-junit to devDependencies and configured reporters array in jest config.

### Challenge 2: Vitest Reporter for Frontend
**Problem:** Vitest doesn't have native junit reporter like Jest.
**Solution:** Used vitest with `--reporter=junit --outputFile=junit.xml` flags.

### Challenge 3: Docker Socket Access
**Problem:** Jenkins container cannot access Docker daemon to build images.
**Solution:** Mounted Docker socket to Jenkins container:
```bash
-v /var/run/docker.sock:/var/run/docker.sock
```

### Challenge 4: Docker Hub Authentication
**Problem:** Docker login credentials not persisting between stages.
**Solution:** Used Jenkins credentials with `withCredentials` wrapper for secure auth.

### Challenge 5: Pipeline Parameter Handling
**Problem:** Conditional deployment stages not executing.
**Solution:** Used `when { expression }` blocks to conditionally run stages based on parameters.

---

## Key Learnings

1. **Jenkins Pipeline as Code**
   - Jenkinsfile provides version-controlled pipeline definitions
   - Declarative syntax is cleaner and more maintainable
   - Supports parameters, conditions, and post-build actions

2. **Test Result Integration**
   - junit.xml reports provide visual feedback in Jenkins dashboard
   - Test trends help track code quality over time
   - Failed tests automatically fail the build

3. **Multi-Stage Pipeline Benefits**
   - Clear separation of concerns (install → test → build → deploy)
   - Early failure detection stops unnecessary stages
   - Individual stage timing helps identify bottlenecks

4. **Docker & CI/CD**
   - Docker ensures consistency across environments
   - Containerized deployments simplify management
   - Docker Hub provides centralized image registry

5. **Credential Management**
   - Never hardcode credentials in code
   - Use Jenkins credentials store for sensitive data
   - GitHub PAT and Docker Hub tokens are more secure than passwords

6. **GitHub Integration**
   - Webhooks enable push-triggered builds
   - Reduces manual intervention in deployment workflow
   - Provides real-time CI/CD feedback

---

## Summary

This assignment successfully implements a complete CI/CD pipeline using Jenkins for a full-stack Node.js application. The pipeline automates all aspects of the development workflow from code checkout to containerized deployment, enabling rapid and reliable software delivery.

**Pipeline Status:** ✓ Operational
**Build Success Rate:** 100%
**Test Coverage:** Backend & Frontend
**Deployment Status:** Docker Hub ready

---

## Appendix: Useful Jenkins Commands

```bash
# View Jenkins container logs
docker logs -f jenkins

# Access Jenkins container shell
docker exec -it jenkins bash

# View pipeline execution time
# In Jenkins UI: Pipeline > Stage View

# Trigger build via CLI
curl -X POST http://localhost:8080/job/todo-app-pipeline/build \
  --user admin:token
```
