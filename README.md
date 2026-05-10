# Assignment 3 Report

## Project Overview

This repository contains a Node.js to-do application with:

- `backend/` — Express backend and Prisma data layer
- `frontend/` — React frontend application
- `backend/Dockerfile` — backend container definition
- `frontend/Dockerfile` — frontend container definition and test step
- `.github/workflows/deploy.yml` — GitHub Actions CI/CD pipeline

## Assignment Tasks Completed

### Task 1: Repository setup

- Verified `package.json` scripts in both `backend` and `frontend`.
- Confirmed the repository can be published publicly for DockerHub access.

### Task 2: Dockerfile verification

- `backend/Dockerfile` uses Node.js 20, installs dependencies, runs Prisma push, and starts the API on port `5000`.
- `frontend/Dockerfile` uses Node.js 20, installs dependencies, runs tests, and starts the app on port `3000`.
- Tested the backend app locally using Docker build and run.

### Task 3: GitHub Actions workflow

- Added `.github/workflows/deploy.yml` to build and push the Docker image.
- The workflow logs into DockerHub using secrets, builds the backend image, pushes it, and triggers Render.

### Task 4: Render deployment

- Prepared the app for Render deployment from an existing Docker image.
- Use the Render service to deploy the image pushed to DockerHub.

## CI/CD Implementation

### GitHub Actions workflow details

- Trigger: `push` to `main`
- Steps:
  1. Checkout code
  2. Set up Docker Buildx
  3. Login to DockerHub using `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN`
  4. Build and push `dso-as3-backend:latest` from `./backend`
  5. Trigger Render deployment via webhook URL in `RENDER_WEBHOOK_URL`

### Required GitHub secrets

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`
- `RENDER_WEBHOOK_URL`

> Important: Do not hardcode credentials in repository files.

## Local testing

### Backend

```bash
cd backend
npm install
npm test
```

### Build backend container locally

```bash
docker build -t yourdockerhubusername/dso-as3-backend:latest ./backend
```

### Run backend container locally

```bash
docker run -p 5000:5000 yourdockerhubusername/dso-as3-backend:latest
```

## Render deployment

1. Create a new Render service.
2. Choose `Deploy from existing image`.
3. Specify the DockerHub image: `yourdockerhubusername/dso-as3-backend:latest`.
4. Configure the Render webhook and save it as a GitHub secret in the repository.

## Screenshots

Save the following process screenshots in `screenshots/`:
- `screenshots/workflow-success.png` — GitHub Actions workflow success
- `screenshots/dockerhub-image.png` — DockerHub image pushed successfully
- `screenshots/render-deploy.png` — Render deployment success

## Deployment link

- Render URL: `https://<your-render-service>.onrender.com`

## Challenges faced
- Ensuring the workflow builds the correct backend image path from `./backend`.
- Keeping DockerHub and Render credentials out of source control.
- Aligning the GitHub Actions deploy step with Render webhook requirements.

## Learning outcomes
- Learned how to containerize a Node.js app and configure Dockerfiles.
- Learned to automate DockerHub pushes with GitHub Actions.
- Learned how to trigger Render deployments from a CI workflow.
