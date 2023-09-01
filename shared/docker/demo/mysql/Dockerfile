FROM --platform=$BUILDPLATFORM node:18-alpine AS app-base

WORKDIR /app

ENV NODE_ENV production

COPY package*.json /app/

RUN yarn 

EXPOSE 2222

COPY . /app/

CMD node index.js

# https://blog.csdn.net/gongdiwudu/article/details/128888497
#  docker run -d --add-host host.docker.internal:host-gateway -p 9999:2222 kkkskmmpl 
#  host:"host.docker.internal",