"use strict";

/** @module s3/app */
require('s3/app', function (require, module, exports) {
  var _ = function _() {
    return '';
  };

  "use strict";

  var Dom = require("dom"),
      Car = require("s3/car"),
      Action = require("s3/tron.action"),
      Polyline = require("s3/polyline");

  exports.start = function () {
    var canvas = Dom("canvas"),
        ctx = canvas.getContext("2d"),
        player = new Car({
      action: Action.create({
        type: "keyboard"
      }),
      x: 12,
      y: 200,
      dir: 1,
      color: "#f80"
    }),
        ennemy = new Car({
      action: Action.create({
        type: "ai",
        targets: [player]
      }),
      x: 500,
      y: 312,
      dir: 3,
      color: "#789"
    }),
        cars = [player, ennemy],
        boundaries = createBoundaries();
    ennemy.action.car = ennemy;
    ennemy.action.cars = cars;
    ennemy.action.boundaries = boundaries;
    canvas.setAttribute("width", canvas.clientWidth);
    canvas.setAttribute("height", canvas.clientHeight);

    function anim(time) {
      window.requestAnimationFrame(anim);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = boundaries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var boundary = _step.value;
          paintPolyline(ctx, boundary, "#fff");
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

      for (var _i = 0; _i < cars.length; _i++) {
        var car = cars[_i];
        if (car.isDead) continue;
        paintPolyline(ctx, car.polyline, car.color);
        var x0 = car.polyline.lastX,
            y0 = car.polyline.lastY;
        car.move(time);
        var x1 = car.polyline.lastX,
            y1 = car.polyline.lastY;

        for (var _i2 = 0; _i2 < cars.length; _i2++) {
          var obstacle = cars[_i2];
          if (obstacle.isDead) continue;

          if (obstacle.polyline.collide(x0, y0, x1, y1)) {
            car.isDead = true;
            console.log("DEAD!");
            break;
          }
        }

        if (!car.isDead) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = boundaries[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _boundary = _step2.value;

              if (_boundary.collide(x0, y0, x1, y1)) {
                car.isDead = true;
                console.log("DEAD in boundary!");
                break;
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
        }
      }

      ;
    }

    window.requestAnimationFrame(anim);
  };

  function createBoundaries() {
    var w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 512;
    var h = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 512;
    var polyline = new Polyline(5, 55);
    polyline.move(0, h - 110);
    polyline.add();
    polyline.move(50, 0);
    polyline.add();
    polyline.move(0, 50);
    polyline.add();
    polyline.move(w - 110, 0);
    polyline.add();
    polyline.move(0, -50);
    polyline.add();
    polyline.move(50, 0);
    polyline.add();
    polyline.move(0, 110 - h);
    polyline.add();
    polyline.move(-50, 0);
    polyline.add();
    polyline.move(0, -50);
    polyline.add();
    polyline.move(110 - w, 0);
    polyline.add();
    polyline.move(0, 50);
    polyline.add();
    polyline.move(-50, 0);
    return [polyline];
  }

  function paintPolyline(ctx, polyline, color) {
    ctx.beginPath();
    ctx.moveTo(polyline.firstX, polyline.firstY);
    polyline.foreachTail(function (x, y) {
      return ctx.lineTo(x, y);
    });
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  module.exports._ = _;
});