FROM node:20.10 AS base

WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . .

FROM base as builder

WORKDIR /usr/src/app
RUN npm run build

FROM base as local

WORKDIR /usr/src/app
RUN npm install
EXPOSE 8000

FROM node:20.10-alpine as prod

WORKDIR /usr/src/app
COPY package*.json ./
COPY .env.production ./
RUN npm install --only=production
COPY --from=BUILDER /usr/src/app/dist ./dist

EXPOSE 3000
ENTRYPOINT ["npm", "run", "start:prod"]