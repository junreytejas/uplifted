# Stage 1: Build the application
FROM node:20 AS builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Create the production image
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only the build output and necessary files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the application port
EXPOSE 8080 

# Command to run the application
CMD ["node", "dist/main"]