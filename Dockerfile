FROM node:8

ENV NODE_ENV production

RUN mkdir /app
WORKDIR /app

COPY package-lock.json /app
COPY package.json /app

RUN yarn install --production

ENV PORT 4000

ENV NODE_ENV=production

COPY . /app

EXPOSE 4000

CMD node index.js