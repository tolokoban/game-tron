"use strict";

/** @module s1/tron.action */
require('s1/tron.action', function (require, module, exports) {
  var _ = function _() {
    return '';
  };

  "use strict";

  var Keyboard = require("s1/tron.action.keyboard");

  exports.NONE = Keyboard.NONE;
  exports.LEFT = Keyboard.LEFT;
  exports.RIGHT = Keyboard.RIGHT;

  exports.create = function (args) {
    switch (args.type) {
      case 'keyboard':
        return Keyboard.create(args);

      default:
        return null;
    }
  };

  module.exports._ = _;
});