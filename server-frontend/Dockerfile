FROM node:latest

RUN mkdir /app
WORKDIR /app

ADD ./package.json /app/
ADD ./yarn.lock /app/

RUN yarn install

CMD ["yarn", "start"]
