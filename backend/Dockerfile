FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma db push
EXPOSE 5000
CMD ["node", "server.js"]