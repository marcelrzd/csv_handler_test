FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if using Yarn)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your frontend application
COPY . .

# # Build your application using the node-specific build script
RUN npm run build

# Command to serve the app using Vite
CMD ["npm", "run", "dev"]
