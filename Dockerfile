FROM node:15

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY /node-api/package*.json ./
RUN npm install --production

COPY /node-api/. .

EXPOSE 8000
CMD [ "node", "server.js" ]

