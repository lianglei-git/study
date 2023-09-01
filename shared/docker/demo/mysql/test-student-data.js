const query = require("./mysql").query;

/** 要生成的数据数量 */
const count = 10000 * 100;

/**
 * 通过编号生成名称
 * @param {number} id 
 */
const getNameFromID = (id)=>{
  var str = "";
  while(id > 25){
    const v = id % 26;
    id = (id - v) / 26;
    str = String.fromCharCode("a".charCodeAt(0) + v) + str;
  }
  str = String.fromCharCode("a".charCodeAt(0) + id) + str;
  return str;
}

/** 创建测试的学生数据 */
const createData = async ()=>{
  for(var i = 0;i < count;i++){
    if(i % 1000 === 0){
      console.log(`已插入`,i);
    }
    await query("INSERT INTO student (name,level,score) VALUES (?,?,?)",[
      //顺序生成姓名
      getNameFromID(i),
      //班级
      (Math.random() * 10) | 0,
      //成绩
      (Math.random() * 1000) | 0
    ])
  }
}

createData();