FROM ubuntu:20.04

WORKDIR /app

# Update the package manager and install prerequisites
RUN apt-get update && apt-get install -y \
    curl gnupg lsb-release ca-certificates && \
    apt-get clean

# Add NodeSource repository for Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

# Install Node.js 20 LTS and npm
RUN apt-get install -y nodejs && apt-get clean

COPY package*.json ./

RUN npm install --prod

COPY . .

EXPOSE 8000

CMD ["npm", "start"]