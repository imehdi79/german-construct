#!/usr/bin/env bash
#
# Deploy the latest code. All site content is hardcoded into the build
# (data/content/*.json), so a deploy is just: pull, rebuild, restart.
#
# Run from the project root on the VPS:  ./deploy.sh
#
set -euo pipefail

CONTAINER="aman-nextjs"

echo "==> 1/3  Pulling latest code"
git pull --ff-only

echo "==> 2/3  Building & starting containers"
docker compose up -d --build

echo "==> 3/3  Waiting for container to be up"
for i in $(seq 1 30); do
  if docker ps --format '{{.Names}}' | grep -qx "$CONTAINER"; then break; fi
  sleep 1
done

echo "==> Done."
docker ps --filter "name=$CONTAINER" --format 'table {{.Names}}\t{{.Status}}'
