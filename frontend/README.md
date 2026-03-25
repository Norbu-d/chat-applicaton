# Todo List Application - CI/CD Assignment  
**DSO101 - Continuous Deployment and Continuous Integration**

---

## Student Information
- **Name:** Norbu Dhendup 
- **Student Number:** 02230293  
- **Major:** Bachelor of Engineering (Software Engineering)  
- **Date of Submission:** 12th March 2026  

---

## Table of Contents
1. Project Overview  
2. Technologies Used  
3. Features  
4. Project Structure  
5. Part A: Docker Hub Deployment  
6. Part B: Render with Automation  
7. Local Development  
8. API Documentation  
9. Screenshots  
10. Troubleshooting  
11. References  

---

## Project Overview
Implementation of Continuous Integration and Continuous Deployment (CI/CD) with the help of Docker containers and automated deployment to Render.com. The application enables one to create, read, update and delete tasks using a responsive and modern user interface.

---

## Live URLs (After Deployment)
- **Frontend:** https://fe-todo.onrender.com  
- **Main API:** https://be-todo.onrender.com/api/tasks  
- **Internals:** https://be-todo.onrender.com/health  

---

## Docker Hub Images
- **Backend:** norbu07/be-todo:02230293  
- **Frontend:** norbu07/fe-todo:02230293  

---

## Technologies Used

| Category          | Technology |
|------------------|-----------|
| Frontend         | React 19, Vite 8, Axios |
| Backend          | Node.js, Express, PostgreSQL driver, version 20 |
| Database         | PostgreSQL 15 |
| Containerization | Docker, Docker Compose |
| CI/CD            | GitHub Actions (Render Blueprint) |
| Deployment       | Render.com (Docker + PostgreSQL) |
| CSS3 + animation | Animation CSS3 + glass morphism Styling CSS3 + morphism CSS3 + glass morphism CSS3 + glass morphism CSS3 + glass morphism CSS3 + glass morphism CSS3 + glass morphism CSS3 + glass morphism CSS3 + glass morphism CSS3 + glass morphism CSS3 + glass morphism CSS3 + glass morphism CSS3 + glass morphism CSS3 + glass morphism CSS3 + glass morphism CSS3 + glass morphism CSS3 + glass morphism CSS3 + glass morphism CSS3 + glass morphism |

---

## Features

### Core Features
- Add new assignments with a title and a description  
- Get everything in a neat list  
- Edit existing tasks  
- Promptly delete tasks  
- Make tasks complete/incomplete  
- Continuous storage of data using PostgreSQL  

### Value Additions (Greater Than Requirements)
- Search - A feature that lets you filter tasks by their titles o description  
- Statistics Dashboard - Instantaneous figures of the number of tasks done, the number of tasks active and the number of tasks completed  
- [?] Filter Tabs - Active, View all or Completed  
- [?] Task Timestamps - View the date of the creation of each task  
- Contemporary UI - Glass morphism, smooth transitions, responsive design  
- Loading States Indicating spinner loads as data is loaded  
- [?][?] Error Handling - Friendliness to error messages  
- Health Check Endpoint - To check the status of applications  
- Mobile Friendly - Fits all the sizes  

---

## Project Structure