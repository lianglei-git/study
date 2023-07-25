use warp::{Filter, Rejection, Reply};

type Result<T> = std::result::Result<T, Rejection>;

#[tokio::main]
async fn main() {
  let user = warp::path!("user").and_then(user_handler);

  println!("Started server at localhost:8010");
  warp::serve(user).run(([127, 0, 0, 1], 8010)).await;
}

async fn user_handler() -> Result<impl Reply> {
  Ok("Started server at localhost:8010/user")
}