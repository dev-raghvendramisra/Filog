FROM ubuntu:20.04

WORKDIR /app

# Install OS-level deps
RUN apt-get update && apt-get install -y \
    curl gnupg lsb-release ca-certificates && \
    apt-get clean

# Install Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && apt-get clean

# Copy package files
COPY package*.json ./

# ❗ Install all dependencies (including dev deps for TS build)
RUN npm install

# Copy rest of the app (now includes tsconfig, src folder, etc.)
COPY . .

# ✅ Run TypeScript build (needs types and tsc-alias!)
RUN npm run build

# Optional: prune devDependencies after build to reduce size
RUN npm prune --production

# Expose port and run app
EXPOSE 8000
CMD ["npm", "start"]
