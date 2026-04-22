FROM node:18 AS build
WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]