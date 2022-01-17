"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userSchema = new _mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Role"
  }],
  favourites: {
    img: [{
      type: String
    }],
    gif: [{
      type: String
    }]
  }
}, {
  timestamps: true,
  versionKey: false
});

userSchema.statics.encryptPassword = function (password) {
  return _bcryptjs["default"].genSalt(10).then(function (salt) {
    return _bcryptjs["default"].hash(password, salt).then(function (resp) {
      console.log({
        resp: resp
      });
      return resp;
    });
  });
};

userSchema.statics.comparePassword = function (password, receivedPassword) {
  return _bcryptjs["default"].compare(password, receivedPassword).then(function (res) {
    return res;
  });
};

var _default = (0, _mongoose.model)("User", userSchema);

exports["default"] = _default;