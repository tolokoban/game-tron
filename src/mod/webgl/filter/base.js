"use strict";

const Program = require("webgl.program");


class ImageProcessor {
    constructor(gl, fragShaderCode) {
        this.gl = gl;
        this.prg = new Program(gl, {
            vert: GLOBAL.vert,
            frag: fragShaderCode
        });
        this.buffVert = gl.createBuffer();
        const arrayVert = new Float32Array([
            -1, -1, 0, 0,
            +1, -1, 1, 0,
            -1, +1, 0, 1,
            +1, +1, 1, 1
        ]);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffVert);
        gl.bufferData(gl.ARRAY_BUFFER, arrayVert, gl.STATIC_DRAW);
    }

    paint(time, delta) {
        const { gl, prg, buffVert } = this;
        prg.use();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffVert);

        prg.bindAttribs(buffVert, "attXY", "attUV");
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}


module.exports = ImageProcessor;