require('source-map-support').install();
class MyTansformCode {
    constructor(){
        this.packageHeaderLen = 4;
        this.serialNum = 0;
        this.serialLen = 2;
    }

    encode(data, serialNum){
        let body = Buffer.from(data);
        let headerBuf = Buffer.alloc(this.packageHeaderLen);

        headerBuf.writeInt16BE(serialNum, this.serialNum);
        headerBuf.writeInt16BE(body.length, this.serialLen);

        return Buffer.concat([headerBuf,body])
    }   

    decode(buffer) {
        const headerBuf = buffer.slice(0, this.packageHeaderLen);
        const bodyBuf = buffer.slice(this.packageHeaderLen);

        return {
            serialNum: headerBuf.readInt16BE(),
            bodyLength: headerBuf.readInt16BE(this.serialLen),
            body: bodyBuf.toString()
        }
    }

    getPackageLen(buffer){
        if(buffer.length < this.packageHeaderLen) {
            return 0
        }else {
            return this.packageHeaderLen + buffer.readInt16BE(this.serialLen)
        }
    }
}

// 封包 拆包 

const ts = new MyTansformCode();

const encode = ts.encode('什么鬼啊')
encode.kk();

const decode = ts.decode(encode);

console.log(decode, ts.getPackageLen(encode))