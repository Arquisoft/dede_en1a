FROM node:16.13.1
LABEL org.opencontainers.image.source https://github.com/arquisoft/dede_en1a
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ARG DB_NAME="DeDe_Database"
ENV RESTAPI_DB_NAME=$DB_NAME

ARG DB_USERNAME="admin"
ENV RESTAPI_DB_USERNAME=$DB_USERNAME

ARG DB_PASSWORD="admin"
ENV RESTAPI_DB_PASSWORD=$DB_PASSWORD

ARG PORT="5000"
ENV RESTAPI_PORT=$PORT

ARG WEBAPP_URI
ENV REACT_WEBAPP_URI=$URI

CMD [ "npm", "start" ]