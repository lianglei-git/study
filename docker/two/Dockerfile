FROM --platform=$BUILDPLATFORM node:18-alpine AS app-base
WORKDIR /app

ENV NODE_ENV production

COPY package*.json /app/

RUN yarn 

COPY . /app/

CMD yarn start