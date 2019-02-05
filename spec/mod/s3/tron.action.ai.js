"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** @module s3/tron.action.ai */
require('s3/tron.action.ai', function (require, module, exports) {
  var _ = function _() {
    return '';
  };

  "use strict";

  var _require = require("common"),
      readonly = _require.readonly;

  var NONE = 0,
      LEFT = 1,
      RIGHT = 2,
      ACCEL = 3;

  var Ai =
  /*#__PURE__*/
  function () {
    function Ai(_ref) {
      var car = _ref.car,
          cars = _ref.cars,
          boundaries = _ref.boundaries;

      _classCallCheck(this, Ai);

      var that = this;
      this.status = NONE;
      this.car = car;
      this.cars = cars;
      this.boundaries = boundaries;
      this.lastTime = 0;
      readonly(this, {
        actionRight: function actionRight() {
          return that.status === RIGHT;
        },
        actionLeft: function actionLeft() {
          return that.status === LEFT;
        },
        actionAccel: function actionAccel() {
          return that.status === ACCEL;
        }
      });
    }

    _createClass(Ai, [{
      key: "process",
      value: function process(time) {
        if (time - this.lastTime < 100) {
          this.status = NONE;
          return;
        }

        var car = this.car,
            x0 = car.polyline.lastX,
            y0 = car.polyline.lastY,
            x1 = x0 + car.vx * 10,
            y1 = y0 + car.vy * 10;

        if (this.collide(x0, y0, x1, y1)) {
          var rnd = Math.random() * 1000;

          if (rnd < 500) {
            var x1R = x0 + car.vxRight * 15,
                y1R = y0 + car.vyRight * 15;
            this.status = this.collide(x0, y0, x1R, y1R) ? LEFT : RIGHT;
          } else {
            var x1L = x0 + car.vxLeft * 15,
                y1L = y0 + car.vyLeft * 15;
            this.status = this.collide(x0, y0, x1L, y1L) ? LEFT : RIGHT;
          }
        } else {
          this.status = NONE;

          var _rnd = Math.random() * 1000;

          if (_rnd > 995) {
            this.status = RIGHT;
          } else if (_rnd > 990) {
            this.status = LEFT;
          } else if (_rnd > 988) {
            this.status = ACCEL;
          } else {
            this.status = NONE;
          }
        }

        if (this.status !== NONE) {
          this.lastTime = time;
        }
      }
    }, {
      key: "collide",
      value: function collide(x0, y0, x1, y1) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.cars[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var obstacle = _step.value;
            if (obstacle.isDead) continue;

            if (obstacle.polyline.collide(x0, y0, x1, y1)) {
              return true;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.boundaries[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var boundary = _step2.value;

            if (boundary.collide(x0, y0, x1, y1)) {
              return true;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return false;
      }
    }]);

    return Ai;
  }();

  exports.create = function (args) {
    return new Ai(args);
  };

  module.exports._ = _;
});