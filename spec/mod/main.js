"use strict";

/** @module main */
require('main', function (require, module, exports) {
  var _ = function () {
    var D = {
      "en": {
        "welcome": "Welcome in the world of"
      },
      "fr": {
        "welcome": "Bienvenue dans le monde de"
      }
    },
        X = require("$").intl;

    function _() {
      return X(D, arguments);
    }

    _.all = D;
    return _;
  }();

  "use strict";

  exports.start = start;

  var Action = require("tron.action");
  /**
   * @return {undefined}
   */


  function start() {
    var action = Action.create({
      type: 'keyboard'
    });
  }
  /**
   * @this {Action}
   * @return {undefined}
   */


  function test() {}

  module.exports._ = _;
});