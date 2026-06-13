#!/usr/bin/env bash
#
# Deploy the latest code WITHOUT losing admin-published content.
#
# The admin writes 8 JSON files to /app/content inside the `aman-nextjs`
# container. This script copies them out to a timestamped backup folder, pulls
# the new code, rebuilds the image, then copies the content back in and
# restarts so the public pages re-render with your content.
#
# Run from the project root on the VPS:  ./deploy.sh
#
set -euo pipefail

CONTAINER="aman-nextjs"
CONTENT_PATH="/app/content"
STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="./content-backups/$STAMP"

echo "==> 1/5  Backing up current content from container '$CONTAINER'"
if docker ps -a --format '{{.Names}}' | grep -qx "$CONTAINER"; then
  mkdir -p "$BACKUP_DIR"
  if docker cp "$CONTAINER:$CONTENT_PATH/." "$BACKUP_DIR/" 2>/dev/null; then
    echo "    Saved to $BACKUP_DIR"
    ls -la "$BACKUP_DIR"
  else
    echo "    (container has no $CONTENT_PATH yet — nothing to back up)"
  fi
else
  echo "    (container '$CONTAINER' not found — first deploy?)"
fi

echo "==> 2/5  Pulling latest code"
git pull --ff-only

echo "==> 3/5  Building & starting containers"
docker compose up -d --build

echo "==> 4/5  Waiting for container to be up"
for i in $(seq 1 30); do
  if docker ps --format '{{.Names}}' | grep -qx "$CONTAINER"; then break; fi
  sleep 1
done

echo "==> 5/5  Restoring content into the new container"
if [ -d "$BACKUP_DIR" ] && [ -n "$(ls -A "$BACKUP_DIR" 2>/dev/null)" ]; then
  docker cp "$BACKUP_DIR/." "$CONTAINER:$CONTENT_PATH/"
  docker restart "$CONTAINER" >/dev/null
  echo "    Restored from $BACKUP_DIR and restarted."
else
  echo "    No backup to restore — keeping content as-is."
fi

echo "==> Done. Current content in the container:"
docker exec "$CONTAINER" ls -la "$CONTENT_PATH" || true
