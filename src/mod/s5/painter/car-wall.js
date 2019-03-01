"use strict";

const Program = require("webgl.program");


class CarWall {
  constructor( gl, polyline, color ) {
    this.gl = gl;
    this.prg = new Program( gl, GLOBAL );
    this.polyline = polyline;
    this.color = color;
    this.buffVert = gl.createBuffer();
    this.buffElem = createElemBuff( gl, polyline.capacity );
  }

  paint( cameraMatrix ) {
    const { gl, prg, polyline, buffElem, buffVert, color } = this;

    prg.use();
    prg.$uniColor = color;
    prg.$uniProjection = cameraMatrix;

    prg.bindAttribs( buffVert, "attPoint" );
    
    gl.bindBuffer(gl.ARRAY_BUFFER, buffVert);
    gl.bufferData(gl.ARRAY_BUFFER, polyline.data, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffElem);
    gl.drawElements( gl.TRIANGLES, polyline.capacity * 6, gl.UNSIGNED_SHORT, 0 );
  }
}


function createElemBuff( gl, capacity ) {
  const elem = [],
        buff = gl.createBuffer();
  let ptr = 0;

  for( let i=0; i<capacity; i++ ) {
    elem.push(
      ptr + 0,
      ptr + 1,
      ptr + 2,
      ptr + 1,
      ptr + 2,
      ptr + 3
    );
    ptr += 4;
  }

  gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, buff );
  gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( elem ), gl.STATIC_DRAW );

  console.info("[car-wall] elem=", elem);
  return buff;
}

module.exports = CarWall;
