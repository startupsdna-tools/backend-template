# Load common variables
source ./deployment/_vars.sh

# Docker variables
export DOCKER_IMAGE="${DOCKER_REGISTRY}/api"
export DOCKER_IMAGE_TAG="${DOCKER_IMAGE}:${DOCKER_TAG}"
