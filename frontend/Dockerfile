# Dockerfile
FROM node:21.7

# Set working directory
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy project files into the Docker image
COPY . ./

# Build the app
RUN npm run build:node

# Expose port to access the server
EXPOSE 8888

# Command to serve the app using Vite
CMD ["npm", "run", "serve"]
