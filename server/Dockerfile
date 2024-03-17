FROM node:18-alpine

ADD . /app/tmp

WORKDIR /app/tmp

RUN yarn && yarn build

WORKDIR /app

RUN mv tmp/dist/* . && mv tmp/package.json . && mv tmp/node_modules . && mv tmp/.env .

RUN rm -rf tmp

EXPOSE 8080

CMD ["yarn", "start"]
