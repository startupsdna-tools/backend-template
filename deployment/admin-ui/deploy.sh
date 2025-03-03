#!/usr/bin/env bash

# enable strict mode
set -eu

source ./deployment/admin-ui/_vars.sh

# Image digest
echo "> Resolving the image digest for ${DOCKER_IMAGE_TAG}"
DIGEST=$(gcloud artifacts docker images describe ${DOCKER_IMAGE_TAG} --project=${GCP_PROJECT} --format="value(image_summary.digest)")
export DOCKER_IMAGE_DIGEST="${DOCKER_IMAGE}@${DIGEST}"
echo "> Image digest: ${DOCKER_IMAGE_DIGEST}"

# Prepare service spec
SERVICE_SPEC_SRC="./deployment/admin-ui/service.yaml"
echo "> Preparing service spec from template ${SERVICE_SPEC_SRC}"
SERVICE_SPEC=$(./deployment/utils/build_yaml.sh "${SERVICE_SPEC_SRC}")

# Deploy the service
echo "> Deploying the service from ${SERVICE_SPEC}"
gcloud run services replace ${SERVICE_SPEC} --region=${GCP_REGION} --project=${GCP_PROJECT}
