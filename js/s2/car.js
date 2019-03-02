"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** @module s2/car */
require('s2/car', function (require, module, exports) {
  var _ = function _() {
    return '';
  };

  "use strict";

  var Polyline = require("s2/polyline"),
      _require = require("common"),
      readonly = _require.readonly;

  var MINUS_ONE = -1;
  var DIRECTIONS = [[0, MINUS_ONE], [1, 0], [0, 1], [MINUS_ONE, 0]];
  var RIGHT = 1;
  var LEFT = 3;
  var DEFAULT_X = 0;
  var DEFAULT_Y = 256;

  var Car =
  /*#__PURE__*/
  function () {
    function Car(action) {
      var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_X;
      var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_Y;
      var dir = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : RIGHT;

      _classCallCheck(this, Car);

      this.action = action;
      this.walls = [x, y, x, y];
      this.minSpeed = 0.050;
      this.speed = this.minSpeed;
      this.maxSpeed = 0.250;
      this.break = 0.0005;
      this.lastTime = 0;
      this.dir = dir;
      readonly(this, {
        polyline: new Polyline(x, y)
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
        this.lastTime = time; // -------------
        // Décelération.

        if (this.speed > this.minSpeed) {
          this.speed = Math.max(this.minSpeed, this.speed - this.break * delta);
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
        } // ---------------------------------------
        // Déplacement dans la direction courante.


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
//# sourceMappingURL=car.js.map