# Git variables
export GIT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
export GIT_COMMIT="$(git rev-parse --short HEAD)"
export GIT_COMMIT_MESSAGE="$(git log -1 --pretty=%B HEAD)"

# Docker variables
export DOCKER_REGISTRY="${GCP_REGION}-docker.pkg.dev/${GCP_PROJECT}/${DOCKER_REPOSITORY}"
export DOCKER_TAG="latest"
