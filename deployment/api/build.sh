#!/usr/bin/env bash

# enable strict mode
set -eu

# Load environment variables
source ./deployment/api/_vars.sh

# Build dist
npx nx run api:build
