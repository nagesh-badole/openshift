FROM node:lts

WORKDIR /app

COPY . .

RUN npm run build && npm run server-build

EXPOSE 8015

CMD npm start
