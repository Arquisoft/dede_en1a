FROM node:16.13.1
LABEL org.opencontainers.image.source https://github.com/arquisoft/dede_en1a
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ARG DB_NAME
ENV RESTAPI_DB_NAME=$DB_NAME

ARG DB_USERNAME
ENV RESTAPI_DB_USERNAME=$DB_USERNAME

ARG DB_PASSWORD
ENV RESTAPI_DB_PASSWORD=$DB_PASSWORD

ARG PORT
ENV RESTAPI_PORT=$PORT

CMD [ "npm", "start" ]