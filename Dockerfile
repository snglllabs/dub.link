FROM node:23-bookworm-slim AS base
ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH \
    NEXT_TELEMETRY_DISABLED=1 \
    NODE_OPTIONS=--max-old-space-size=6144
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate \
 && apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates git \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /app

FROM base AS build
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm -r --filter "./packages/**" build
WORKDIR /app/apps/web
ARG NEXT_PUBLIC_APP_DOMAIN
ARG NEXT_PUBLIC_APP_SHORT_DOMAIN
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV DATABASE_URL="mysql://build:build@127.0.0.1:3306/dub" \
    NEXTAUTH_URL="http://localhost:3000" \
    NEXTAUTH_SECRET="build_placeholder_secret_build_placeholder" \
    CRON_SECRET="build_placeholder_cron" \
    ENCRYPTION_KEY="build_placeholder_encryption_key_32b" \
    UPSTASH_REDIS_REST_URL="https://example.com" \
    UPSTASH_REDIS_REST_TOKEN="build_placeholder" \
    UPSTASH_VECTOR_REST_URL="https://example.com" \
    UPSTASH_VECTOR_REST_TOKEN="build_placeholder" \
    QSTASH_URL="https://example.com" \
    QSTASH_TOKEN="build_placeholder" \
    QSTASH_CURRENT_SIGNING_KEY="build_placeholder" \
    QSTASH_NEXT_SIGNING_KEY="build_placeholder" \
    TINYBIRD_API_URL="https://example.com" \
    TINYBIRD_API_KEY="build_placeholder" \
    STORAGE_ACCESS_KEY_ID="build_placeholder" \
    STORAGE_SECRET_ACCESS_KEY="build_placeholder" \
    STORAGE_ENDPOINT="https://example.com" \
    STORAGE_BASE_URL="https://example.com" \
    GITHUB_CLIENT_ID="build_placeholder" \
    GITHUB_CLIENT_SECRET="build_placeholder" \
    NEXT_PUBLIC_APP_DOMAIN=$NEXT_PUBLIC_APP_DOMAIN \
    NEXT_PUBLIC_APP_SHORT_DOMAIN=$NEXT_PUBLIC_APP_SHORT_DOMAIN \
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
RUN pnpm prisma:generate
RUN pnpm exec next build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0
COPY --from=build /app /app
WORKDIR /app/apps/web
EXPOSE 3000
CMD ["pnpm", "start"]
