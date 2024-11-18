#!/usr/bin/env bash

# enable strict mode
set -eu

source ./deployment/api/_vars.sh

## Deploy api service
API_SERVICE_SPEC="deployment/api/api.service.yaml"
yq -i ".spec.template.spec.containers[0].image = \"${API_DOCKER_IMAGE}\"" ${API_SERVICE_SPEC}
gcloud run services replace ${API_SERVICE_SPEC} --region=${GCP_REGION} --project=${GCP_PROJECT}
