"use strict"

const {
  readonly
} = require("common");

const Context = {
  isLoaded: false,
  player1RightPressed: false,
  player1LeftPressed: false,
  player1AccelPressed: false,
};

const
  NONE = 0,
  LEFT = 1,
  RIGHT = 2;

exports.NONE = NONE;
exports.LEFT = LEFT;
exports.RIGHT = RIGHT;

exports.create = create;


class Keyboard {
  constructor() {

  }
}

function create(args) {
  return new Keyboard(args);
};