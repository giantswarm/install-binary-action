#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail


proj_dir=$(git rev-parse --show-toplevel)

set -x

# shellcheck disable=SC2139
alias yarn="docker run -it --rm --name my-yarn-project -v '${proj_dir}:/usr/src/app:Z' -w /usr/src/app node:20 yarn"

shopt -s expand_aliases

yarn install
yarn lint
yarn dist

{ set +x; } 2>/dev/null
