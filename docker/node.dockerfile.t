# 在项目根目录添加【Dockerfile】文件：
FROM mhart/alpine-node:12.16.3
# EXPOSE 3000
ENV NODE_ENV production
ENV MYSQL_HOST 192.168.9.199
ENV MYSQL_PASSWORD rayjesn
ENV FILE_SEVER http://localhost:3000/file
WORKDIR /app
COPY package*.json /app/
RUN npm i --production
COPY . /app/
CMD npm start