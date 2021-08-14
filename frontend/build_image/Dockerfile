# Pull the base image
FROM node:lts-alpine as builder

# Set the working direction
WORKDIR /app

# Copy package.json
COPY package.json .

# Install dependencies
RUN yarn

# Copy files to container
COPY . .

# Build app
RUN yarn build

# Smaller production image
FROM nginx:stable-alpine

COPY --from=builder /app/dist/frontend /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
