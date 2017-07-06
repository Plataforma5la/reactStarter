FROM node:alpine

ARG APP_NAME
RUN mkdir /usr/$APP_NAME
ARG APP_NAME
WORKDIR /usr/$APP_NAME
COPY ./app/package.json package.json
RUN npm install
ADD ./app/webpack.config.js webpack.config.js