FROM node:18-slim

# Set working directory
WORKDIR /docker_testapp

# Copy package.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 5050

# Start the app
CMD ["node", "server.js"]
