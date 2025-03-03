#!/usr/bin/env bash

# Util scripts for building yaml files.
# Creates a new yaml file from a template and replaces all string values with environment variables.
# Returns the path to the new yaml file.
# Usage: SPEC=$(./deployment/utils/build_yaml.sh <SRC>)

# enable strict mode
set -eu

# take the first argument as the source file
SRC="${1}"

# Add "dist" to the path for the destination file
DEST="dist/${SRC}"

# create the destination directory
mkdir -p $(dirname ${DEST})

# replace all string values with environment variables
yq '(.. | select(tag == "!!str")) |= envsubst' "${SRC}" > "${DEST}"

# return the path to the new yaml file
echo "${DEST}"
