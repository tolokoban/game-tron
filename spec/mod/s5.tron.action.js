"use strict";require("s5.tron.action",function(require,module,exports){var Keyboard=require("s5.tron.action.keyboard"),ArtificialIntelligence=require("s5.tron.action.ai");exports.create=function(args){switch(args.type){case"keyboard":return Keyboard.create(args);case"ai":return ArtificialIntelligence.create(args);default:return null;}},module.exports._=function _(){return""}});