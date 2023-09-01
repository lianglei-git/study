const mysql = require("mysql2");
// docker save chatgpt-next > chatgpt-next.tar
// docker load < chatgpt-next.tar

/** 获取数据库连接 */
const DB = module.exports.DB = mysql.createConnection({
  /** 连接的IP */
  host:"host.docker.internal",
  /** 连接用户名 */
  user:"root",
  /** 数据库连接密码 */
  password:"lianglei1216",
  /** 要连接的数据库名 */
  database:"data"
});

/** 执行一次数据库查询 */
const query = module.exports.query = (...props)=>{
  return new Promise((resolve,reject)=>{
    DB.query(...props,(err,res)=>{
      if(err){
        return reject(err);
      }
      resolve(res);
    });
  });
}