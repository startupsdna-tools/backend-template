#!/usr/bin/env bash

# enable strict mode
set -eu

source ./deployment/admin-api/_vars.sh

## Deploy api service
SERVICE_SPEC="deployment/admin-api/service.yaml"
yq -i ".spec.template.spec.containers[0].image = \"${ADMIN_API_DOCKER_IMAGE}\"" ${SERVICE_SPEC}
gcloud run services replace ${SERVICE_SPEC} --region=${GCP_REGION} --project=${GCP_PROJECT}
