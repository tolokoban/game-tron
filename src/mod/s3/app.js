"use strict";

const Dom = require("dom"),
      Car = require("s3/car"),
      Action = require("s3/tron.action"),
      Polyline = require("s3/polyline");


exports.start = function() {
    const canvas = Dom("canvas"),
          ctx = canvas.getContext( "2d" ),
          player = new Car( {
              action: Action.create({ type: "keyboard" }),
              x: 12,
              y: 200,
              dir: 1,
              color: "#f80"
          } ),
          ennemy = new Car( {
              action: Action.create({ type: "ai", targets: [player] }),
              x: 500,
              y: 312,
              dir: 3,
              color: "#789"
          } ),
          cars = [player, ennemy],
          boundaries = createBoundaries();

    ennemy.action.car = ennemy;
    ennemy.action.cars = cars;
    ennemy.action.boundaries = boundaries;

    canvas.setAttribute( "width", canvas.clientWidth );
    canvas.setAttribute( "height", canvas.clientHeight );

    function anim( time ) {
        window.requestAnimationFrame( anim );

        ctx.clearRect( 0, 0, canvas.width, canvas.height );

        for( const boundary of boundaries ) {
            paintPolyline( ctx, boundary, "#fff" );
        }

        for( const car of cars) {
            if( car.isDead ) continue;

            paintPolyline( ctx, car.polyline, car.color );

            const x0 = car.polyline.lastX,
                  y0 = car.polyline.lastY;
            car.move( time );
            const x1 = car.polyline.lastX,
                  y1 = car.polyline.lastY;

            for( const obstacle of cars ) {
                if( obstacle.isDead ) continue;
                if( obstacle.polyline.collide( x0, y0, x1, y1 ) ) {
                    car.isDead = true;
                    console.log( "DEAD!" );
                    break;
                }
            }
            if( !car.isDead ) {
                for( const boundary of boundaries ) {
                    if( boundary.collide( x0, y0, x1, y1 ) ) {
                        car.isDead = true;
                        console.log( "DEAD in boundary!" );
                        break;
                    }
                }
            }
        };
    }

    window.requestAnimationFrame( anim );
};


function createBoundaries( w = 512, h = 512 ) {
    const polyline = new Polyline( 5, 55 );
    polyline.move( 0, h - 110 );
    polyline.add();
    polyline.move( 50, 0 );
    polyline.add();
    polyline.move( 0, 50 );
    polyline.add();
    polyline.move( w - 110, 0 );
    polyline.add();
    polyline.move( 0, -50 );
    polyline.add();
    polyline.move( 50, 0 );
    polyline.add();
    polyline.move( 0, 110 - h );
    polyline.add();
    polyline.move( -50, 0 );
    polyline.add();
    polyline.move( 0, -50 );
    polyline.add();
    polyline.move( 110 - w, 0 );
    polyline.add();
    polyline.move( 0, 50 );
    polyline.add();
    polyline.move( -50, 0 );

    return [polyline];
}


function paintPolyline( ctx, polyline, color ) {
    ctx.beginPath();
    ctx.moveTo( polyline.firstX, polyline.firstY );
    polyline.foreachTail( (x, y) => ctx.lineTo( x, y ) );
    ctx.strokeStyle = color;
    ctx.stroke();
}
