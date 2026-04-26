FROM node:18 AS build
WORKDIR /app

# copy đúng package frontend
COPY frontend/package*.json ./
RUN npm install

# copy code frontend
COPY frontend/ .
RUN npm run build

FROM nginx:alpine

# copy build ra nginx
COPY --from=build /app/build /usr/share/nginx/html

# config nginx
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]