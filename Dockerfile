FROM node as builder

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN yarn build

FROM node:slim

ENV NODE_ENV production
USER node
WORKDIR /usr/src/app
COPY package.json package-lock.json ./

RUN npm ci --omit=dev
COPY --from=builder /usr/src/app/dist ./dist
COPY migrations migrations
RUN mkdir cocktail-library-static-storage

CMD [ "node", "dist/index.js" ]
