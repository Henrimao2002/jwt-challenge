FROM node:24-alpine

WORKDIR /app

# Enable corepack for pnpm
RUN corepack enable

# Copy package.json and pnpm-lock.yaml first for caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --prod

# Copy the rest of your app
COPY . .

ENV FLAG=FLAG{jwt_privilege_escalation_success}

EXPOSE 3000

CMD ["node", "server.js"]
