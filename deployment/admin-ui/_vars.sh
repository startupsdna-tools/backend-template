# Load common variables
source ./deployment/_vars.sh

# API app variables
export ADMIN_UI_DOCKER_IMAGE="${DOCKER_REGISTRY}/admin-ui:${BUILD_VERSION}"

