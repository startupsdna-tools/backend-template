#!/usr/bin/env bash

# enable strict mode
set -eu

# Load environment variables
source ./deployment/api/_vars.sh

# Build & push 'api' docker image
docker buildx build \
  ${DOCKER_BUILD_CACHE} \
  --platform linux/amd64 \
  --tag ${API_DOCKER_IMAGE} \
  --push \
  --file ./deployment/api/Dockerfile .
