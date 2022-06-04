"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('./queue.js'),
    Queue = _require.Queue;

var fs = require('fs');

var EventEmitter = require('events');

var MyFileStream =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(MyFileStream, _EventEmitter);

  function MyFileStream(path) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MyFileStream);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MyFileStream).call(this));
    _this.flags = options.flag || 'w';
    _this.mode = options.mode || 438;
    _this.autoClose = options.autoClose || true;
    _this.start = options.start || 0;
    _this.encoding = options.encoding || 'utf8';
    _this.highWaterMark = options.highWaterMark || 16 * 1024;
    _this.path = path;

    _this.open();

    return _this;
  }

  _createClass(MyFileStream, [{
    key: "open",
    value: function open() {
      var _this2 = this;

      console.log(123123);
      fs.open(this.path, this.flags, this.mode, function (err, fd) {
        if (err) {
          _this2.emit('error', err);
        }

        _this2.fd = fd;

        _this2.emit('open', fd);
      });
    }
  }, {
    key: "write",
    value: function write() {}
  }]);

  return MyFileStream;
}(EventEmitter);

var rs = new MyFileStream('./data.txt', {});
rs.on('open', function (fd) {
  console.log(fd);
});