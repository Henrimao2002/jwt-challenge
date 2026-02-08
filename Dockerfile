FROM node:24-alpine

# Create app directory
WORKDIR /app

RUN corepack enable

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the source code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]