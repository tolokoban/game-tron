"use strict";

const Dom = require("dom"),
      Car = require("s2/car"),
      Action = require("s2/tron.action");


exports.start = function() {
    const canvas = Dom("canvas"),
          ctx = canvas.getContext( "2d" ),
          action = Action.create({ type: "keyboard" }),
          car = new Car( action );

    canvas.setAttribute( "width", canvas.clientWidth );
    canvas.setAttribute( "height", canvas.clientHeight );

    function anim( time ) {
        window.requestAnimationFrame( anim );

        ctx.clearRect( 0, 0, canvas.width, canvas.height );

        if( car.isDead ) return;

        const polyline = car.polyline;
        ctx.beginPath();
        ctx.moveTo( polyline.firstX, polyline.firstY );
        polyline.foreachTail( (x, y) => ctx.lineTo( x, y ) );
        ctx.strokeStyle = "#f70";
        ctx.stroke();

        const x0 = car.polyline.lastX,
              y0 = car.polyline.lastY;
        car.move( time );
        const x1 = car.polyline.lastX,
              y1 = car.polyline.lastY;

        if( car.polyline.collide( x0, y0, x1, y1 ) ) {
            car.isDead = true;
            console.log( "DEAD!" );
        }
    }

    window.requestAnimationFrame( anim );

    const Polyline = require("s2/polyline");
    const poly = new Polyline(0, 100);
    poly.move(100, 0);
    poly.add();
    poly.move(0, -50);
    poly.add();
    poly.move(-50, 0);
    const a = poly.collide( 75, 40, 75, 60 );
    console.info("[s2/app] a=", a);
};
