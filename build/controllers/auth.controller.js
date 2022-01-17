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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signUp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, username, email, password, roles, favourites, userFound, newUser, foundRoles, role, userSaved, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, roles = _req$body.roles, favourites = _req$body.favourites;
            _context.next = 3;
            return _User["default"].find({
              username: username
            });

          case 3:
            userFound = _context.sent;
            _context.t0 = _User["default"];
            _context.t1 = username;
            _context.t2 = email;
            _context.next = 9;
            return _User["default"].encryptPassword(password);

          case 9:
            _context.t3 = _context.sent;
            _context.t4 = favourites;
            _context.t5 = {
              username: _context.t1,
              email: _context.t2,
              password: _context.t3,
              favourites: _context.t4
            };
            newUser = new _context.t0(_context.t5);

            if (!req.body.roles) {
              _context.next = 20;
              break;
            }

            _context.next = 16;
            return _Role["default"].find({
              name: {
                $in: roles
              }
            });

          case 16:
            foundRoles = _context.sent;
            newUser.roles = foundRoles.map(function (role) {
              return role._id;
            });
            _context.next = 24;
            break;

          case 20:
            _context.next = 22;
            return _Role["default"].findOne({
              name: "user"
            });

          case 22:
            role = _context.sent;
            newUser.roles = [role._id];

          case 24:
            if (!userFound) {
              _context.next = 26;
              break;
            }

            return _context.abrupt("return");

          case 26:
            _context.next = 28;
            return newUser.save();

          case 28:
            userSaved = _context.sent;
            token = _jsonwebtoken["default"].sign({
              id: userSaved._id
            }, _config["default"].SECRET, {
              expiresIn: 86400
            });
            console.log(userSaved);
            res.status(200).json({
              token: token
            });

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function signUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signUp = signUp;

var signIn = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var userFound, validatePass, token;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _User["default"].findOne({
              email: req.body.email
            }).populate("roles");

          case 2:
            userFound = _context2.sent;
            console.log(req, _User["default"]);

            if (userFound) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: 'User not found'
            }));

          case 6:
            if (req.body.password) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.status(401).json({
              token: null,
              message: 'Complete pass'
            }));

          case 8:
            _context2.next = 10;
            return _User["default"].comparePassword(req.body.password, userFound.password);

          case 10:
            validatePass = _context2.sent;

            if (validatePass) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", res.status(401).json({
              token: null,
              message: 'Invalid pass'
            }));

          case 13:
            token = _jsonwebtoken["default"].sign({
              id: userFound._id
            }, _config["default"].SECRET, {
              expiresIn: 86400
            });
            console.log(userFound);
            res.json({
              token: token
            });

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function signIn(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signIn = signIn;