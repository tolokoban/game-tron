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

        prg.use();
        prg.$uniProjection = cameraMatrix;
        prg.$uniLocation = location;
        prg.$uniTexture = 0;
        gl.activeTexture( gl.TEXTURE0 );
        gl.bindTexture( gl.TEXTURE_2D, texture );

        prg.bindAttribs( buffVert, "attPoint" );
        prg.bindAttribs( buffVert, "attUV" );
        gl.bindBuffer( gl.ARRAY_BUFFER, buffVert );
        
        gl.drawArrays( gl.TRIANGLES, 0, 6 );
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
          xn0u = texW + margin,
          xn1u = 2 * texW - margin,
          xn0v = margin,
          xn1v = texH - margin,
          vert = new Float32Array([
              f, b, b, xp0u, xp1v,
              f, f, b, xp1u, xp1v,
              f, f, f, xp1u, xp0v,
              f, b, b, xp0u, xp1v,
              f, f, f, xp1u, xp0v,
              f, b, f, xp0u, xp0v,
              b, b, b, xn0u, xn1v,
              b, f, f, xn1u, xn0v,
              b, f, b, xn1u, xn1v,
              b, b, b, xn0u, xn1v,
              b, b, f, xn0u, xn0v,
              b, f, f, xn1u, xn0v
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

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);

    return texture;
}


function createCanvas( size ) {
    const canvas = document.createElement( "canvas" ),
          ctx = canvas.getContext( "2d" );
    canvas.setAttribute( "width", size * 2 );
    canvas.setAttribute( "height", size * 3 );

    ctx.fillStyle = "#f00";
    ctx.fillRect( 0, 0, size * 2, size );
    ctx.fillStyle = "#0f0";
    ctx.fillRect( 0, size, size * 2, size );
    ctx.fillStyle = "#00f";
    ctx.fillRect( 0, size * 2, size * 2, size );

    return canvas;
}

module.exports = StandardCube;
