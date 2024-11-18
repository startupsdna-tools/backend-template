# Load common variables
source ./deployment/_vars.sh

# API app variables
export API_DOCKER_IMAGE="${DOCKER_REGISTRY}/api:${BUILD_VERSION}"

