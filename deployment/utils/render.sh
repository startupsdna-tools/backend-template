## Helper script to render a template file with environment variables
## Usage: ./deployment/utils/render.sh <template-file> <dest-path>

set -eu

SOURCE=${1}
DEST_PATH=${2:-./dist}
DEST="${DEST_PATH}/${SOURCE}"

mkdir -p $(dirname ${DEST})
./node_modules/.bin/envsub ${SOURCE} ${DEST}
echo ${DEST}
