# Base image
FROM node:20.9-alpine as base

# Stage 1: Install all dependencies & build
FROM base as builder
# RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY tsconfig.json ./
COPY src/ ./src/
RUN yarn build

# Stage 2: Install dependencies (production)
# - Chỉ cài đặt các package trong 'dependencies' của package.json và bỏ qua 'devDependencies' --> Giảm size
FROM base as deps
# RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile 

# Stage 3: Production
FROM base
WORKDIR /usr/src/app
COPY package.json ./
COPY --from=deps /usr/src/app/node_modules ./node_modules/
COPY --from=builder /usr/src/app/dist ./dist/

EXPOSE 8888

# Serve
CMD ["node", "dist/server.js"]
