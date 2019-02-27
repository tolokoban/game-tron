"use strict";

const Base = require("webgl.filter.base");


class Addition extends Base {
    constructor({
        gl,
        texture0,
        texture1,
        energy0 = 1, // Resulting energy of the fragment. 1 is 100%.
        energy1 = 1 // Resulting energy of the fragment. 1 is 100%.
    }) {
        super(gl, GLOBAL.frag);
        this.gl = gl;
        this.texture0 = texture0;
        this.texture1 = texture1;
        this.energy0 = energy0;
        this.energy1 = energy1;
    }

    paint(time, delta) {
        const { gl, prg, texture0, texture1, energy0, energy1 } = this;

        prg.use();
        prg.$uniTex0 = 0;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture0);
        prg.$uniEnergy0 = energy0;

        prg.$uniTex1 = 1;
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, texture1);
        prg.$uniEnergy1 = energy1;

        super.paint(time, delta);
    }
}


module.exports = Addition;