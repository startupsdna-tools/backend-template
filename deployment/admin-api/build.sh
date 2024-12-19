#!/usr/bin/env bash

# enable strict mode
set -eu

# Load environment variables
source ./deployment/admin-api/_vars.sh

# Build & push 'admin-api' docker image
docker buildx build \
  ${DOCKER_BUILD_CACHE} \
  --platform linux/amd64 \
  --tag ${ADMIN_API_DOCKER_IMAGE} \
  --push
  --file ./deployment/admin-api/Dockerfile .
