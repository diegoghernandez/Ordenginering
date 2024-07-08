FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN PUBLIC_URL=https://ordeninginering.com pnpm run build

FROM base
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# EXPOSE 80
COPY index.mjs ./
CMD PORT=80 pnpm start
