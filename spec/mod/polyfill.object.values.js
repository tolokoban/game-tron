"use strict";

/** @module polyfill.object.values */
require('polyfill.object.values', function (require, module, exports) {
  var _ = function () {
    var D = {
      "en": {},
      "fr": {}
    },
        X = require("$").intl;

    function _() {
      return X(D, arguments);
    }

    _.all = D;
    return _;
  }();

  if (!Object.values) {
    window.Object.values = function (obj) {
      var values = [];

      for (var key in obj) {
        values.push(obj[key]);
      }

      return values;
    };
  }

  module.exports._ = _;
});