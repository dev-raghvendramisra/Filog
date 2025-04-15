FROM ubuntu:20.04

WORKDIR /app

# Install dependencies for Node.js
RUN apt-get update && apt-get install -y \
    curl gnupg lsb-release ca-certificates && \
    apt-get clean

# Add Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs && apt-get clean

# Copy package files first
COPY package*.json ./

# Install ALL dependencies (including dev ones for TypeScript build)
RUN npm install

# Copy the rest of the app (including TypeScript source)
COPY . .

# Build the TypeScript app (assumes "build" script runs `tsc`)
RUN npm run build

# Remove devDependencies to shrink image (optional but helpful)
RUN npm prune --production

# Expose the port your app uses
EXPOSE 8000

# Start the app (e.g., "node dist/index.js")
CMD ["npm", "start"]