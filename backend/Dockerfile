FROM node:22 AS builder

WORKDIR /app

# copy đúng backend
COPY backend/package*.json ./
RUN npm install

COPY backend .

RUN ls -R

RUN npx prisma generate

FROM node:22

WORKDIR /app

COPY --from=builder /app .

EXPOSE 5000

CMD ["node", "index.js"]