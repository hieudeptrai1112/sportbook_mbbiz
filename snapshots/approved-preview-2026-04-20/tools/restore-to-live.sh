#!/usr/bin/env bash
set -euo pipefail

SNAPSHOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_ROOT="$(cd "${SNAPSHOT_DIR}/../.." && pwd)"
BACKUP_ROOT="${SNAPSHOT_DIR}/backups/$(date +%Y%m%d-%H%M%S)"

if [[ "${1:-}" != "--apply" ]]; then
  cat <<EOF
Dry run only.

This script will restore these paths from the approved snapshot into the live workspace:
  angular.json
  package.json
  package-lock.json
  tsconfig.json
  tsconfig.sportbook6vn-preview.json
  projects/sportbook6vn
  projects/sportbook6vn-preview

Before restore, it will create a backup under:
  ${BACKUP_ROOT}

Run again with:
  ./tools/restore-to-live.sh --apply
EOF
  exit 0
fi

mkdir -p "${BACKUP_ROOT}/workspace" "${BACKUP_ROOT}/projects"

backup_if_exists() {
  local path="$1"
  local dest="$2"
  if [[ -e "$path" ]]; then
    cp -R "$path" "$dest"
  fi
}

restore_file() {
  local snapshot_path="$1"
  local live_path="$2"
  mkdir -p "$(dirname "$live_path")"
  cp "$snapshot_path" "$live_path"
}

restore_dir() {
  local snapshot_path="$1"
  local live_path="$2"
  rm -rf "$live_path"
  mkdir -p "$(dirname "$live_path")"
  cp -R "$snapshot_path" "$live_path"
}

backup_if_exists "${REPO_ROOT}/angular.json" "${BACKUP_ROOT}/workspace/"
backup_if_exists "${REPO_ROOT}/package.json" "${BACKUP_ROOT}/workspace/"
backup_if_exists "${REPO_ROOT}/package-lock.json" "${BACKUP_ROOT}/workspace/"
backup_if_exists "${REPO_ROOT}/tsconfig.json" "${BACKUP_ROOT}/workspace/"
backup_if_exists "${REPO_ROOT}/tsconfig.sportbook6vn-preview.json" "${BACKUP_ROOT}/workspace/"
backup_if_exists "${REPO_ROOT}/projects/sportbook6vn" "${BACKUP_ROOT}/projects/"
backup_if_exists "${REPO_ROOT}/projects/sportbook6vn-preview" "${BACKUP_ROOT}/projects/"

restore_file "${SNAPSHOT_DIR}/workspace/angular.json" "${REPO_ROOT}/angular.json"
restore_file "${SNAPSHOT_DIR}/workspace/package.json" "${REPO_ROOT}/package.json"
restore_file "${SNAPSHOT_DIR}/workspace/package-lock.json" "${REPO_ROOT}/package-lock.json"
restore_file "${SNAPSHOT_DIR}/workspace/tsconfig.json" "${REPO_ROOT}/tsconfig.json"
restore_file "${SNAPSHOT_DIR}/workspace/tsconfig.sportbook6vn-preview.json" "${REPO_ROOT}/tsconfig.sportbook6vn-preview.json"

restore_dir "${SNAPSHOT_DIR}/projects/sportbook6vn" "${REPO_ROOT}/projects/sportbook6vn"
restore_dir "${SNAPSHOT_DIR}/projects/sportbook6vn-preview" "${REPO_ROOT}/projects/sportbook6vn-preview"

echo "Restore complete."
echo "Backup created at: ${BACKUP_ROOT}"
