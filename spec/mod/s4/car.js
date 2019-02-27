"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** @module s4/car */
require('s4/car', function (require, module, exports) {
  var _ = function _() {
    return '';
  };

  "use strict";

  var Polyline = require("s4/polyline"),
      _require = require("common"),
      readonly = _require.readonly;

  var IDX_X = 0;
  var IDX_Y = 1;
  var MINUS_ONE = -1;
  var DIRECTIONS = [[0, MINUS_ONE], [1, 0], [0, 1], [MINUS_ONE, 0]];
  var NB_DIRS = DIRECTIONS.length;
  var RIGHT = 1;
  var LEFT = 3;
  var DEFAULT_X = 0;
  var DEFAULT_Y = 256;
  var MIN_SPEED = 0.050;
  var MAX_SPEED = 0.250;
  var BREAK = 0.0005;

  var Car =
  /*#__PURE__*/
  function () {
    function Car(_ref) {
      var action = _ref.action,
          _ref$x = _ref.x,
          x = _ref$x === void 0 ? DEFAULT_X : _ref$x,
          _ref$y = _ref.y,
          y = _ref$y === void 0 ? DEFAULT_Y : _ref$y,
          _ref$dir = _ref.dir,
          dir = _ref$dir === void 0 ? RIGHT : _ref$dir,
          _ref$color = _ref.color,
          color = _ref$color === void 0 ? "cyan" : _ref$color,
          _ref$minSpeed = _ref.minSpeed,
          minSpeed = _ref$minSpeed === void 0 ? MIN_SPEED : _ref$minSpeed,
          _ref$maxSpeed = _ref.maxSpeed,
          maxSpeed = _ref$maxSpeed === void 0 ? MAX_SPEED : _ref$maxSpeed,
          _ref$breakPower = _ref.breakPower,
          breakPower = _ref$breakPower === void 0 ? BREAK : _ref$breakPower;

      _classCallCheck(this, Car);

      var that = this;
      this.action = action;
      this.speed = minSpeed;
      this.lastTime = 0;
      this.dir = dir;
      readonly(this, {
        minSpeed: minSpeed,
        maxSpeed: maxSpeed,
        breakPower: breakPower,
        color: color,
        polyline: new Polyline(x, y),
        dirRight: function dirRight() {
          return (that.dir + RIGHT) % NB_DIRS;
        },
        dirLeft: function dirLeft() {
          return (that.dir + LEFT) % NB_DIRS;
        },
        vx: function vx() {
          return DIRECTIONS[that.dir][IDX_X];
        },
        vy: function vy() {
          return DIRECTIONS[that.dir][IDX_Y];
        },
        vxRight: function vxRight() {
          return DIRECTIONS[that.dirRight][IDX_X];
        },
        vyRight: function vyRight() {
          return DIRECTIONS[that.dirRight][IDX_Y];
        },
        vxLeft: function vxLeft() {
          return DIRECTIONS[that.dirLeft][IDX_X];
        },
        vyLeft: function vyLeft() {
          return DIRECTIONS[that.dirLeft][IDX_Y];
        }
      });
    }

    _createClass(Car, [{
      key: "move",
      value: function move(time) {
        if (this.lastTime === 0) {
          this.lastTime = time;
          return;
        }

        var delta = time - this.lastTime;
        this.lastTime = time;
        this.action.process(time, delta); // -------------
        // Décelération.

        if (this.speed > this.minSpeed) {
          this.speed = Math.max(this.minSpeed, this.speed - this.breakPower * delta);
        } // --------------------
        // Gestion des touches.


        var action = this.action;

        if (action.actionRight) {
          this.polyline.add();
          this.dir = (this.dir + RIGHT) % DIRECTIONS.length;
        } else if (action.actionLeft) {
          this.polyline.add();
          this.dir = (this.dir + LEFT) % DIRECTIONS.length;
        }

        if (action.actionAccel) {
          this.speed = this.maxSpeed;
        }

        var dirV = DIRECTIONS[this.dir],
            vx = this.speed * delta * dirV[0],
            vy = this.speed * delta * dirV[1];
        this.polyline.move(vx, vy);
      }
    }]);

    return Car;
  }();

  module.exports = Car;
  module.exports._ = _;
});