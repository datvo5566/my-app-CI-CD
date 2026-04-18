FROM node:22 AS builder

WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY backend .

RUN npx prisma generate


# ===== production =====
FROM node:22

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 5000

# 🔥 chạy migrate ở runtime
CMD sh -c "npx prisma migrate deploy && node index.js"