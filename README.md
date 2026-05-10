# Assignment 3 report

## Repository

- GitHub repository contains:
  - `backend/Dockerfile`
  - `frontend/Dockerfile`
  - `.github/workflows/deploy.yml`

## Steps taken

1. Verified backend and frontend Dockerfiles.
2. Created GitHub Actions workflow to build and push Docker image to DockerHub.
3. Added `.env` to `.gitignore` to keep credentials out of source control.
4. Configured Render deployment to deploy from existing Docker image.

## Challenges faced

- Render free plan may not support deploy webhooks directly.
- Ensuring secrets are not hardcoded in repo files.
- Aligning workflow with Render image deployment requirements.

## Learning outcomes

- Learned how to containerize a Node.js backend and React frontend.
- Learned how to use GitHub Actions for Docker build and push.
- Learned how to securely use GitHub Secrets for DockerHub and Render credentials.

## Screenshots

- Successful GitHub Actions workflow: `screenshots/workflow-success.png`
- DockerHub pushed image: `screenshots/dockerhub-image.png`
- Render deployment: `screenshots/render-deploy.png`

## Render deployment instance

- Render URL: `https://<your-render-service>.onrender.com`

## Notes

- Do not hardcode credentials in code or repo files.
- Use GitHub repository secrets: `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`, `RENDER_WEBHOOK`.
