# This Dockerfile builds a Vue.js application and serves it using Nginx.
# It is needed for Railway.com

# Build step
FROM node:lts-alpine as builder
WORKDIR /app
COPY . .

# Declare build-time args for Vue.js build
ARG VUE_APP_API_URL
ARG VUE_APP_DOMAIN_URL

# Export them as environment variables for Vue CLI to use
ENV VUE_APP_API_URL=$VUE_APP_API_URL
ENV VUE_APP_DOMAIN_URL=$VUE_APP_DOMAIN_URL

RUN npm install && npm run build

# Serve with nginx
FROM nginx:alpine

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx template
COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template

# Expose port
EXPOSE 80

# Set default value for BACKEND_INTERNAL_URL (can be overridden at runtime)
ENV BACKEND_INTERNAL_URL=https://example-internal-backend.com

# Start nginx with environment variable substitution
CMD ["/bin/sh", "-c", "envsubst '${BACKEND_INTERNAL_URL}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
