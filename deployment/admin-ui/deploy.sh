#!/usr/bin/env bash

# enable strict mode
set -eu

source ./deployment/admin-ui/_vars.sh

## Deploy admin-ui service
SERVICE_SPEC="deployment/admin-ui/service.yaml"
yq -i ".spec.template.spec.containers[0].image = \"${ADMIN_UI_DOCKER_IMAGE}\"" ${SERVICE_SPEC}
gcloud run services replace ${SERVICE_SPEC} --region=${GCP_REGION} --project=${GCP_PROJECT}
