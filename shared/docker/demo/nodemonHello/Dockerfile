FROM node

WORKDIR /app


COPY package*.json /app/

RUN yarn 

COPY . /app/

EXPOSE 7777

# VOLUME /app/src

CMD yarn start