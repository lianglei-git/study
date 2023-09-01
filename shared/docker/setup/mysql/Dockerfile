FROM node

WORKDIR /app

COPY . /app/

COPY package.json .

RUN yarn

EXPOSE 3000

CMD node index.js