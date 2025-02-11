#!/bin/bash

# Set variables
PROJECT_ID="pure-lantern-450601-s8"
IMAGE_NAME="uplifted-backend"
SERVICE_NAME="uplifted-backend-service"
REGION="us-central1"

# Authenticate with GCP (if not already authenticated)
# gcloud auth login

# Set the GCP project
gcloud config set project $PROJECT_ID

# Build and push Docker image to GCR
gcloud builds submit --tag gcr.io/$PROJECT_ID/$IMAGE_NAME

# Deploy to Google Cloud Run
gcloud run deploy $SERVICE_NAME --image gcr.io/$PROJECT_ID/$IMAGE_NAME --platform managed --region $REGION --allow-unauthenticated

# Output the service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --platform managed --region $REGION --format "value(status.url)")
echo "Service deployed at: $SERVICE_URL"