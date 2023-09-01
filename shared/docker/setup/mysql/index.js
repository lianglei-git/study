const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

/** http服务 */
const app = express();

//post数据解析中间件
app.use(bodyParser());
//session中间件
app.use(session({secret:"test",resave:true,saveUninitialized:true}));

//登录接口
// require("./api-login-v1")(app);
// require("./api-login-v2")(app);
require("./api-login-v3")(app);

//注册增删改查接口
require("./api-crud-v1")(app);

//静态目录
app.use(express.static("./static"));

app.listen(3000,()=>{
  console.log("服务启动成功，侦听端口3000!");
});