FROM ubuntu:20.04

# Set the working directory inside the container
WORKDIR /app

# Update the package manager and install prerequisites
RUN apt-get update && apt-get install -y \
    curl gnupg lsb-release ca-certificates && \
    apt-get clean

# Add NodeSource repository for Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

# Install Node.js 20 LTS and npm
RUN apt-get install -y nodejs && apt-get clean

# Copy only package files to install dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm install --prod

# Copy the rest of the application code
COPY dist .

# Expose the application port (if required, e.g., 3000)
EXPOSE 8000

# Use PM2 to start the application in production mode
CMD ["npm", "start"]
