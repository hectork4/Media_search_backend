"use strict";

var _app = _interopRequireDefault(require("./app"));
console.log("asasdxas");
var _config = _interopRequireDefault(require("./config"));

require("./database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_app["default"].listen(_config["default"].PORT);

console.log("server listen on port", PORT);