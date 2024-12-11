FROM node:20-alpine as base

WORKDIR /app

# Install global dependencies
#RUN npm install -g pnpm

# Install production dependencies
#COPY dist/apps/admin-ui/package.json dist/apps/admin-ui/pnpm-lock.yaml ./
#RUN pnpm install --prod --frozen-lockfile

# Copy production files
COPY apps/admin-ui/main.mjs ./
COPY dist/apps/admin-ui ./

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ENV NO_COLOR=1

# Run service when container starts
CMD ["node", "main.mjs"]

