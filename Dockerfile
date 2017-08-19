# Define the image
FROM node:7-alpine

ENV NODE_ENV production
ENV APP_PATH /usr/src/app

RUN apk add --no-cache make gcc g++ python bash git

# Create the app directory
RUN mkdir -p $APP_PATH

COPY package.json /tmp
RUN cd /tmp && \
  npm install && \
  cp -a /tmp/node_modules $APP_PATH

# Bundle app source
WORKDIR $APP_PATH
COPY . $APP_PATH
COPY .env $APP_PATH

# Run it in port 5433
EXPOSE 5433

# Start it
CMD [ "npm", "run", "deploy" ]
CMD [ "npm", "run", "start" ]
