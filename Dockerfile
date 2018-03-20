FROM node:8

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN yarn install --production

ENV PORT 4000

ENV NODE_ENV=production

EXPOSE 4000

CMD node index.js
