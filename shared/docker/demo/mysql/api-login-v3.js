/** 数据库连接 */
var query = require("./mysql").query;

/**
 * 对app进行登录接口的扩展
 * @param {import("express").Express} app 要增加接口的app实例
 */
module.exports = (app)=>{
  /** 注册登录接口 */
  app.post("/api/login",async (req,res)=>{
    /** POST请求数据 */
    const body = req.body;

    //拼接query语句
    const sql = `SELECT * FROM user where username=? AND password=?`;

    //查询用户是否存在
    const data = await query(sql,[body.user,body.pass]);
    /** 获取用户信息 */
    const user = data[0];
    //是否查询到数据
    if(user == null) {
      //登录失败
      return res.send({sql:sql,code:-1});
    }

    req.session.user = user;

    //登录成功
    res.send({sql:sql,code:0});
  });

  /** 注册登出接口 */
  app.get("/api/logout",(req,res)=>{
    //清空登录状态
    req.session.user = null;
    res.send({code:0,msg:"登出成功!"});
  });

  /** 注册鉴权中间件 */
  app.use("/api",(req,res,next)=>{
    if(req.session.user == null) return res.send({code:-1,msg:"您还未登录!"});
    next();
  });
}