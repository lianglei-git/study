# 基础镜像
FROM golang:latest

# 设置工作目录
WORKDIR /go/src/app

# 复制源代码到容器中
COPY . .

# 安装依赖
RUN go get -d -v ./...

# 构建应用
RUN go build -o /go/bin/app

# 设置环境变量
ENV PATH="/go/bin:${PATH}"


# 暴露指定端口
EXPOSE 8088

# 运行应用
CMD ["app"]
# RUN go run /go/bin/app/main.go

