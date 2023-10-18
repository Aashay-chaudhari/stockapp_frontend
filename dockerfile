# FROM node:18 as node

# WORKDIR /app

# COPY . .

# RUN npm install

# RUN npm run build --prod

# FROM nginx:alpine

# COPY --from=node /app/dist/angular-app /usr/share/nginx/html

# ***********************************************************
# FROM node:18-alpine AS build

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# CMD ["npm", "start"]