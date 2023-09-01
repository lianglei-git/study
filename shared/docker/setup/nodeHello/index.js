const http = require('http')

const os = require('os');
const osType = os.type(); //系统类型
const ifaces = os.networkInterfaces(); //网络信息
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


http.createServer(function (req,res){
    res.write("hello")

    res.end();
}).listen(9898, () => {
    console.log('http://localhost:9898')
    getLocalIP();
})