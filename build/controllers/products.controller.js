"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProductById = exports.getProducts = exports.getProductById = exports.deleteProductById = exports.createProduct = void 0;

var _Products = _interopRequireWildcard(require("../models/Products"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var createProduct = function createProduct(req, res) {
  console.log(req.body);
  var _req$body = req.body,
      name = _req$body.name,
      category = _req$body.category,
      price = _req$body.price,
      imgUrl = _req$body.imgUrl;
  var newProduct = new _Products["default"]({
    name: name,
    category: category,
    price: price,
    imgUrl: imgUrl
  });
  newProduct.save().then(function (productSave) {
    return res.status(201).json(productSave);
  });
};

exports.createProduct = createProduct;

var getProducts = function getProducts(req, res) {
  _Products["default"].find().then(function (productList) {
    return res.json(productList);
  });
};

exports.getProducts = getProducts;

var getProductById = function getProductById(req, res) {
  _Products["default"].findById(req.params.productId).then(function (product) {
    return res.status().json(product);
  });
};

exports.getProductById = getProductById;

var updateProductById = function updateProductById(req, res) {
  _Products["default"].findByIdAndUpdate(req.params.productId, req.body, {
    "new": true
  }).then(function (updatedProduct) {
    return res.status(204).json(updatedProduct);
  });
};

exports.updateProductById = updateProductById;

var deleteProductById = function deleteProductById(req, res) {
  var productId = req.params.productId;

  _Products["default"].findByIdAndDelete(productId).then(function () {
    return res.status(204).json();
  });
};

exports.deleteProductById = deleteProductById;