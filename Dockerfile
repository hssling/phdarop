# ─── PHDAROP — Next.js standalone Docker image (used by HuggingFace Spaces) ───
# Multi-stage build producing a small self-contained Node server.

FROM node:20-slim AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV PHDA_DETERMINISTIC=1
RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PHDA_DETERMINISTIC=1 \
    PORT=7860 \
    HOSTNAME=0.0.0.0
# Non-root user (HuggingFace Spaces run as uid 1000)
RUN useradd -m -u 1000 user
COPY --from=builder --chown=user:user /app/public ./public
COPY --from=builder --chown=user:user /app/.next/standalone ./
COPY --from=builder --chown=user:user /app/.next/static ./.next/static
USER user
EXPOSE 7860
CMD ["node", "server.js"]
