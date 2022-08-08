let dbName = 'helloIndexDB', version = 1, storeName = 'helloStore'
   
let indexedDB = window.indexedDB
let db
const request = indexedDB.open(dbName, version)
request.onsuccess = function(event) {
  db = event.target.result // 数据库对象
  console.log('数据库打开成功')
}

request.onerror = function(event) {
  console.log('数据库打开报错')
}

request.onupgradeneeded = function(event) {
  // 数据库创建或升级的时候会触发
  console.log('onupgradeneeded')
  db = event.target.result // 数据库对象
  let objectStore
  if (!db.objectStoreNames.contains(storeName)) {
    objectStore = db.createObjectStore(storeName, { keyPath: 'id' }) // 创建表
    // objectStore.createIndex('name', 'name', { unique: true }) // 创建索引 可以让你搜索任意字段
  }
}


// 添加数据
function addData(db, storeName, data) {
  let request = db.transaction([storeName], 'readwrite') // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
    .objectStore(storeName) // 仓库对象
    .add(data)

  request.onsuccess = function(event) {
    console.log('数据写入成功')
  }

  request.onerror = function(event) {
    console.log('数据写入失败')
    throw new Error(event.target.error)
  }
}

// 根据id获取数据
function getDataByKey(db, storeName, key) {
    let transaction = db.transaction([storeName]) // 事务
    let objectStore = transaction.objectStore(storeName) // 仓库对象
    let request = objectStore.get(key)

    request.onerror = function(event) {
      console.log('事务失败')
    }

    request.onsuccess = function(event) {
      console.log('主键查询结果: ', request.result)
    }
}

// 根据id修改数
function updateDB(db, storeName, data) {
  let request = db.transaction([storeName], 'readwrite') // 事务对象
    .objectStore(storeName) // 仓库对象
    .put(data)

  request.onsuccess = function() {
    console.log('数据更新成功')
  }

  request.onerror = function() {
    console.log('数据更新失败')
  }
}

// 根据id删除数据
function deleteDB(db, storeName, id) {
  let request = db.transaction([storeName], 'readwrite').objectStore(storeName).delete(id)

  request.onsuccess = function() {
    console.log('数据删除成功')
  }

  request.onerror = function() {
    console.log('数据删除失败')
  }
}

// 由于打开indexDB是异步的加个定时器避免 db对象还没获取到值导致 报错
setTimeout(() => {
  addData(db, storeName, {
    id: new Date().getTime(), // 必须且值唯一
    name: '张三',
    age: 18,
    desc: 'helloWord'
  })

  getDataByKey(db, storeName, 1638160036008)

  updateDB(db, storeName, {id: 1638164880484, desc: '修改的内容'})

  deleteDB(db, storeName, 1638164870439)
}, 1000)
