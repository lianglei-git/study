/** 数据库连接 */
var query = require("./mysql").query;

/**
 * 对app进行登录接口的扩展
 * @param {import("express").Express} app 要增加接口的app实例
 */
module.exports = (app)=>{
  /** 登录接口 */
  app.post("/api/login",async (req,res)=>{
    /** POST请求数据 */
    const body = req.body;

    //拼接query语句
    const sql = `SELECT * FROM user where username=? AND password=?`;

    //查询用户是否存在
    const data = await query(sql,[body.user,body.pass]);
    //是否查询到数据
    if(data.length > 0) {
      //登录成功
      return res.send({sql:sql,code:0});
    }
    //登录失败
    return res.send({sql:sql,code:-1});
  });
}