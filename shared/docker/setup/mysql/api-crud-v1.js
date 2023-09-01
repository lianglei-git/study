/** 数据库连接 */
var query = require("./mysql").query;

/**
 * 对app进行登录接口的扩展
 * @param {import("express").Express} app 要增加接口的app实例
 */
module.exports = (app)=>{
  //注册查询接口
  app.get("/api/class",async (req,res)=>{
    const data = await query("SELECT * from user");
    res.send({code:0,data:data});
  })
}