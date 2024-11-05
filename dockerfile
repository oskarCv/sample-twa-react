# Use node:18-alpine as the base image for faster builds
FROM node:18-alpine AS build

# Install pnpm globally for faster dependency installation
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy only package.json and pnpm-lock.yaml for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm (using frozen-lockfile for consistency)
RUN pnpm install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Build the Vite application
RUN pnpm run build

# Step 2: Use Nginx to serve the build output
FROM nginx:alpine

# Copy the Vite build output to the Nginx HTML folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the application
EXPOSE 80

# Health check to ensure Nginx is running
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD wget -q --spider http://localhost/ || exit 1
