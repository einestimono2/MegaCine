# Base image
FROM node:20.9-alpine as base

# Stage 1: Install dependencies & build
FROM base as builder
# RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Stage 2: Nginx
FROM nginx:stable-alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

EXPOSE 3000