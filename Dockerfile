# Этап 1: Сборка Angular приложения
FROM node:20 AS build
WORKDIR /HomeSync
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Этап 2: Запуск серверной части
FROM node:20-alpine
WORKDIR /HomeSync
COPY --from=build /HomeSync/dist ./dist
COPY --from=build /HomeSync/package.json ./
COPY --from=build /HomeSync/package-lock.json ./
RUN npm ci --omit=dev
EXPOSE 4000
CMD ["node", "dist/HomeSync/server/server.mjs"]