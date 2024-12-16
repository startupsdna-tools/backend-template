#!/usr/bin/env bash

# enable strict mode
set -eu

source ./deployment/admin-api/_vars.sh

## define the service spec file location
SERVICE_SPEC="deployment/admin-api/service.yaml"

## replace environment variables in the service spec
yq -i '(.. | select(tag == "!!str")) |= envsubst' ${SERVICE_SPEC}

## deploy service to GCP
gcloud run services replace ${SERVICE_SPEC} --region=${GCP_REGION} --project=${GCP_PROJECT}
