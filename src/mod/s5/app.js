"use strict";

const Dom = require("dom"),
      Car = require("s5.car"),
      Action = require("s5.tron.action"),
      Polyline = require("s5.polyline"),
      CarWall= require("s5.painter.car-wall"),
      Resize = require("webgl.resize"),
      Camera= require("webgl.camera"),
      StandardCube= require("webgl.painter.standard-cube");


exports.start = function() {
  const canvas = Dom("canvas"),
        gl = canvas.getContext( "webgl", {} ),
        camera = new Camera(),
        cube = new StandardCube( gl ),
        player = new Car( {
          action: Action.create({ type: "keyboard" }),
          x: 0,
          y: 0,
          dir: 1,
          color: new Float32Array([1,1,0])
        } ),
        ennemy1 = new Car( {
          action: Action.create({ type: "ai", targets: [player] }),
          reaction: 100,
          x: 500 - 256,
          y: 312 - 256,
          dir: 3,
          color: new Float32Array([0,1,1])
        } ),
        ennemy2 = new Car( {
          action: Action.create({ type: "ai", targets: [player] }),
          reaction: 200,
          x: 256 - 256,
          y: 12 - 256,
          dir: 2,
          color: new Float32Array([1,0,1])
        } ),
        ennemy3 = new Car( {
          action: Action.create({ type: "ai", targets: [player] }),
          reaction: 300,
          x: 312 - 256,
          y: 500 - 256,
          dir: 0,
          color: new Float32Array([1, 0.5, 0.25])
        } ),
        cars = [player, ennemy1, ennemy2, ennemy3],
        carPainters = cars.map( car => new CarWall( gl, car.polyline, car.color ) ),
        boundaries = createBoundaries();  

  for( const ennemy of [ennemy1, ennemy2, ennemy3]) {
    ennemy.action.car = ennemy;
    ennemy.action.cars = cars;
    ennemy.action.boundaries = boundaries;
  }

  canvas.setAttribute( "width", canvas.clientWidth );
  canvas.setAttribute( "height", canvas.clientHeight );

  cube.translateTo( 0, 0, 0 );
  gl.clearColor( 0.3, 0.3, 0.3, 1);
    
  function anim( time ) {
    window.requestAnimationFrame( anim );

    if( Resize( gl ) ) {
      camera.aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
    }
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    
    const lat = .2 + Math.abs(Math.cos( time * 0.00009 )) * .5;
    const lng = time * 0.0001;

    camera.orbit( 0,0,0, 500, lat, lng );
    cube.paint( camera.matrix );

    carPainters.forEach(function (painter) {
      painter.paint( camera.matrix );
    });

    /*
    for( const boundary of boundaries ) {
      paintPolyline( gl, boundary, "#fff" );
    }
    */

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


function createBoundaries( w = 512, h = 512 ) {
  const x0 = w / 2,
        y0 = h / 2,
        polyline = new Polyline( 5 - x0, 55 - y0 );
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
