import { createServer } from "http";
import socketIO from "../../lib/socket.io.js";


const httpServer = createServer();
const io = socketIO(httpServer, {
  cors: {
    credentials: true
  },
});

io.on("connection", (socket) => {
  // ...
  console.log('连接成功')
});


httpServer.listen(28256, () => {
    console.log('28256')
});