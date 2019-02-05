"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** @module s1/car */
require('s1/car', function (require, module, exports) {
  var _ = function _() {
    return '';
  };

  "use strict";

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
          this.addSegmentToWalls();
          this.dir = (this.dir + RIGHT) % DIRECTIONS.length;
        } else if (action.actionLeft) {
          this.addSegmentToWalls();
          this.dir = (this.dir + LEFT) % DIRECTIONS.length;
        }

        if (action.actionAccel) {
          this.speed = this.maxSpeed;
        } // ---------------------------------
        // Déplacement en fonction du temps.


        var x0 = this.walls[0],
            y0 = this.walls[1],
            dirV = DIRECTIONS[this.dir],
            x1 = x0 + this.speed * delta * dirV[0],
            y1 = y0 + this.speed * delta * dirV[1];
        this.x = x1;
        this.y = y1;
        this.walls[0] = x1;
        this.walls[1] = y1;
      }
    }, {
      key: "addSegmentToWalls",
      value: function addSegmentToWalls() {
        var _this$walls = _slicedToArray(this.walls, 2),
            x = _this$walls[0],
            y = _this$walls[1];

        this.walls.unshift(x, y);
      }
    }]);

    return Car;
  }();

  module.exports = Car;
  module.exports._ = _;
});