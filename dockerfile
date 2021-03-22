FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN yarn
RUN yarn add npx
ENV DOCKERIZE_VERSION v0.6.1
COPY . /usr/src/app
EXPOSE 3333