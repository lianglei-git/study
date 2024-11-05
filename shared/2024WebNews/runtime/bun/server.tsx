const server = Bun.serve({
  port: 3000,
  fetch(request) {
    return new Response("Welcome to Bun!");
    //    return <html><h1>88888</h1></html>
  },
});

console.log(`Listening on localhost:${server.port}`);
