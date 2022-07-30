"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

require('source-map-support').install();

var MyTansformCode =
/*#__PURE__*/
function () {
  function MyTansformCode() {
    _classCallCheck(this, MyTansformCode);

    this.packageHeaderLen = 4;
    this.serialNum = 0;
    this.serialLen = 2;
  }

  _createClass(MyTansformCode, [{
    key: "encode",
    value: function encode(data, serialNum) {
      var body = Buffer.from(data);
      var headerBuf = Buffer.alloc(this.packageHeaderLen);
      headerBuf.writeInt16BE(serialNum, this.serialNum);
      headerBuf.writeInt16BE(body.length, this.serialLen);
      return Buffer.concat([headerBuf, body]);
    }
  }, {
    key: "decode",
    value: function decode(buffer) {
      var headerBuf = buffer.slice(0, this.packageHeaderLen);
      var bodyBuf = buffer.slice(this.packageHeaderLen);
      return {
        serialNum: headerBuf.readInt16BE(),
        bodyLength: headerBuf.readInt16BE(this.serialLen),
        body: bodyBuf.toString()
      };
    }
  }, {
    key: "getPackageLen",
    value: function getPackageLen(buffer) {
      if (buffer.length < this.packageHeaderLen) {
        return 0;
      } else {
        return this.packageHeaderLen + buffer.readInt16BE(this.serialLen);
      }
    }
  }]);

  return MyTansformCode;
}(); // 封包 拆包 


var ts = new MyTansformCode();
var encode = ts.encode('什么鬼啊');
encode.kk();
var decode = ts.decode(encode);
console.log(decode, ts.getPackageLen(encode));