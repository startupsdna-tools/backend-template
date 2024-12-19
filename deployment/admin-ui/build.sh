#!/usr/bin/env bash

# enable strict mode
set -eu

# Load environment variables
source ./deployment/admin-ui/_vars.sh

# Build & push 'admin-ui' docker image
docker buildx build \
  ${DOCKER_BUILD_CACHE} \
  --platform linux/amd64 \
  --tag ${ADMIN_UI_DOCKER_IMAGE} \
  --push
  --file ./deployment/admin-ui/Dockerfile .
