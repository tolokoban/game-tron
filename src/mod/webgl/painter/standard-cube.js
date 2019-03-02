/**
 * Unit length cube that you can only translate.
 * Used to calibrate your camera.
 *
 * You can see the axis names on each face. For instance, the faces orthogonal to the X axis are red
 * with the X  letter written in the center.  The face which is  opposite to the X axis  has a minus
 * sign preceding the "X"
 */
"use strict";

const Program = require("webgl.program");


class StandardCube {
  constructor( gl ) {
    const size = 128;
    this.texture = createTexture( gl, size );
    this.location = new Float32Array( 3 );
    this.buffVert = createVertexBuffer( gl );
    this.prg = new Program( gl, GLOBAL );
    this.gl = gl;
  }

  translateTo( x, y, z ) {
    this.location[0] = x;
    this.location[1] = y;
    this.location[2] = z;
  }

  paint( cameraMatrix ) {
    const { gl, prg, buffVert, texture, location } = this;

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc( gl.LESS );
    
    prg.use();    
    prg.$uniProjection = cameraMatrix;
    prg.$uniLocation = location;
    prg.$uniTexture = 0;
    gl.activeTexture( gl.TEXTURE0 );
    gl.bindTexture( gl.TEXTURE_2D, texture );

    prg.bindAttribs( buffVert, "attPoint", "attUV" );
    gl.bindBuffer( gl.ARRAY_BUFFER, buffVert );

    gl.drawArrays( gl.TRIANGLES, 0, 36 );
  }
}


function createVertexBuffer( gl ) {
  const f = .5,   // Front
        b = -f,   // Back
        margin = 0.01,
        texW = 1 / 2,
        texH = 1 / 3,
        xp0u = margin,
        xp1u = texW - margin,
        xp0v = margin,
        xp1v = texH - margin,
        xn0u = 2 * texW - margin,
        xn1u = texW + margin,
        xn0v = margin,
        xn1v = texH - margin,
        yp0u = xp1u,
        yp1u = xp0u,
        yp0v = xp0v + texH,
        yp1v = xp1v + texH,
        yn0u = xn1u,
        yn1u = xn0u,
        yn0v = xn0v + texH,
        yn1v = xn1v + texH,
        zp0u = yp1u,
        zp1u = yp0u,
        zp0v = yp0v + texH,
        zp1v = yp1v + texH,
        zn0u = yn1u,
        zn1u = yn0u,
        zn0v = yn0v + texH,
        zn1v = yn1v + texH,
        vert = new Float32Array([
          // +X
          f, b, b, xp0u, xp1v,
          f, f, b, xp1u, xp1v,
          f, f, f, xp1u, xp0v,
          f, b, b, xp0u, xp1v,
          f, f, f, xp1u, xp0v,
          f, b, f, xp0u, xp0v,
          // -X
          b, b, b, xn0u, xn1v,
          b, f, f, xn1u, xn0v,
          b, f, b, xn1u, xn1v,
          b, b, b, xn0u, xn1v,
          b, b, f, xn0u, xn0v,
          b, f, f, xn1u, xn0v,
          // +Y
          b, f, b, yp0u, yp1v,
          f, f, b, yp1u, yp1v,
          f, f, f, yp1u, yp0v,
          b, f, b, yp0u, yp1v,
          f, f, f, yp1u, yp0v,
          b, f, f, yp0u, yp0v,
          // -Y
          b, b, b, yn0u, yn1v,
          f, b, f, yn1u, yn0v,
          f, b, b, yn1u, yn1v,
          b, b, b, yn0u, yn1v,
          b, b, f, yn0u, yn0v,
          f, b, f, yn1u, yn0v,
          // +Z
          b, b, f, zp0u, zp1v,
          f, b, f, zp1u, zp1v,
          f, f, f, zp1u, zp0v,
          b, b, f, zp0u, zp1v,
          f, f, f, zp1u, zp0v,
          b, f, f, zp0u, zp0v,
          // -Z
          b, b, b, zn0u, zn1v,
          f, f, b, zn1u, zn0v,
          f, b, b, zn1u, zn1v,
          b, b, b, zn0u, zn1v,
          b, f, b, zn0u, zn0v,
          f, f, b, zn1u, zn0v
        ]),
        buff = gl.createBuffer();
  
  gl.bindBuffer(gl.ARRAY_BUFFER, buff);
  gl.bufferData(gl.ARRAY_BUFFER, vert, gl.STATIC_DRAW);

  return buff;
}


function createTexture( gl, size ) {
  const canvas = createCanvas( size ),
        texture = gl.createTexture(),
        width = size * 2,
        height = size * 3;

  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);

  return texture;
}


function createCanvas( size ) {
  const canvas = document.createElement( "canvas" ),
        ctx = canvas.getContext( "2d" ),
        w = size / 20,
        h = size / 30;
  canvas.setAttribute( "width", size * 2 );
  canvas.setAttribute( "height", size * 3 );

  ctx.fillStyle = "#a00";
  ctx.fillRect( 0, 0, size * 2, size );
  ctx.fillStyle = "#f00";
  ctx.fillRect( w, h, size - 2*w, size -2*h );
  ctx.fillRect( size + w, h, size - 2*w, size -2*h );
  ctx.fillStyle = "#0a0";
  ctx.fillRect( 0, size, size * 2, size );
  ctx.fillStyle = "#0f0";
  ctx.fillRect( w, size + h, size - 2*w, size - 2*h );
  ctx.fillRect( size + w, size + h, size - 2*w, size - 2*h );
  ctx.fillStyle = "#00a";
  ctx.fillRect( 0, size * 2, size * 2, size );
  ctx.fillStyle = "#00f";
  ctx.fillRect( w, 2 * size + h, size - 2*w, size - 2*h );
  ctx.fillRect( size + w, 2 * size + h, size - 2*w, size - 2*h );

  ctx.font = `bold ${size / 3}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";
  ctx.fillText( "+X", size * .5, size * .5 );
  ctx.fillText( "-X", size * 1.5, size * .5 );
  ctx.fillStyle = "#000";
  ctx.fillText( "+Y", size * .5, size * 1.5 );
  ctx.fillText( "-Y", size * 1.5, size * 1.5 );
  ctx.fillStyle = "#fff";
  ctx.fillText( "+Z", size * .5, size * 2.5 );
  ctx.fillText( "-Z", size * 1.5, size * 2.5 );
  
  return canvas;
}

module.exports = StandardCube;
