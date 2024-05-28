FROM node:20-alpine AS base
RUN apk update
RUN apk add --no-cache libc6-compat
RUN npm install --global pnpm@8.14.0 turbo@1.12.3
RUN pnpm config set store-dir ~/.pnpm-store

FROM base AS pruner

WORKDIR /app
COPY . .
RUN turbo prune --scope=frontend --docker

FROM base AS builder
ARG VITE_BACKEND_URI
ARG ENVIRONMENT

WORKDIR /app

COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/json/ .

RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

ENV VITE_BACKEND_URI=$VITE_BACKEND_URI
ENV ENVIRONMENT=$ENVIRONMENT

RUN turbo build --filter=frontend
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm prune --prod --no-optional
RUN rm -rf ./**/*/src

RUN npm install -g serve

EXPOSE 8100
CMD serve -l 8100 -s /app/apps/frontend/build
