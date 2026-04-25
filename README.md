# Deployment Notes

This web application has been prepared for production deployment on Google Cloud Run (or any container-based hosting platform).

## Prerequisites
- Docker installed locally (for testing)
- Google Cloud SDK (`gcloud`) installed and authenticated

## Local Docker Testing

Build the container image:
```bash
docker build -t election-guide-app .
```

Run the container locally:
```bash
docker run -p 8080:8080 --env-file .env.example election-guide-app
```
*The app will be available at http://localhost:8080.*

## Google Cloud Run Deployment

Deploy directly from the source code:
```bash
gcloud run deploy election-guide-app \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

## Production Details
- **Static Hosting:** The app uses a multi-stage Docker build to compile the Vite project and serves the static `dist/` folder using `serve`.
- **Routing:** The `serve -s` flag is explicitly configured to support Single Page Application (SPA) routing by redirecting all unknown paths back to `index.html`.
- **Port:** The container runs on port 8080 by default, controlled via the `PORT` environment variable which Cloud Run provides dynamically.
