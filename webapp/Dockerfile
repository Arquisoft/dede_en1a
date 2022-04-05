FROM node:16.13.1
LABEL org.opencontainers.image.source https://github.com/arquisoft/dede_en1a
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

#ARG API_URI="http://localhost:5000"
ARG API_URI
ENV REACT_APP_API_URI=$API_URI

ARG REDIRECT_URI
ENV SOLID_REDIRECT_URI=$REDIRECT_URI

#Create an optimized version of the webapp
#commented as we are not using it yet
#RUN npm run build

#npm run prod is not compiling
CMD [ "npm", "start"]