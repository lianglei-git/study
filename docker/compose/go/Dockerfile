# syntax=docker/dockerfile:1
# docker pull golang:1.21rc3-bullseye
FROM golang:1.21rc3-bullseye
WORKDIR /GoCode
ENV Custom=iLike


EXPOSE 8030

COPY . .

# CMD ["go", "run", "main.go"]

CMD ["./main"]
