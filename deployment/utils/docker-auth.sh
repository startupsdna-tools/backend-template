#!/usr/bin/env bash

# enable strict mode
set -eu

## Configure docker to use gcloud as credential helper
gcloud auth configure-docker ${GCP_REGION}-docker.pkg.dev
