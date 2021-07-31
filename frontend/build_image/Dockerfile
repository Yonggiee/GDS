# Pull the base image
FROM node:lts-alpine as builder

# Set the working direction
WORKDIR /app

# Copy files to container
COPY . .

# Install dependencies
RUN yarn

# Build app
RUN yarn build

# Smaller production image
FROM nginx:stable-alpine

COPY --from=builder /app/dist/frontend /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
