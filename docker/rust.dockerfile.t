FROM rust:1.55 as builder

RUN USER=root cargo new --bin rustcode
WORKDIR /rustcode
COPY ./Cargo.toml ./Cargo.toml
# COPY ./application.yml ./application.yml

RUN cargo build --release \
  && rm src/*.rs target/release/deps/rustcode*

ADD . ./

RUN cargo build --release


FROM debian:buster-slim

ARG APP=/usr/src/app

RUN apt-get update \
  && apt-get install -y ca-certificates tzdata \
  && rm -rf /var/lib/apt/lists/*

EXPOSE 8010

ENV TZ=Etc/UTC \
  APP_USER=appuser

RUN groupadd $APP_USER \
  && useradd -g $APP_USER $APP_USER \
  && mkdir -p ${APP}

COPY --from=builder /rustcode/target/release/rustcode ${APP}/rustcode
COPY --from=builder /rustcode/application.yml ${APP}/application.yml


RUN chown -R $APP_USER:$APP_USER ${APP}

USER $APP_USER
WORKDIR ${APP}

CMD ["./rustcode"]