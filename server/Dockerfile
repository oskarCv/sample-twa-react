# Use Node.js base image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy Node API source code
COPY server/ .

# Expose the port your API runs on
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]  # Replace server.js with your entry file