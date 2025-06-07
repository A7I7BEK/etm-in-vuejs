# This Dockerfile builds a Vue.js application and serves it using Nginx.
# It is needed for Railway.com

# Build step
FROM node:lts-alpine as builder
WORKDIR /app
COPY . .

# Declare build-time args
ARG VUE_APP_API_URL
ARG VUE_APP_DOMAIN_URL

# Export them as environment variables for Vue CLI to use
ENV VUE_APP_API_URL=$VUE_APP_API_URL
ENV VUE_APP_DOMAIN_URL=$VUE_APP_DOMAIN_URL

RUN npm install && npm run build

# Serve with nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
