"use strict"

const Keyboard = require("tron.action.keyboard");

exports.NONE = Keyboard.NONE;
exports.LEFT = Keyboard.LEFT;
exports.RIGHT = Keyboard.RIGHT;

exports.create = function(args) {
  switch (type) {
    case 'keyboard':
      return Keyboard.create(args)
    default:
      return null;
  }
};