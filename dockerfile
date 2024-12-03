FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Vite application (output goes to /app/dist by default)
RUN npm run build

# Step 2: Use Nginx to serve the build output
FROM nginx:alpine

# Copy the Vite build output to the Nginx HTML folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration file (with SSL enabled)
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy SSL certificates to the container (make sure they are added to your project)
COPY ./ssl/vip.tokencompass.info.crt /etc/ssl/certs/vip.tokencompass.info.crt
COPY ./ssl/vip.tokencompass.info.key /etc/ssl/private/vip.tokencompass.info.key
COPY ./ssl/ca_vip.tokencompass.info.crt /etc/ssl/certs/ca_vip.tokencompass.info.crt

# Expose HTTP (80) and HTTPS (443) ports
EXPOSE 80
EXPOSE 443

# Health check to ensure Nginx is running
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD curl -f http://localhost/ || exit 1
