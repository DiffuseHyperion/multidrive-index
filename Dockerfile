FROM node:18-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY prisma/schema.prisma prisma/schema.prisma
COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml

RUN corepack enable pnpm && pnpm i --frozen-lockfile

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules node_modules

COPY . .

RUN --mount=type=secret,id=REDIRECT_URL,required=true \
    echo "REDIRECT_URL=$(cat /run/secrets/REDIRECT_URL)" >> .env.production

RUN --mount=type=secret,id=CLIENT_SECRET,required=true \
    echo "CLIENT_SECRET=$(cat /run/secrets/CLIENT_SECRET)" >> .env.production
RUN --mount=type=secret,id=CLIENT_ID,required=true \
    echo "CLIENT_ID=$(cat /run/secrets/CLIENT_ID)" >> .env.production
RUN --mount=type=secret,id=TENANT_ID,required=true \
    echo "TENANT_ID=$(cat /run/secrets/TENANT_ID)" >> .env.production

RUN --mount=type=secret,id=SESSION_SECRET,required=true \
    echo "SESSION_SECRET=$(cat /run/secrets/SESSION_SECRET)" >> .env.production
RUN --mount=type=secret,id=DATABASE_URL,required=true \
    echo "DATABASE_URL=$(cat /run/secrets/DATABASE_URL)" >> .env.production


RUN corepack enable pnpm && pnpm run build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone .next/standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/static .next/static

USER nextjs

EXPOSE 3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]