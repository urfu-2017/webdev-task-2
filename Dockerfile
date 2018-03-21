FROM node:8

COPY app /app
COPY package.json /

RUN npm i --production

ENV PORT 80
EXPOSE 80

# Команда для запуска процесса в контейнере
CMD node app/index.js