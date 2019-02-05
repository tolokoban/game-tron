"use strict";

/** @module s2/app */
require('s2/app', function (require, module, exports) {
  var _ = function _() {
    return '';
  };

  "use strict";

  var Dom = require("dom"),
      Car = require("s2/car"),
      Action = require("s2/tron.action");

  exports.start = function () {
    var canvas = Dom("canvas"),
        ctx = canvas.getContext("2d"),
        action = Action.create({
      type: "keyboard"
    }),
        car = new Car(action);
    canvas.setAttribute("width", canvas.clientWidth);
    canvas.setAttribute("height", canvas.clientHeight);

    function anim(time) {
      window.requestAnimationFrame(anim);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (car.isDead) return;
      var polyline = car.polyline;
      ctx.beginPath();
      ctx.moveTo(polyline.firstX, polyline.firstY);
      polyline.foreachTail(function (x, y) {
        return ctx.lineTo(x, y);
      });
      ctx.strokeStyle = "#f70";
      ctx.stroke();
      var x0 = car.polyline.lastX,
          y0 = car.polyline.lastY;
      car.move(time);
      var x1 = car.polyline.lastX,
          y1 = car.polyline.lastY;

      if (car.polyline.collide(x0, y0, x1, y1)) {
        car.isDead = true;
        console.log("DEAD!");
      }
    }

    window.requestAnimationFrame(anim);

    var Polyline = require("s2/polyline");

    var poly = new Polyline(0, 100);
    poly.move(100, 0);
    poly.add();
    poly.move(0, -50);
    poly.add();
    poly.move(-50, 0);
    var a = poly.collide(75, 40, 75, 60);
    console.info("[s2/app] a=", a);
  };

  module.exports._ = _;
});