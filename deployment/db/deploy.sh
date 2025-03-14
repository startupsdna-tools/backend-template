#!/usr/bin/env bash

# enable strict mode
set -eu

source ./deployment/db/_vars.sh

# Image digest
echo "> Resolving the image digest for ${DOCKER_IMAGE_TAG}"
DIGEST=$(gcloud artifacts docker images describe ${DOCKER_IMAGE_TAG} --project=${GCP_PROJECT} --format="value(image_summary.digest)")
export DOCKER_IMAGE_DIGEST="${DOCKER_IMAGE}@${DIGEST}"
echo "> Image digest: ${DOCKER_IMAGE_DIGEST}"

# Prepare job spec
JOB_SPEC_SRC="deployment/db/job.yaml"
echo "> Preparing job spec from template ${JOB_SPEC_SRC}"
JOB_SPEC=$(./deployment/utils/build_yaml.sh "./${JOB_SPEC_SRC}" "dist/${JOB_SPEC_SRC}")

# Deploy the job
echo "> Deploying the job from ${JOB_SPEC}"
gcloud run jobs replace ${JOB_SPEC} --region=${GCP_REGION} --project=${GCP_PROJECT}

# Get job name
JOB_NAME=$(yq '.metadata.name' ${JOB_SPEC})
echo "> Job name: ${JOB_NAME}"

# Execute the job
gcloud run jobs execute ${JOB_NAME} --wait --region=${GCP_REGION} --project=${GCP_PROJECT}
