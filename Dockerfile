FROM node:slim
RUN apt-get update; apt-get install -y mysql-client

RUN mkdir /src

WORKDIR /src
ADD ./proxy/package.json /src/package.json
ADD ./proxy/yarn.lock /src/yarn.lock
RUN yarn install

EXPOSE 3000

CMD node app/daemon.js
