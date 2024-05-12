# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /frontend

# Copy package.json as well as package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Install a simple HTTP server to serve static files
RUN npm install -g serve

# Expose port 5000 for the server
EXPOSE 5000

# Run the server
CMD ["serve", "-s", "dist", "-p", "5000"]
