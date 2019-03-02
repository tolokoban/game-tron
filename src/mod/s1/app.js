"use strict";

const Dom = require("dom"),
      Car = require("s1.car"),
      Action = require("s1.tron.action");


const DIMENSION = 2;


exports.start = function() {
    const canvas = Dom("canvas"),
          ctx = canvas.getContext( "2d" ),
          action = Action.create({ type: "keyboard" }),
          car = new Car( action );

    canvas.setAttribute( "width", canvas.clientWidth );
    canvas.setAttribute( "height", canvas.clientHeight );

    function anim( time ) {
        ctx.clearRect( 0, 0, canvas.width, canvas.height );

        const walls = car.walls;
        ctx.beginPath();
        ctx.moveTo( walls[0], walls[1] );
        for( let i = 2; i < walls.length; i += DIMENSION ) {
            ctx.lineTo( walls[i], walls[i + 1] );
        }
        ctx.strokeStyle = "#0f0";
        ctx.stroke();

        car.move( time );

        window.requestAnimationFrame( anim );
    }

    window.requestAnimationFrame( anim );
};
