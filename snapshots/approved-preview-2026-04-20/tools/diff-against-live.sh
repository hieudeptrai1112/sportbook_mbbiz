#!/usr/bin/env bash
set -euo pipefail

SNAPSHOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_ROOT="$(cd "${SNAPSHOT_DIR}/../.." && pwd)"

compare_file() {
  local snapshot_path="$1"
  local live_path="$2"

  echo
  echo "==> ${live_path#$REPO_ROOT/}"
  if [[ ! -e "$live_path" ]]; then
    echo "LIVE FILE MISSING"
    return
  fi

  diff -u "$snapshot_path" "$live_path" || true
}

compare_dir() {
  local snapshot_path="$1"
  local live_path="$2"

  echo
  echo "==> ${live_path#$REPO_ROOT/}"
  if [[ ! -d "$live_path" ]]; then
    echo "LIVE DIRECTORY MISSING"
    return
  fi

  diff -ru "$snapshot_path" "$live_path" || true
}

compare_file "${SNAPSHOT_DIR}/workspace/angular.json" "${REPO_ROOT}/angular.json"
compare_file "${SNAPSHOT_DIR}/workspace/package.json" "${REPO_ROOT}/package.json"
compare_file "${SNAPSHOT_DIR}/workspace/package-lock.json" "${REPO_ROOT}/package-lock.json"
compare_file "${SNAPSHOT_DIR}/workspace/tsconfig.json" "${REPO_ROOT}/tsconfig.json"
compare_file "${SNAPSHOT_DIR}/workspace/tsconfig.sportbook6vn-preview.json" "${REPO_ROOT}/tsconfig.sportbook6vn-preview.json"

compare_dir "${SNAPSHOT_DIR}/projects/sportbook6vn" "${REPO_ROOT}/projects/sportbook6vn"
compare_dir "${SNAPSHOT_DIR}/projects/sportbook6vn-preview" "${REPO_ROOT}/projects/sportbook6vn-preview"
