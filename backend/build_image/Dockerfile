# Pull the base image
FROM node:lts-alpine

# Set the working direction
WORKDIR /app

# Copy package.json
COPY package.json .

# Install dependencies
RUN yarn

# Copy files to container
COPY . .

# start app
CMD ["yarn", "run", "start"]
