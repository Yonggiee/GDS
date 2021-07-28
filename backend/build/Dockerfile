# Pull the base image
FROM node:lts-alpine

# Set the working direction
WORKDIR /app

# Copy files to container
COPY src/ .

# Install dependencies
RUN yarn

# start app
CMD ["yarn", "run", "start"]
