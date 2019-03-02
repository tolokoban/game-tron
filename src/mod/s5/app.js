"use strict";

const Dom = require("dom"),
      Car = require("s5.car"),
      Action = require("s5.tron.action"),
      Polyline = require("s5.polyline"),
      CarWall= require("s5.painter.car-wall"),
      Resize = require("webgl.resize"),
      Camera= require("webgl.camera");


exports.start = function() {
  const canvas = Dom("canvas"),
        gl = canvas.getContext( "webgl", {} ),
        camera = new Camera(),
        player = new Car( {
          action: Action.create({ type: "keyboard" }),
          x: -25,
          y: 0,
          dir: 1,
          color: new Float32Array([1,1,0])
        } ),
        ennemy1 = new Car( {
          action: Action.create({ type: "ai", targets: [player] }),
          reaction: 10,
          x: 25,
          y: 7,
          dir: 3,
          color: new Float32Array([0,1,1])
        } ),
        ennemy2 = new Car( {
          action: Action.create({ type: "ai", targets: [player] }),
          reaction: 20,
          x: 0,
          y: -24,
          dir: 2,
          color: new Float32Array([1,0,1])
        } ),
        ennemy3 = new Car( {
          action: Action.create({ type: "ai", targets: [player] }),
          reaction: 30,
          x: 6,
          y: -24,
          dir: 0,
          color: new Float32Array([1, 0.5, 0.25])
        } ),
        cars = [player, ennemy1, ennemy2, ennemy3],
        boundaries = createBoundaries(),
        boundaryPainter = new CarWall( gl, boundaries[0], new Float32Array([.3, .3, .3]) );

  cars.forEach(function (car) {
    car.painter = new CarWall( gl, car.polyline, car.color );
  });

  for( const ennemy of [ennemy1, ennemy2, ennemy3]) {
    ennemy.action.car = ennemy;
    ennemy.action.cars = cars;
    ennemy.action.boundaries = boundaries;
  }

  gl.clearColor( 0.3, 0.3, 0.3, 1);

  let lastTime = 0;
  let framesCount = 0;
  const fps = document.getElementById("FPS");

  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc( gl.LESS );

  function anim( time ) {
    window.requestAnimationFrame( anim );

    framesCount++;
    if( framesCount > 15 ) {
      framesCount = 0;
      fps.textContent = `${Math.floor( 0.5 + (16000 / (time - lastTime)))} FPS`;
      lastTime = time;
    }

    if( Resize( gl, 1 ) ) {
      camera.aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
    }

    //gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    const lat = .35 + Math.abs(Math.cos( time * 0.00009 )) * .3;
    const lng = time * 0.0001;

    camera.orbit( player.polyline.lastX,player.polyline.lastY,0, 50, lat, lng );

    boundaryPainter.paint( camera.matrix );
    for( const car of cars) {
      if( car.isDead ) continue;
      car.painter.paint( camera.matrix );
    }

    for( const car of cars) {
      if( car.isDead ) continue;

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


function createBoundaries( w = 60, h = 60 ) {
  const x0 = w / 2,
        y0 = h / 2,
        polyline = new Polyline( - x0, 5 - y0 );
  polyline.move( 0, h - 11 );
  polyline.add();
  polyline.move( 5, 0 );
  polyline.add();
  polyline.move( 0, 5 );
  polyline.add();
  polyline.move( w - 11, 0 );
  polyline.add();
  polyline.move( 0, -5 );
  polyline.add();
  polyline.move( 5, 0 );
  polyline.add();
  polyline.move( 0, 11 - h );
  polyline.add();
  polyline.move( -5, 0 );
  polyline.add();
  polyline.move( 0, -5 );
  polyline.add();
  polyline.move( 11 - w, 0 );
  polyline.add();
  polyline.move( 0, 5 );
  polyline.add();
  polyline.move( -5, 0 );

  return [polyline];
}
