# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies (including devDependencies for build)
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start:prod"]
