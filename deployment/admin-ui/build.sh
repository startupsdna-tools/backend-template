#!/usr/bin/env bash

# enable strict mode
set -eu

# Load environment variables
source ./deployment/admin-ui/_vars.sh

echo "> Building docker image ${DOCKER_IMAGE_TAG}"
docker build \
  --platform linux/amd64 \
  --tag ${DOCKER_IMAGE_TAG} \
  --label "git.branch=${GIT_BRANCH}" \
  --label "git.commit=${GIT_COMMIT}" \
  --label "git.commit.message=${GIT_COMMIT_MESSAGE}" \
  --file ./deployment/admin-ui/Dockerfile .

echo "> Pushing docker image ${DOCKER_IMAGE_TAG}"
docker push ${DOCKER_IMAGE_TAG}
