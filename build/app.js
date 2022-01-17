"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _package = _interopRequireDefault(require("../package.json"));

var _initialSetup = require("./libs/initialSetup");

var _product = _interopRequireDefault(require("./routes/product.route"));

var _auth = _interopRequireDefault(require("./routes/auth.route"));

var _user = _interopRequireDefault(require("./routes/user.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
(0, _initialSetup.createRoles)();
app.set('pkg', _package["default"]);
app.use((0, _morgan["default"])('dev'));
app.use((0, _cors["default"])());
app.options('*', (0, _cors["default"])());
app.use(_express["default"].json());
app.get('/', function (req, res) {
  res.json({
    author: app.get('pkg').author,
    version: _package["default"].version,
    description: _package["default"].description
  });
});
app.use('/products', _product["default"]);
app.use('/auth', _auth["default"]);
app.use('/user', _user["default"]);
var _default = app;
exports["default"] = _default;