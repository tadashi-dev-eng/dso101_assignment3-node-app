# Assignment III Report

## Task 1: Repository Setup

**Process:**

- Verified the repository contains `backend/`, `frontend/`, and `.github/workflows/`.
- Confirmed `backend/package.json` and `frontend/package.json` include relevant scripts.
- Confirmed the repository is ready for public submission and CI/CD automation.

**Screenshot Upload:**

- `screenshots/task1-repo-setup.png`

## Task 2: Dockerfile Verification

### Backend Dockerfile

**Process:**

- Reviewed `backend/Dockerfile` for correct base image and build steps.
- Ensured the file installs dependencies, generates Prisma client, and exposes port `5000`.
- Verified the startup command runs the server using `node server.js`.

**Screenshot Upload:**

- `screenshots/task2-backend-dockerfile.png`

### Frontend Dockerfile

**Process:**

- Reviewed `frontend/Dockerfile` to confirm containerization of the React app.
- Verified it uses `node:20-alpine`, installs dependencies, runs tests, and starts on port `3000`.
- Confirmed the app can run in a container using `npm start`.

**Screenshot Upload:**

- `screenshots/task2-frontend-dockerfile.png`

## Task 3: GitHub Actions Workflow

**Process:**

- Created `.github/workflows/deploy.yml` to automate build, push, and deployment.
- Configured workflow to run on `push` to `main`.
- Added steps to checkout repo, install Node.js, install backend dependencies, generate Prisma client, and run tests.
- Added Docker Buildx setup, DockerHub login, image build and push, and Render webhook trigger.

### Required Secrets

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`
- `RENDER_WEBHOOK_URL`

**Screenshot Upload:**

- `screenshots/task3-workflow.png`

## Task 4: Render Deployment

**Process:**

- Created a Render service using the DockerHub image from the CI pipeline.
- Chose deployment from an existing image and configured container settings.
- Ensured the GitHub Actions webhook triggers Render to deploy the newly pushed image.
- Verified the deployed service responds correctly.

**Screenshot Upload:**

- `screenshots/task4-render-deploy.png`

## Local Testing

### Backend

**Process:**

- Installed backend dependencies, ran tests, and started the app locally.
- Verified the backend responds on the expected port.

```bash
cd backend
npm install
npm test
npm start
```

**Screenshot Upload:**

- `screenshots/task5-backend-test.png`

### Frontend

**Process:**

- Installed frontend dependencies and started the React app locally.
- Verified the frontend runs successfully and connects to the backend API.

```bash
cd frontend
npm install
npm start
```

**Screenshot Upload:**

- `screenshots/task5-frontend-test.png`

### Docker commands

**Process:**

- Built the backend container locally.
- Ran the container and confirmed the service was accessible at port `5000`.

```bash
docker build -t yourdockerhubusername/dso-as3-backend:latest ./backend
docker run -p 5000:5000 yourdockerhubusername/dso-as3-backend:latest
```

**Screenshot Upload:**

- `screenshots/task5-docker-run.png`

## Deployment Details

### DockerHub

**Process:**

- Pushed the backend image to DockerHub.
- Used the public repository for easier Render deployment.

- Backend image tag used: `yourdockerhubusername/dso-as3-backend:latest`

**Screenshot Upload:**

- `screenshots/task6-dockerhub-push.png`

### Render.com

**Process:**

- Configured Render service to deploy from the DockerHub image.
- Saved the Render webhook URL as a GitHub secret.
- Confirmed the Render deployment completed successfully.

**Screenshot Upload:**

- `screenshots/task6-render-deploy.png`

## Deployment Links

- GitHub repository: `https://github.com/<your-username>/<your-repo>`
- Render deployment URL: `https://<your-render-service>.onrender.com`

## Summary of Steps Taken

1. Verified repository structure and package scripts.
2. Reviewed and validated backend and frontend Dockerfiles.
3. Built and tested containers locally.
4. Created GitHub Actions workflow for build, push, and deploy.
5. Added DockerHub and Render secrets.
6. Triggered Render deployment via webhook.
7. Confirmed the backend and frontend services were running successfully.

## Challenges Faced

- Ensuring the workflow used the correct path for backend Docker build.
- Making sure Prisma client generation ran before tests.
- Configuring Render webhook to redeploy after Docker image push.
- Keeping credentials secure and out of source control.

## Learning Outcomes

- Learned how to containerize Node.js and React applications.
- Learned how to automate DockerHub image build and push with GitHub Actions.
- Learned how to trigger Render deployment from CI using a webhook.
- Learned how to configure GitHub secrets for secure deployment.
- Learned the importance of verifying container build and deployment steps locally.
