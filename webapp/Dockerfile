FROM node:16.13.1
LABEL org.opencontainers.image.source https://github.com/arquisoft/dede_en1a
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ARG API_URI
ENV REACT_APP_API_URI=$API_URI

ARG PREFLIGHT_CHECK_SKIP=true
ENV SKIP_PREFLIGHT_CHECK=$PREFLIGHT_CHECK_SKIP

RUN npm start

CMD [ "npm", "start"]