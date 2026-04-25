# Stage 1: Build the application
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve the application
FROM node:20-alpine

WORKDIR /app

# Copy the built assets
COPY --from=build /app/dist ./dist
# Copy package.json to install the 'serve' production dependency
COPY --from=build /app/package*.json ./

# Only install production dependencies (like 'serve')
RUN npm ci --omit=dev

# Set the PORT environment variable expected by Cloud Run
ENV PORT=8080
EXPOSE 8080

# 'npm start' maps to 'serve -s dist'
CMD ["npm", "start"]
