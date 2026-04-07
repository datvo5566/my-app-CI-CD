FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

# ===== production =====
FROM node:22

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 5000

CMD ["node", "index.js"]