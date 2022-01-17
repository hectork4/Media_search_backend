"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkRolesExisted = exports.checkDuplicateUsernameOrEmail = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Role = require("../models/Role");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var checkDuplicateUsernameOrEmail = function checkDuplicateUsernameOrEmail(req, res, next) {
  try {
    _User["default"].findOne({
      username: req.body.email
    }).then(function (user) {
      if (user) return res.status(400).json({
        message: "The user already exists"
      });

      _User["default"].findOne({
        email: req.body.email
      }).then(function (email) {
        if (email) return res.status(400).json({
          message: "The email already exists"
        });
        next();
      });
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
};

exports.checkDuplicateUsernameOrEmail = checkDuplicateUsernameOrEmail;

var checkRolesExisted = function checkRolesExisted(req, res, next) {
  if (req.body.roles) {
    for (var i = 0; i < req.body.roles.length; i++) {
      if (!_Role.ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: "Role ".concat(req.body.roles[i], " does not exist")
        });
      }
    }
  }

  next();
};

exports.checkRolesExisted = checkRolesExisted;