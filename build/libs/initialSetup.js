"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRoles = exports.createAdmin = void 0;

var _Role = _interopRequireDefault(require("../models/Role"));

var _User = _interopRequireDefault(require("../models/User"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createRoles = function createRoles() {
  try {
    _Role["default"].estimatedDocumentCount().then(function (count) {
      if (count > 0) return;
      Promise.all([new _Role["default"]({
        name: "user"
      }).save(), new _Role["default"]({
        name: "moderator"
      }).save(), new _Role["default"]({
        name: "admin"
      }).save()]).then(function (values) {
        console.log(values);
      });
    });
  } catch (error) {
    console.error(error);
  }
};

exports.createRoles = createRoles;

var createAdmin = function createAdmin() {
  _User["default"].findOne({
    email: "admin@localhost"
  }).then(function (user) {
    _Role["default"].find({
      name: {
        $in: ["admin", "moderator"]
      }
    }).then(function (roles) {
      _bcryptjs["default"].hash("admin", 10).then(function (pass) {
        if (!user) {
          _User["default"].create({
            username: "admin",
            email: "admin@localhost",
            password: pass,
            roles: roles.map(function (role) {
              return role._id;
            })
          }).then(function () {
            return console.log('Admin User Created!');
          });
        }
      });
    });
  });
};

exports.createAdmin = createAdmin;