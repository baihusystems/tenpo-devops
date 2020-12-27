FROM node:15

WORKDIR /usr/src/app

COPY /node-api/package*.json ./
RUN npm install --production

COPY /node-api/. .

EXPOSE 8082
CMD [ "node", "server.js" ]