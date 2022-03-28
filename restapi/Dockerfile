FROM node:16.13.1
LABEL org.opencontainers.image.source https://github.com/arquisoft/dede_en1a
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ENV RESTAPI_DB_NAME=$RESTAPI_DB_NAME

ENV RESTAPI_DB_USERNAME=$RESTAPI_DB_USERNAME

ENV RESTAPI_DB_PASSWORD=$RESTAPI_DB_PASSWORD

ENV RESTAPI_PORT=$RESTAPI_PORT

CMD [ "npm", "start" ]