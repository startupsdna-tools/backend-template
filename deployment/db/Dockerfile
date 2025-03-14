FROM node:20-alpine

WORKDIR /app

# Install global dependencies
RUN npm install -g pnpm

# Install production dependencies
COPY ./db/package.json ./
RUN pnpm install

# Copy drizzle-kit files
COPY ./db/drizzle.config.ts ./db/config.ts ./
COPY ./db/migrations ./migrations

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
ENV NO_COLOR=1
