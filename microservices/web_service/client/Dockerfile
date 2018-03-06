FROM node:latest

MAINTAINER micro_messenger


RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

ADD src /usr/src/app/src
ADD public /usr/src/app/public
ADD src/components /usr/src/app/src/components

RUN npm build

CMD ["npm", "start"]
