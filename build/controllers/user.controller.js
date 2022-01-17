"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.getUser = exports.createUser = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createUser = function createUser(req, res) {
  try {
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password;
    var rolesFound = ['admin'];
    var user = new _User["default"]({
      username: email,
      email: email,
      password: password,
      roles: rolesFound.map(function (role) {
        return role._id;
      }),
      favourites: []
    });

    _User["default"].encryptPassword(user.password).then(function (npass) {
      return user.password = npass;
    });

    return user.save().then(function (savedUser) {
      return res.status(200).json({
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        roles: savedUser.roles,
        favourites: savedUser.favourites
      });
    });
  } catch (error) {
    console.error(error);
  }
};

exports.createUser = createUser;

var getUser = function getUser(req, res) {
  var token = req.headers["x-access-token"];

  var decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);

  _User["default"].findById(decoded.id).then(function (userData) {
    return res.json(userData);
  });
};

exports.getUser = getUser;

var updateUser = function updateUser(req, res) {
  var token = req.headers["x-access-token"];

  var decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);

  _User["default"].findByIdAndUpdate(decoded.id, req.body, {
    "new": true
  }).then(function (updatedUser) {
    return res.status(200).json(updatedUser);
  });
}; //export const getUsers = async (req, res) => {};


exports.updateUser = updateUser;