FROM node:18 AS build
WORKDIR /app

# copy package trước
COPY frontend/package*.json ./
RUN npm install

# copy toàn bộ source
COPY frontend/ ./

# build
RUN npm run build

# ===== NGINX =====
FROM nginx:alpine

# copy build output
COPY --from=build /app/build /usr/share/nginx/html

# config nginx
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]