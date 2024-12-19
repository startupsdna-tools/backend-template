#!/usr/bin/env bash

# enable strict mode
set -eu

# Load environment variables
source ./deployment/api/_vars.sh

# Build & push 'api' docker image
docker build \
  --platform linux/amd64 \
  --cache-to type=local,dest=.docker/cache \
  --cache-from type=local,dest=.docker/cache \
  --tag ${API_DOCKER_IMAGE} \
  --push \
  --file ./deployment/api/Dockerfile .
