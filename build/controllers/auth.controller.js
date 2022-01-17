"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.signIn = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var generateToken = function generateToken(user) {
  user.save().then(function (res) {
    var token = _jsonwebtoken["default"].sign({
      id: userSaved._id
    }, _config["default"].SECRET, {
      expiresIn: 86400
    });

    console.log(res);
    res.status(200).json({
      token: token
    });
  });
};

var signUp = function signUp(req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      email = _req$body.email,
      password = _req$body.password,
      roles = _req$body.roles,
      favourites = _req$body.favourites;

  _User["default"].find({
    username: username
  }).then(function (userFound) {
    _User["default"].encryptPassword(password).then(function (pass) {
      var newUser = new _User["default"]({
        username: username,
        email: email,
        password: pass,
        favourites: favourites
      });

      if (req.body.roles) {
        _Role["default"].find({
          name: {
            $in: roles
          }
        }).then(function (foundRoles) {
          newUser.roles = foundRoles.map(function (role) {
            return role._id;
          });
          generateToken(newUser);
        });
      } else {
        _Role["default"].findOne({
          name: "user"
        }).then(function (role) {
          newUser.roles = [role._id];
          generateToken(newUser);
        });
      }

      if (userFound) return;
    });
  });
};

exports.signUp = signUp;

var signIn = function signIn(req, res) {
  _User["default"].findOne({
    email: req.body.email
  }).populate("roles").then(function (userFound) {
    console.log(req, _User["default"]);
    if (!userFound) return res.status(400).json({
      message: 'User not found'
    });
    if (!req.body.password) return res.status(401).json({
      token: null,
      message: 'Complete pass'
    });
    _User["default"].c;

    _User["default"].comparePassword(req.body.password, userFound.password).then(function (validatePass) {
      if (!validatePass) return res.status(401).json({
        token: null,
        message: 'Invalid pass'
      });

      var token = _jsonwebtoken["default"].sign({
        id: userFound._id
      }, _config["default"].SECRET, {
        expiresIn: 86400
      });

      console.log(userFound);
      res.json({
        token: token
      });
    });
  });
};

exports.signIn = signIn;