#!/usr/bin/env bash

# enable strict mode
set -eu

# Load environment variables
source ./deployment/admin-api/_vars.sh

# Build & push 'admin-api' docker image
docker build \
  --platform linux/amd64 \
  --tag ${ADMIN_API_DOCKER_IMAGE} \
  --file ./deployment/admin-api/Dockerfile .
docker push ${ADMIN_API_DOCKER_IMAGE}
