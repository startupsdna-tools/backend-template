#!/usr/bin/env bash

# enable strict mode
set -eu

# Load environment variables
source ./deployment/admin-ui/_vars.sh

# Build dist
npx nx run admin-ui:build

# Build & push 'admin-ui' docker image
docker build \
  --platform linux/amd64 \
  --tag ${ADMIN_UI_DOCKER_IMAGE} \
  --file ./deployment/admin-ui/Dockerfile .
docker push ${ADMIN_UI_DOCKER_IMAGE}
