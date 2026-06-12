# syntax=docker/dockerfile:1

# ---- Builder ----
FROM oven/bun:1-alpine AS builder
WORKDIR /app

# Install dependencies against the committed lockfile for reproducible builds.
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Build the Next.js app (produces .next/standalone via output: 'standalone').
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

# ---- Runner ----
# Standalone output is plain Node-compatible JS with its own minimal node_modules,
# so the runtime image needs only Node — no bun, no dev deps, no source.
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Self-contained server + static assets.
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# Seed editable content; persisted at runtime via the aman-content volume.
COPY --from=builder /app/content ./content

EXPOSE 3000

CMD ["node", "server.js"]
