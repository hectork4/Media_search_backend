"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var _default = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost/apicompany",
  PORT: process.env.PORT || 4000,
  SECRET: 'favourites-api'
};
exports["default"] = _default;