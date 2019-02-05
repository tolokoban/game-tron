"use strict";

/** @module s3/tron.action */
require('s3/tron.action', function (require, module, exports) {
  var _ = function _() {
    return '';
  };

  "use strict";

  var Keyboard = require("s3/tron.action.keyboard");

  var ArtificialIntelligence = require("s3/tron.action.ai");

  exports.create = function (args) {
    switch (args.type) {
      case 'keyboard':
        return Keyboard.create(args);

      case 'ai':
        return ArtificialIntelligence.create(args);

      default:
        return null;
    }
  };

  module.exports._ = _;
});