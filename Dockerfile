# Use the official Node.js LTS (14.x) image as the base image
FROM node:16.20-buster AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install Angular CLI and other project dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Build the Angular application
RUN npm run build

# Use the official NGINX image as the base image for serving the static files
FROM nginx:latest

# Copy the built files from the previous stage to the NGINX default public directory
COPY /dist/front /usr/share/nginx/html

# Expose port 80 to access the application
EXPOSE 80

# Start NGINX when the container is launched
CMD ["nginx", "-g", "daemon off;"]
