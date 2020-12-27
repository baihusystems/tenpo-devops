FROM node:15

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY /node-api-pg/package*.json ./
RUN npm install --production

COPY /node-api-pg/. .

EXPOSE 8082
CMD [ "node", "server.js" ]

