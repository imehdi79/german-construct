#!/usr/bin/env bash
#
# Deploy the latest code WITHOUT losing admin-published content or uploads.
#
# The admin writes JSON files to /app/content and uploaded images to
# /app/public/uploads inside the `aman-nextjs` container. This script:
#   1. copies both out to a timestamped backup folder,
#   2. pulls the new code,
#   3. syncs that live content + uploads into the repo (the build context) so
#      the statically-generated public pages are baked from PRODUCTION data
#      (not the in-repo seed defaults) and reference existing images — avoids a
#      mismatch where cached pages show seed data / broken images until a
#      revalidation,
#   4. rebuilds the image,
#   5. copies content + uploads back into the volumes and restarts.
#
# Run from the project root on the VPS:  ./deploy.sh
#
set -euo pipefail

CONTAINER="aman-nextjs"
CONTENT_PATH="/app/content"
UPLOADS_PATH="/app/public/uploads"
# Repo dirs = the Next.js build context (Dockerfile `COPY . .`).
REPO_CONTENT="./content"
REPO_UPLOADS="./public/uploads"
STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="./content-backups/$STAMP"
CONTENT_BACKUP="$BACKUP_DIR/content"
UPLOADS_BACKUP="$BACKUP_DIR/uploads"

echo "==> 1/6  Backing up current content + uploads from container '$CONTAINER'"
if docker ps -a --format '{{.Names}}' | grep -qx "$CONTAINER"; then
  mkdir -p "$CONTENT_BACKUP" "$UPLOADS_BACKUP"
  if docker cp "$CONTAINER:$CONTENT_PATH/." "$CONTENT_BACKUP/" 2>/dev/null; then
    echo "    Content saved to $CONTENT_BACKUP"
  else
    echo "    (container has no $CONTENT_PATH yet — nothing to back up)"
  fi
  if docker cp "$CONTAINER:$UPLOADS_PATH/." "$UPLOADS_BACKUP/" 2>/dev/null; then
    echo "    Uploads saved to $UPLOADS_BACKUP"
  else
    echo "    (container has no $UPLOADS_PATH yet — nothing to back up)"
  fi
else
  echo "    (container '$CONTAINER' not found — first deploy?)"
fi

echo "==> 2/6  Pulling latest code"
git pull --ff-only

echo "==> 3/6  Syncing live content + uploads into the build context"
if [ -d "$CONTENT_BACKUP" ] && [ -n "$(ls -A "$CONTENT_BACKUP" 2>/dev/null)" ]; then
  mkdir -p "$REPO_CONTENT"
  cp -a "$CONTENT_BACKUP/." "$REPO_CONTENT/"
  echo "    Synced live content into $REPO_CONTENT"
else
  echo "    (no live content yet — build will use the in-repo seed defaults)"
fi
if [ -d "$UPLOADS_BACKUP" ] && [ -n "$(ls -A "$UPLOADS_BACKUP" 2>/dev/null)" ]; then
  mkdir -p "$REPO_UPLOADS"
  cp -a "$UPLOADS_BACKUP/." "$REPO_UPLOADS/"
  echo "    Synced live uploads into $REPO_UPLOADS"
else
  echo "    (no uploads yet)"
fi

echo "==> 4/6  Building & starting containers"
docker compose up -d --build

echo "==> 5/6  Waiting for container to be up"
for i in $(seq 1 30); do
  if docker ps --format '{{.Names}}' | grep -qx "$CONTAINER"; then break; fi
  sleep 1
done

echo "==> 6/6  Restoring content + uploads into the running container"
restored=0
if [ -d "$CONTENT_BACKUP" ] && [ -n "$(ls -A "$CONTENT_BACKUP" 2>/dev/null)" ]; then
  docker cp "$CONTENT_BACKUP/." "$CONTAINER:$CONTENT_PATH/"
  echo "    Restored content from $CONTENT_BACKUP"
  restored=1
fi
if [ -d "$UPLOADS_BACKUP" ] && [ -n "$(ls -A "$UPLOADS_BACKUP" 2>/dev/null)" ]; then
  docker exec "$CONTAINER" mkdir -p "$UPLOADS_PATH"
  docker cp "$UPLOADS_BACKUP/." "$CONTAINER:$UPLOADS_PATH/"
  echo "    Restored uploads from $UPLOADS_BACKUP"
  restored=1
fi
if [ "$restored" -eq 1 ]; then
  docker restart "$CONTAINER" >/dev/null
  echo "    Restarted container."
else
  echo "    No backup to restore — keeping data as-is."
fi

echo "==> Done. Current content in the container:"
docker exec "$CONTAINER" ls -la "$CONTENT_PATH" || true
echo "==> Current uploads in the container:"
docker exec "$CONTAINER" ls -la "$UPLOADS_PATH" || true
