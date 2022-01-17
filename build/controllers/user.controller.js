"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.getUsers = exports.getUser = exports.createUser = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, email, password, rolesFound, user, savedUser;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            rolesFound = ['admin'];
            user = new _User["default"]({
              username: email,
              email: email,
              password: password,
              roles: rolesFound.map(function (role) {
                return role._id;
              }),
              favourites: []
            });
            _context.next = 6;
            return _User["default"].encryptPassword(user.password);

          case 6:
            user.password = _context.sent;
            _context.next = 9;
            return user.save();

          case 9:
            savedUser = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              _id: savedUser._id,
              username: savedUser.username,
              email: savedUser.email,
              roles: savedUser.roles,
              favourites: savedUser.favourites
            }));

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));

  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createUser = createUser;

var getUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var token, decoded, userData;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            token = req.headers["x-access-token"];
            decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
            _context2.next = 4;
            return _User["default"].findById(decoded.id);

          case 4:
            userData = _context2.sent;
            res.json(userData);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUser = getUser;

var updateUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var token, decoded, updatedUser;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            token = req.headers["x-access-token"];
            decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
            _context3.next = 4;
            return _User["default"].findByIdAndUpdate(decoded.id, req.body, {
              "new": true
            });

          case 4:
            updatedUser = _context3.sent;
            res.status(200).json(updatedUser);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function updateUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateUser = updateUser;

var getUsers = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getUsers(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getUsers = getUsers;