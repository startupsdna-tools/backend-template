#!/usr/bin/env bash

# enable strict mode
set -eu

# Load environment variables
source ./deployment/api/_vars.sh

# Build & push 'api' docker image
docker build \
  --platform linux/amd64 \
  --tag ${API_DOCKER_IMAGE} \
  --file ./deployment/api/Dockerfile .
docker push ${API_DOCKER_IMAGE}
