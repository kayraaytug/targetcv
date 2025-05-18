# frontend/Dockerfile
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Install dependencies and build
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .
RUN pnpm run build

# Use a lightweight web server to serve the frontend
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]
