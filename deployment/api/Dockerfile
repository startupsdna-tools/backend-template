FROM node:20-alpine as base

WORKDIR /app

# Install global dependencies
RUN npm install -g pnpm

# Install production dependencies
COPY dist/apps/api/package.json dist/apps/api/pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Copy production files
COPY dist/apps/api ./

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ENV NO_COLOR=1

# Run service when container starts
CMD ["node", "main.js"]

