# Load common variables
source ./deployment/_vars.sh

# API app variables
export ADMIN_API_DOCKER_IMAGE="${DOCKER_REGISTRY}/admin-api:${BUILD_VERSION}"

