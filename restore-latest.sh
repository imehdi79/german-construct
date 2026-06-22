#!/usr/bin/env bash
#
# Restore the LATEST backup from ./content-backups into the running container,
# without pulling code or rebuilding.
#
# Use this when a deploy wiped/changed content or uploads and you want to roll
# back to the most recent snapshot taken by deploy.sh.
#
# Run from the project root on the VPS:  ./restore-latest.sh
#
set -euo pipefail

CONTAINER="aman-nextjs"
CONTENT_PATH="/app/content"
UPLOADS_PATH="/app/public/uploads"
BACKUPS_ROOT="./content-backups"

echo "==> 1/4  Finding the latest backup in '$BACKUPS_ROOT'"
if [ ! -d "$BACKUPS_ROOT" ] || [ -z "$(ls -A "$BACKUPS_ROOT" 2>/dev/null)" ]; then
  echo "    No backups found in $BACKUPS_ROOT — nothing to restore." >&2
  exit 1
fi

# Folders are named YYYYMMDD-HHMMSS, so the last one sorted is the newest.
LATEST="$(ls -1d "$BACKUPS_ROOT"/*/ 2>/dev/null | sort | tail -n 1)"
LATEST="${LATEST%/}"
CONTENT_BACKUP="$LATEST/content"
UPLOADS_BACKUP="$LATEST/uploads"
echo "    Using backup: $LATEST"

echo "==> 2/4  Checking container '$CONTAINER' is running"
if ! docker ps --format '{{.Names}}' | grep -qx "$CONTAINER"; then
  echo "    Container '$CONTAINER' is not running — start it first." >&2
  exit 1
fi

echo "==> 3/4  Restoring content + uploads into the container"
restored=0
if [ -d "$CONTENT_BACKUP" ] && [ -n "$(ls -A "$CONTENT_BACKUP" 2>/dev/null)" ]; then
  docker exec "$CONTAINER" mkdir -p "$CONTENT_PATH"
  docker cp "$CONTENT_BACKUP/." "$CONTAINER:$CONTENT_PATH/"
  echo "    Restored content from $CONTENT_BACKUP"
  restored=1
else
  echo "    (no content in this backup)"
fi
if [ -d "$UPLOADS_BACKUP" ] && [ -n "$(ls -A "$UPLOADS_BACKUP" 2>/dev/null)" ]; then
  docker exec "$CONTAINER" mkdir -p "$UPLOADS_PATH"
  docker cp "$UPLOADS_BACKUP/." "$CONTAINER:$UPLOADS_PATH/"
  echo "    Restored uploads from $UPLOADS_BACKUP"
  restored=1
else
  echo "    (no uploads in this backup)"
fi

echo "==> 4/4  Finalizing"
if [ "$restored" -eq 1 ]; then
  docker restart "$CONTAINER" >/dev/null
  echo "    Restarted container."
else
  echo "    Nothing was restored." >&2
  exit 1
fi

echo "==> Done. Current content in the container:"
docker exec "$CONTAINER" ls -la "$CONTENT_PATH" || true
echo "==> Current uploads in the container:"
docker exec "$CONTAINER" ls -la "$UPLOADS_PATH" || true