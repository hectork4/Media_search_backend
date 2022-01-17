"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.isModerator = exports.isAdmin = void 0;

var _config = _interopRequireDefault(require("../config"));

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var verifyToken = function verifyToken(req, res, next) {
  var tokenReq = req.headers["x-access-token"];
  if (!tokenReq) return res.status(403).json({
    message: "No token provided"
  });

  try {
    var decoded = _jsonwebtoken["default"].verify(tokenReq, _config["default"].SECRET);

    req.userId = decoded.id;

    _User["default"].findById(req.userId, {
      password: 0
    }).then(function (user) {
      if (!user) return res.status(404).json({
        message: "No user found"
      });
      console.log(user);
      next();
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized!"
    });
  }
};

exports.verifyToken = verifyToken;

var isModerator = function isModerator(req, res, next) {
  try {
    return _User["default"].findById(req.userId).then(function (user) {
      _Role["default"].find({
        _id: {
          $in: user.roles
        }
      }).then(function (roles) {
        for (var i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        return res.status(403).json({
          message: "Require Moderator Role!"
        });
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error
    });
  }
};

exports.isModerator = isModerator;

var isAdmin = function isAdmin(req, res, next) {
  try {
    _User["default"].findById(req.userId).then(function (user) {
      _Role["default"].find({
        _id: {
          $in: user.roles
        }
      }).then(function (roles) {
        for (var i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        return res.status(403).json({
          message: "Require Admin Role!"
        });
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error
    });
  }
};

exports.isAdmin = isAdmin;