const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const os = require('os');
const osType = os.type(); //系统类型
const ifaces = os.networkInterfaces(); //网络信息
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

app.listen(2222,()=>{
  getLocalIP();
  console.log("服务启动成功，侦听端口2222!");
});

	//查看本地IP地址
  function getLocalIP() {
				

    let locatIp = '';
    for (let dev in ifaces) {
      //console.log(dev)   //打印看结果
        for (let j = 0; j < ifaces[dev].length; j++) {
          if (ifaces[dev][j].family === 'IPv4') {
            locatIp = ifaces[dev][j].address;
            break;
          }
        }
    }
  console.log(osType) 
  console.log(locatIp)  //IP地址
  return locatIp;
}