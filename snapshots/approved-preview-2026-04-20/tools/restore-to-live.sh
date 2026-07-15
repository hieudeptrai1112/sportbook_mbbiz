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
  tsconfig.mbbiz-preview.json
  projects/mbbiz
  projects/mbbiz-preview

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
backup_if_exists "${REPO_ROOT}/tsconfig.mbbiz-preview.json" "${BACKUP_ROOT}/workspace/"
backup_if_exists "${REPO_ROOT}/projects/mbbiz" "${BACKUP_ROOT}/projects/"
backup_if_exists "${REPO_ROOT}/projects/mbbiz-preview" "${BACKUP_ROOT}/projects/"

restore_file "${SNAPSHOT_DIR}/workspace/angular.json" "${REPO_ROOT}/angular.json"
restore_file "${SNAPSHOT_DIR}/workspace/package.json" "${REPO_ROOT}/package.json"
restore_file "${SNAPSHOT_DIR}/workspace/package-lock.json" "${REPO_ROOT}/package-lock.json"
restore_file "${SNAPSHOT_DIR}/workspace/tsconfig.json" "${REPO_ROOT}/tsconfig.json"
restore_file "${SNAPSHOT_DIR}/workspace/tsconfig.mbbiz-preview.json" "${REPO_ROOT}/tsconfig.mbbiz-preview.json"

restore_dir "${SNAPSHOT_DIR}/projects/mbbiz" "${REPO_ROOT}/projects/mbbiz"
restore_dir "${SNAPSHOT_DIR}/projects/mbbiz-preview" "${REPO_ROOT}/projects/mbbiz-preview"

echo "Restore complete."
echo "Backup created at: ${BACKUP_ROOT}"
