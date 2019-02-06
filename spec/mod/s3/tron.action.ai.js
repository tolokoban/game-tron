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
  var DEFAULT_REACTION_TIME = 150,
      DEFAULT_FRONT_RADAR = 10,
      DEFAULT_SIDE_RADAR = 20;
  var DICE_MAX_VALUE = 1000,
      HALF = 0.5;

  var Ai =
  /*#__PURE__*/
  function () {
    /**
     * @param {array}  cars - Tableau des  véhicules (objets de  type Car). Utile pour  éviter leurs
     * murs.
     * @param {array} boundaries  - Tableau des murs  d'enceinte qu'il faut éviter  aussi (objets de
     * type Polyline).
     * @param {int} reaction - Temps minimal entre deux prises de décision (en millisecondes).
     */
    function Ai(_ref) {
      var car = _ref.car,
          cars = _ref.cars,
          boundaries = _ref.boundaries,
          _ref$reaction = _ref.reaction,
          reaction = _ref$reaction === void 0 ? DEFAULT_REACTION_TIME : _ref$reaction,
          _ref$frontRadar = _ref.frontRadar,
          frontRadar = _ref$frontRadar === void 0 ? DEFAULT_FRONT_RADAR : _ref$frontRadar,
          _ref$sideRadar = _ref.sideRadar,
          sideRadar = _ref$sideRadar === void 0 ? DEFAULT_SIDE_RADAR : _ref$sideRadar;

      _classCallCheck(this, Ai);

      var that = this;
      this.status = NONE;
      this.car = car;
      this.cars = cars;
      this.boundaries = boundaries;
      this.lastTime = 0;
      readonly(this, {
        reaction: reaction,
        frontRadar: frontRadar,
        sideRadar: sideRadar,
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
        if (time - this.lastTime < this.reaction) {
          this.status = NONE;
          return;
        }

        var car = this.car,
            x0 = car.polyline.lastX,
            y0 = car.polyline.lastY,
            x1 = x0 + car.vx * this.frontRadar,
            y1 = y0 + car.vy * this.frontRadar;

        if (this.collide(x0, y0, x1, y1)) {
          if (rollDice() < DICE_MAX_VALUE * HALF) this.turnRightIfSafe();else this.turnLeftIfSafe();
        } else {
          var rnd = rollDice();
          if (rnd < 3) this.turnRightIfSafe();else if (rnd < 6) this.turnLeftIfSafe();else if (rnd < 8) this.status = ACCEL;else this.status = NONE;
        }

        if (this.status !== NONE) {
          this.lastTime = time;
        }
      }
    }, {
      key: "turnRightIfSafe",
      value: function turnRightIfSafe() {
        var car = this.car,
            x0 = car.polyline.lastX,
            y0 = car.polyline.lastY,
            x1R = x0 + car.vxRight * this.sideRadar,
            y1R = y0 + car.vyRight * this.sideRadar;
        this.status = this.collide(x0, y0, x1R, y1R) ? NONE : RIGHT;
      }
    }, {
      key: "turnLeftIfSafe",
      value: function turnLeftIfSafe() {
        var car = this.car,
            x0 = car.polyline.lastX,
            y0 = car.polyline.lastY,
            x1L = x0 + car.vxLeft * this.sideRadar,
            y1L = y0 + car.vyLeft * this.sideRadar;
        this.status = this.collide(x0, y0, x1L, y1L) ? NONE : LEFT;
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

  function rollDice() {
    return Math.random() * DICE_MAX_VALUE;
  }

  exports.create = function (args) {
    return new Ai(args);
  };

  module.exports._ = _;
});